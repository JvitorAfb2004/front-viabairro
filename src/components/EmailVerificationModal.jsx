import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import authService from '../services/authService';

const EmailVerificationModal = ({ isOpen, onClose }) => {
  const { user, refreshUser } = useAuth();
  const { showSuccess, showError } = useToast();
  const [isSending, setIsSending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // Prevenir scroll do body quando modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSendVerification = async () => {
    try {
      setIsSending(true);
      
      // Chamar o service real para reenviar email de verificação
      const response = await authService.enviarEmailVerificacao();
      
      if (response.sucesso) {
        showSuccess('Email de verificação enviado! Verifique sua caixa de entrada.');
      } else {
        showError(response.mensagem || 'Erro ao enviar email de verificação.');
      }
    } catch (error) {
      console.error('Erro ao enviar email de verificação:', error);
      showError(error.message || 'Erro ao enviar email de verificação. Tente novamente.');
    } finally {
      setIsSending(false);
    }
  };

  const handleCheckVerification = async () => {
    try {
      await refreshUser();
      if (user?.email_verificado) {
        setIsVerified(true);
        showSuccess('Email verificado com sucesso!');
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        showError('Email ainda não foi verificado. Verifique sua caixa de entrada.');
      }
    } catch (error) {
      showError('Erro ao verificar status do email.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop com blur e animação */}
          <motion.div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Modal com animação suave */}
          <motion.div
            className="relative w-full max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              duration: 0.4 
            }}
          >
            <Card className="bg-white shadow-2xl border-0 overflow-hidden">
              <CardHeader className="text-center pb-4 relative">
                {/* Botão de fechar */}
                <motion.button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5 text-gray-500" />
                </motion.button>
                
                {/* Ícone animado */}
                <motion.div 
                  className="flex justify-center mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", damping: 10 }}
                >
                  {isVerified ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3, type: "spring", damping: 8 }}
                    >
                      <CheckCircle className="w-16 h-16 text-green-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", damping: 10 }}
                    >
                      <Mail className="w-16 h-16 text-orange-500" />
                    </motion.div>
                  )}
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {isVerified ? 'Email Verificado!' : 'Verifique seu Email'}
                  </CardTitle>
                </motion.div>
              </CardHeader>
              
              <CardContent className="text-center space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {isVerified ? (
                    <div className="space-y-4">
                      <p className="text-gray-600">
                        Seu email foi verificado com sucesso! Agora você pode criar anúncios.
                      </p>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          onClick={onClose}
                          className="w-full bg-green-600 hover:bg-green-700 text-white"
                        >
                          Continuar
                        </Button>
                      </motion.div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <motion.div 
                        className="bg-orange-50 border border-orange-200 rounded-lg p-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                          <div className="text-left">
                            <h4 className="text-sm font-medium text-orange-900">
                              Ação Necessária
                            </h4>
                            <p className="text-sm text-orange-800 mt-1">
                              Para criar anúncios, você precisa verificar seu email primeiro.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.p 
                        className="text-gray-600 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                      >
                        Enviamos um link de verificação para <strong>{user?.email}</strong>
                      </motion.p>
                      
                      <motion.div 
                        className="space-y-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button 
                            onClick={handleSendVerification}
                            disabled={isSending}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50"
                          >
                            {isSending ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Enviando...
                              </>
                            ) : (
                              <>
                                <Mail className="w-4 h-4 mr-2" />
                                Reenviar Email
                              </>
                            )}
                          </Button>
                        </motion.div>
                        
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button 
                            onClick={handleCheckVerification}
                            variant="outline"
                            className="w-full"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Já Verifiquei
                          </Button>
                        </motion.div>
                      </motion.div>
                      
                      <motion.div 
                        className="text-xs text-gray-500 space-y-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                      >
                        <p>• Verifique sua caixa de spam</p>
                        <p>• O link expira em 24 horas</p>
                        <p>• Clique em "Já Verifiquei" após confirmar</p>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmailVerificationModal;
