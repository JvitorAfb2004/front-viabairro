import { useState } from 'react'
import { Search, Filter, MapPin, Star, ArrowRight, X } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { usePreventScroll } from '../hooks/usePreventScroll'

const Buscar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  const categories = [
    'Alimentação', 'Beleza', 'Saúde', 'Educação', 'Tecnologia', 
    'Construção', 'Automóveis', 'Serviços', 'Lazer', 'Outros'
  ]

  const cities = [
    'São Paulo, SP', 'Rio de Janeiro, RJ', 'Belo Horizonte, MG',
    'Salvador, BA', 'Brasília, DF', 'Fortaleza, CE'
  ]

  const searchResults = [
    {
      id: 1,
      name: 'Padaria do João',
      category: 'Alimentação',
      location: 'São Paulo, SP',
      neighborhood: 'Vila Madalena',
      rating: 4.8,
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop',
      description: 'Padaria tradicional com pães frescos e doces caseiros'
    },
    {
      id: 2,
      name: 'Barbearia Moderna',
      category: 'Beleza',
      location: 'São Paulo, SP',
      neighborhood: 'Pinheiros',
      rating: 4.9,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=300&h=200&fit=crop',
      description: 'Corte moderno e barba com estilo'
    },
    {
      id: 3,
      name: 'Academia Fit',
      category: 'Saúde',
      location: 'São Paulo, SP',
      neighborhood: 'Itaim Bibi',
      rating: 4.7,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
      description: 'Academia completa com personal trainers'
    }
  ]

  const handleApplyFilters = () => {
    console.log('Aplicando filtros:', { searchTerm, selectedCategory, selectedCity })
    setIsFilterModalOpen(false)
  }

  // Prevenir scroll quando modal estiver aberto
  usePreventScroll(isFilterModalOpen)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Botão de Filtro Mobile */}
        <div className="lg:hidden mb-6">
          <Button 
            onClick={() => setIsFilterModalOpen(true)}
            className="w-full flex items-center justify-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de Filtros - Desktop */}
          <aside className="hidden lg:block lg:w-80">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center space-x-2 mb-6">
                <Filter className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
              </div>

              {/* Busca por palavra-chave */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Palavra-chave
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Ex: padaria, barbearia..."
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Filtro por categoria */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria
                </label>
                <Select value={selectedCategory || "all"} onValueChange={(value) => setSelectedCategory(value === "all" ? "" : value)}>
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

              {/* Filtro por cidade */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cidade
                </label>
                <Select value={selectedCity || "all"} onValueChange={(value) => setSelectedCity(value === "all" ? "" : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as cidades" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as cidades</SelectItem>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full" onClick={handleApplyFilters}>
                Aplicar Filtros
              </Button>
            </div>
          </aside>

          {/* Resultados */}
          <main className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Resultados da Busca
              </h1>
              <p className="text-gray-600">
                {searchResults.length} negócios encontrados
              </p>
            </div>

            <div className="space-y-6">
              {searchResults.map((business) => (
                <div key={business.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row gap-6">
                    <img
                      src={business.image}
                      alt={business.name}
                      className="w-full md:w-48 h-32 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {business.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-600">
                            {business.rating}
                          </span>
                          <span className="text-sm text-gray-500">
                            ({business.reviews} avaliações)
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-blue-600 font-medium mb-2">{business.category}</p>
                      
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">
                          {business.neighborhood}, {business.location}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{business.description}</p>
                      
                      <Button variant="outline" className="group">
                        Ver Perfil Completo
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Paginação */}
            <div className="mt-8 flex justify-center">
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
          </main>
        </div>

        {/* Modal de Filtros Mobile */}
        {isFilterModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop com blur */}
            <div
              className="fixed inset-0 backdrop-blur-sm"
              onClick={() => setIsFilterModalOpen(false)}
            />

            {/* Modal com animação profissional */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-200">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900">Filtros</h3>
                <button
                  onClick={() => setIsFilterModalOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Busca por palavra-chave */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Palavra-chave
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Ex: padaria, barbearia..."
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Filtro por categoria */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria
                  </label>
                  <Select value={selectedCategory || "all"} onValueChange={(value) => setSelectedCategory(value === "all" ? "" : value)}>
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

                {/* Filtro por cidade */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cidade
                  </label>
                  <Select value={selectedCity || "all"} onValueChange={(value) => setSelectedCity(value === "all" ? "" : value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas as cidades" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as cidades</SelectItem>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Botões */}
                <div className="flex space-x-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsFilterModalOpen(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleApplyFilters}
                    className="flex-1"
                  >
                    Aplicar Filtros
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Buscar
