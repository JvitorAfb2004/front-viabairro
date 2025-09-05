import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Eye, EyeOff, Lock, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import authService from '../services/authService';

const ResetarSenha = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showSuccess, showError } = useToast();
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [token, setToken] = useState('');

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (!tokenFromUrl) {
      showError('Token de redefinição não encontrado');
      navigate('/recuperar-senha');
      return;
    }
    setToken(tokenFromUrl);
  }, [searchParams, navigate, showError]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const response = await authService.resetPassword(token, formData.password);
      
      if (response.sucesso) {
        setIsSuccess(true);
        showSuccess('Senha redefinida com sucesso!');
      } else {
        showError(response.mensagem || 'Erro ao redefinir senha');
        setErrors({ general: response.mensagem || 'Erro ao redefinir senha' });
      }
    } catch (error) {
      const errorMessage = error.message || 'Erro ao redefinir senha. Tente novamente.';
      showError(errorMessage);
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white">
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-black">Senha Redefinida!</h1>
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
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold text-black mb-2">
                      Sua senha foi redefinida com sucesso!
                    </h2>
                    <p className="text-gray-600">
                      Agora você pode fazer login com sua nova senha.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Link to="/login">
                      <Button className="w-full h-11 bg-black hover:bg-gray-800 text-white font-medium">
                        Fazer Login
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <img 
              src="/logo-bg-white.png" 
              alt="Via Bairro" 
              className="h-16 w-auto mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-black">Via Bairro</h1>
          </div>

          {/* Back Button */}
          <div className="mb-6">
            <Link 
              to="/recuperar-senha" 
              className="inline-flex items-center text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Link>
          </div>

          <Card className="border border-gray-200">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold text-black">Redefinir senha</CardTitle>
              <CardDescription className="text-gray-600">
                Digite sua nova senha abaixo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {errors.general && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <div className="flex items-center">
                      <AlertCircle className="w-4 h-4 text-red-600 mr-2" />
                      <p className="text-red-600 text-sm">{errors.general}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-black">
                    Nova senha
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-black">
                    Confirmar nova senha
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
                      className="pl-10 pr-10 h-11 border-gray-300 focus:border-black focus:ring-black"
                      required
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

                <Button 
                  type="submit" 
                  className="w-full h-11 bg-black hover:bg-gray-800 text-white font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Redefinindo...
                    </div>
                  ) : (
                    'Redefinir senha'
                  )}
                </Button>
              </form>

              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  Lembrou da senha?{' '}
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

export default ResetarSenha;
