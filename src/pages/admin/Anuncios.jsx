import { useState } from 'react'
import { Search, Eye, Edit, Trash2, AlertTriangle } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import Dialog from '../../components/ui/dialog'

const Anuncios = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [anuncioSelecionado, setAnuncioSelecionado] = useState(null)

  const anuncios = [
    {
      id: 1,
      titulo: 'Pão Francês Artesanal',
      usuario: 'João Vitor',
      categoria: 'Alimentação',
      status: 'aprovado',
      dataCriacao: '2024-01-15',
      visualizacoes: 245,
      cidade: 'São Paulo, SP',
      imagem: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      titulo: 'Barbearia Moderna',
      usuario: 'Maria Silva',
      categoria: 'Beleza',
      status: 'pendente',
      dataCriacao: '2024-01-18',
      visualizacoes: 0,
      cidade: 'Rio de Janeiro, RJ',
      imagem: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      titulo: 'Academia Fit',
      usuario: 'Pedro Costa',
      categoria: 'Saúde',
      status: 'rejeitado',
      dataCriacao: '2024-01-20',
      visualizacoes: 0,
      cidade: 'Belo Horizonte, MG',
      imagem: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop'
    }
  ]

  const categories = [
    'Alimentação', 'Beleza', 'Saúde', 'Educação', 'Tecnologia',
    'Construção', 'Automóveis', 'Serviços', 'Lazer', 'Outros'
  ]

  const handleEdit = (id) => {
    console.log('Editar anúncio:', id)
  }

  const handleDelete = (anuncio) => {
    setAnuncioSelecionado(anuncio)
    setDialogOpen(true)
  }

  const confirmarExclusao = () => {
    console.log('Excluir anúncio:', anuncioSelecionado.id)
    setDialogOpen(false)
    setAnuncioSelecionado(null)
  }

  const handleView = (id) => {
    console.log('Visualizar anúncio:', id)
  }

  const filteredAnuncios = anuncios.filter(anuncio => {
    const matchesSearch = anuncio.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         anuncio.usuario.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === '' || anuncio.status === statusFilter
    const matchesCategory = categoryFilter === '' || anuncio.categoria === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  return (
    <div className="max-w-7xl mx-auto">
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
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <Select value={statusFilter || "all"} onValueChange={(value) => setStatusFilter(value === "all" ? "" : value)}>
              <SelectTrigger>
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="aprovado">Aprovado</SelectItem>
                <SelectItem value="rejeitado">Rejeitado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select value={categoryFilter || "all"} onValueChange={(value) => setCategoryFilter(value === "all" ? "" : value)}>
              <SelectTrigger>
                <SelectValue placeholder="Todas as categorias" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Lista de Anúncios */}
      <div className="space-y-4">
        {filteredAnuncios.map((anuncio) => (
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
                    anuncio.status === 'aprovado' 
                      ? 'bg-green-100 text-green-800'
                      : anuncio.status === 'pendente'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {anuncio.status === 'aprovado' ? 'Aprovado' :
                     anuncio.status === 'pendente' ? 'Pendente' : 'Rejeitado'}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Usuário:</span> {anuncio.usuario}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Categoria:</span> {anuncio.categoria}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Criado em:</span> {new Date(anuncio.dataCriacao).toLocaleDateString('pt-BR')}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Visualizações:</span> {anuncio.visualizacoes}
                    </p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-medium">Localização:</span> {anuncio.cidade}
                </p>
              </div>

              <div className="flex flex-col space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleView(anuncio.id)}
                  className="flex items-center space-x-1"
                >
                  <Eye className="h-4 w-4" />
                  <span>Ver</span>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(anuncio.id)}
                  className="flex items-center space-x-1"
                >
                  <Edit className="h-4 w-4" />
                  <span>Editar</span>
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

      {filteredAnuncios.length === 0 && (
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
          Mostrando {filteredAnuncios.length} de {anuncios.length} anúncios
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
              onClick={confirmarExclusao}
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

