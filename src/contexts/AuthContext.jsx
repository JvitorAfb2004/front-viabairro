import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Fake user accounts for demonstration
const FAKE_USERS = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao@exemplo.com',
    password: '123456',
    phone: '(11) 99999-1111',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    role: 'user',
    plan: 'Premium',
    createdAt: '2024-01-15',
    address: {
      street: 'Rua das Flores, 123',
      neighborhood: 'Vila Madalena',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567'
    },
    business: {
      name: 'João Restaurante',
      category: 'Alimentação',
      description: 'Restaurante familiar com pratos caseiros'
    }
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@exemplo.com',
    password: '123456',
    phone: '(11) 98888-2222',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    role: 'user',
    plan: 'Básico',
    createdAt: '2024-01-10',
    address: {
      street: 'Av. Paulista, 456',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100'
    },
    business: {
      name: 'Salão Maria Beleza',
      category: 'Beleza & Estética',
      description: 'Salão de beleza especializado em cabelos cacheados'
    }
  },
  {
    id: 3,
    name: 'Admin',
    email: 'admin@viabairro.com',
    password: 'admin123',
    phone: '(11) 97777-3333',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'admin',
    plan: 'Admin',
    createdAt: '2024-01-01'
  },
  {
    id: 4,
    name: 'Demo User',
    email: 'demo@demo.com',
    password: 'demo123',
    phone: '(11) 96666-4444',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face',
    role: 'user',
    plan: 'Empresarial',
    createdAt: '2024-01-20',
    address: {
      street: 'Rua Demo, 789',
      neighborhood: 'Centro',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zipCode: '20000-000'
    },
    business: {
      name: 'Demo Business',
      category: 'Tecnologia',
      description: 'Empresa de demonstração para testes'
    }
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('viabairro_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('viabairro_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const foundUser = FAKE_USERS.find(
      user => user.email === email && user.password === password
    );
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('viabairro_user', JSON.stringify(userWithoutPassword));
      setLoading(false);
      return { success: true, user: userWithoutPassword };
    } else {
      setLoading(false);
      return { success: false, error: 'Email ou senha incorretos' };
    }
  };

  const register = async (userData) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check if email already exists
    const existingUser = FAKE_USERS.find(user => user.email === userData.email);
    
    if (existingUser) {
      setLoading(false);
      return { success: false, error: 'Este email já está cadastrado' };
    }
    
    // Create new user
    const newUser = {
      id: FAKE_USERS.length + 1,
      name: userData.nome,
      email: userData.email,
      phone: userData.telefone,
      password: userData.password,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.nome)}&background=000&color=fff`,
      role: 'user',
      plan: 'Básico',
      createdAt: new Date().toISOString().split('T')[0],
      address: {
        street: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: ''
      },
      business: {
        name: '',
        category: '',
        description: ''
      }
    };
    
    // Add to fake users array (in real app, this would be API call)
    FAKE_USERS.push(newUser);
    
    setLoading(false);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('viabairro_user');
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('viabairro_user', JSON.stringify(updatedUser));
    return updatedUser;
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    loading,
    isAuthenticated,
    isAdmin,
    fakeUsers: FAKE_USERS // For demo purposes
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