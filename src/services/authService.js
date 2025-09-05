import apiService from './api.js';

class AuthService {
  // Login
  async login(email, senha, rememberMe = false) {
    try {
      const response = await apiService.post('/auth/login', { email, senha, rememberMe });
      
      if (response.sucesso && response.dados.token) {
        // Salvar token no localStorage
        localStorage.setItem('viabairro_token', response.dados.token);
        
        // Se "lembrar de mim" estiver marcado, salvar email também
        if (rememberMe) {
          localStorage.setItem('viabairro_remember_email', email);
        } else {
          localStorage.removeItem('viabairro_remember_email');
        }
      }
      
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erro ao fazer login');
    }
  }

  // Registro
  async register(userData) {
    try {
      const response = await apiService.post('/auth/registrar', userData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erro ao registrar usuário');
    }
  }

  // Verificar email
  async verifyEmail(token) {
    try {
      const response = await apiService.get(`/auth/verificar-email/${token}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erro ao verificar email');
    }
  }

  // Enviar email de verificação
  async enviarEmailVerificacao() {
    try {
      const response = await apiService.post('/auth/enviar-verificacao');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erro ao enviar email de verificação');
    }
  }

  // Esqueci minha senha
  async forgotPassword(email) {
    try {
      const response = await apiService.post('/auth/forgot-password', { email });
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erro ao solicitar reset de senha');
    }
  }

  // Resetar senha
  async resetPassword(token, senha) {
    try {
      const response = await apiService.post('/auth/reset-password', { token, senha });
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erro ao resetar senha');
    }
  }

  // Obter perfil do usuário
  async getProfile() {
    try {
      const response = await apiService.get('/auth/perfil');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erro ao obter perfil');
    }
  }

  // Logout
  logout() {
    localStorage.removeItem('viabairro_token');
  }

  // Verificar se está autenticado
  isAuthenticated() {
    const token = localStorage.getItem('viabairro_token');
    return !!token;
  }

  // Obter usuário da API
  async getCurrentUser() {
    try {
      const response = await this.getProfile();
      return response.sucesso ? response.dados.usuario : null;
    } catch (error) {
      return null;
    }
  }

  // Atualizar token (para refresh automático)
  updateToken(newToken) {
    localStorage.setItem('viabairro_token', newToken);
  }

  // Obter email salvo (para lembrar de mim)
  getRememberedEmail() {
    return localStorage.getItem('viabairro_remember_email');
  }
}

const authService = new AuthService();
export default authService;
