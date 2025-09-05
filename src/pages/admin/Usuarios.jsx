import { useState, useEffect } from 'react'
import { Search, Filter, Edit, Ban, CheckCircle, XCircle, Eye, Loader2, Users, Mail, Calendar, MapPin } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import adminService from '../../services/adminService'
import { useToast } from '../../contexts/ToastContext'

const Usuarios = () => {
  const { showSuccess, showError } = useToast()
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [planoFilter, setPlanoFilter] = useState('')
  const [paginacao, setPaginacao] = useState({
    pagina: 1,
    limite: 20,
    total: 0,
    totalPaginas: 0
  })

  const carregarUsuarios = async (pagina = 1) => {
    try {
      setLoading(true)
      const params = {
        search: searchTerm,
        ativo: statusFilter === 'todos' ? '' : statusFilter,
        plano: planoFilter,
        pagina: pagina,
        limite: paginacao.limite
      }
      const response = await adminService.getUsuarios(params)
      if (response.sucesso) {
        setUsuarios(response.dados.usuarios || [])
        setPaginacao({
          pagina: response.dados.paginacao.pagina,
          limite: response.dados.paginacao.limite,
          total: response.dados.paginacao.total,
          totalPaginas: response.dados.paginacao.totalPaginas
        })
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error)
      showError('Erro ao carregar usuários')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarUsuarios()
  }, [])

  const handleDeleteUser = async (usuario) => {
    if (window.confirm(`Tem certeza que deseja excluir o usuário ${usuario.nome}? Esta ação não pode ser desfeita.`)) {
      try {
        const response = await adminService.excluirUsuario(usuario.id)
        if (response.sucesso) {
          showSuccess('Usuário excluído com sucesso')
          carregarUsuarios()
        }
      } catch (error) {
        console.error('Erro ao excluir usuário:', error)
        showError('Erro ao excluir usuário')
      }
    }
  }

  const handleToggleStatus = async (usuario) => {
    try {
      const novoStatus = !usuario.ativo
      const response = await adminService.atualizarUsuario(usuario.id, { ativo: novoStatus })
      if (response.sucesso) {
        showSuccess(`Usuário ${novoStatus ? 'ativado' : 'desativado'} com sucesso`)
        // Recarregar lista
        carregarUsuarios()
      }
    } catch (error) {
      console.error('Erro ao alterar status:', error)
      showError('Erro ao alterar status do usuário')
    }
  }

  const handleViewProfile = (id) => {
    console.log('Ver perfil do usuário:', id)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando usuários...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Gerenciar Usuários
        </h1>
        <p className="text-gray-600">
          Visualize e gerencie todos os usuários da plataforma
        </p>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Buscar por nome ou e-mail..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Button 
              onClick={() => carregarUsuarios(1)}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Todos os status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os status</SelectItem>
                    <SelectItem value="true">Ativo</SelectItem>
                    <SelectItem value="false">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Usuários */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Lista de Usuários
          </CardTitle>
        </CardHeader>
        <CardContent>
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
              {usuarios.map((usuario) => (
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
                    <Badge variant={usuario.ativo ? 'default' : 'secondary'}>
                      {usuario.ativo ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {usuario.anuncios}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(usuario.createdAt).toLocaleDateString('pt-BR')}
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
                        onClick={() => handleDeleteUser(usuario)}
                        className="flex items-center space-x-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <XCircle className="h-3 w-3" />
                        <span>Excluir</span>
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleStatus(usuario)}
                        className={`flex items-center space-x-1 ${
                          usuario.ativo 
                            ? 'text-red-600 hover:text-red-700 hover:bg-red-50' 
                            : 'text-green-600 hover:text-green-700 hover:bg-green-50'
                        }`}
                      >
                        {usuario.ativo ? (
                          <>
                            <Ban className="h-3 w-3" />
                            <span>Desativar</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-3 w-3" />
                            <span>Ativar</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          {usuarios.length === 0 && (
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
        </CardContent>
      </Card>

      {/* Paginação */}
      <Card>
        <CardContent className="flex items-center justify-between pt-6">
          <div className="text-sm text-gray-700">
            Mostrando {usuarios.length} de {paginacao.total} usuários
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              disabled={paginacao.pagina === 1}
              onClick={() => carregarUsuarios(paginacao.pagina - 1)}
            >
              Anterior
            </Button>
            
            {/* Botões de página */}
            {Array.from({ length: Math.min(5, paginacao.totalPaginas) }, (_, i) => {
              const pagina = i + 1
              return (
                <Button
                  key={pagina}
                  variant={pagina === paginacao.pagina ? "default" : "outline"}
                  className={pagina === paginacao.pagina ? "bg-orange-600 hover:bg-orange-700" : ""}
                  onClick={() => carregarUsuarios(pagina)}
                >
                  {pagina}
                </Button>
              )
            })}
            
            <Button 
              variant="outline"
              disabled={paginacao.pagina === paginacao.totalPaginas}
              onClick={() => carregarUsuarios(paginacao.pagina + 1)}
            >
              Próximo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Usuarios
