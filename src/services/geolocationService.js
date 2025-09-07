const OPENCAGE_API_KEY = '86698f0d6e77480287ac30f3d3f576d8';
const OPENCAGE_BASE_URL = 'https://api.opencagedata.com/geocode/v1/json';

const geolocationService = {
  // Obter localização atual do usuário
  async getCurrentPosition() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocalização não é suportada por este navegador'));
        return;
      }

      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutos
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        (error) => {
          let errorMessage = 'Erro ao obter localização';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Permissão de localização negada pelo usuário';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Informações de localização indisponíveis';
              break;
            case error.TIMEOUT:
              errorMessage = 'Tempo limite para obter localização excedido';
              break;
          }
          
          reject(new Error(errorMessage));
        },
        options
      );
    });
  },

  // Converter coordenadas em endereço usando OpenCage
  async reverseGeocode(latitude, longitude) {
    try {
      // Parâmetros otimizados para maior precisão no Brasil
      const params = new URLSearchParams({
        q: `${latitude},${longitude}`,
        key: OPENCAGE_API_KEY,
        language: 'pt',
        countrycode: 'br',
        pretty: '1',
        no_annotations: '0',
        limit: '1',
        // Parâmetros para melhor precisão
        abbrv: '0',
        add_request: '0',
        roadinfo: '1'
      });
      
      const url = `${OPENCAGE_BASE_URL}?${params.toString()}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erro na API OpenCage: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status.code !== 200) {
        throw new Error(`Erro na API OpenCage: ${data.status.message}`);
      }
      
      if (!data.results || data.results.length === 0) {
        throw new Error('Nenhum resultado encontrado para as coordenadas fornecidas');
      }
      
      const result = data.results[0];
      const components = result.components;
      
      // Extrair informações do endereço com maior precisão
      const addressInfo = {
        formatted: result.formatted,
        city: components.city || components.town || components.village || components.municipality || '',
        state: components.state || components.state_district || '',
        country: components.country || 'Brasil',
        postcode: components.postcode || '',
        // Melhor lógica para suburb - evitar duplicação com city
        suburb: this.extractSuburb(components),
        road: components.road || '',
        house_number: components.house_number || '',
        county: components.county || '',
        region: components.region || '',
        // Informações adicionais para melhor precisão
        confidence: result.confidence || 0,
        formatted_address: result.formatted || ''
      };
      
      return addressInfo;
    } catch (error) {
      console.error('Erro no reverse geocoding:', error);
      throw error;
    }
  },

  // Obter localização completa (coordenadas + endereço)
  async getLocationInfo() {
    try {
      const position = await this.getCurrentPosition();
      const address = await this.reverseGeocode(position.latitude, position.longitude);
      
      // Se não conseguiu um bairro específico, tentar API do IBGE
      if (!address.suburb || address.suburb === address.city) {
        try {
          const ibgeInfo = await this.getIBGELocationInfo(position.latitude, position.longitude);
          if (ibgeInfo && ibgeInfo.bairro) {
            address.suburb = ibgeInfo.bairro;
          }
        } catch (ibgeError) {
          console.log('IBGE API não disponível, usando dados do OpenCage');
        }
      }
      
      return {
        coordinates: position,
        address: address
      };
    } catch (error) {
      console.error('Erro ao obter informações de localização:', error);
      throw error;
    }
  },

  // Fallback com API do IBGE para maior precisão
  async getIBGELocationInfo(latitude, longitude) {
    try {
      const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome`);
      const municipios = await response.json();
      
      // Buscar município mais próximo (simplificado)
      // Em produção, seria melhor usar uma API de geocoding mais precisa
      return null; // Por enquanto, retorna null para usar apenas OpenCage
    } catch (error) {
      console.error('Erro na API do IBGE:', error);
      return null;
    }
  },

  // Extrair suburb com maior precisão
  extractSuburb(components) {
    // Prioridade para encontrar um bairro real (não igual à cidade)
    const suburb = components.suburb || components.neighbourhood || components.city_district || components.district || '';
    const city = components.city || components.town || components.village || components.municipality || '';
    
    // Se suburb é igual à city ou vazio, tentar outras opções
    if (!suburb || suburb === city) {
      // Tentar extrair do formatted address
      const formatted = components.formatted || '';
      if (formatted && city) {
        // Procurar por padrões como "Bairro X, Cidade" ou "Cidade - Bairro"
        const patterns = [
          new RegExp(`([^,]+),\\s*${city.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i'),
          new RegExp(`${city.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*-\\s*([^,]+)`, 'i'),
          new RegExp(`([^,]+)\\s*,\\s*${city.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*-`, 'i')
        ];
        
        for (const pattern of patterns) {
          const match = formatted.match(pattern);
          if (match && match[1] && match[1].trim() !== city) {
            return match[1].trim();
          }
        }
      }
      
      // Se ainda não encontrou, retornar vazio para evitar duplicação
      return '';
    }
    
    return suburb;
  },

  // Verificar se a geolocalização está disponível
  isGeolocationAvailable() {
    return 'geolocation' in navigator;
  },

  // Obter permissão de geolocalização
  async requestPermission() {
    if (!this.isGeolocationAvailable()) {
      throw new Error('Geolocalização não é suportada por este navegador');
    }

    try {
      const position = await this.getCurrentPosition();
      return true;
    } catch (error) {
      if (error.message.includes('PERMISSION_DENIED')) {
        return false;
      }
      throw error;
    }
  }
};

export default geolocationService;
