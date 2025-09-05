import { useState } from 'react'
import { X, Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'
import authService from '../services/authService'

const VerificationModal = ({ isOpen, onClose }) => {
  const { user, refreshUser } = useAuth()
  const { showSuccess, showError } = useToast()
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleSendVerification = async () => {
    try {
      setLoading(true)
      const response = await authService.enviarEmailVerificacao()
      
      if (response.sucesso) {
        setEmailSent(true)
        showSuccess('Email de verificação enviado! Verifique sua caixa de entrada e spam.')
      } else {
        showError(response.mensagem || 'Erro ao enviar email de verificação')
      }
    } catch (error) {
      console.error('Erro ao enviar email de verificação:', error)
      if (error.message.includes('já está verificado')) {
        showError('Seu email já está verificado!')
        onClose()
      } else {
        showError('Erro ao enviar email de verificação. Tente novamente.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setEmailSent(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-orange-500" />
            <span>Verificação de Email</span>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {!emailSent ? (
            <>
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-700">
                    Seu email <strong>{user?.email}</strong> ainda não foi verificado.
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Para criar anúncios, você precisa verificar seu email primeiro.
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    <strong>Por que verificar?</strong> Isso garante que você receba notificações importantes sobre seus anúncios e melhora a segurança da sua conta.
                  </p>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <p className="text-sm text-orange-800">
                  <strong>Como funciona:</strong>
                </p>
                <ol className="text-sm text-orange-700 mt-2 space-y-1">
                  <li>1. Clique em "Enviar Email de Verificação"</li>
                  <li>2. Verifique sua caixa de entrada</li>
                  <li>3. Clique no link do email</li>
                  <li>4. Seu email será verificado automaticamente</li>
                </ol>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={handleSendVerification}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Enviar Email de Verificação
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleClose}
                  disabled={loading}
                >
                  Cancelar
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-700">
                    Email de verificação enviado com sucesso!
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Verifique sua caixa de entrada e spam. O link expira em 24 horas.
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    <strong>Dica:</strong> Se não encontrar o email, verifique também a pasta de spam/lixo eletrônico.
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    <strong>Importante:</strong> Após verificar, você poderá criar anúncios normalmente e receber notificações importantes sobre seus anúncios e interações com clientes.
                  </p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-800">
                  <strong>Próximos passos:</strong>
                </p>
                <ol className="text-sm text-green-700 mt-2 space-y-1">
                  <li>1. Abra seu email</li>
                  <li>2. Clique no link de verificação</li>
                  <li>3. Volte aqui e recarregue a página</li>
                  <li>4. Agora você pode criar anúncios!</li>
                </ol>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={async () => {
                    try {
                      await refreshUser()
                      handleClose()
                    } catch (error) {
                      console.error('Erro ao atualizar dados:', error)
                    }
                  }}
                  className="flex-1"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Já Verifiquei
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSendVerification}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Reenviar'
                  )}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default VerificationModal
