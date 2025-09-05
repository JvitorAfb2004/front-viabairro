import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CheckCircle, XCircle, Loader2, Mail, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import authService from '../services/authService'

const VerificarEmail = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const verificarEmail = async () => {
      if (!token) {
        setError('Token de verificação não fornecido')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const response = await authService.verifyEmail(token)
        
        if (response.sucesso) {
          setSuccess(true)
        } else {
          setError(response.mensagem || 'Erro ao verificar email')
        }
      } catch (error) {
        console.error('Erro ao verificar email:', error)
        if (error.message.includes('Token inválido') || error.message.includes('expirado')) {
          setError('Token inválido ou expirado. Solicite um novo email de verificação.')
        } else {
          setError('Erro ao verificar email. Tente novamente mais tarde.')
        }
      } finally {
        setLoading(false)
      }
    }

    verificarEmail()
  }, [token])

  const handleGoToDashboard = () => {
    navigate('/dashboard')
  }

  const handleGoToLogin = () => {
    navigate('/login')
  }

  const handleGoToHome = () => {
    navigate('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-orange-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Verificando Email...
            </h2>
            <p className="text-gray-600 text-center">
              Aguarde enquanto verificamos seu email
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            {success ? (
              <CheckCircle className="h-8 w-8 text-green-500" />
            ) : (
              <XCircle className="h-8 w-8 text-red-500" />
            )}
            <span>
              {success ? 'Email Verificado!' : 'Erro na Verificação'}
            </span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {success ? (
            <>
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Parabéns!
                  </h3>
                  <p className="text-gray-600">
                    Seu email foi verificado com sucesso. Agora você pode criar anúncios e aproveitar todos os recursos da plataforma.
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-green-800">
                        O que você pode fazer agora:
                      </p>
                      <ul className="text-sm text-green-700 mt-2 space-y-1">
                        <li>• Criar e gerenciar seus anúncios</li>
                        <li>• Personalizar seu perfil público</li>
                        <li>• Acessar recursos premium</li>
                        <li>• Conectar-se com outros usuários</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleGoToDashboard}
                  className="w-full"
                >
                  Ir para Dashboard
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleGoToHome}
                  className="w-full"
                >
                  Voltar ao Início
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="h-8 w-8 text-red-500" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Verificação Falhou
                  </h3>
                  <p className="text-gray-600">
                    {error || 'Não foi possível verificar seu email. O token pode ter expirado ou ser inválido.'}
                  </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-red-800">
                        Possíveis causas:
                      </p>
                      <ul className="text-sm text-red-700 mt-2 space-y-1">
                        <li>• Link de verificação expirado (24h)</li>
                        <li>• Link já foi usado anteriormente</li>
                        <li>• Token inválido ou corrompido</li>
                        <li>• Problema temporário no servidor</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => navigate('/login')}
                  className="w-full"
                >
                  Fazer Login
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleGoToHome}
                  className="w-full"
                >
                  Voltar ao Início
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default VerificarEmail
