import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { 
  User, 
  Package, 
  MessageCircle, 
  Eye, 
  Heart, 
  TrendingUp, 
  Calendar, 
  MapPin, 
  Star, 
  Plus, 
  Settings, 
  CreditCard, 
  Bell, 
  BarChart3,
  Users,
  ShoppingBag,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign
} from 'lucide-react';
import { motion } from 'motion/react';
import { mockAnuncios } from '../../data/mockData';

const Dashboard = () => {
  const [usuario, setUsuario] = useState({
    nome: 'João Silva',
    email: 'joao.silva@email.com',
    telefone: '(11) 99999-9999',
    cidade: 'São Paulo',
    estado: 'SP',
    membro_desde: '2024-01-15',
    plano: 'Premium',
    avatar: null
  });

  const [estatisticas, setEstatisticas] = useState({
    anuncios_ativos: 12,
    anuncios_vendidos: 8,
    visualizacoes_total: 1247,
    mensagens_nao_lidas: 5,
    favoritos_recebidos: 23,
    avaliacao_media: 4.8,
    vendas_mes: 2450.00
  });

  const [anunciosRecentes, setAnunciosRecentes] = useState([]);
  const [mensagensRecentes, setMensagensRecentes] = useState([
    {
      id: 1,
      remetente: 'Maria Santos',
      anuncio: 'iPhone 13 Pro Max',
      mensagem: 'Ainda está disponível?',
      tempo: '2 min atrás',
      nao_lida: true
    },
    {
      id: 2,
      remetente: 'Carlos Lima',
      anuncio: 'Notebook Dell',
      mensagem: 'Aceita R$ 2.800?',
      tempo: '15 min atrás',
      nao_lida: true
    },
    {
      id: 3,
      remetente: 'Ana Costa',
      anuncio: 'Bicicleta Speed',
      mensagem: 'Obrigada pela compra!',
      tempo: '1 hora atrás',
      nao_lida: false
    }
  ]);

  const [atividadesRecentes, setAtividadesRecentes] = useState([
    {
      id: 1,
      tipo: 'venda',
      descricao: 'iPhone 13 Pro Max foi vendido',
      valor: 'R$ 4.200,00',
      tempo: '2 horas atrás',
      icon: CheckCircle,
      cor: 'text-green-600'
    },
    {
      id: 2,
      tipo: 'anuncio',
      descricao: 'Novo anúncio publicado: Notebook Dell',
      tempo: '1 dia atrás',
      icon: Plus,
      cor: 'text-blue-600'
    },
    {
      id: 3,
      tipo: 'avaliacao',
      descricao: 'Recebeu avaliação 5 estrelas',
      tempo: '2 dias atrás',
      icon: Star,
      cor: 'text-yellow-600'
    },
    {
      id: 4,
      tipo: 'alerta',
      descricao: 'Anúncio expira em 3 dias',
      tempo: '3 dias atrás',
      icon: AlertCircle,
      cor: 'text-orange-600'
    }
  ]);

  useEffect(() => {
    // Simular carregamento dos anúncios do usuário
    const anunciosUsuario = mockAnuncios.slice(0, 4).map(anuncio => ({
      ...anuncio,
      status: Math.random() > 0.5 ? 'ativo' : 'vendido',
      visualizacoes: Math.floor(Math.random() * 200) + 50,
      mensagens: Math.floor(Math.random() * 10) + 1
    }));
    setAnunciosRecentes(anunciosUsuario);
  }, []);

  const cartoes = [
    {
      titulo: 'Anúncios Ativos',
      valor: estatisticas.anuncios_ativos,
      icon: Package,
      cor: 'from-blue-500 to-blue-600',
      link: '/dashboard/meus-anuncios'
    },
    {
      titulo: 'Visualizações',
      valor: estatisticas.visualizacoes_total.toLocaleString(),
      icon: Eye,
      cor: 'from-green-500 to-green-600',
      link: '/dashboard/meus-anuncios'
    },
    {
      titulo: 'Mensagens',
      valor: estatisticas.mensagens_nao_lidas,
      icon: MessageCircle,
      cor: 'from-purple-500 to-purple-600',
      badge: estatisticas.mensagens_nao_lidas > 0,
      link: '/dashboard/mensagens'
    },
    {
      titulo: 'Vendas do Mês',
      valor: `R$ ${estatisticas.vendas_mes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icon: DollarSign,
      cor: 'from-orange-500 to-orange-600',
      link: '/dashboard/vendas'
    }
  ];

  const acoes = [
    {
      titulo: 'Criar Anúncio',
      descricao: 'Publique um novo produto',
      icon: Plus,
      cor: 'from-blue-500 to-blue-600',
      link: '/dashboard/criar-anuncio'
    },
    {
      titulo: 'Meus Anúncios',
      descricao: 'Gerencie seus anúncios',
      icon: Package,
      cor: 'from-green-500 to-green-600',
      link: '/dashboard/meus-anuncios'
    },
    {
      titulo: 'Dados da Conta',
      descricao: 'Edite suas informações',
      icon: User,
      cor: 'from-purple-500 to-purple-600',
      link: '/dashboard/dados-conta'
    },
    {
      titulo: 'Planos',
      descricao: 'Gerencie sua assinatura',
      icon: CreditCard,
      cor: 'from-orange-500 to-orange-600',
      link: '/dashboard/pagamento'
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
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">
                  Olá, {usuario.nome.split(' ')[0]}! 👋
                </h1>
                <p className="text-slate-600">
                  Bem-vindo ao seu dashboard. Aqui você pode gerenciar todos os seus anúncios e configurações.
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center space-x-3">
                <Badge 
                  variant={usuario.plano === 'Premium' ? 'default' : 'secondary'}
                  className={usuario.plano === 'Premium' ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white' : ''}
                >
                  {usuario.plano}
                </Badge>
                <div className="flex items-center text-sm text-slate-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  {usuario.cidade}, {usuario.estado}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cartões de Estatísticas */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {cartoes.map((cartao, index) => {
              const Icon = cartao.icon;
              return (
                <Link key={index} to={cartao.link}>
                  <Card className="bg-white/70 backdrop-blur-sm shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-600 mb-1">
                            {cartao.titulo}
                          </p>
                          <p className="text-2xl font-bold text-slate-800">
                            {cartao.valor}
                          </p>
                        </div>
                        <div className={`w-12 h-12 bg-gradient-to-r ${cartao.cor} rounded-xl flex items-center justify-center relative`}>
                          <Icon className="w-6 h-6 text-white" />
                          {cartao.badge && (
                            <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                              <span className="text-xs text-white font-bold">
                                {estatisticas.mensagens_nao_lidas}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ações Rápidas */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-white/70 backdrop-blur-sm shadow-xl border border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-slate-800">
                    <Settings className="w-5 h-5 mr-2" />
                    Ações Rápidas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {acoes.map((acao, index) => {
                    const Icon = acao.icon;
                    return (
                      <Link key={index} to={acao.link}>
                        <div className="flex items-center p-3 rounded-xl hover:bg-slate-50 transition-colors duration-200 cursor-pointer group">
                          <div className={`w-10 h-10 bg-gradient-to-r ${acao.cor} rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800 group-hover:text-slate-900">
                              {acao.titulo}
                            </p>
                            <p className="text-sm text-slate-600">
                              {acao.descricao}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>

            {/* Anúncios Recentes */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="bg-white/70 backdrop-blur-sm shadow-xl border border-white/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-slate-800">
                      <Package className="w-5 h-5 mr-2" />
                      Meus Anúncios Recentes
                    </CardTitle>
                    <Link to="/dashboard/meus-anuncios">
                      <Button variant="outline" size="sm">
                        Ver todos
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {anunciosRecentes.map((anuncio, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors duration-200">
                        <div className="flex items-center">
                          <img
                            src={anuncio.imagens[0]}
                            alt={anuncio.titulo}
                            className="w-12 h-12 rounded-lg object-cover mr-4"
                          />
                          <div>
                            <h4 className="font-semibold text-slate-800">
                              {anuncio.titulo}
                            </h4>
                            <p className="text-sm text-slate-600">
                              {anuncio.preco}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <p className="text-sm font-semibold text-slate-800">
                              {anuncio.visualizacoes}
                            </p>
                            <p className="text-xs text-slate-600">visualizações</p>
                          </div>
                          
                          <Badge 
                            variant={anuncio.status === 'ativo' ? 'default' : 'secondary'}
                            className={anuncio.status === 'ativo' ? 'bg-green-500 text-white' : 'bg-slate-500 text-white'}
                          >
                            {anuncio.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Mensagens Recentes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-white/70 backdrop-blur-sm shadow-xl border border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-slate-800">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Mensagens Recentes
                    {estatisticas.mensagens_nao_lidas > 0 && (
                      <Badge className="ml-2 bg-red-500 text-white">
                        {estatisticas.mensagens_nao_lidas}
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mensagensRecentes.map((mensagem) => (
                      <div key={mensagem.id} className={`p-3 rounded-xl border transition-colors duration-200 ${
                        mensagem.nao_lida ? 'border-blue-200 bg-blue-50' : 'border-slate-100 hover:bg-slate-50'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <p className="font-semibold text-slate-800 mr-2">
                                {mensagem.remetente}
                              </p>
                              {mensagem.nao_lida && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                            <p className="text-sm text-slate-600 mb-1">
                              {mensagem.anuncio}
                            </p>
                            <p className="text-sm text-slate-700">
                              {mensagem.mensagem}
                            </p>
                          </div>
                          <p className="text-xs text-slate-500">
                            {mensagem.tempo}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Atividades Recentes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="bg-white/70 backdrop-blur-sm shadow-xl border border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-slate-800">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Atividades Recentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {atividadesRecentes.map((atividade) => {
                      const Icon = atividade.icon;
                      return (
                        <div key={atividade.id} className="flex items-start">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${atividade.cor} bg-opacity-10`}>
                            <Icon className={`w-4 h-4 ${atividade.cor}`} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-slate-800 mb-1">
                              {atividade.descricao}
                              {atividade.valor && (
                                <span className="font-semibold text-green-600 ml-1">
                                  {atividade.valor}
                                </span>
                              )}
                            </p>
                            <p className="text-xs text-slate-500">
                              {atividade.tempo}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;