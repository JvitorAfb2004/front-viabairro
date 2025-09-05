import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Phone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

const Cadastro = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const { showSuccess, showError } = useToast();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpar erro quando usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = 'Nome deve ter pelo menos 2 caracteres';
    }

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.telefone) {
      newErrors.telefone = 'Telefone é obrigatório';
    } else if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.telefone)) {
      newErrors.telefone = 'Telefone deve estar no formato (11) 99999-9999';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 6) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 10) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({
      ...prev,
      telefone: formatted
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      const result = await register({
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        senha: formData.password
      });
      
      if (result.success) {
        showSuccess(result.message || 'Conta criada com sucesso! Verifique seu email para ativar a conta.');
        navigate('/login');
      } else {
        const errorMessage = result.error || 'Erro ao criar conta';
        showError(errorMessage);
        setErrors({ general: errorMessage });
      }
    } catch (error) {
      const errorMessage = error.message || 'Erro ao criar conta. Tente novamente.';
      console.error('Erro no cadastro:', error);
      showError(errorMessage);
      setErrors({ general: errorMessage });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">VB</span>
            </div>
            <h1 className="text-2xl font-bold text-black">Via Bairro</h1>
          </div>

          {/* Back Button */}
          <div className="mb-6">
            <Link 
              to="/" 
              className="inline-flex items-center text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao início
            </Link>
          </div>

          <Card className="border border-gray-200">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold text-black">Criar sua conta</CardTitle>
              <CardDescription className="text-gray-600">
                Preencha os dados abaixo para se cadastrar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {errors.general && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800 text-sm">
                    {errors.general}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-sm font-medium text-black">
                    Nome completo
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="nome"
                      name="nome"
                      type="text"
                      placeholder="Seu nome completo"
                      value={formData.nome}
                      onChange={handleInputChange}
                      className={`pl-10 h-11 border-gray-300 focus:border-black focus:ring-black ${errors.nome ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.nome && (
                    <p className="text-red-500 text-sm">{errors.nome}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-black">
                    E-mail
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`pl-10 h-11 border-gray-300 focus:border-black focus:ring-black ${errors.email ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone" className="text-sm font-medium text-black">
                    Telefone
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="telefone"
                      name="telefone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={formData.telefone}
                      onChange={handlePhoneChange}
                      className={`pl-10 h-11 border-gray-300 focus:border-black focus:ring-black ${errors.telefone ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.telefone && (
                    <p className="text-red-500 text-sm">{errors.telefone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-black">
                    Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Mínimo 6 caracteres"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`pl-10 pr-10 h-11 border-gray-300 focus:border-black focus:ring-black ${errors.password ? 'border-red-500' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-black">
                    Confirmar senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Digite a senha novamente"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`pl-10 pr-10 h-11 border-gray-300 focus:border-black focus:ring-black ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="rounded border-gray-300 text-black focus:ring-black"
                  />
                  <Label htmlFor="terms" className="text-sm text-gray-600">
                    Aceito os{' '}
                    <Link to="/termos" className="text-black hover:underline">
                      termos de uso
                    </Link>
                    {' '}e{' '}
                    <Link to="/privacidade" className="text-black hover:underline">
                      política de privacidade
                    </Link>
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-11 bg-black hover:bg-gray-800 text-white font-medium"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Criando conta...
                    </div>
                  ) : (
                    'Criar conta'
                  )}
                </Button>

              </form>

              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  Já tem uma conta?{' '}
                  <Link 
                    to="/login" 
                    className="text-black hover:underline font-medium"
                  >
                    Faça login
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
