import { useState, useEffect } from 'react'
import { CreditCard, Calendar, CheckCircle, AlertCircle, Loader2, DollarSign, Shield } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import assinaturaService from '../../services/assinaturaService'
import { useToast } from '../../contexts/ToastContext'
import { useWebSocket } from '../../contexts/WebSocketContext'

const Pagamento = () => {
  const { showSuccess, showError } = useToast()
  const { isConnected } = useWebSocket()
  const [assinatura, setAssinatura] = useState(null)
  const [historicoPagamentos, setHistoricoPagamentos] = useState([])
  const [planos, setPlanos] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingAction, setLoadingAction] = useState(false)
  const [error, setError] = useState(null)

  // Carregar dados da assinatura
  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true)
        
        // Carregar assinatura atual
        const assinaturaResponse = await assinaturaService.getMinhaAssinatura()
        if (assinaturaResponse.sucesso) {
          setAssinatura(assinaturaResponse.dados.assinatura)
        }

        // Carregar histórico de pagamentos
        const historicoResponse = await assinaturaService.getHistoricoPagamentos()
        if (historicoResponse.sucesso) {
          setHistoricoPagamentos(historicoResponse.dados.historico || [])
        }

        // Carregar planos disponíveis
        const planosResponse = await assinaturaService.getPlanos()
        if (planosResponse.sucesso) {
          setPlanos(planosResponse.dados.planos || [])
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
        setError('Erro ao carregar dados da assinatura')
        showError('Erro ao carregar dados da assinatura')
      } finally {
        setLoading(false)
      }
    }

    carregarDados()
  }, [])

  const handleRenovarAssinatura = async (planoId) => {
    try {
      setLoadingAction(true)
      const response = await assinaturaService.renovarAssinatura(planoId)
      
      if (response.sucesso) {
        // Redirecionar para o Mercado Pago
        window.open(response.dados.pagamento.init_point, '_blank')
        showSuccess('Redirecionando para o pagamento...')
      }
    } catch (error) {
      console.error('Erro ao renovar assinatura:', error)
      showError('Erro ao renovar assinatura')
    } finally {
      setLoadingAction(false)
    }
  }

  const handleAssinar = async (planoId) => {
    try {
      setLoadingAction(true)
      const response = await assinaturaService.criarAssinatura(planoId)
      
      if (response.sucesso) {
        // Redirecionar para o Mercado Pago
        window.open(response.dados.pagamento.init_point, '_blank')
        showSuccess('Redirecionando para o pagamento...')
      }
    } catch (error) {
      console.error('Erro ao criar assinatura:', error)
      showError('Erro ao criar assinatura')
    } finally {
      setLoadingAction(false)
    }
  }

  const handleCancelarAssinatura = async () => {
    try {
      setLoadingAction(true)
      const response = await assinaturaService.cancelarAssinatura()
      
      if (response.sucesso) {
        showSuccess('Assinatura cancelada com sucesso')
        // Recarregar dados
        window.location.reload()
      }
    } catch (error) {
      console.error('Erro ao cancelar assinatura:', error)
      showError('Erro ao cancelar assinatura')
    } finally {
      setLoadingAction(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Pagamento
          </h1>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-600">
              {isConnected ? 'Conectado' : 'Desconectado'}
            </span>
          </div>
        </div>
        <p className="text-gray-600">
          Gerencie sua assinatura e histórico de pagamentos
        </p>
      </div>

      {loading ? (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Carregando dados da assinatura...</span>
          </CardContent>
        </Card>
      ) : error ? (
        <Card>
          <CardContent className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
              Erro ao Carregar Dados
            </CardTitle>
            <p className="text-gray-600 mb-6">
              {error}
            </p>
            <Button 
              onClick={() => window.location.reload()}
              className="flex items-center space-x-2"
            >
              <Loader2 className="h-4 w-4" />
              <span>Tentar Novamente</span>
            </Button>
          </CardContent>
        </Card>
      ) : assinatura ? (
        /* Status da Assinatura */
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  Assinatura Atual
                </CardTitle>
                <div className="flex items-center space-x-2">
                  {assinatura.status === 'ativa' ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : assinatura.status === 'pendente' ? (
                    <Loader2 className="h-5 w-5 text-yellow-500 animate-spin" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                  <Badge variant={
                    assinatura.status === 'ativa' ? 'default' : 
                    assinatura.status === 'pendente' ? 'secondary' : 
                    'destructive'
                  }>
                    {assinatura.status === 'ativa' ? 'Ativa' : 
                     assinatura.status === 'pendente' ? 'Pendente' : 
                     'Inativa'}
                  </Badge>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600 flex items-center">
                  {assinatura.valor_pago ? 
                    new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(parseFloat(assinatura.valor_pago)) : 
                    'R$ 0,00'
                  }
                </div>
                <div className="text-gray-600">
                  {assinatura.plano?.duracao_dias ? `por ${assinatura.plano.duracao_dias} dias` : 'Plano'}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {assinatura.plano?.nome || 'Plano'}
              </h3>
              <p className="text-gray-600 mb-4">
                {assinatura.plano?.descricao || 'Descrição do plano'}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Início:</span>
                <span className="font-medium">
                  {new Date(assinatura.data_inicio).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Vencimento:</span>
                <span className="font-medium">
                  {new Date(assinatura.data_fim).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          </div>

            <div className="border-t pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    Próximo vencimento: {new Date(assinatura.data_fim).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="flex space-x-2">
                  {assinatura.status === 'ativa' && (
                    <Button 
                      onClick={() => handleRenovarAssinatura(assinatura.planoId)}
                      disabled={loadingAction}
                      className="flex items-center space-x-2"
                    >
                      {loadingAction ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <CreditCard className="h-4 w-4" />
                      )}
                      <span>Renovar</span>
                    </Button>
                  )}
                  {assinatura.status === 'pendente' && (
                    <Button 
                      variant="outline"
                      onClick={handleCancelarAssinatura}
                      disabled={loadingAction}
                    >
                      {loadingAction ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        'Cancelar'
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Sem Assinatura */
        <Card>
          <CardContent className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
              Nenhuma Assinatura Ativa
            </CardTitle>
            <p className="text-gray-600 mb-6">
              Escolha um plano para começar a usar a plataforma
            </p>
            
            {Array.isArray(planos) && planos.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {planos.map((plano) => (
                  <Card key={plano.id} className="border border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {plano.nome}
                      </CardTitle>
                      <p className="text-gray-600 text-sm">
                        {plano.descricao}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600 mb-4 flex items-center justify-center">
                        {plano.valor ? 
                          new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(parseFloat(plano.valor)) : 
                          'R$ 0,00'
                        }
                      </div>
                      <Button 
                        onClick={() => handleAssinar(plano.id)}
                        disabled={loadingAction}
                        className="w-full"
                      >
                        {loadingAction ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          'Assinar'
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Histórico de Pagamentos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2" />
            Histórico de Pagamentos
          </CardTitle>
        </CardHeader>
        <CardContent>

          <div className="divide-y divide-gray-200">
            {Array.isArray(historicoPagamentos) && historicoPagamentos.map((pagamento) => (
              <div key={pagamento.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <CreditCard className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {pagamento.metodo_pagamento || pagamento.payment_method || 'Mercado Pago'}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {pagamento.createdAt && !isNaN(new Date(pagamento.createdAt).getTime()) 
                          ? new Date(pagamento.createdAt).toLocaleDateString('pt-BR')
                          : pagamento.data_pagamento && !isNaN(new Date(pagamento.data_pagamento).getTime())
                          ? new Date(pagamento.data_pagamento).toLocaleDateString('pt-BR')
                          : 'Data não disponível'
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 flex items-center">
                      {pagamento.valor_pago ? 
                        new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(parseFloat(pagamento.valor_pago)) : 
                        'R$ 0,00'
                      }
                    </p>
                    <Badge variant={
                      pagamento.status === 'ativa' ? 'default' : 
                      pagamento.status === 'pendente' ? 'secondary' : 'destructive'
                    }>
                      {pagamento.status === 'ativa' ? 'Pago' : 
                       pagamento.status === 'pendente' ? 'Pendente' : 'Falhou'}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {(!Array.isArray(historicoPagamentos) || historicoPagamentos.length === 0) && (
            <div className="p-12 text-center">
              <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum pagamento encontrado
              </h3>
              <p className="text-gray-600">
                Seus pagamentos aparecerão aqui após a primeira assinatura
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Pagamento
