import { useState, useEffect } from 'react'
import { Upload, Camera, Link, Save, Eye, Loader2, Building, Globe } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { useAuth } from '../../contexts/AuthContext'
import { useToast } from '../../contexts/ToastContext'
import userService from '../../services/userService'

const PerfilPublico = () => {
  const { user } = useAuth()
  const { showSuccess, showError } = useToast()
  const [formData, setFormData] = useState({
    descricao: '',
    instagram: '',
    facebook: '',
    website: '',
    fotoPerfil: '',
    banner1: '',
    banner2: '',
    banner3: ''
  })
  const [banners, setBanners] = useState({
    banner1: '',
    banner2: '',
    banner3: ''
  })
  const [loading, setLoading] = useState(false)
  const [bannerAtual, setBannerAtual] = useState(0)

  // Carregar dados do perfil público
  useEffect(() => {
    const carregarPerfil = async () => {
      try {
        setLoading(true)
        const response = await userService.getPerfilPublico(user?.id)
        if (response.sucesso) {
          const dados = response.dados
          
          // Separar banners para controle independente
          const bannersData = {
            banner1: dados.banner1 || '',
            banner2: dados.banner2 || '',
            banner3: dados.banner3 || ''
          }
          
          setBanners(bannersData)
          
          setFormData({
            descricao: dados.descricao || '',
            instagram: dados.instagram || '',
            facebook: dados.facebook || '',
            website: dados.website || '',
            fotoPerfil: dados.fotoPerfil || user?.foto_perfil || '',
            banner1: bannersData.banner1,
            banner2: bannersData.banner2,
            banner3: bannersData.banner3
          })
        }
      } catch (error) {
        console.error('Erro ao carregar perfil público:', error)
        // Usar dados básicos do usuário se não conseguir carregar
        setFormData(prev => ({
          ...prev,
          fotoPerfil: user?.foto_perfil || ''
        }))
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      carregarPerfil()
    }
  }, [user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }


  const proximoBanner = () => {
    const bannersArray = [banners.banner1, banners.banner2, banners.banner3].filter(Boolean)
    setBannerAtual((prev) => (prev + 1) % bannersArray.length)
  }

  const bannerAnterior = () => {
    const bannersArray = [banners.banner1, banners.banner2, banners.banner3].filter(Boolean)
    setBannerAtual((prev) => (prev - 1 + bannersArray.length) % bannersArray.length)
  }

  const handleImageUpload = async (field, file) => {
    try {
      setLoading(true)
      let response
      
      if (field === 'fotoPerfil') {
        response = await userService.uploadFotoPerfil(file)
      } else if (field.startsWith('banner')) {
        const bannerIndex = field.replace('banner', '')
        response = await userService.uploadBanner(file, bannerIndex)
      }
      
      if (response && response.sucesso) {
        const imageUrl = response.dados.url || response.dados.foto_perfil
        
        if (field === 'fotoPerfil') {
          setFormData(prev => ({
            ...prev,
            [field]: imageUrl
          }))
        } else if (field.startsWith('banner')) {
          setBanners(prev => ({
            ...prev,
            [field]: imageUrl
          }))
          // Não precisamos atualizar formData aqui pois os banners não são enviados nele
        }
        
        showSuccess('Imagem enviada com sucesso!')
      }
    } catch (error) {
      showError(error.message || 'Erro ao fazer upload da imagem')
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (field, event) => {
    const file = event.target.files[0]
    if (file) {
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        showError('Por favor, selecione apenas arquivos de imagem')
        return
      }
      
      // Validar tamanho (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showError('O arquivo deve ter no máximo 5MB')
        return
      }
      
      handleImageUpload(field, file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setLoading(true)

      const dadosParaEnviar = {
        descricao: formData.descricao,
        redes_sociais: {
          instagram: formData.instagram,
          facebook: formData.facebook,
          website: formData.website
        }
      }
      
      const response = await userService.updatePerfilPublico(dadosParaEnviar)
      if (response.sucesso) {
        showSuccess('Perfil público atualizado com sucesso!')
      }
    } catch (error) {
      showError(error.message || 'Erro ao atualizar perfil público')
    } finally {
      setLoading(false)
    }
  }

  const handlePreview = () => {
    // Abrir perfil público em nova aba
    window.open(`/perfil/${user?.id}`, '_blank')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Perfil Público
            </h1>
            <p className="text-gray-600">
              Personalize como seu perfil aparece para os visitantes
            </p>
          </div>
          <Button variant="outline" onClick={handlePreview} className="flex items-center space-x-2">
            <Eye className="h-4 w-4" />
            <span>Visualizar</span>
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações do Perfil Público */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="h-5 w-5 mr-2" />
              Informações do Perfil Público
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Essas informações aparecem no seu perfil público. Para alterar dados básicos como nome, telefone e endereço, vá em "Dados da Conta".
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição do Negócio</Label>
                <textarea
                  id="descricao"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Conte um pouco sobre seu negócio, serviços oferecidos, experiência, etc..."
                />
                <p className="text-sm text-gray-500">
                  Esta descrição aparecerá no seu perfil público para que os clientes conheçam melhor seu negócio.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Foto de Perfil */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Camera className="h-5 w-5 mr-2" />
              Foto de Perfil
            </CardTitle>
          </CardHeader>
          <CardContent>
          
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={formData.fotoPerfil || '/favicon.ico'}
                alt="Foto de perfil"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <label
                htmlFor="fotoPerfilInput"
                className="absolute -bottom-2 -right-2 bg-orange-400 text-white rounded-full p-2 hover:bg-orange-400 cursor-pointer"
              >
                <Camera className="h-4 w-4" />
              </label>
              <input
                id="fotoPerfilInput"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileSelect('fotoPerfil', e)}
                className="hidden"
              />
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                Atualizar Foto
              </h3>
              <p className="text-sm text-gray-600">
                Use uma imagem quadrada para melhor resultado
              </p>
            </div>
          </div>
          </CardContent>
        </Card>

        {/* Banners Carrossel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              Banners
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Resolução recomendada: 1200x400px (3:1). Use imagens horizontais para melhor resultado.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Carrossel de Banners */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-lg">
                  {(() => {
                    const bannersArray = [banners.banner1, banners.banner2, banners.banner3].filter(Boolean)
                    const bannerAtualData = bannersArray[bannerAtual]
                    
                    return (
                      <div className="relative">
                        <img
                          src={bannerAtualData || '/logo.png'}
                          alt={`Banner ${bannerAtual + 1}`}
                          className="w-full h-64 object-cover"
                        />
                        
                        {/* Controles do carrossel */}
                        {bannersArray.length > 1 && (
                          <>
                            <button
                              onClick={bannerAnterior}
                              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                            </button>
                            <button
                              onClick={proximoBanner}
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </>
                        )}
                        
                        {/* Indicadores */}
                        {bannersArray.length > 1 && (
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {bannersArray.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setBannerAtual(index)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                  index === bannerAtual ? 'bg-white' : 'bg-white bg-opacity-50'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })()}
                </div>
              </div>

              {/* Upload de Banners */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((bannerIndex) => (
                  <div key={bannerIndex} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Banner {bannerIndex}
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
                      <input
                        id={`banner${bannerIndex}Input`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(`banner${bannerIndex}`, e)}
                        className="hidden"
                      />
                      <label
                        htmlFor={`banner${bannerIndex}Input`}
                        className="cursor-pointer flex flex-col items-center space-y-2"
                      >
                        <Upload className="h-8 w-8 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {banners[`banner${bannerIndex}`] ? 'Alterar Banner' : 'Adicionar Banner'}
                        </span>
                        {banners[`banner${bannerIndex}`] && (
                          <span className="text-xs text-green-600">
                            ✓ Banner adicionado
                          </span>
                        )}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Redes Sociais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Link className="h-5 w-5 mr-2" />
              Redes Sociais
            </CardTitle>
          </CardHeader>
          <CardContent>
          
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="instagram" className="flex items-center">
                  <Link className="h-4 w-4 mr-1" />
                  Instagram
                </Label>
                <Input
                  id="instagram"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  placeholder="@seuusuario"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebook" className="flex items-center">
                  <Link className="h-4 w-4 mr-1" />
                  Facebook
                </Label>
                <Input
                  id="facebook"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleInputChange}
                  placeholder="Nome da página"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website" className="flex items-center">
                  <Link className="h-4 w-4 mr-1" />
                  Website
                </Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://seusite.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botão Salvar */}
        <Card>
          <CardContent className="flex justify-end pt-6">
            <Button type="submit" className="flex items-center space-x-2" disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span>{loading ? 'Salvando...' : 'Salvar Perfil'}</span>
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}

export default PerfilPublico
