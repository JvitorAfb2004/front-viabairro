import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '../contexts/ToastContext';
import authService from '../services/authService';

const RecuperarSenha = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors(prev => ({
        ...prev,
        email: ''
      }));
    }
  };

  const validateEmail = () => {
    if (!email) {
      setErrors({ email: 'Email é obrigatório' });
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: 'Email inválido' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail()) return;

    setIsLoading(true);
    
    try {
      const response = await authService.forgotPassword(email);
      
      if (response.sucesso) {
        setIsEmailSent(true);
        showSuccess('Email de recuperação enviado com sucesso!');
      } else {
        showError(response.mensagem || 'Erro ao enviar email de recuperação');
        setErrors({ general: response.mensagem || 'Erro ao enviar email de recuperação' });
      }
    } catch (error) {
      const errorMessage = error.message || 'Erro ao enviar email. Tente novamente.';
      showError(errorMessage);
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    
    try {
      const response = await authService.forgotPassword(email);
      
      if (response.sucesso) {
        showSuccess('Email reenviado com sucesso!');
      } else {
        showError(response.mensagem || 'Erro ao reenviar email');
        setErrors({ general: response.mensagem || 'Erro ao reenviar email' });
      }
    } catch (error) {
      const errorMessage = error.message || 'Erro ao reenviar email. Tente novamente.';
      showError(errorMessage);
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <motion.div
          className="bg-[#1a1b1b] shadow-sm border-b border-gray-700"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <motion.div 
                className="flex items-center cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onClick={() => navigate('/')}
              >
                <img 
                  src="/logo.png" 
                  alt="Via Bairro" 
                  className="h-14 w-auto"
                />
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button 
                  variant="ghost" 
                  className="flex items-center space-x-2 text-white hover:bg-gray-800"
                  onClick={() => navigate('/login')}
                >
                  <span className="hidden sm:inline">Entrar</span>
                </Button>
                
                <Button 
                  className="flex items-center space-x-2 bg-[#f59820] hover:bg-[#e8891a] text-white"
                  onClick={() => navigate('/cadastro')}
                >
                  <span className="hidden sm:inline">Cadastrar</span>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Conteúdo */}
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            {/* Botão voltar */}
            <motion.div 
              className="flex justify-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="flex items-center text-[#1a1b1b] hover:text-[#f59820]"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao início
              </Button>
            </motion.div>

            {/* Logo */}
            <div className="text-center">
              <img 
                src="/logo-bg-white.png" 
                alt="Via Bairro" 
                className="h-16 w-auto mx-auto mb-4"
              />
            </div>

            {/* Sucesso */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold text-[#1a1b1b] mb-2">
                      Email enviado!
                    </h2>
                    <p className="text-gray-600">
                      Enviamos um link para redefinir sua senha para:
                    </p>
                    <p className="font-medium text-[#1a1b1b] mt-1">
                      {email}
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                    <h3 className="font-medium text-blue-900 mb-2">Próximos passos:</h3>
                    <ol className="text-sm text-blue-800 space-y-1">
                      <li>1. Verifique sua caixa de entrada</li>
                      <li>2. Clique no link do email</li>
                      <li>3. Crie uma nova senha</li>
                      <li>4. Faça login com a nova senha</li>
                    </ol>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={handleResendEmail}
                      variant="outline"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Reenviando...' : 'Reenviar email'}
                    </Button>

                    <Link to="/login">
                      <Button
                        variant="ghost"
                        className="w-full"
                      >
                        Voltar ao login
                      </Button>
                    </Link>
                  </div>

                  <div className="text-sm text-gray-500">
                    <p>Não recebeu o email? Verifique sua pasta de spam.</p>
                    <p className="mt-1">
                      Ainda com problemas?{' '}
                      <Link to="/contato" className="text-[#f59820] hover:text-[#e8891a]">
                        Entre em contato
                      </Link>
                    </p>
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Botão voltar */}
        <div className="flex justify-start">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center text-[#1a1b1b] hover:text-[#f59820]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao início
          </Button>
        </div>

        {/* Logo */}
        <div className="text-center">
          <img 
            src="/logo-bg-white.png" 
            alt="Via Bairro" 
            className="h-16 w-auto mx-auto mb-4"
          />
          <h2 className="text-3xl font-bold text-[#1a1b1b]">
            Recuperar senha
          </h2>
          <p className="text-gray-600 mt-2">
            Digite seu email para receber um link de recuperação
          </p>
        </div>

        {/* Formulário */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-[#1a1b1b]">Redefinir senha</CardTitle>
            <CardDescription className="text-center">
              Enviaremos um link para redefinir sua senha
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800 text-sm">
                  {errors.general}
                </div>
              )}

              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={handleInputChange}
                    className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-[#f59820] hover:bg-[#e8891a] text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Enviando...' : 'Enviar link de recuperação'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Lembrou da senha?{' '}
                <Link
                  to="/login"
                  className="text-[#f59820] hover:text-[#e8891a] font-medium"
                >
                  Faça login aqui
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecuperarSenha;
