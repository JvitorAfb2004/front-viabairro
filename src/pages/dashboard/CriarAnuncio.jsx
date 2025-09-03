import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Upload, 
  MapPin, 
  DollarSign, 
  Tag, 
  Image as ImageIcon,
  X
} from 'lucide-react';

const CriarAnuncio = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: '',
    categoria: '',
    tipo: 'servico', // 'produto' ou 'servico'
    descricao: '',
    preco: '',
    localizacao: '',
    telefone: '',
    email: '',
    tags: [],
    imagens: []
  });
  const [novaTag, setNovaTag] = useState('');
  const [novaCategoria, setNovaCategoria] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [categorias, setCategorias] = useState([
    'Beleza e Estética',
    'Saúde e Bem-estar',
    'Educação e Cursos',
    'Tecnologia e Informática',
    'Construção e Reforma',
    'Alimentação e Gastronomia',
    'Moda e Acessórios',
    'Casa e Decoração',
    'Automóveis e Transporte',
    'Eventos e Festas',
    'Serviços Domésticos',
    'Consultoria e Negócios',
    'Arte e Artesanato',
    'Esportes e Lazer',
    'Outros'
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const addTag = () => {
    if (novaTag.trim() && !formData.tags.includes(novaTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, novaTag.trim()]
      }));
      setNovaTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addNovaCategoria = () => {
    if (novaCategoria.trim() && !categorias.includes(novaCategoria.trim())) {
      setCategorias(prev => [...prev, novaCategoria.trim()]);
      setFormData(prev => ({
        ...prev,
        categoria: novaCategoria.trim()
      }));
      setNovaCategoria('');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Simular upload de imagem
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        imagens: [imageUrl] // Apenas uma imagem
      }));
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      imagens: []
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.titulo.trim()) {
      newErrors.titulo = 'Título é obrigatório';
    }

    if (!formData.categoria) {
      newErrors.categoria = 'Categoria é obrigatória';
    }

    if (!formData.descricao.trim()) {
      newErrors.descricao = 'Descrição é obrigatória';
    }

    if (!formData.preco.trim()) {
      newErrors.preco = 'Preço é obrigatório';
    }

    if (!formData.localizacao.trim()) {
      newErrors.localizacao = 'Localização é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simular criação do anúncio
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirecionar para lista de anúncios
      navigate('/dashboard/anuncios');
    } catch (error) {
      setErrors({ general: 'Erro ao criar anúncio. Tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard/anuncios')}
              className="flex items-center text-[#1a1b1b] hover:text-[#f59820]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-[#1a1b1b]">
                Criar Novo Anúncio
              </h1>
              <p className="text-gray-600">
                Publique seu produto ou serviço para alcançar mais clientes
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Formulário */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
              {errors.general}
            </div>
          )}

          {/* Tipo e Título */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Tag className="w-5 h-5 mr-2" />
                Informações Básicas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tipo">Tipo</Label>
                  <Select value={formData.tipo} onValueChange={(value) => handleSelectChange('tipo', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="produto">Produto</SelectItem>
                      <SelectItem value="servico">Serviço</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="categoria">Categoria</Label>
                  <Select value={formData.categoria} onValueChange={(value) => handleSelectChange('categoria', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias.map((categoria) => (
                        <SelectItem key={categoria} value={categoria}>
                          {categoria}
                        </SelectItem>
                      ))}
                      <SelectItem value="nova-categoria">
                        + Adicionar nova categoria
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.categoria && (
                    <p className="text-red-500 text-sm mt-1">{errors.categoria}</p>
                  )}
                  
                  {/* Campo para nova categoria */}
                  {formData.categoria === 'nova-categoria' && (
                    <div className="mt-3 flex space-x-2">
                      <Input
                        placeholder="Digite o nome da nova categoria"
                        value={novaCategoria}
                        onChange={(e) => setNovaCategoria(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addNovaCategoria())}
                      />
                      <Button type="button" onClick={addNovaCategoria} variant="outline">
                        Adicionar
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="titulo">Título do Anúncio</Label>
                <Input
                  id="titulo"
                  name="titulo"
                  placeholder="Ex: Eletricista Residencial 24h"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  className={errors.titulo ? 'border-red-500' : ''}
                />
                {errors.titulo && (
                  <p className="text-red-500 text-sm mt-1">{errors.titulo}</p>
                )}
              </div>

              <div>
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  name="descricao"
                  placeholder="Descreva seu produto ou serviço em detalhes..."
                  value={formData.descricao}
                  onChange={handleInputChange}
                  rows={4}
                  className={errors.descricao ? 'border-red-500' : ''}
                />
                {errors.descricao && (
                  <p className="text-red-500 text-sm mt-1">{errors.descricao}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Preço e Localização */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Preço e Localização
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="preco">Preço</Label>
                  <Input
                    id="preco"
                    name="preco"
                    placeholder="Ex: R$ 50,00 ou A partir de R$ 30"
                    value={formData.preco}
                    onChange={handleInputChange}
                    className={errors.preco ? 'border-red-500' : ''}
                  />
                  {errors.preco && (
                    <p className="text-red-500 text-sm mt-1">{errors.preco}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="localizacao">Localização</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="localizacao"
                      name="localizacao"
                      placeholder="Ex: São Paulo, SP - Centro"
                      value={formData.localizacao}
                      onChange={handleInputChange}
                      className={`pl-10 ${errors.localizacao ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.localizacao && (
                    <p className="text-red-500 text-sm mt-1">{errors.localizacao}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    name="telefone"
                    placeholder="(11) 99999-9999"
                    value={formData.telefone}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
              <CardDescription>
                Adicione palavras-chave para facilitar a busca
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Digite uma tag"
                  value={novaTag}
                  onChange={(e) => setNovaTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} variant="outline">
                  Adicionar
                </Button>
              </div>
              
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Imagens */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ImageIcon className="w-5 h-5 mr-2" />
                Imagens
              </CardTitle>
              <CardDescription>
                Adicione uma foto do seu produto ou serviço
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600 mb-2">Clique para adicionar uma imagem</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button type="button" variant="outline" asChild>
                    <span>Selecionar Imagem</span>
                  </Button>
                </label>
              </div>

              {formData.imagens.length > 0 && (
                <div className="flex justify-center">
                  <div className="relative">
                    <img
                      src={formData.imagens[0]}
                      alt="Preview"
                      className="w-64 h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Botões */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/dashboard/anuncios')}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-[#f59820] hover:bg-[#e8891a] text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Criando...' : 'Criar Anúncio'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CriarAnuncio;
