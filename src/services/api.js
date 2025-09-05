// Configuração base da API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Método para fazer requisições HTTP
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    // Configurações padrão
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Adicionar token de autenticação se existir
    const token = localStorage.getItem('viabairro_token');
    if (token) {
      defaultOptions.headers.Authorization = `Bearer ${token}`;
    }

    // Merge das opções
    const config = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      // Se a resposta não for ok, lançar erro com detalhes
      if (!response.ok) {
        // Se há erros de validação específicos, mostrar o primeiro
        if (data.erros && data.erros.length > 0) {
          throw new Error(data.erros[0].mensagem || data.mensagem || 'Erro na requisição');
        }
        throw new Error(data.mensagem || 'Erro na requisição');
      }

      return data;
    } catch (error) {
      console.error('Erro na API:', error);
      throw error;
    }
  }

  // Métodos HTTP
  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }

  // Upload de arquivos
  async uploadFile(endpoint, formData, method = 'POST', options = {}) {
    const token = localStorage.getItem('viabairro_token');
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method,
      headers,
      body: formData,
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      // Se há erros de validação específicos, mostrar o primeiro
      if (data.erros && data.erros.length > 0) {
        throw new Error(data.erros[0].mensagem || data.mensagem || 'Erro na requisição');
      }
      throw new Error(data.mensagem || 'Erro no upload');
    }

    return data;
  }
}

// Instância única do serviço
const apiService = new ApiService();

export default apiService;
