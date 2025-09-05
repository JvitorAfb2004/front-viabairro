import apiService from './api.js';

class AdminService {
  // Dashboard
  async getDashboard() {
    try {
      const response = await apiService.get('/admin/dashboard');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erro ao obter dados do dashboard');
    }
  }

  // Usuários
  async getUsuarios(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await apiService.get(`/admin/usuarios${queryString ? `?${queryString}` : ''}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erro ao listar usuários');
    }
  }

  async atualizarUsuario(userId, userData) {
    try {
      const response = await apiService.put(`/admin/usuarios/${userId}`, userData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erro ao atualizar usuário');
    }
  }

  async excluirUsuario(userId) {
    try {
      const response = await apiService.delete(`/admin/usuarios/${userId}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erro ao excluir usuário');
    }
  }

  // Anúncios
  async getAnuncios(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await apiService.get(`/admin/anuncios${queryString ? `?${queryString}` : ''}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erro ao listar anúncios');
    }
  }

  async ativarAnuncio(anuncioId, ativo) {
    try {
      const response = await apiService.put(`/admin/anuncios/${anuncioId}/ativar`, { ativo });
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erro ao ativar/desativar anúncio');
    }
  }

  async excluirAnuncio(anuncioId) {
    try {
      const response = await apiService.delete(`/admin/anuncios/${anuncioId}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erro ao excluir anúncio');
    }
  }

  // Planos
  async getPlanos() {
    try {
      const response = await apiService.get('/admin/planos');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erro ao listar planos');
    }
  }

  async criarPlano(planoData) {
    try {
      const response = await apiService.post('/admin/planos', planoData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erro ao criar plano');
    }
  }

  async atualizarPlano(planoId, planoData) {
    try {
      const response = await apiService.put(`/admin/planos/${planoId}`, planoData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erro ao atualizar plano');
    }
  }

  async excluirPlano(planoId) {
    try {
      const response = await apiService.delete(`/admin/planos/${planoId}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erro ao excluir plano');
    }
  }

}

const adminService = new AdminService();
export default adminService;
