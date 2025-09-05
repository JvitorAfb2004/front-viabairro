import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService.js';
import userService from '../services/userService.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          // Sempre buscar dados do usuário da API
          const response = await authService.getProfile();
          if (response.sucesso) {
            setUser(response.dados.usuario);
          } else {
            // Se não conseguir obter dados, fazer logout
            authService.logout();
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        // Se houver erro, limpar dados locais
        authService.logout();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, senha, rememberMe = false) => {
    setLoading(true);
    
    try {
      const response = await authService.login(email, senha, rememberMe);
      
      if (response.sucesso) {
        // Buscar dados completos do usuário após login
        const userResponse = await authService.getProfile();
        if (userResponse.sucesso) {
          setUser(userResponse.dados.usuario);
          return { success: true, user: userResponse.dados.usuario };
        } else {
          return { success: false, error: 'Erro ao obter dados do usuário' };
        }
      } else {
        return { success: false, error: response.mensagem || 'Erro no login' };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Erro ao fazer login' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    
    try {
      const response = await authService.register(userData);
      
      if (response.sucesso) {
        return { success: true, message: response.mensagem };
      } else {
        return { success: false, error: response.mensagem || 'Erro no registro' };
      }
    } catch (error) {
      console.error('Erro no registro:', error);
      return { success: false, error: error.message || 'Erro ao registrar usuário' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateUser = async (updatedData) => {
    try {
      // Atualizar no servidor
      const response = await userService.updateProfile(updatedData);
      if (response.sucesso) {
        setUser(response.dados.usuario);
        return response.dados.usuario;
      } else {
        throw new Error(response.mensagem || 'Erro ao atualizar perfil');
      }
    } catch (error) {
      throw error;
    }
  };

  const isAuthenticated = () => {
    return authService.isAuthenticated() && !!user;
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const isEmailVerified = () => {
    return user?.email_verificado === true;
  };

  const refreshUser = async () => {
    try {
      if (authService.isAuthenticated()) {
        const response = await authService.getProfile();
        if (response.sucesso) {
          setUser(response.dados.usuario);
          return response.dados.usuario;
        }
      }
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error);
      // Se houver erro, fazer logout para limpar dados inválidos
      authService.logout();
      setUser(null);
    }
    return null;
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    refreshUser,
    loading,
    isAuthenticated,
    isAdmin,
    isEmailVerified
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;