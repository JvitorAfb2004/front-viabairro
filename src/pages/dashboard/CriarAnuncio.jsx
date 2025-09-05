import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Upload, 
  DollarSign, 
  Tag, 
  Image as ImageIcon,
  X,
  Loader2,
  Lock
} from 'lucide-react';
import { Textarea } from '../../components/ui/textarea';
import itemService from '../../services/itemService';
import { useToast } from '../../contexts/ToastContext';
import { useSubscription } from '../../hooks/useSubscription';

const CriarAnuncio = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showSuccess, showError } = useToast();
  const { canCreateAds, loading: loadingSubscription } = useSubscription();
  
  // Verificar se está editando
  const editId = searchParams.get('edit');
  const isEditing = !!editId;
  const [formData, setFormData] = useState({
    titulo: '',
    categoria: '',
    tipo: 'servico', // 'produto' ou 'servico'
    descricao: '',
    preco: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [novaCategoria, setNovaCategoria] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCategorias, setLoadingCategorias] = useState(true);
  const [loadingAnuncio, setLoadingAnuncio] = useState(false);
  const [errors, setErrors] = useState({});
  const [aceitaTermos, setAceitaTermos] = useState(false);

  const [categorias, setCategorias] = useState([]);

  // Função para formatar preço
  const formatPrice = (value) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    if (!numbers) return '';
    
    // Converte para centavos
    const cents = parseInt(numbers);
    
    // Formata como moeda brasileira
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(cents / 100);
  };

  // Função para extrair valor numérico do preço formatado
  const parsePrice = (formattedPrice) => {
    const numbers = formattedPrice.replace(/\D/g, '');
    return numbers ? (parseInt(numbers) / 100).toFixed(2) : '';
  };

  // Função para carregar dados do anúncio para edição
  const carregarAnuncio = async (id) => {
    try {
      setLoadingAnuncio(true);
      const response = await itemService.getItemById(id);
      console.log('Resposta da API para edição:', response);
      
      if (response.sucesso && response.dados) {
        const anuncio = response.dados.item || response.dados;
        console.log('Dados do anúncio extraídos:', anuncio);
        
        const dadosFormulario = {
          titulo: anuncio.titulo || '',
          categoria: anuncio.categoria || '',
          tipo: anuncio.tipo || 'servico',
          descricao: anuncio.descricao || '',
          preco: anuncio.preco ? formatPrice((parseFloat(anuncio.preco) * 100).toString()) : ''
        };
        
        console.log('Dados do formulário preparados:', dadosFormulario);
        setFormData(dadosFormulario);
        
        // Se houver imagem, definir preview
        if (anuncio.imagem) {
          setImagePreview(anuncio.imagem);
        }
      } else {
        showError('Erro ao carregar dados do anúncio');
        navigate('/dashboard/anuncios');
      }
    } catch (error) {
      console.error('Erro ao carregar anúncio:', error);
      showError('Erro ao carregar dados do anúncio');
      navigate('/dashboard/anuncios');
    } finally {
      setLoadingAnuncio(false);
    }
  };

  // Carregar categorias da API
  useEffect(() => {
    const carregarCategorias = async () => {
      try {
        setLoadingCategorias(true);
        const response = await itemService.getCategorias();
        if (response.sucesso) {
          setCategorias(response.dados.categorias || []);
        }
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
        // Fallback para categorias padrão em caso de erro
        setCategorias([
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
      } finally {
        setLoadingCategorias(false);
      }
    };

    carregarCategorias();
  }, []);

  // Carregar dados do anúncio se estiver editando
  useEffect(() => {
    if (isEditing && editId) {
      carregarAnuncio(editId);
    }
  }, [isEditing, editId]);

  // Verificar se pode criar anúncios
  useEffect(() => {
    if (!loadingSubscription && !canCreateAds) {
      showError('Você precisa de uma assinatura ativa para criar anúncios');
      navigate('/dashboard/pagamento');
    }
  }, [canCreateAds, loadingSubscription, navigate, showError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Formatação especial para preço
    if (name === 'preco') {
      const formattedPrice = formatPrice(value);
      setFormData(prev => ({
        ...prev,
        [name]: formattedPrice
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Validação em tempo real
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Validação específica em tempo real
    if (name === 'titulo' && value.trim().length > 0) {
      if (value.trim().length < 5) {
        setErrors(prev => ({
          ...prev,
          titulo: 'Título deve ter pelo menos 5 caracteres'
        }));
      } else if (value.trim().length > 200) {
        setErrors(prev => ({
          ...prev,
          titulo: 'Título deve ter no máximo 200 caracteres'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          titulo: ''
        }));
      }
    }

    if (name === 'descricao' && value.trim().length > 0) {
      if (value.trim().length < 10) {
        setErrors(prev => ({
          ...prev,
          descricao: 'Descrição deve ter pelo menos 10 caracteres'
        }));
      } else if (value.trim().length > 2000) {
        setErrors(prev => ({
          ...prev,
          descricao: 'Descrição deve ter no máximo 2000 caracteres'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          descricao: ''
        }));
      }
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
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        showError('Por favor, selecione apenas arquivos de imagem');
        return;
      }
      
      // Validar tamanho (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showError('O arquivo deve ter no máximo 5MB');
        return;
      }
      
      setSelectedFile(file);
      
      // Criar preview da imagem
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setImagePreview('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.titulo.trim()) {
      newErrors.titulo = 'Título é obrigatório';
    } else if (formData.titulo.trim().length < 5) {
      newErrors.titulo = 'Título deve ter pelo menos 5 caracteres';
    } else if (formData.titulo.trim().length > 200) {
      newErrors.titulo = 'Título deve ter no máximo 200 caracteres';
    }

    if (!formData.categoria) {
      newErrors.categoria = 'Categoria é obrigatória';
    }

    if (!formData.descricao.trim()) {
      newErrors.descricao = 'Descrição é obrigatória';
    } else if (formData.descricao.trim().length < 10) {
      newErrors.descricao = 'Descrição deve ter pelo menos 10 caracteres';
    } else if (formData.descricao.trim().length > 2000) {
      newErrors.descricao = 'Descrição deve ter no máximo 2000 caracteres';
    }

    if (!formData.preco.trim()) {
      newErrors.preco = 'Preço é obrigatório';
    }

    // Validar aceite de termos (apenas para criação, não para edição)
    if (!isEditing && !aceitaTermos) {
      newErrors.termos = 'Você deve aceitar os termos de uso e política de privacidade';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      if (isEditing) {
        // Atualizar anúncio existente
        const dadosAtualizacao = {
          titulo: formData.titulo,
          categoria: formData.categoria,
          tipo: formData.tipo,
          descricao: formData.descricao,
          preco: parsePrice(formData.preco)
        };

        // Se houver nova imagem, adicionar ao FormData
        if (selectedFile) {
          const formDataToSend = new FormData();
          Object.keys(dadosAtualizacao).forEach(key => {
            formDataToSend.append(key, dadosAtualizacao[key]);
          });
          formDataToSend.append('imagem', selectedFile);
          
          const response = await itemService.atualizarItemComArquivo(editId, formDataToSend);
          if (response.sucesso) {
            showSuccess('Anúncio atualizado com sucesso!');
            navigate('/dashboard/anuncios');
          } else {
            showError(response.mensagem || 'Erro ao atualizar anúncio');
          }
        } else {
          // Atualizar sem nova imagem
          const response = await itemService.atualizarItem(editId, dadosAtualizacao);
          if (response.sucesso) {
            showSuccess('Anúncio atualizado com sucesso!');
            navigate('/dashboard/anuncios');
          } else {
            showError(response.mensagem || 'Erro ao atualizar anúncio');
          }
        }
      } else {
        // Criar novo anúncio
        const formDataToSend = new FormData();
        formDataToSend.append('titulo', formData.titulo);
        formDataToSend.append('categoria', formData.categoria);
        formDataToSend.append('tipo', formData.tipo);
        formDataToSend.append('descricao', formData.descricao);
        formDataToSend.append('preco', parsePrice(formData.preco));
        
        // Adicionar arquivo se houver
        if (selectedFile) {
          formDataToSend.append('imagem', selectedFile);
        }

        const response = await itemService.criarItemComArquivo(formDataToSend);
        if (response.sucesso) {
          showSuccess('Anúncio criado com sucesso!');
          navigate('/dashboard/anuncios');
        } else {
          showError(response.mensagem || 'Erro ao criar anúncio');
        }
      }
    } catch (error) {
      console.error('Erro ao processar anúncio:', error);
      showError(error.message || 'Erro ao processar anúncio. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Mostrar loading enquanto verifica assinatura
  if (loadingSubscription) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Verificando assinatura...</p>
        </div>
      </div>
    );
  }

  // Mostrar loading enquanto carrega dados do anúncio para edição
  if (loadingAnuncio) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando dados do anúncio...</p>
        </div>
      </div>
    );
  }

  // Se não pode criar anúncios, mostrar mensagem
  if (!canCreateAds) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardContent className="text-center py-12">
            <Lock className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Assinatura Necessária
            </h2>
            <p className="text-gray-600 mb-6">
              Você precisa de uma assinatura ativa para criar anúncios.
            </p>
            <Button onClick={() => navigate('/dashboard/pagamento')}>
              Ver Planos de Assinatura
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
          
            <div>
              <h1 className="text-3xl font-bold text-[#1a1b1b]">
                {isEditing ? 'Editar Anúncio' : 'Criar Novo Anúncio'}
              </h1>
              <p className="text-gray-600">
                {isEditing 
                  ? 'Atualize as informações do seu anúncio' 
                  : 'Publique seu produto ou serviço para alcançar mais clientes'
                }
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
                  <Select 
                    value={formData.categoria} 
                    onValueChange={(value) => handleSelectChange('categoria', value)}
                    disabled={loadingCategorias}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={loadingCategorias ? "Carregando categorias..." : "Selecione a categoria"} />
                    </SelectTrigger>
                    <SelectContent>
                      {loadingCategorias ? (
                        <div className="flex items-center justify-center p-4">
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          <span>Carregando categorias...</span>
                        </div>
                      ) : (
                        <>
                          {categorias.map((categoria) => (
                            <SelectItem key={categoria} value={categoria}>
                              {categoria}
                            </SelectItem>
                          ))}
                          <SelectItem value="nova-categoria">
                            + Adicionar nova categoria
                          </SelectItem>
                        </>
                      )}
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
                <div className="flex justify-between items-center mt-1">
                  {errors.titulo && (
                    <p className="text-red-500 text-sm">{errors.titulo}</p>
                  )}
                  <p className={`text-sm ml-auto ${formData.titulo.length > 200 ? 'text-red-500' : 'text-gray-500'}`}>
                    {formData.titulo.length}/200
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  name="descricao"
                  placeholder="Descreva seu produto ou serviço em detalhes..."
                  value={formData.descricao}
                  onChange={handleInputChange}
                  rows={6}
                  className={`resize-none ${errors.descricao ? 'border-red-500' : ''}`}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.descricao && (
                    <p className="text-red-500 text-sm">{errors.descricao}</p>
                  )}
                  <p className={`text-sm ml-auto ${formData.descricao.length > 2000 ? 'text-red-500' : 'text-gray-500'}`}>
                    {formData.descricao.length}/2000
                  </p>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Use quebras de linha para organizar melhor sua descrição
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Preço */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Preço
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="preco">Preço</Label>
                <Input
                  id="preco"
                  name="preco"
                  placeholder="Digite o valor (ex: 50,00)"
                  value={formData.preco}
                  onChange={handleInputChange}
                  className={errors.preco ? 'border-red-500' : ''}
                />
                {errors.preco && (
                  <p className="text-red-500 text-sm mt-1">{errors.preco}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  O valor será formatado automaticamente
                </p>
              </div>
            </CardContent>
          </Card>


          {/* Imagem */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ImageIcon className="w-5 h-5 mr-2" />
                Imagem
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

              {imagePreview && (
                <div className="flex justify-center">
                  <div className="relative">
                    <img
                      src={imagePreview}
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

          {/* Aceite de Termos - Apenas para criação */}
          {!isEditing && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input
                      id="aceitaTermos"
                      type="checkbox"
                      checked={aceitaTermos}
                      onChange={(e) => setAceitaTermos(e.target.checked)}
                      className="rounded border-gray-300 text-[#f59820] focus:ring-[#f59820]"
                    />
                    <div className="flex-1">
                      <Label htmlFor="aceitaTermos" className="text-sm text-gray-700 cursor-pointer">
                        Eu aceito os{' '}
                        <a 
                          href="/termos" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#f59820] hover:text-[#e8891a] underline font-medium"
                        >
                          Termos de Uso
                        </a>
                        {' '}e{' '}
                        <a 
                          href="/privacidade" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#f59820] hover:text-[#e8891a] underline font-medium"
                        >
                          Política de Privacidade
                        </a>
                        {' '}do ViaBairro
                      </Label>
                      {errors.termos && (
                        <p className="text-red-500 text-sm mt-1">{errors.termos}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-blue-900">Importante</h4>
                        <p className="text-sm text-blue-800 mt-1">
                          Ao criar um anúncio, você concorda em cumprir nossas diretrizes de conteúdo e se responsabiliza pelas informações fornecidas.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

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
              disabled={isLoading || loadingAnuncio || (!isEditing && !aceitaTermos)}
            >
              {isLoading 
                ? (isEditing ? 'Atualizando...' : 'Criando...') 
                : (isEditing ? 'Atualizar Anúncio' : 'Criar Anúncio')
              }
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CriarAnuncio;
