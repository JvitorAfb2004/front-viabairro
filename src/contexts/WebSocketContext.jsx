import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    if (isAuthenticated() && user) {
      // Aguardar um pouco antes de conectar para garantir que o servidor esteja pronto
      const connectTimeout = setTimeout(() => {
        // Conectar ao WebSocket quando usuário estiver logado
        const wsUrl = import.meta.env.VITE_WS_URL || (import.meta.env.DEV ? '' : 'http://localhost:3000');
        console.log('Tentando conectar ao WebSocket em:', wsUrl || 'URL relativa');
        
        const newSocket = io(wsUrl, {
          auth: {
            token: localStorage.getItem('viabairro_token')
          },
          transports: ['websocket', 'polling'],
          timeout: 10000,
          reconnection: true,
          reconnectionDelay: 1000,
          reconnectionAttempts: 5
        });

        // Eventos de conexão
        newSocket.on('connect', () => {
          console.log('✅ Conectado ao WebSocket');
          setIsConnected(true);
        });

        newSocket.on('disconnect', (reason) => {
          console.log('❌ Desconectado do WebSocket:', reason);
          setIsConnected(false);
        });

        newSocket.on('connect_error', (error) => {
          console.error('❌ Erro de conexão WebSocket:', error);
          setIsConnected(false);
        });

        newSocket.on('reconnect', (attemptNumber) => {
          console.log('🔄 Reconectado ao WebSocket após', attemptNumber, 'tentativas');
          setIsConnected(true);
        });

        newSocket.on('reconnect_error', (error) => {
          console.error('❌ Erro na reconexão WebSocket:', error);
        });

        newSocket.on('connected', (data) => {
          console.log('WebSocket conectado:', data);
        });

      // Eventos de pagamento
      newSocket.on('payment_confirmed', (data) => {
        console.log('Pagamento confirmado:', data);
        showSuccess(`Pagamento confirmado! Plano ${data.data.plano} ativado com sucesso.`);
        
        // Recarregar página para atualizar dados
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });

      newSocket.on('payment_failed', (data) => {
        console.log('Pagamento falhou:', data);
        showError(`Pagamento falhou: ${data.data.motivo || 'Erro desconhecido'}`);
      });

      newSocket.on('payment_status_update', (data) => {
        console.log('Status do pagamento atualizado:', data);
        
        if (data.status === 'approved') {
          showSuccess('Pagamento aprovado! Sua assinatura foi ativada.');
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else if (data.status === 'rejected') {
          showError('Pagamento rejeitado. Tente novamente.');
        } else if (data.status === 'pending') {
          showSuccess('Pagamento pendente. Aguarde a confirmação.');
        }
      });

      // Eventos de erro
      newSocket.on('error', (error) => {
        console.error('Erro no WebSocket:', error);
        showError('Erro de conexão. Recarregue a página.');
      });

        setSocket(newSocket);
      }, 1000); // Aguardar 1 segundo antes de conectar

      // Cleanup na desconexão
      return () => {
        clearTimeout(connectTimeout);
        if (socket) {
          socket.close();
          setSocket(null);
          setIsConnected(false);
        }
      };
    } else {
      // Desconectar se usuário não estiver logado
      if (socket) {
        socket.close();
        setSocket(null);
        setIsConnected(false);
      }
    }
  }, [isAuthenticated, user]);

  // Função para solicitar status de pagamento
  const solicitarStatusPagamento = (paymentId) => {
    if (socket && isConnected) {
      socket.emit('check_payment_status', { paymentId });
    }
  };

  const value = {
    socket,
    isConnected,
    solicitarStatusPagamento
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

export default WebSocketContext;
