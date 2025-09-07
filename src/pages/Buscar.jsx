import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Search, Filter, MapPin, Star, ArrowRight, X, Loader2, User, Eye, Phone, Mail } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { usePreventScroll } from '../hooks/usePreventScroll'
import publicService from '../services/publicService'
import ibgeService from '../services/ibgeService'

const Buscar = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedBairro, setSelectedBairro] = useState('')
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [categories, setCategories] = useState([])
  const [estados, setEstados] = useState([])
  const [cidades, setCidades] = useState([])
  const [bairros, setBairros] = useState([])
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const [pagination, setPagination] = useState({
    total: 0,
    pagina: 1,
    limite: 20,
    totalPaginas: 0
  })

  // Carregar categorias e resultados iniciais
  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true)
        
        // Carregar categorias
        const categoriasResponse = await publicService.getCategorias()
        if (categoriasResponse.sucesso) {
          setCategories(categoriasResponse.dados.categorias)
        }

        // Carregar estados
        const estadosData = await ibgeService.getEstados()
        setEstados(estadosData)

        // Carregar parâmetros da URL
        const termo = searchParams.get('q') || ''
        const categoria = searchParams.get('categoria') || ''
        const estado = searchParams.get('estado') || ''
        const cidade = searchParams.get('cidade') || ''
        const bairro = searchParams.get('bairro') || ''
        
        setSearchTerm(termo)
        setSelectedCategory(categoria)
        setSelectedState(estado)
        setSelectedCity(cidade)
        setSelectedBairro(bairro)

        // Carregar cidades se estado estiver selecionado
        if (estado) {
          const cidadesData = await ibgeService.getCidadesPorSigla(estado)
          setCidades(cidadesData)
        }

        // Carregar bairros se cidade estiver selecionada
        if (cidade && estado) {
          const bairrosData = await publicService.getBairrosPorCidade(cidade, estado)
          if (bairrosData.sucesso) {
            setBairros(bairrosData.dados.bairros)
          }
        }

        // Adicionar condição antes de chamar buscarAnuncios
        if (termo || categoria || estado || cidade || bairro) {
          await buscarAnuncios(1, { termo, categoria, estado, cidade, bairro });
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      } finally {
        setLoading(false)
      }
    }

    carregarDados()
  }, [searchParams])

  // Adicionar useEffect
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile && searchParams.get('openFilter') === 'true') {
      setIsFilterModalOpen(true);
    }
  }, [searchParams]);

  // Buscar anúncios com useCallback para otimização
  const buscarAnuncios = useCallback(async (pagina = 1, filtrosCustom = {}) => {
    try {
      setSearching(true)
      
      const filtros = {
        termo: filtrosCustom.termo !== undefined ? filtrosCustom.termo : searchTerm,
        categoria: filtrosCustom.categoria !== undefined ? filtrosCustom.categoria : selectedCategory,
        estado: filtrosCustom.estado !== undefined ? filtrosCustom.estado : selectedState,
        cidade: filtrosCustom.cidade !== undefined ? filtrosCustom.cidade : selectedCity,
        bairro: filtrosCustom.bairro !== undefined ? filtrosCustom.bairro : selectedBairro,
        pagina,
        limite: 20
      }

      const response = await publicService.buscarAnuncios(filtros)
      if (response.sucesso) {
        setSearchResults(response.dados.itens)
        setPagination(response.dados.paginacao)
      }
    } catch (error) {
      console.error('Erro ao buscar anúncios:', error)
    } finally {
      setSearching(false)
    }
  }, [searchTerm, selectedCategory, selectedState, selectedCity, selectedBairro])

  // Carregar cidades quando estado mudar
  const handleStateChange = async (estado) => {
    setSelectedState(estado)
    setSelectedCity('') // Limpar cidade quando estado mudar
    setSelectedBairro('') // Limpar bairro quando estado mudar
    setBairros([]) // Limpar lista de bairros
    
    if (estado) {
      try {
        const cidadesData = await ibgeService.getCidadesPorSigla(estado)
        setCidades(cidadesData)
      } catch (error) {
        console.error('Erro ao carregar cidades:', error)
      }
    } else {
      setCidades([])
    }
  }

  // Carregar bairros quando cidade mudar
  const handleCityChange = async (cidade) => {
    setSelectedCity(cidade)
    setSelectedBairro('') // Limpar bairro quando cidade mudar
    
    if (cidade && selectedState) {
      try {
        const bairrosData = await publicService.getBairrosPorCidade(cidade, selectedState)
        if (bairrosData.sucesso) {
          setBairros(bairrosData.dados.bairros)
        }
      } catch (error) {
        console.error('Erro ao carregar bairros:', error)
      }
    } else {
      setBairros([])
    }
  }

  const handleApplyFilters = () => {
    if (!searchTerm && !selectedCategory && !selectedState && !selectedCity && !selectedBairro) {
      // Mostrar mensagem ou return
      return;
    }
    // Atualizar URL com filtros
    const params = new URLSearchParams()
    if (searchTerm) params.set('q', searchTerm)
    if (selectedCategory) params.set('categoria', selectedCategory)
    if (selectedState) params.set('estado', selectedState)
    if (selectedCity) params.set('cidade', selectedCity)
    if (selectedBairro) params.set('bairro', selectedBairro)
    
    setSearchParams(params)
    buscarAnuncios(1)
    setIsFilterModalOpen(false)
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
    setSelectedState('')
    setSelectedCity('')
    setSelectedBairro('')
    setCidades([])
    setBairros([])
    
    // Limpar URL
    setSearchParams(new URLSearchParams())
    buscarAnuncios(1, { termo: '', categoria: '', estado: '', cidade: '', bairro: '' })
  }

  const handlePageChange = (novaPagina) => {
    buscarAnuncios(novaPagina)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const formatarPreco = (preco) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco)
  }

  // Prevenir scroll quando modal estiver aberto
  usePreventScroll(isFilterModalOpen)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando resultados...</p>
        </div>
      </div>
    )
  }

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
                    placeholder="Ex: padaria, barbearia, São Paulo, SP..."
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

              {/* Filtro por estado */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <Select value={selectedState || "all"} onValueChange={(value) => handleStateChange(value === "all" ? "" : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os estados</SelectItem>
                    {estados.map((estado) => (
                      <SelectItem key={estado.sigla} value={estado.sigla}>
                        {estado.nome}
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
                <Select 
                  value={selectedCity || "all"} 
                  onValueChange={(value) => handleCityChange(value === "all" ? "" : value)}
                  disabled={!selectedState}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={selectedState ? "Selecione uma cidade" : "Primeiro selecione um estado"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as cidades</SelectItem>
                    {cidades.map((cidade) => (
                      <SelectItem key={cidade.id} value={cidade.nome}>
                        {cidade.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Filtro por bairro */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bairro
                </label>
                <Select 
                  value={selectedBairro || "all"} 
                  onValueChange={(value) => setSelectedBairro(value === "all" ? "" : value)}
                  disabled={!selectedCity || !selectedState}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={selectedCity ? "Selecione um bairro" : "Primeiro selecione uma cidade"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os bairros</SelectItem>
                    {bairros.map((bairro) => (
                      <SelectItem key={bairro} value={bairro}>
                        {bairro}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Button className="w-full" onClick={handleApplyFilters}>
                  Aplicar Filtros
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleClearFilters}
                >
                  Limpar Filtros
                </Button>
              </div>
            </div>
          </aside>

          {/* Resultados */}
          <main className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Resultados da Busca
              </h1>
              <p className="text-gray-600">
                {pagination.total} negócios encontrados
              </p>
            </div>

            <div className="space-y-6">
              {searchResults.map((anuncio) => (
                <div key={anuncio.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row gap-6">
                    <img
                      src={anuncio.usuario?.foto_perfil || '/default-user.png'}
                      alt={anuncio.usuario?.nome}
                      className="w-full md:w-48 h-32 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {anuncio.titulo}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Por: {anuncio.usuario?.nome || 'Anunciante desconhecido'}
                        </p>
                      </div>
                      
                      <p className="text-blue-600 font-medium mb-3">{anuncio.categoria}</p>
                      
                      {/* Informações do Anunciante */}
                      <div className="bg-gray-50 rounded-lg p-3 mb-3">
                       
                        
                      
                        
                        {anuncio.usuario.endereco && (
                          <div className="flex items-center space-x-2 mb-1">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {anuncio.usuario.endereco} - {anuncio.usuario.bairro} - {anuncio.usuario.cidade} - {anuncio.usuario.estado}
                            </span>
                          </div>
                        )}
                        
                        
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">{anuncio.descricao}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <Eye className="h-4 w-4 mr-1" />
                          <span>{anuncio.visualizacoes}</span>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/perfil/${anuncio.usuario.id}`)}
                            className="flex items-center"
                          >
                            <User className="h-4 w-4 mr-1" />
                            Ver Perfil
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => navigate(`/anuncio/${anuncio.slug}`)}
                            className="flex items-center"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Ver Anúncio
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {searchResults.length === 0 && !loading && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Nenhum resultado encontrado</p>
                  <p className="text-gray-400">Tente ajustar os filtros de busca</p>
                </div>
              )}
            </div>

            {/* Paginação */}
            {pagination.totalPaginas > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    disabled={pagination.pagina === 1}
                    onClick={() => handlePageChange(pagination.pagina - 1)}
                  >
                    Anterior
                  </Button>
                  
                  {Array.from({ length: Math.min(5, pagination.totalPaginas) }, (_, i) => {
                    const pagina = i + 1
                    return (
                      <Button
                        key={pagina}
                        variant={pagina === pagination.pagina ? "default" : "outline"}
                        onClick={() => handlePageChange(pagina)}
                      >
                        {pagina}
                      </Button>
                    )
                  })}
                  
                  <Button 
                    variant="outline"
                    disabled={pagination.pagina === pagination.totalPaginas}
                    onClick={() => handlePageChange(pagination.pagina + 1)}
                  >
                    Próximo
                  </Button>
                </div>
              </div>
            )}
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
                      placeholder="Ex: padaria, barbearia, São Paulo, SP..."
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

                {/* Filtro por estado */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado
                  </label>
                  <Select value={selectedState || "all"} onValueChange={(value) => handleStateChange(value === "all" ? "" : value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os estados</SelectItem>
                      {estados.map((estado) => (
                        <SelectItem key={estado.sigla} value={estado.sigla}>
                          {estado.nome}
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
                  <Select 
                    value={selectedCity || "all"} 
                    onValueChange={(value) => handleCityChange(value === "all" ? "" : value)}
                    disabled={!selectedState}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={selectedState ? "Selecione uma cidade" : "Primeiro selecione um estado"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as cidades</SelectItem>
                      {cidades.map((cidade) => (
                        <SelectItem key={cidade.id} value={cidade.nome}>
                          {cidade.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Filtro por bairro */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bairro
                  </label>
                  <Select 
                    value={selectedBairro || "all"} 
                    onValueChange={(value) => setSelectedBairro(value === "all" ? "" : value)}
                    disabled={!selectedCity || !selectedState}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={selectedCity ? "Selecione um bairro" : "Primeiro selecione uma cidade"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os bairros</SelectItem>
                      {bairros.map((bairro) => (
                        <SelectItem key={bairro} value={bairro}>
                          {bairro}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Botões */}
                <div className="space-y-3 pt-4">
                  <div className="flex space-x-3">
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
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    className="w-full"
                  >
                    Limpar Filtros
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