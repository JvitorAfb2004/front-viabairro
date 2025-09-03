import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowLeft, Play, CheckCircle, Users, Search, MessageCircle, ShieldCheck, Star, ArrowRight, Smartphone, Globe, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ComoFunciona = () => {
  const [etapaAtiva, setEtapaAtiva] = useState(1);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const etapas = [
    {
      id: 1,
      titulo: 'Cadastre-se',
      descricao: 'Crie sua conta gratuita em poucos minutos',
      detalhes: 'Preencha seus dados básicos, confirme seu email e telefone. É rápido, seguro e totalmente gratuito.',
      icon: Users,
      cor: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      titulo: 'Busque ou Anuncie',
      descricao: 'Encontre o que precisa ou venda seus produtos',
      detalhes: 'Use nossos filtros avançados para encontrar produtos ou crie anúncios com fotos e descrições detalhadas.',
      icon: Search,
      cor: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      titulo: 'Conecte-se',
      descricao: 'Entre em contato direto com compradores e vendedores',
      detalhes: 'Use nosso chat interno, WhatsApp ou telefone para negociar preços e combinar a entrega.',
      icon: MessageCircle,
      cor: 'from-purple-500 to-purple-600'
    },
    {
      id: 4,
      titulo: 'Negocie com Segurança',
      descricao: 'Finalize sua compra ou venda com tranquilidade',
      detalhes: 'Encontre-se em locais seguros, verifique o produto e avalie sua experiência para ajudar outros usuários.',
      icon: ShieldCheck,
      cor: 'from-orange-500 to-orange-600'
    }
  ];

  const beneficios = [
    {
      icon: Globe,
      titulo: 'Alcance Nacional',
      descricao: 'Venda para todo o Brasil ou encontre produtos em qualquer região'
    },
    {
      icon: Smartphone,
      titulo: 'Fácil de Usar',
      descricao: 'Interface intuitiva que funciona perfeitamente no celular e computador'
    },
    {
      icon: ShieldCheck,
      titulo: 'Seguro e Confiável',
      descricao: 'Sistema de avaliações e verificação de usuários para sua segurança'
    },
    {
      icon: Star,
      titulo: 'Gratuito',
      descricao: 'Anuncie e compre sem taxas. Planos premium opcionais para mais destaque'
    },
    {
      icon: MapPin,
      titulo: 'Busca por Localização',
      descricao: 'Encontre produtos próximos a você e economize no frete'
    },
    {
      icon: MessageCircle,
      titulo: 'Chat Integrado',
      descricao: 'Converse diretamente com vendedores sem sair da plataforma'
    }
  ];

  const dicas = [
    {
      titulo: 'Para Vendedores',
      itens: [
        'Use fotos de boa qualidade e bem iluminadas',
        'Escreva descrições detalhadas e honestas',
        'Responda rapidamente às mensagens',
        'Mantenha seus preços competitivos',
        'Seja pontual nos encontros marcados'
      ]
    },
    {
      titulo: 'Para Compradores',
      itens: [
        'Leia toda a descrição do produto',
        'Verifique as avaliações do vendedor',
        'Faça perguntas antes de comprar',
        'Prefira encontros em locais públicos',
        'Teste o produto antes de pagar'
      ]
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background com gradiente e padrões */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.03'%3E%3Cpath d='M30 30l15-15v30l-15-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-200/20 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-200/20 to-transparent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/">
              <Button
                variant="ghost"
                className="flex items-center text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 mb-8"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao início
              </Button>
            </Link>
          </motion.div>

          {/* Hero Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4">
                <Play className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-slate-800">Como Funciona</h1>
            </div>
            
            <h2 className="text-3xl font-bold text-slate-700 mb-4">
              Comprar e vender nunca foi
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
                tão simples
              </span>
            </h2>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Descubra como a Via Bairro conecta pessoas e facilita negócios em todo o Brasil.
            </p>

            {/* Video Placeholder */}
            <div className="max-w-4xl mx-auto">
              <Card className="bg-white/70 backdrop-blur-sm shadow-xl border border-white/20 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233b82f6' fill-opacity='0.1'%3E%3Cpolygon points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                    
                    {!videoPlaying ? (
                      <motion.button
                        onClick={() => setVideoPlaying(true)}
                        className="relative z-10 w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-110"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Play className="w-8 h-8 ml-1" />
                      </motion.button>
                    ) : (
                      <div className="relative z-10 text-white text-center">
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-lg">Carregando vídeo...</p>
                      </div>
                    )}
                    
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm opacity-80">Vídeo explicativo - 3 minutos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Etapas */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-800 mb-4">Como Começar</h3>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Siga estes 4 passos simples para começar a usar a Via Bairro
              </p>
            </div>

            {/* Navegação das Etapas */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {etapas.map((etapa) => {
                const Icon = etapa.icon;
                return (
                  <Button
                    key={etapa.id}
                    variant={etapaAtiva === etapa.id ? 'default' : 'outline'}
                    onClick={() => setEtapaAtiva(etapa.id)}
                    className={`flex items-center space-x-2 transition-all duration-200 ${
                      etapaAtiva === etapa.id
                        ? `bg-gradient-to-r ${etapa.cor} text-white hover:opacity-90`
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                      {etapa.id}
                    </span>
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{etapa.titulo}</span>
                  </Button>
                );
              })}
            </div>

            {/* Conteúdo da Etapa Ativa */}
            <AnimatePresence mode="wait">
              {etapas.map((etapa) => {
                if (etapa.id !== etapaAtiva) return null;
                const Icon = etapa.icon;
                
                return (
                  <motion.div
                    key={etapa.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="bg-white/70 backdrop-blur-sm shadow-xl border border-white/20 max-w-4xl mx-auto">
                      <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row items-center">
                          <div className="md:w-1/3 mb-6 md:mb-0">
                            <div className={`w-24 h-24 bg-gradient-to-r ${etapa.cor} rounded-3xl flex items-center justify-center mx-auto mb-4`}>
                              <Icon className="w-12 h-12 text-white" />
                            </div>
                          </div>
                          
                          <div className="md:w-2/3 text-center md:text-left">
                            <h4 className="text-2xl font-bold text-slate-800 mb-4">
                              Etapa {etapa.id}: {etapa.titulo}
                            </h4>
                            <p className="text-lg text-slate-600 mb-4">
                              {etapa.descricao}
                            </p>
                            <p className="text-slate-700 leading-relaxed">
                              {etapa.detalhes}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Benefícios */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-800 mb-4">Por que escolher a Via Bairro?</h3>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Descubra as vantagens que fazem da Via Bairro a melhor escolha
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {beneficios.map((beneficio, index) => {
                const Icon = beneficio.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-white/70 backdrop-blur-sm shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 h-full">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-slate-800 mb-3">
                          {beneficio.titulo}
                        </h4>
                        <p className="text-slate-600 leading-relaxed">
                          {beneficio.descricao}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Dicas */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-800 mb-4">Dicas para o Sucesso</h3>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Siga essas dicas para ter a melhor experiência na plataforma
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {dicas.map((categoria, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="bg-white/70 backdrop-blur-sm shadow-xl border border-white/20 h-full">
                    <CardContent className="p-8">
                      <h4 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                        {categoria.titulo}
                      </h4>
                      <div className="space-y-4">
                        {categoria.itens.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <p className="text-slate-700">{item}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Card className="bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-xl border border-white/20 max-w-4xl mx-auto">
              <CardContent className="p-12">
                <div className="relative">
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233b82f6' fill-opacity='0.1'%3E%3Cpolygon points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`n                  }}></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-3xl font-bold mb-4">
                      Pronto para começar?
                    </h3>
                    <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                      Junte-se a milhares de pessoas que já descobriram uma nova forma de comprar e vender.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link to="/cadastro">
                        <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center">
                          Criar Conta Gratuita
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </Link>
                      <Link to="/buscar">
                        <Button variant="outline" className="border-white text-white hover:bg-white hover:text-slate-800 px-8 py-4 rounded-xl font-semibold transition-all duration-200">
                          Explorar Anúncios
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ComoFunciona;