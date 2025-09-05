import { useState, useEffect } from 'react'
import { Users, Package, CreditCard, TrendingUp, DollarSign, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import adminService from '../../services/adminService'
import { useToast } from '../../contexts/ToastContext'

const AdminDashboard = () => {
  const { showError } = useToast()
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const carregarDashboard = async () => {
      try {
        setLoading(true)
        const response = await adminService.getDashboard()
        if (response.sucesso) {
          setDashboardData(response.dados)
        }
      } catch (error) {
        console.error('Erro ao carregar dashboard:', error)
        showError('Erro ao carregar dados do dashboard')
      } finally {
        setLoading(false)
      }
    }

    carregarDashboard()
  }, [showError])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  const stats = [
    {
      title: 'Total de Usuários',
      value: dashboardData?.estatisticas?.totalUsuarios || '0',
      change: '+0%',
      changeType: 'positive',
      icon: Users
    },
    {
      title: 'Assinantes Ativos',
      value: dashboardData?.estatisticas?.assinaturasAtivas || '0',
      change: '+0%',
      changeType: 'positive',
      icon: CreditCard
    },
    {
      title: 'Anúncios Ativos',
      value: dashboardData?.estatisticas?.anunciosAtivos || '0',
      change: '+0%',
      changeType: 'positive',
      icon: Package
    },
    {
      title: 'Receita Total',
      value: `R$ ${(dashboardData?.estatisticas?.receitaTotal || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      change: '+0%',
      changeType: 'positive',
      icon: DollarSign
    }
  ]


  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard Administrativo
        </h1>
        <p className="text-gray-600">
          Visão geral do sistema e métricas importantes
        </p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
            
              </CardContent>
            </Card>
          )
        })}
      </div>


      {/* Resumo Financeiro */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2" />
            Resumo Financeiro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                R$ {dashboardData?.estatisticas?.receitaTotal?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00'}
              </p>
              <p className="text-sm text-gray-600">
                Receita Total
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {dashboardData?.estatisticas?.assinaturasAtivas || '0'}
              </p>
              <p className="text-sm text-gray-600">
                Assinaturas Ativas
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {dashboardData?.estatisticas?.totalAssinaturas || '0'}
              </p>
              <p className="text-sm text-gray-600">
                Total de Assinaturas
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminDashboard
