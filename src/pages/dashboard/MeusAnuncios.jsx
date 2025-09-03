import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Edit, Trash2, Eye, EyeOff, AlertTriangle } from 'lucide-react'
import { Button } from '../../components/ui/button'
import Dialog from '../../components/ui/dialog'

const MeusAnuncios = () => {
  const navigate = useNavigate()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState('') // 'desativar' ou 'excluir'
  const [anuncioSelecionado, setAnuncioSelecionado] = useState(null)
  const [anuncios] = useState([
    {
      id: 1,
      titulo: 'Pão Francês Artesanal',
      categoria: 'Alimentação',
      status: 'ativo',
      visualizacoes: 245,
      dataCriacao: '2024-01-15',
      imagem: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      titulo: 'Bolo de Chocolate Caseiro',
      categoria: 'Alimentação',
      status: 'ativo',
      visualizacoes: 189,
      dataCriacao: '2024-01-10',
      imagem: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      titulo: 'Coxinha de Frango',
      categoria: 'Alimentação',
      status: 'inativo',
      visualizacoes: 67,
      dataCriacao: '2024-01-05',
      imagem: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop'
    }
  ])

  const planoAtual = {
    nome: 'Plano Anual',
    limiteAnuncios: 10,
    anunciosUsados: 3
  }

  const handleEditar = (id) => {
    navigate(`/dashboard/criar-anuncio?edit=${id}`)
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

  const confirmarAcao = () => {
    if (dialogType === 'excluir') {
      console.log('Excluir anúncio:', anuncioSelecionado.id)
      // Aqui você implementaria a lógica de exclusão
    } else if (dialogType === 'desativar') {
      console.log('Alterar status do anúncio:', anuncioSelecionado.id)
      // Aqui você implementaria a lógica de desativação
    }
    setDialogOpen(false)
    setAnuncioSelecionado(null)
    setDialogType('')
  }

  return (
    <div className="max-w-7xl mx-auto">
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
            onClick={() => navigate('/dashboard/criar-anuncio')}
          >
            <Plus className="h-4 w-4" />
            <span>Adicionar Anúncio</span>
          </Button>
        </div>
      </div>

      {/* Resumo do Plano */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-blue-900">
              {planoAtual.nome}
            </h3>
            <p className="text-blue-700">
              {planoAtual.anunciosUsados} de {planoAtual.limiteAnuncios} anúncios utilizados
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-900">
              {planoAtual.anunciosUsados}/{planoAtual.limiteAnuncios}
            </div>
            <div className="w-32 bg-blue-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${(planoAtual.anunciosUsados / planoAtual.limiteAnuncios) * 100}%` }}
              ></div>
            </div>
          </div>
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
          {anuncios.map((anuncio) => (
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
                        <span>Criado em: {new Date(anuncio.dataCriacao).toLocaleDateString('pt-BR')}</span>
                        <span>{anuncio.visualizacoes} visualizações</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        anuncio.status === 'ativo' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {anuncio.status === 'ativo' ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleStatus(anuncio)}
                    className="flex items-center space-x-1"
                  >
                    {anuncio.status === 'ativo' ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span>{anuncio.status === 'ativo' ? 'Desativar' : 'Ativar'}</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditar(anuncio.id)}
                    className="flex items-center space-x-1"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Editar</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExcluir(anuncio)}
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
              : `Tem certeza que deseja ${anuncioSelecionado?.status === 'ativo' ? 'desativar' : 'ativar'} este anúncio?`
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
