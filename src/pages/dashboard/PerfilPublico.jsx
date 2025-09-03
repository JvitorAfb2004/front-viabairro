import { useState } from 'react'
import { Upload, Camera, Link, Save, Eye } from 'lucide-react'
import { Button } from '../../components/ui/button'

const PerfilPublico = () => {
  const [formData, setFormData] = useState({
    nome: 'Padaria do João',
    descricao: 'Padaria tradicional familiar há mais de 20 anos no bairro. Especializada em pães artesanais, doces caseiros e salgados frescos.',
    telefone: '(11) 99999-9999',
    email: 'contato@padariadojoao.com',
    endereco: 'Rua das Flores, 123 - Vila Madalena',
    cidade: 'São Paulo',
    estado: 'SP',
    instagram: '@padariadojoao',
    facebook: 'Padaria do João',
    website: 'www.padariadojoao.com',
    fotoPerfil: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    banner1: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=300&fit=crop',
    banner2: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=200&fit=crop',
    banner3: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=200&fit=crop'
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = (field, file) => {
    // Simular upload de imagem
    console.log(`Upload ${field}:`, file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Perfil público salvo:', formData)
  }

  const handlePreview = () => {
    console.log('Visualizar perfil público')
  }

  return (
    <div className="max-w-4xl mx-auto">
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

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informações Básicas */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Informações Básicas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do Negócio
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Conte um pouco sobre seu negócio..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone
              </label>
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Endereço
              </label>
              <input
                type="text"
                name="endereco"
                value={formData.endereco}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cidade
              </label>
              <input
                type="text"
                name="cidade"
                value={formData.cidade}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="SP">São Paulo</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="MG">Minas Gerais</option>
                {/* Adicionar outros estados */}
              </select>
            </div>
          </div>
        </div>

        {/* Foto de Perfil */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Foto de Perfil
          </h2>
          
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={formData.fotoPerfil}
                alt="Foto de perfil"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <button
                type="button"
                className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                Atualizar Foto
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Use uma imagem quadrada para melhor resultado
              </p>
              <Button variant="outline" type="button" className="flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>Escolher Arquivo</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Banners */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Banners
          </h2>
          
          <div className="space-y-6">
            {/* Banner Principal */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Banner Principal
              </label>
              <div className="relative">
                <img
                  src={formData.banner1}
                  alt="Banner principal"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  className="absolute top-4 right-4 bg-white bg-opacity-90 text-gray-700 rounded-lg px-3 py-2 flex items-center space-x-2 hover:bg-opacity-100"
                >
                  <Upload className="h-4 w-4" />
                  <span>Alterar</span>
                </button>
              </div>
            </div>

            {/* Banners Secundários */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Secundário 1
                </label>
                <div className="relative">
                  <img
                    src={formData.banner2}
                    alt="Banner secundário 1"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-white bg-opacity-90 text-gray-700 rounded px-2 py-1 text-sm hover:bg-opacity-100"
                  >
                    <Upload className="h-3 w-3" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Secundário 2
                </label>
                <div className="relative">
                  <img
                    src={formData.banner3}
                    alt="Banner secundário 2"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-white bg-opacity-90 text-gray-700 rounded px-2 py-1 text-sm hover:bg-opacity-100"
                  >
                    <Upload className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Redes Sociais */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Redes Sociais
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Link className="inline h-4 w-4 mr-1" />
                Instagram
              </label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                placeholder="@seuusuario"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Link className="inline h-4 w-4 mr-1" />
                Facebook
              </label>
              <input
                type="text"
                name="facebook"
                value={formData.facebook}
                onChange={handleInputChange}
                placeholder="Nome da página"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Link className="inline h-4 w-4 mr-1" />
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://seusite.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Botão Salvar */}
        <div className="flex justify-end">
          <Button type="submit" className="flex items-center space-x-2">
            <Save className="h-4 w-4" />
            <span>Salvar Perfil</span>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default PerfilPublico
