import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MapPin, Phone, Mail, Instagram, Facebook, Globe, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { Button } from '../components/ui/button'
import publicService from '../services/publicService'

const PerfilPublico = () => {
  const { id } = useParams()
  const navigate = useNavigate()
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
          const dados = response.dados
          console.log('Dados recebidos da API:', dados) // Debug
          
          // Verificar se os dados existem
          if (!dados) {
            console.error('Dados não encontrados na resposta da API')
            return
          }
          
          const bannersArray = [dados.banner1, dados.banner2, dados.banner3].filter(banner => banner && banner.trim() !== '')
          console.log('Banners encontrados:', bannersArray)
          console.log('Banner1:', dados.banner1)
          console.log('Banner2:', dados.banner2)
          console.log('Banner3:', dados.banner3)
          console.log('Tamanho do array de banners:', bannersArray.length)
          
          const profileData = {
            name: dados.nome || 'Nome não disponível',
            description: dados.descricao || 'Descrição não disponível',
            location: `${dados.cidade || 'Cidade não informada'}, ${dados.estado || 'Estado não informado'}`,
            phone: dados.telefone || 'Telefone não informado',
            email: dados.email || 'Email não informado',
            socialMedia: {
              instagram: dados.instagram || '',
              facebook: dados.facebook || '',
              website: dados.website || ''
            },
            banners: bannersArray,
            profileImage: dados.fotoPerfil || '/logo.png'
          }
          
          console.log('Profile data completo:', profileData)
          setProfile(profileData)
          
          console.log('Produtos recebidos da API:', dados.itens)
          setProducts(dados.itens || [])
        } else {
          console.error('Resposta da API não foi bem-sucedida:', response)
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

  const handleVerDetalhes = (produto) => {
    console.log('Produto clicado:', produto)
    console.log('Slug do produto:', produto.slug)
    
    if (!produto.slug) {
      console.error('Slug não encontrado para o produto:', produto)
      return
    }
    
    // Navegar para a página de detalhes do produto
    navigate(`/anuncio/${produto.slug}`)
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
        {profile && profile.banners && profile.banners.length > 0 && (
          <div className="relative mb-8">
            <div className="relative overflow-hidden rounded-lg bg-gray-200" style={{ height: '400px' }}>
              <img
                src={profile.banners[currentBannerIndex]}
                alt={`Banner ${currentBannerIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-500"
                style={{ 
                  minHeight: '400px',
                  maxHeight: '400px'
                }}
                onError={(e) => {
                  console.error('Erro ao carregar banner:', profile.banners[currentBannerIndex])
                }}
                onLoad={() => {
                  console.log('Banner carregado com sucesso:', profile.banners[currentBannerIndex])
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              
              {/* Navegação do Carrossel */}
              {profile.banners.length > 1 && (
                <>
                  <button
                    onClick={prevBanner}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-3 rounded-full transition-all shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={nextBanner}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-3 rounded-full transition-all shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
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
                </>
              )}
            </div>
          </div>
        )}

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
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{profile.location}</span>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {profile.description}
              </p>

              {/* Contato */}
              <div className="space-y-3 mb-6">
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
              {(profile.socialMedia.instagram || profile.socialMedia.facebook || profile.socialMedia.website) && (
                <div className="flex space-x-4">
                  {profile.socialMedia.instagram && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center space-x-2"
                      onClick={() => window.open(profile.socialMedia.instagram, '_blank')}
                    >
                      <Instagram className="h-4 w-4" />
                      <span>Instagram</span>
                    </Button>
                  )}
                  {profile.socialMedia.facebook && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center space-x-2"
                      onClick={() => window.open(profile.socialMedia.facebook, '_blank')}
                    >
                      <Facebook className="h-4 w-4" />
                      <span>Facebook</span>
                    </Button>
                  )}
                  {profile.socialMedia.website && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center space-x-2"
                      onClick={() => window.open(profile.socialMedia.website, '_blank')}
                    >
                      <Globe className="h-4 w-4" />
                      <span>Website</span>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>



        {/* Catálogo de Produtos */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Nossos Produtos
          </h2>
          
          {products.length > 0 ? (
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
                      <Button size="sm" onClick={() => handleVerDetalhes(product)}>
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhum produto encontrado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PerfilPublico
