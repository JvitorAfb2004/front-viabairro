import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MapPin, Star, Phone, Mail, Instagram, Facebook, Globe, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { Button } from '../components/ui/button'
import publicService from '../services/publicService'

const PerfilPublico = () => {
  const { id } = useParams()
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
  const [profile, setProfile] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const carregarPerfil = async () => {
      try {
        setLoading(true)
        const response = await publicService.getPerfilPublico(id)
        if (response.sucesso) {
          const usuario = response.dados.usuario
          setProfile({
            name: usuario.nome,
            description: usuario.descricao || 'Descrição não disponível',
            location: `${usuario.cidade || 'Cidade não informada'}, ${usuario.estado || 'Estado não informado'}`,
            rating: 4.8,
            reviews: 127,
            phone: '(11) 99999-9999',
            email: 'contato@exemplo.com',
            socialMedia: usuario.redes_sociais || {},
            banners: usuario.banners || ['/logo.png'],
            profileImage: usuario.foto_perfil || '/logo.png'
          })
          setProducts(usuario.itens || [])
        }
      } catch (error) {
        console.error('Erro ao carregar perfil:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      carregarPerfil()
    }
  }, [id])

  const nextBanner = () => {
    if (profile) {
      setCurrentBannerIndex((prev) => (prev + 1) % profile.banners.length)
    }
  }

  const prevBanner = () => {
    if (profile) {
      setCurrentBannerIndex((prev) => (prev - 1 + profile.banners.length) % profile.banners.length)
    }
  }

  const formatarPreco = (preco) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando perfil...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Perfil não encontrado</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Carrossel de Banners */}
        <div className="relative mb-8">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={profile.banners[currentBannerIndex]}
              alt={`Banner ${currentBannerIndex + 1}`}
              className="w-full h-64 object-cover transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            
            {/* Navegação do Carrossel */}
            <button
              onClick={prevBanner}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextBanner}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            {/* Indicadores */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {profile.banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBannerIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentBannerIndex 
                      ? 'bg-white' 
                      : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Informações do Perfil */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Foto de Perfil */}
            <div className="flex-shrink-0">
              <img
                src={profile.profileImage}
                alt={profile.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>

            {/* Informações */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {profile.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-medium text-gray-900">{profile.rating}</span>
                  <span className="text-gray-600">({profile.reviews} avaliações)</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{profile.location}</span>
                </div>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {profile.description}
              </p>

              {/* Contato */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{profile.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{profile.email}</span>
                </div>
              </div>

              {/* Redes Sociais */}
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <Instagram className="h-4 w-4" />
                  <span>Instagram</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <Facebook className="h-4 w-4" />
                  <span>Facebook</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>Website</span>
                </Button>
              </div>
            </div>
          </div>
        </div>



        {/* Catálogo de Produtos */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Nossos Produtos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <img
                  src={product.imagem || '/logo.png'}
                  alt={product.titulo}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {product.titulo}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {product.descricao}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">
                      {formatarPreco(product.preco)}
                    </span>
                    <Button size="sm">
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerfilPublico
