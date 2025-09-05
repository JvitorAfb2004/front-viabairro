import apiService from './api.js';

class UserService {
  // Obter perfil do usuário
  async getProfile() {
    try {
      const response = await apiService.get('/user/perfil');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erro ao obter perfil');
    }
  }

  // Atualizar perfil
  async updateProfile(userData) {
    try {
      const response = await apiService.put('/user/perfil', userData);
      
      // Atualizar dados no localStorage se necessário
      if (response.sucesso && response.dados.usuario) {
        localStorage.setItem('viabairro_user', JSON.stringify(response.dados.usuario));
      }
      
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erro ao atualizar perfil');
    }
  }

  // Upload de foto de perfil
  async uploadFotoPerfil(file) {
    try {
      const formData = new FormData();
      formData.append('foto', file);
      
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/user/upload-foto`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('viabairro_token')}`
        },
        body: formData
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.mensagem || 'Erro ao fazer upload da foto');
      }
      
      return data;
    } catch (error) {
      throw new Error(error.message || 'Erro ao fazer upload da foto');
    }
  }

  // Upload de banner
  async uploadBanner(file, bannerIndex) {
    try {
      const formData = new FormData();
      formData.append('banner', file);
      formData.append('bannerIndex', bannerIndex);
      
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/user/upload-banner`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('viabairro_token')}`
        },
        body: formData
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.mensagem || 'Erro ao fazer upload do banner');
      }
      
      return data;
    } catch (error) {
      throw new Error(error.message || 'Erro ao fazer upload do banner');
    }
  }

  // Obter perfil público de outro usuário
  async getPerfilPublico(userId) {
    try {
      const response = await apiService.get(`/user/perfil-publico/${userId}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erro ao obter perfil público');
    }
  }

  // Atualizar configurações de perfil público
  async updatePerfilPublico(publicData) {
    try {
      const response = await apiService.put('/user/perfil', publicData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erro ao atualizar perfil público');
    }
  }

  // Obter estatísticas do usuário
  async getEstatisticas() {
    try {
      const response = await apiService.get('/user/estatisticas');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erro ao obter estatísticas');
    }
  }
}

const userService = new UserService();
export default userService;
