import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Edit, Trash2, Eye, EyeOff, AlertTriangle, Package, Calendar, DollarSign, Lock, ExternalLink } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import Dialog from '../../components/ui/dialog'
import itemService from '../../services/itemService'
import { useToast } from '../../contexts/ToastContext'
import { useSubscription } from '../../hooks/useSubscription'

const MeusAnuncios = () => {
  const navigate = useNavigate()
  const { showSuccess, showError } = useToast()
  const { canCreateAds, loading: loadingSubscription } = useSubscription()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState('') // 'desativar' ou 'excluir'
  const [anuncioSelecionado, setAnuncioSelecionado] = useState(null)
  const [anuncios, setAnuncios] = useState([])
  const [loading, setLoading] = useState(true)

  // Carregar anúncios do usuário
  useEffect(() => {
    const carregarAnuncios = async () => {
      try {
        setLoading(true)
        const response = await itemService.getMeusItens()
        console.log('Resposta da API:', response) // Debug
        if (response && response.sucesso) {
          // O backend retorna dados.itens, não dados diretamente
          const dadosAnuncios = Array.isArray(response.dados?.itens) ? response.dados.itens : []
          setAnuncios(dadosAnuncios)
        } else {
          setAnuncios([])
        }
      } catch (error) {
        console.error('Erro ao carregar anúncios:', error)
        showError('Erro ao carregar anúncios')
        setAnuncios([]) // Garantir que seja um array mesmo em caso de erro
      } finally {
        setLoading(false)
      }
    }

    carregarAnuncios()
  }, [])

  const handleEditar = (id) => {
    navigate(`/dashboard/criar-anuncio?edit=${id}`)
  }

  const handleVerAnuncio = (anuncio) => {
    navigate(`/anuncio/${anuncio.slug}`)
  }

  const handleExcluir = (anuncio) => {
    setAnuncioSelecionado(anuncio)
    setDialogType('excluir')
    setDialogOpen(true)
  }

  const handleToggleStatus = (anuncio) => {
    setAnuncioSelecionado(anuncio)
    setDialogType('desativar')
    setDialogOpen(true)
  }

  const confirmarAcao = async () => {
    try {
      if (dialogType === 'excluir') {
        await itemService.deletarItem(anuncioSelecionado.id)
        setAnuncios(prev => prev.filter(anuncio => anuncio.id !== anuncioSelecionado.id))
        showSuccess('Anúncio excluído com sucesso!')
      } else if (dialogType === 'desativar') {
        const novoStatus = !anuncioSelecionado.ativo
        await itemService.atualizarItem(anuncioSelecionado.id, { ativo: novoStatus })
        setAnuncios(prev => prev.map(anuncio => 
          anuncio.id === anuncioSelecionado.id 
            ? { ...anuncio, ativo: novoStatus }
            : anuncio
        ))
        showSuccess(`Anúncio ${novoStatus ? 'ativado' : 'desativado'} com sucesso!`)
      }
    } catch (error) {
      showError(error.message || 'Erro ao executar ação')
    } finally {
      setDialogOpen(false)
      setAnuncioSelecionado(null)
      setDialogType('')
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-[#f59820] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando anúncios...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Meus Anúncios
            </h1>
            <p className="text-gray-600">
              Gerencie seus produtos e serviços
            </p>
          </div>
          <Button 
            className="flex items-center space-x-2"
            onClick={() => {
              if (canCreateAds) {
                navigate('/dashboard/criar-anuncio')
              } else {
                navigate('/dashboard/pagamento')
              }
            }}
            variant={canCreateAds ? "default" : "outline"}
          >
            {canCreateAds ? (
              <>
                <Plus className="h-4 w-4" />
                <span>Adicionar Anúncio</span>
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                <span>Assinar para Criar Anúncios</span>
              </>
            )}
          </Button>
        </div>
      </div>


      {/* Lista de Anúncios */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Seus Anúncios
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {Array.isArray(anuncios) && anuncios.map((anuncio) => (
            <div key={anuncio.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center space-x-6">
                <img
                  src={anuncio.imagem}
                  alt={anuncio.titulo}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {anuncio.titulo}
                      </h3>
                      <p className="text-gray-600 mb-2">{anuncio.categoria}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Criado em: {new Date(anuncio.createdAt).toLocaleDateString('pt-BR')}</span>
                        <span>{anuncio.visualizacoes} visualizações</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        anuncio.ativo === true 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {anuncio.ativo === true ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Botões de ação - responsivos */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2">
                  {/* Botão Ver Anúncio - sempre visível */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVerAnuncio(anuncio)}
                    className="flex items-center justify-center space-x-1 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 border-blue-200"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span className="hidden sm:inline">Ver Anúncio</span>
                    <span className="sm:hidden">Ver</span>
                  </Button>
                  
                  {/* Botões em linha no desktop, empilhados no mobile */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleStatus(anuncio)}
                      className="flex items-center justify-center space-x-1"
                    >
                      {anuncio.ativo === true ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="hidden sm:inline">{anuncio.ativo === true ? 'Desativar' : 'Ativar'}</span>
                      <span className="sm:hidden">{anuncio.ativo === true ? 'Desativar' : 'Ativar'}</span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditar(anuncio.id)}
                      className="flex items-center justify-center space-x-1"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="hidden sm:inline">Editar</span>
                      <span className="sm:hidden">Editar</span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleExcluir(anuncio)}
                      className="flex items-center justify-center space-x-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="hidden sm:inline">Excluir</span>
                      <span className="sm:hidden">Excluir</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {anuncios.length === 0 && (
          <div className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Plus className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum anúncio criado
            </h3>
            <p className="text-gray-600 mb-4">
              Comece criando seu primeiro anúncio para aparecer na plataforma
            </p>
            <Button onClick={() => navigate('/dashboard/criar-anuncio')}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Primeiro Anúncio
            </Button>
          </div>
        )}
      </div>

      {/* Dialog de Confirmação */}
      <Dialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={dialogType === 'excluir' ? 'Excluir Anúncio' : 'Alterar Status'}
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">
                {dialogType === 'excluir' ? 'Excluir anúncio' : 'Alterar status do anúncio'}
              </p>
              <p className="text-sm text-gray-600">
                {anuncioSelecionado?.titulo}
              </p>
            </div>
          </div>
          
          <p className="text-gray-600">
            {dialogType === 'excluir' 
              ? 'Tem certeza que deseja excluir este anúncio? Esta ação não pode ser desfeita.'
              : `Tem certeza que deseja ${anuncioSelecionado?.ativo === true ? 'desativar' : 'ativar'} este anúncio?`
            }
          </p>
          
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className={dialogType === 'excluir' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-orange-600 hover:bg-orange-700 text-white'}
              onClick={confirmarAcao}
            >
              {dialogType === 'excluir' ? 'Excluir' : 'Confirmar'}
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default MeusAnuncios
