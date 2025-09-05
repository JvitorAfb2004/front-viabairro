import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowLeft, MapPin, Clock, Eye, Share2, MessageCircle, Phone, Mail, Calendar, User, Camera, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import publicService from '../services/publicService';

const DetalhesAnuncio = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [anuncio, setAnuncio] = useState(null);
  const [imagemAtual, setImagemAtual] = useState(0);
  const [mostrarTelefone, setMostrarTelefone] = useState(false);
  const [anunciosRelacionados, setAnunciosRelacionados] = useState([]);
  const [anunciosDoUsuario, setAnunciosDoUsuario] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarAnuncio = async () => {
      try {
        setLoading(true);
        
        // Buscar anúncio por slug
        const response = await publicService.getAnuncioPublico(slug);
        if (response.sucesso) {
          const anuncioData = response.dados.item;
          setAnuncio(anuncioData);
          
          // Buscar anúncios relacionados por categoria
          const relacionadosResponse = await publicService.getAnunciosRelacionados(
            anuncioData.categoria, 
            anuncioData.id, 
            3
          );
          if (relacionadosResponse.sucesso) {
            setAnunciosRelacionados(relacionadosResponse.dados.anuncios);
          }

          // Buscar anúncios do mesmo usuário
          const anunciosUsuarioResponse = await publicService.getAnunciosDoUsuario(
            anuncioData.usuarioId,
            anuncioData.id,
            5
          );
          if (anunciosUsuarioResponse.sucesso) {
            setAnunciosDoUsuario(anunciosUsuarioResponse.dados.anuncios);
          }
        } else {
          navigate('/buscar');
        }
      } catch (error) {
        console.error('Erro ao carregar anúncio:', error);
        navigate('/buscar');
      } finally {
        setLoading(false);
      }
    };

    carregarAnuncio();
  }, [slug, navigate]);

  if (loading || !anuncio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Carregando anúncio...</p>
        </div>
      </div>
    );
  }

  const imagens = anuncio.imagem ? [anuncio.imagem] : ['/logo.png'];
  
  const proximaImagem = () => {
    setImagemAtual((prev) => (prev + 1) % imagens.length);
  };

  const imagemAnterior = () => {
    setImagemAtual((prev) => (prev - 1 + imagens.length) % imagens.length);
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

  const gerarLinkWhatsApp = (telefone) => {
    // Remove todos os caracteres não numéricos
    const numeroLimpo = telefone.replace(/\D/g, '');
    
    // Adiciona +55 se não começar com 55
    const numeroCompleto = numeroLimpo.startsWith('55') ? numeroLimpo : `55${numeroLimpo}`;
    
    return `https://wa.me/${numeroCompleto}`;
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
                          src={imagens[imagemAtual]}
                          alt={`${anuncio.titulo} - Imagem ${imagemAtual + 1}`}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Navegação das imagens */}
                        {imagens.length > 1 && (
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
                          {imagemAtual + 1} / {imagens.length}
                        </div>
                      </div>
                      
                      {/* Miniaturas */}
                      {imagens.length > 1 && (
                        <div className="p-4">
                          <div className="flex space-x-2 overflow-x-auto">
                            {imagens.map((imagem, index) => (
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
                      
                      {anuncio.usuario.cidade && anuncio.usuario.estado && (
                        <div className="flex items-center text-slate-600 mb-4">
                          <MapPin className="w-5 h-5 mr-2 text-orange-500" />
                          <span>{anuncio.usuario.cidade}, {anuncio.usuario.estado}</span>
                        </div>
                      )}
                      
                                              <div className="flex items-center justify-between">
                          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">
                            {formatarPreco(anuncio.preco)}
                          </div>
                          <div className="flex items-center text-slate-500 text-sm">
                            <Calendar className="w-4 h-4 mr-1" />
                            Publicado em {formatarData(anuncio.createdAt)}
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
                      <h3 className="text-lg font-bold text-slate-800">{anuncio.usuario.nome}</h3>
                    </div>

                    <div className="space-y-3">
                      {anuncio.usuario.telefone && (
                        <Button
                          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
                          onClick={() => window.open(gerarLinkWhatsApp(anuncio.usuario.telefone), '_blank')}
                        >
                          <MessageCircle className="w-5 h-5 mr-2" />
                          Enviar WhatsApp
                        </Button>
                      )}
                      
                      {anuncio.usuario.telefone && (
                        <Button
                          variant="outline"
                          onClick={() => setMostrarTelefone(!mostrarTelefone)}
                          className="w-full border-orange-200 text-orange-600 hover:bg-orange-50 py-3 rounded-xl font-semibold transition-all duration-200"
                        >
                          <Phone className="w-5 h-5 mr-2" />
                          {mostrarTelefone ? anuncio.usuario.telefone : 'Ver Telefone'}
                        </Button>
                      )}
                      
                      {anuncio.usuario.email && (
                        <Button
                          variant="outline"
                          className="w-full border-slate-200 text-slate-600 hover:bg-slate-50 py-3 rounded-xl font-semibold transition-all duration-200"
                        >
                          <Mail className="w-5 h-5 mr-2" />
                          {anuncio.usuario.email}
                        </Button>
                      )}
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-200">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-slate-800 mb-3">Informações do Anunciante</h4>
                        
                        {anuncio.usuario.descricao && (
                          <div className="text-sm text-slate-600">
                            <p className="font-medium text-slate-700 mb-1">Sobre:</p>
                            <p className="leading-relaxed">{anuncio.usuario.descricao}</p>
                          </div>
                        )}
                        
                        {anuncio.usuario.endereco && (
                          <div className="text-sm text-slate-600">
                            <p className="font-medium text-slate-700 mb-1">Endereço:</p>
                            <p className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {anuncio.usuario.endereco} - {anuncio.usuario.cidade} - {anuncio.usuario.estado}
                            </p>
                          </div>
                        )}
                        
                        {anuncio.usuario.redes_sociais && (
                          <div className="text-sm text-slate-600">
                            <p className="font-medium text-slate-700 mb-2">Redes Sociais:</p>
                            <div className="flex space-x-2">
                              {anuncio.usuario.redes_sociais.instagram && (
                                <a 
                                  href={anuncio.usuario.redes_sociais.instagram} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-orange-600 hover:text-orange-700"
                                >
                                  Instagram
                                </a>
                              )}
                              {anuncio.usuario.redes_sociais.facebook && (
                                <a 
                                  href={anuncio.usuario.redes_sociais.facebook} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-orange-600 hover:text-orange-700"
                                >
                                  Facebook
                                </a>
                              )}
                              {anuncio.usuario.redes_sociais.website && (
                                <a 
                                  href={anuncio.usuario.redes_sociais.website} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-orange-600 hover:text-orange-700"
                                >
                                  Website
                                </a>
                              )}
                            </div>
                          </div>
                        )}
                        
                        <div className="text-center text-sm text-slate-600 pt-3 border-t border-slate-200">
                          <div className="flex items-center justify-center mb-2">
                            <Clock className="w-4 h-4 mr-1" />
                            Membro desde {formatarData(anuncio.usuario.createdAt)}
                          </div>
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
                      <h3 className="text-lg font-bold text-slate-800 mb-4">Outros Anúncios de {anuncio.usuario.nome}</h3>
                      <div className="space-y-4">
                        {anunciosRelacionados.map((anuncioRel) => (
                          <Link
                            key={anuncioRel.id}
                            to={`/anuncio/${anuncioRel.slug}`}
                            className="block hover:bg-slate-50 p-3 rounded-lg transition-colors duration-200"
                          >
                            <div className="flex space-x-3">
                              <img
                                src={anuncioRel.imagem || '/logo.png'}
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
                                {anuncioRel.usuario.cidade && anuncioRel.usuario.estado && (
                                  <p className="text-slate-500 text-xs flex items-center">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {anuncioRel.usuario.cidade}, {anuncioRel.usuario.estado}
                                  </p>
                                )}
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

          {/* Seção de Anúncios do Mesmo Usuário */}
          {anunciosDoUsuario.length > 0 && (
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">
                  Outros Anúncios de {anuncio.usuario.nome}
                </h2>
                <p className="text-slate-600">
                  Confira mais anúncios deste anunciante
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {anunciosDoUsuario.map((anuncioUsuario) => (
                  <motion.div
                    key={anuncioUsuario.id}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link to={`/anuncio/${anuncioUsuario.slug}`}>
                      <Card className="bg-white/70 backdrop-blur-sm shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                        <CardContent className="p-0">
                          <div className="aspect-square bg-slate-100 relative overflow-hidden">
                            <img
                              src={anuncioUsuario.imagem || '/logo.png'}
                              alt={anuncioUsuario.titulo}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-2 left-2">
                              <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                {anuncioUsuario.categoria}
                              </span>
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <h3 className="font-bold text-slate-800 text-sm mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-200">
                              {anuncioUsuario.titulo}
                            </h3>
                            
                            <div className="text-orange-600 font-bold text-lg mb-2">
                              {formatarPreco(anuncioUsuario.preco)}
                            </div>
                            
                            {anuncioUsuario.usuario.cidade && anuncioUsuario.usuario.estado && (
                              <div className="flex items-center text-slate-500 text-xs">
                                <MapPin className="w-3 h-3 mr-1" />
                                <span className="truncate">
                                  {anuncioUsuario.usuario.cidade}, {anuncioUsuario.usuario.estado}
                                </span>
                              </div>
                            )}
                            
                            <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
                              <div className="flex items-center">
                                <Eye className="w-3 h-3 mr-1" />
                                {anuncioUsuario.visualizacoes}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {formatarData(anuncioUsuario.createdAt)}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalhesAnuncio;