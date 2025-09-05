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
      const url = `${OPENCAGE_BASE_URL}?q=${latitude}%2C+${longitude}&key=${OPENCAGE_API_KEY}&pretty=1&language=pt&countrycode=br`;
      
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
      
      // Extrair informações do endereço
      const addressInfo = {
        formatted: result.formatted,
        city: components.city || components.town || components.village || components.municipality || '',
        state: components.state || components.state_district || '',
        country: components.country || 'Brasil',
        postcode: components.postcode || '',
        suburb: components.suburb || components.neighbourhood || components.city_district || '',
        road: components.road || '',
        house_number: components.house_number || '',
        county: components.county || '',
        region: components.region || ''
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
      
      return {
        coordinates: position,
        address: address
      };
    } catch (error) {
      console.error('Erro ao obter informações de localização:', error);
      throw error;
    }
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
