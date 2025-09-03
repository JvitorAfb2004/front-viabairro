import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowLeft, MapPin, Clock, Eye, Heart, Share2, MessageCircle, Phone, Mail, Star, Shield, Calendar, User, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { anuncios } from '../data/mockData';

const DetalhesAnuncio = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anuncio, setAnuncio] = useState(null);
  const [imagemAtual, setImagemAtual] = useState(0);
  const [isFavorito, setIsFavorito] = useState(false);
  const [mostrarTelefone, setMostrarTelefone] = useState(false);
  const [anunciosRelacionados, setAnunciosRelacionados] = useState([]);

  useEffect(() => {
    // Buscar anúncio por ID
    const anuncioEncontrado = anuncios.find(a => a.id === parseInt(id));
    if (anuncioEncontrado) {
      setAnuncio(anuncioEncontrado);
      
      // Buscar anúncios relacionados (mesma categoria, exceto o atual)
      const relacionados = anuncios
        .filter(a => a.categoria === anuncioEncontrado.categoria && a.id !== anuncioEncontrado.id)
        .slice(0, 3);
      setAnunciosRelacionados(relacionados);
    } else {
      navigate('/buscar');
    }
  }, [id, navigate]);

  if (!anuncio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando anúncio...</p>
        </div>
      </div>
    );
  }

  const proximaImagem = () => {
    setImagemAtual((prev) => (prev + 1) % anuncio.imagens.length);
  };

  const imagemAnterior = () => {
    setImagemAtual((prev) => (prev - 1 + anuncio.imagens.length) % anuncio.imagens.length);
  };

  const compartilhar = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: anuncio.titulo,
          text: anuncio.descricao,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Erro ao compartilhar:', err);
      }
    } else {
      // Fallback: copiar URL
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatarPreco = (preco) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background com gradiente e padrões */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59820' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center text-slate-600 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFavorito(!isFavorito)}
                className={`${isFavorito ? 'text-red-500 hover:text-red-600' : 'text-slate-600 hover:text-red-500'} transition-colors duration-200`}
              >
                <Heart className={`w-5 h-5 ${isFavorito ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={compartilhar}
                className="text-slate-600 hover:text-orange-600 transition-colors duration-200"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Coluna Principal - Imagens e Detalhes */}
            <div className="lg:col-span-2 space-y-8">
              {/* Galeria de Imagens */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="bg-white/70 backdrop-blur-sm shadow-xl border border-white/20 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="aspect-video bg-slate-100 relative overflow-hidden">
                        <img
                          src={anuncio.imagens[imagemAtual]}
                          alt={`${anuncio.titulo} - Imagem ${imagemAtual + 1}`}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Navegação das imagens */}
                        {anuncio.imagens.length > 1 && (
                          <>
                            <button
                              onClick={imagemAnterior}
                              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                            >
                              <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                              onClick={proximaImagem}
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                            >
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </>
                        )}
                        
                        {/* Indicador de imagem */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                          {imagemAtual + 1} / {anuncio.imagens.length}
                        </div>
                      </div>
                      
                      {/* Miniaturas */}
                      {anuncio.imagens.length > 1 && (
                        <div className="p-4">
                          <div className="flex space-x-2 overflow-x-auto">
                            {anuncio.imagens.map((imagem, index) => (
                              <button
                                key={index}
                                onClick={() => setImagemAtual(index)}
                                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                                  index === imagemAtual ? 'border-orange-500' : 'border-transparent'
                                }`}
                              >
                                <img
                                  src={imagem}
                                  alt={`Miniatura ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Informações do Anúncio */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="bg-white/70 backdrop-blur-sm shadow-xl border border-white/20">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                          {anuncio.categoria}
                        </span>
                        <div className="flex items-center text-slate-500 text-sm">
                          <Eye className="w-4 h-4 mr-1" />
                          {anuncio.visualizacoes} visualizações
                        </div>
                      </div>
                      
                      <h1 className="text-3xl font-bold text-slate-800 mb-4">{anuncio.titulo}</h1>
                      
                      <div className="flex items-center text-slate-600 mb-4">
                        <MapPin className="w-5 h-5 mr-2 text-orange-500" />
                        <span>{anuncio.localizacao}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">
                          {formatarPreco(anuncio.preco)}
                        </div>
                        <div className="flex items-center text-slate-500 text-sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          Publicado em {formatarData(anuncio.dataPublicacao)}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-200 pt-6">
                      <h3 className="text-xl font-bold text-slate-800 mb-4">Descrição</h3>
                      <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                        {anuncio.descricao}
                      </p>
                    </div>

                    {/* Características */}
                    {anuncio.caracteristicas && anuncio.caracteristicas.length > 0 && (
                      <div className="border-t border-slate-200 pt-6 mt-6">
                        <h3 className="text-xl font-bold text-slate-800 mb-4">Características</h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          {anuncio.caracteristicas.map((caracteristica, index) => (
                            <div key={index} className="flex items-center">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                              <span className="text-slate-600">{caracteristica}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar - Contato e Informações */}
            <div className="space-y-6">
              {/* Card de Contato */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Card className="bg-white/70 backdrop-blur-sm shadow-xl border border-white/20 sticky top-8">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">{anuncio.vendedor.nome}</h3>
                      <div className="flex items-center justify-center mt-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < anuncio.vendedor.avaliacao
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-slate-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-slate-600 text-sm ml-2">
                          ({anuncio.vendedor.totalAvaliacoes} avaliações)
                        </span>
                      </div>
                      <div className="flex items-center justify-center mt-2 text-sm text-slate-600">
                        <Shield className="w-4 h-4 mr-1 text-green-500" />
                        Perfil verificado
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button
                        className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
                      >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Enviar Mensagem
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={() => setMostrarTelefone(!mostrarTelefone)}
                        className="w-full border-orange-200 text-orange-600 hover:bg-orange-50 py-3 rounded-xl font-semibold transition-all duration-200"
                      >
                        <Phone className="w-5 h-5 mr-2" />
                        {mostrarTelefone ? anuncio.vendedor.telefone : 'Ver Telefone'}
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="w-full border-slate-200 text-slate-600 hover:bg-slate-50 py-3 rounded-xl font-semibold transition-all duration-200"
                      >
                        <Mail className="w-5 h-5 mr-2" />
                        Enviar Email
                      </Button>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-200">
                      <div className="text-center text-sm text-slate-600">
                        <div className="flex items-center justify-center mb-2">
                          <Clock className="w-4 h-4 mr-1" />
                          Membro desde {formatarData(anuncio.vendedor.membroDesde)}
                        </div>
                        <div>
                          {anuncio.vendedor.totalAnuncios} anúncios publicados
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Anúncios Relacionados */}
              {anunciosRelacionados.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Card className="bg-white/70 backdrop-blur-sm shadow-xl border border-white/20">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold text-slate-800 mb-4">Anúncios Relacionados</h3>
                      <div className="space-y-4">
                        {anunciosRelacionados.map((anuncioRel) => (
                          <Link
                            key={anuncioRel.id}
                            to={`/anuncio/${anuncioRel.id}`}
                            className="block hover:bg-slate-50 p-3 rounded-lg transition-colors duration-200"
                          >
                            <div className="flex space-x-3">
                              <img
                                src={anuncioRel.imagens[0]}
                                alt={anuncioRel.titulo}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-slate-800 text-sm truncate">
                                  {anuncioRel.titulo}
                                </h4>
                                <p className="text-orange-600 font-bold text-sm">
                                  {formatarPreco(anuncioRel.preco)}
                                </p>
                                <p className="text-slate-500 text-xs flex items-center">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {anuncioRel.localizacao}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalhesAnuncio;