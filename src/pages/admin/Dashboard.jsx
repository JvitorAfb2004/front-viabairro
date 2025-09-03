import { Users, Package, CreditCard, TrendingUp, Eye, DollarSign } from 'lucide-react'

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total de Usuários',
      value: '1,234',
      change: '+12%',
      changeType: 'positive',
      icon: Users
    },
    {
      title: 'Assinantes Ativos',
      value: '856',
      change: '+8%',
      changeType: 'positive',
      icon: CreditCard
    },
    {
      title: 'Anúncios Ativos',
      value: '2,847',
      change: '+15%',
      changeType: 'positive',
      icon: Package
    },
    {
      title: 'Receita Mensal',
      value: 'R$ 45.230',
      change: '+23%',
      changeType: 'positive',
      icon: DollarSign
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'user',
      message: 'Novo usuário cadastrado: Maria Silva',
      time: '2 horas atrás'
    },
    {
      id: 2,
      type: 'payment',
      message: 'Pagamento aprovado: João Santos - R$ 99,90',
      time: '4 horas atrás'
    },
    {
      id: 3,
      type: 'ad',
      message: 'Novo anúncio criado: Barbearia Moderna',
      time: '6 horas atrás'
    },
    {
      id: 4,
      type: 'user',
      message: 'Usuário banido: Pedro Costa',
      time: '1 dia atrás'
    }
  ]

  const topBusinesses = [
    {
      name: 'Padaria do João',
      views: 1247,
      category: 'Alimentação',
      location: 'São Paulo, SP'
    },
    {
      name: 'Barbearia Moderna',
      views: 892,
      category: 'Beleza',
      location: 'Rio de Janeiro, RJ'
    },
    {
      name: 'Academia Fit',
      views: 756,
      category: 'Saúde',
      location: 'Belo Horizonte, MG'
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
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
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
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">
                  vs mês anterior
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Atividades Recentes */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Atividades Recentes
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'user' ? 'bg-blue-500' :
                    activity.type === 'payment' ? 'bg-green-500' :
                    'bg-yellow-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Negócios Mais Visualizados */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Negócios Mais Visualizados
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topBusinesses.map((business, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {business.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {business.category} • {business.location}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">
                      {business.views}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Resumo Financeiro */}
      <div className="mt-8 bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Resumo Financeiro
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                R$ 45.230
              </p>
              <p className="text-sm text-gray-600">
                Receita do Mês
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                R$ 12.450
              </p>
              <p className="text-sm text-gray-600">
                Receita da Semana
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                R$ 1.890
              </p>
              <p className="text-sm text-gray-600">
                Receita de Hoje
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
