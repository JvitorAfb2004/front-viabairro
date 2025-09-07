import { useState, useEffect } from 'react'
import { Search, Eye, Trash2, AlertTriangle, Loader2, Package, User, Calendar, MapPin, X, Check } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import Dialog from '../../components/ui/dialog'
import adminService from '../../services/adminService'
import { useToast } from '../../contexts/ToastContext'

const Anuncios = () => {
  const { showSuccess, showError } = useToast()
  const [anuncios, setAnuncios] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [anuncioSelecionado, setAnuncioSelecionado] = useState(null)
  const [paginacao, setPaginacao] = useState({
    pagina: 1,
    limite: 20,
    total: 0,
    totalPaginas: 0
  })

  const carregarAnuncios = async (pagina = 1) => {
    try {
      setLoading(true)
      const params = {
        search: searchTerm,
        status: statusFilter,
        pagina: pagina,
        limite: paginacao.limite
      }
      const response = await adminService.getAnuncios(params)
      if (response.sucesso) {
        setAnuncios(response.dados.anuncios || [])
        setPaginacao({
          pagina: response.dados.paginacao.pagina,
          limite: response.dados.paginacao.limite,
          total: response.dados.paginacao.total,
          totalPaginas: response.dados.paginacao.totalPaginas
        })
      }
    } catch (error) {
      console.error('Erro ao carregar anúncios:', error)
      showError('Erro ao carregar anúncios')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarAnuncios()
  }, [])


  const handleAtivar = async (anuncio) => {
    try {
      const response = await adminService.ativarAnuncio(anuncio.id, !anuncio.ativo)
      if (response.sucesso) {
        showSuccess(`Anúncio ${anuncio.ativo ? 'desativado' : 'ativado'} com sucesso!`)
        // Recarregar lista
        const params = { search: searchTerm, status: statusFilter }
        const responseLista = await adminService.getAnuncios(params)
        if (responseLista.sucesso) {
          setAnuncios(responseLista.dados.anuncios || [])
        }
      }
    } catch (error) {
      console.error('Erro ao ativar/desativar anúncio:', error)
      showError('Erro ao ativar/desativar anúncio')
    }
  }

  const handleDelete = async (anuncio) => {
    try {
      const response = await adminService.excluirAnuncio(anuncio.id)
      if (response.sucesso) {
        showSuccess('Anúncio excluído com sucesso!')
        // Recarregar lista mantendo a página atual
        carregarAnuncios(paginacao.pagina)
      }
    } catch (error) {
      console.error('Erro ao excluir anúncio:', error)
      showError('Erro ao excluir anúncio')
    }
  }

  const handleView = (anuncio) => {
    // Abrir anúncio em nova página
    const slug = anuncio.slug || anuncio.id
    window.open(`/anuncio/${slug}`, '_blank')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando anúncios...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Gerenciar Anúncios
        </h1>
        <p className="text-gray-600">
          Modere e gerencie todos os anúncios da plataforma
        </p>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar por título ou usuário..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <Button 
            onClick={() => carregarAnuncios(1)}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
          
          <div>
            <Select value={statusFilter || "all"} onValueChange={(value) => setStatusFilter(value === "all" ? "" : value)}>
              <SelectTrigger>
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="rejeitado">Rejeitado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Lista de Anúncios */}
      <div className="space-y-4">
        {anuncios.map((anuncio) => (
          <div key={anuncio.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <img
                src={anuncio.imagem}
                alt={anuncio.titulo}
                className="w-full lg:w-48 h-32 object-cover rounded-lg"
              />
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {anuncio.titulo}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    anuncio.ativo 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {anuncio.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Usuário:</span> {anuncio.usuario?.nome || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Categoria:</span> {anuncio.categoria}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Criado em:</span> {new Date(anuncio.createdAt || anuncio.dataCriacao).toLocaleDateString('pt-BR')}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Visualizações:</span> {anuncio.visualizacoes || 0}
                    </p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">
                </p>
              </div>

              <div className="flex flex-col space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleView(anuncio)}
                  className="flex items-center space-x-1"
                >
                  <Eye className="h-4 w-4" />
                  <span>Ver</span>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAtivar(anuncio)}
                  className={`flex items-center space-x-1 ${
                    anuncio.ativo 
                      ? 'text-orange-600 hover:text-orange-700 hover:bg-orange-50' 
                      : 'text-green-600 hover:text-green-700 hover:bg-green-50'
                  }`}
                >
                  {anuncio.ativo ? (
                    <>
                      <X className="h-4 w-4" />
                      <span>Desativar</span>
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Ativar</span>
                    </>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(anuncio)}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Excluir</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {anuncios.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum anúncio encontrado
          </h3>
          <p className="text-gray-600">
            Tente ajustar os filtros de busca
          </p>
        </div>
      )}

      {/* Paginação */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Mostrando {anuncios.length} de {paginacao.total} anúncios
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            disabled={paginacao.pagina === 1}
            onClick={() => carregarAnuncios(paginacao.pagina - 1)}
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
                onClick={() => carregarAnuncios(pagina)}
              >
                {pagina}
              </Button>
            )
          })}
          
          <Button 
            variant="outline"
            disabled={paginacao.pagina === paginacao.totalPaginas}
            onClick={() => carregarAnuncios(paginacao.pagina + 1)}
          >
            Próximo
          </Button>
        </div>
      </div>

      {/* Dialog de Confirmação */}
      <Dialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="Excluir Anúncio"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">
                Excluir anúncio
              </p>
              <p className="text-sm text-gray-600">
                {anuncioSelecionado?.titulo}
              </p>
            </div>
          </div>
          
          <p className="text-gray-600">
            Tem certeza que deseja excluir este anúncio? Esta ação não pode ser desfeita.
          </p>
          
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => {
                handleDelete(anuncioSelecionado)
                setDialogOpen(false)
              }}
            >
              Excluir
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default Anuncios

