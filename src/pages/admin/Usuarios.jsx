import { useState } from 'react'
import { Search, Filter, Edit, Ban, CheckCircle, XCircle, Eye } from 'lucide-react'
import { Button } from '../../components/ui/button'

const Usuarios = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const usuarios = [
    {
      id: 1,
      nome: 'João Vitor',
      email: 'joao@exemplo.com',
      plano: 'Plano Anual',
      status: 'ativo',
      dataCadastro: '2024-01-15',
      ultimoAcesso: '2024-01-20',
      anuncios: 3,
      cidade: 'São Paulo, SP'
    },
    {
      id: 2,
      nome: 'Maria Silva',
      email: 'maria@exemplo.com',
      plano: 'Plano Mensal',
      status: 'ativo',
      dataCadastro: '2024-01-10',
      ultimoAcesso: '2024-01-19',
      anuncios: 1,
      cidade: 'Rio de Janeiro, RJ'
    },
    {
      id: 3,
      nome: 'Pedro Costa',
      email: 'pedro@exemplo.com',
      plano: 'Plano Anual',
      status: 'banido',
      dataCadastro: '2024-01-05',
      ultimoAcesso: '2024-01-18',
      anuncios: 0,
      cidade: 'Belo Horizonte, MG'
    }
  ]

  const handleEditUser = (id) => {
    console.log('Editar usuário:', id)
  }

  const handleBanUser = (id) => {
    console.log('Banir usuário:', id)
  }

  const handleUnbanUser = (id) => {
    console.log('Desbanir usuário:', id)
  }

  const handleViewProfile = (id) => {
    console.log('Ver perfil do usuário:', id)
  }

  const filteredUsuarios = usuarios.filter(usuario => {
    const matchesSearch = usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === '' || usuario.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Gerenciar Usuários
        </h1>
        <p className="text-gray-600">
          Visualize e gerencie todos os usuários da plataforma
        </p>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar por nome ou e-mail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todos os status</option>
                <option value="ativo">Ativo</option>
                <option value="banido">Banido</option>
                <option value="inativo">Inativo</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de Usuários */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plano
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Anúncios
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cadastro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsuarios.map((usuario) => (
                <tr key={usuario.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {usuario.nome}
                      </div>
                      <div className="text-sm text-gray-500">
                        {usuario.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {usuario.cidade}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {usuario.plano}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      usuario.status === 'ativo' 
                        ? 'bg-green-100 text-green-800'
                        : usuario.status === 'banido'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {usuario.status === 'ativo' ? 'Ativo' : 
                       usuario.status === 'banido' ? 'Banido' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {usuario.anuncios}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(usuario.dataCadastro).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewProfile(usuario.id)}
                        className="flex items-center space-x-1"
                      >
                        <Eye className="h-3 w-3" />
                        <span>Ver</span>
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditUser(usuario.id)}
                        className="flex items-center space-x-1"
                      >
                        <Edit className="h-3 w-3" />
                        <span>Editar</span>
                      </Button>
                      
                      {usuario.status === 'ativo' ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleBanUser(usuario.id)}
                          className="flex items-center space-x-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Ban className="h-3 w-3" />
                          <span>Banir</span>
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUnbanUser(usuario.id)}
                          className="flex items-center space-x-1 text-green-600 hover:text-green-700 hover:bg-green-50"
                        >
                          <CheckCircle className="h-3 w-3" />
                          <span>Desbanir</span>
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsuarios.length === 0 && (
          <div className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum usuário encontrado
            </h3>
            <p className="text-gray-600">
              Tente ajustar os filtros de busca
            </p>
          </div>
        )}
      </div>

      {/* Paginação */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Mostrando {filteredUsuarios.length} de {usuarios.length} usuários
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" disabled>
            Anterior
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">1</Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline">
            Próximo
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Usuarios
