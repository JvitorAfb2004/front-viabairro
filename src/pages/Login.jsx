import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import authService from '../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const { showSuccess, showError } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  // Carregar email salvo quando o componente for montado
  useEffect(() => {
    const savedEmail = authService.getRememberedEmail();
    if (savedEmail) {
      setFormData(prev => ({
        ...prev,
        email: savedEmail
      }));
      setRememberMe(true);
    }
  }, []);

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

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      const result = await login(formData.email, formData.password, rememberMe);
      
      if (result.success) {
        showSuccess('Login realizado com sucesso!');
        navigate('/');
      } else {
        const errorMessage = result.error || 'Erro ao fazer login';
        showError(errorMessage);
        setErrors({ general: errorMessage });
      }
    } catch (error) {
      const errorMessage = error.message || 'Erro ao fazer login. Tente novamente.';
      console.error('Erro no login:', error);
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
              <CardTitle className="text-xl font-semibold text-black">Entrar na sua conta</CardTitle>
              <CardDescription className="text-gray-600">
                Digite suas credenciais para acessar sua conta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {errors.general && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-600 text-sm">{errors.general}</p>
                  </div>
                )}
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
                      className="pl-10 h-11 border-gray-300 focus:border-black focus:ring-black"
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
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
                      placeholder="Sua senha"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10 h-11 border-gray-300 focus:border-black focus:ring-black"
                      required
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      id="remember"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-gray-300 text-black focus:ring-black"
                    />
                    <Label htmlFor="remember" className="text-sm text-gray-600">
                      Lembrar de mim
                    </Label>
                  </div>
                  <Link 
                    to="/recuperar-senha" 
                    className="text-sm text-black hover:underline"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-11 bg-black hover:bg-gray-800 text-white font-medium"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Entrando...
                    </div>
                  ) : (
                    'Entrar'
                  )}
                </Button>

              </form>

              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  Não tem uma conta?{' '}
                  <Link 
                    to="/cadastro" 
                    className="text-black hover:underline font-medium"
                  >
                    Cadastre-se
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

export default Login;
