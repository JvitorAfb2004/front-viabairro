import apiService from './api.js';

class ItemService {
  // Buscar itens/anúncios
  async buscarItens(filtros = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Adicionar filtros como query parameters
      Object.keys(filtros).forEach(key => {
        if (filtros[key] !== null && filtros[key] !== undefined && filtros[key] !== '') {
          queryParams.append(key, filtros[key]);
        }
      });

      const endpoint = `/items${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await apiService.get(endpoint);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erro ao buscar itens');
    }
  }

  // Obter item por ID
  async getItemById(id) {
    try {
      const response = await apiService.get(`/items/${id}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erro ao obter item');
    }
  }

  // Criar novo item/anúncio
  async criarItem(itemData) {
    try {
      const response = await apiService.post('/items', itemData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erro ao criar item');
    }
  }

  // Criar item com arquivo
  async criarItemComArquivo(formData) {
    try {
      const response = await apiService.uploadFile('/items', formData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erro ao criar item');
    }
  }

  // Atualizar item
  async atualizarItem(id, itemData) {
    try {
      const response = await apiService.put(`/items/${id}`, itemData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erro ao atualizar item');
    }
  }

  // Atualizar item com arquivo
  async atualizarItemComArquivo(id, formData) {
    try {
      const response = await apiService.uploadFile(`/items/${id}`, formData, 'PUT');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erro ao atualizar item');
    }
  }

  // Deletar item
  async deletarItem(id) {
    try {
      const response = await apiService.delete(`/items/${id}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erro ao deletar item');
    }
  }

  // Obter itens do usuário logado
  async getMeusItens() {
    try {
      const response = await apiService.get('/items/meus');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erro ao obter meus itens');
    }
  }

  // Upload de imagem
  async uploadImagem(file) {
    try {
      const response = await apiService.uploadFile('/items/upload', file);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erro ao fazer upload da imagem');
    }
  }

  // Buscar categorias disponíveis
  async getCategorias() {
    try {
      const response = await apiService.get('/items/categorias');
      return response;
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      // Retornar categorias padrão em caso de erro
      return {
        sucesso: true,
        dados: {
          categorias: [
            'Beleza e Estética',
            'Saúde e Bem-estar',
            'Educação e Cursos',
            'Tecnologia e Informática',
            'Construção e Reforma',
            'Automóveis e Veículos',
            'Serviços Gerais',
            'Lazer e Entretenimento',
            'Alimentação e Bebidas',
            'Moda e Acessórios',
            'Casa e Jardim',
            'Outros'
          ]
        }
      };
    }
  }
}

const itemService = new ItemService();
export default itemService;
