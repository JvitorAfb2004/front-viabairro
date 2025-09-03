import { CreditCard, Calendar, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '../../components/ui/button'

const Pagamento = () => {
  const assinatura = {
    plano: 'Plano Anual',
    descricao: 'Acesso completo à plataforma com até 10 anúncios',
    valor: 'R$ 99,90',
    periodo: 'Anual',
    dataInicio: '2024-01-15',
    dataFim: '2025-01-15',
    status: 'ativa',
    proximoVencimento: '2025-01-15'
  }

  const historicoPagamentos = [
    {
      id: 1,
      data: '2024-01-15',
      valor: 'R$ 99,90',
      status: 'pago',
      metodo: 'Cartão de Crédito'
    },
    {
      id: 2,
      data: '2023-01-15',
      valor: 'R$ 99,90',
      status: 'pago',
      metodo: 'Cartão de Crédito'
    }
  ]

  const handleRenovarAssinatura = () => {
    console.log('Redirecionar para checkout do Mercado Pago')
  }

  const handleAssinar = () => {
    console.log('Redirecionar para checkout do Mercado Pago')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Pagamento
        </h1>
        <p className="text-gray-600">
          Gerencie sua assinatura e histórico de pagamentos
        </p>
      </div>

      {/* Status da Assinatura */}
      <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Assinatura Atual
            </h2>
            <div className="flex items-center space-x-2">
              {assinatura.status === 'ativa' ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
              <span className={`font-medium ${
                assinatura.status === 'ativa' ? 'text-green-700' : 'text-red-700'
              }`}>
                {assinatura.status === 'ativa' ? 'Ativa' : 'Inativa'}
              </span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">
              {assinatura.valor}
            </div>
            <div className="text-gray-600">
              por {assinatura.periodo.toLowerCase()}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {assinatura.plano}
            </h3>
            <p className="text-gray-600 mb-4">
              {assinatura.descricao}
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Início:</span>
              <span className="font-medium">
                {new Date(assinatura.dataInicio).toLocaleDateString('pt-BR')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Vencimento:</span>
              <span className="font-medium">
                {new Date(assinatura.dataFim).toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                Próximo vencimento: {new Date(assinatura.proximoVencimento).toLocaleDateString('pt-BR')}
              </p>
            </div>
            <Button 
              onClick={assinatura.status === 'ativa' ? handleRenovarAssinatura : handleAssinar}
              className="flex items-center space-x-2"
            >
              <CreditCard className="h-4 w-4" />
              <span>
                {assinatura.status === 'ativa' ? 'Renovar Assinatura' : 'Assinar'}
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Histórico de Pagamentos */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Histórico de Pagamentos
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {historicoPagamentos.map((pagamento) => (
            <div key={pagamento.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <CreditCard className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {pagamento.metodo}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(pagamento.data).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {pagamento.valor}
                  </p>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600 capitalize">
                      {pagamento.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {historicoPagamentos.length === 0 && (
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
      </div>
    </div>
  )
}

export default Pagamento
