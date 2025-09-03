import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { ArrowLeft, Search, ChevronDown, ChevronUp, HelpCircle, MessageCircle, Shield, CreditCard, Users, Settings } from 'lucide-react';

const FAQ = () => {
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('todas');
  const [perguntaAberta, setPerguntaAberta] = useState(null);

  const categorias = [
    { id: 'todas', nome: 'Todas', icon: HelpCircle },
    { id: 'conta', nome: 'Conta e Perfil', icon: Users },
    { id: 'anuncios', nome: 'Anúncios', icon: MessageCircle },
    { id: 'pagamentos', nome: 'Pagamentos', icon: CreditCard },
    { id: 'seguranca', nome: 'Segurança', icon: Shield },
    { id: 'configuracoes', nome: 'Configurações', icon: Settings }
  ];

  const perguntas = [
    {
      id: 1,
      categoria: 'conta',
      pergunta: 'Como criar uma conta no Via Bairro?',
      resposta: 'Para criar uma conta, clique em "Cadastrar" no topo da página, preencha seus dados pessoais (nome, email, telefone) e crie uma senha segura. Você receberá um email de confirmação para ativar sua conta.'
    },
    {
      id: 2,
      categoria: 'conta',
      pergunta: 'Esqueci minha senha, como recuperar?',
      resposta: 'Na página de login, clique em "Esqueci minha senha", digite seu email cadastrado e você receberá um link para redefinir sua senha. O link é válido por 24 horas.'
    },
    {
      id: 3,
      categoria: 'conta',
      pergunta: 'Como alterar meus dados pessoais?',
      resposta: 'Acesse seu Dashboard, vá em "Dados da Conta" e edite as informações que desejar. Lembre-se de salvar as alterações. Para alterar email ou telefone, será necessário confirmar a alteração.'
    },
    {
      id: 4,
      categoria: 'anuncios',
      pergunta: 'Como criar um anúncio?',
      resposta: 'Faça login em sua conta, clique em "Anunciar" ou "Criar Anúncio", escolha a categoria, preencha as informações do produto/serviço, adicione fotos (até 10 imagens) e publique. Anúncios básicos são gratuitos.'
    },
    {
      id: 5,
      categoria: 'anuncios',
      pergunta: 'Quantas fotos posso adicionar em um anúncio?',
      resposta: 'Você pode adicionar até 10 fotos por anúncio. Recomendamos usar imagens de boa qualidade e que mostrem diferentes ângulos do produto. A primeira foto será a capa do anúncio.'
    },
    {
      id: 6,
      categoria: 'anuncios',
      pergunta: 'Como editar ou excluir meu anúncio?',
      resposta: 'No seu Dashboard, vá em "Meus Anúncios", encontre o anúncio desejado e clique em "Editar" ou "Excluir". Você pode editar informações, fotos e preço a qualquer momento.'
    },
    {
      id: 7,
      categoria: 'anuncios',
      pergunta: 'Por quanto tempo meu anúncio fica ativo?',
      resposta: 'Anúncios gratuitos ficam ativos por 60 dias. Anúncios premium podem ficar ativos por até 90 dias. Você pode renovar ou reativar anúncios expirados a qualquer momento.'
    },
    {
      id: 8,
      categoria: 'pagamentos',
      pergunta: 'Quais são os planos disponíveis?',
      resposta: 'Oferecemos plano Gratuito (anúncios básicos), Premium (R$ 19,90/mês com destaque e mais fotos) e Profissional (R$ 49,90/mês com múltiplos destaques e suporte prioritário).'
    },
    {
      id: 9,
      categoria: 'pagamentos',
      pergunta: 'Como funciona o pagamento?',
      resposta: 'Aceitamos cartão de crédito, débito, PIX e boleto bancário. Os pagamentos são processados de forma segura através de parceiros certificados. Você pode cancelar sua assinatura a qualquer momento.'
    },
    {
      id: 10,
      categoria: 'pagamentos',
      pergunta: 'Posso cancelar minha assinatura?',
      resposta: 'Sim, você pode cancelar sua assinatura a qualquer momento no Dashboard > Planos. O cancelamento será efetivo no final do período já pago, e você continuará tendo acesso aos benefícios até lá.'
    },
    {
      id: 11,
      categoria: 'seguranca',
      pergunta: 'Como denunciar um anúncio suspeito?',
      resposta: 'Em cada anúncio há um botão "Denunciar". Clique nele, selecione o motivo da denúncia e forneça detalhes. Nossa equipe analisará em até 24 horas e tomará as medidas necessárias.'
    },
    {
      id: 12,
      categoria: 'seguranca',
      pergunta: 'Como me proteger de golpes?',
      resposta: 'Sempre prefira encontros presenciais em locais públicos, desconfie de preços muito baixos, não faça pagamentos antecipados para desconhecidos e verifique a reputação do vendedor através das avaliações.'
    },
    {
      id: 13,
      categoria: 'seguranca',
      pergunta: 'Meus dados estão seguros?',
      resposta: 'Sim, utilizamos criptografia SSL e seguimos as melhores práticas de segurança. Seus dados pessoais nunca são compartilhados com terceiros sem sua autorização, conforme nossa Política de Privacidade.'
    },
    {
      id: 14,
      categoria: 'configuracoes',
      pergunta: 'Como alterar minhas notificações?',
      resposta: 'No Dashboard, vá em "Configurações" > "Notificações". Você pode escolher receber notificações por email, SMS ou push sobre mensagens, propostas, lembretes e novidades da plataforma.'
    },
    {
      id: 15,
      categoria: 'configuracoes',
      pergunta: 'Como excluir minha conta?',
      resposta: 'Para excluir sua conta permanentemente, vá em "Configurações" > "Excluir Conta". Atenção: esta ação é irreversível e todos seus anúncios e dados serão removidos permanentemente.'
    }
  ];

  const perguntasFiltradas = perguntas.filter(pergunta => {
    const matchBusca = pergunta.pergunta.toLowerCase().includes(busca.toLowerCase()) ||
                      pergunta.resposta.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria = categoriaAtiva === 'todas' || pergunta.categoria === categoriaAtiva;
    return matchBusca && matchCategoria;
  });

  const togglePergunta = (id) => {
    setPerguntaAberta(perguntaAberta === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white">
      <div>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div>
            <Link to="/">
              <Button
                variant="ghost"
                className="flex items-center text-slate-600 hover:text-orange-600 hover:bg-orange-50 mb-8"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao início
              </Button>
            </Link>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mr-4">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-slate-800">FAQ</h1>
            </div>
            
            <h2 className="text-3xl font-bold text-slate-700 mb-4">
              Perguntas
              <span className="block text-orange-600">
                Frequentes
              </span>
            </h2>
            
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Encontre respostas rápidas para as dúvidas mais comuns sobre o ViaBairro.
              Se não encontrar o que procura, entre em contato conosco.
            </p>

            {/* Barra de Busca */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Buscar perguntas..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10 bg-white border-slate-200 focus:border-orange-500 rounded-xl shadow-lg"
              />
            </div>
          </div>

          {/* Categorias */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {categorias.map((categoria) => {
                const Icon = categoria.icon;
                return (
                  <Button
                    key={categoria.id}
                    variant={categoriaAtiva === categoria.id ? 'default' : 'outline'}
                    onClick={() => setCategoriaAtiva(categoria.id)}
                    className={`flex items-center space-x-2 ${
                      categoriaAtiva === categoria.id
                        ? 'bg-orange-500 text-white shadow-lg'
                        : 'border-slate-200 text-slate-600 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{categoria.nome}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Lista de Perguntas */}
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {perguntasFiltradas.length === 0 ? (
              <Card className="bg-white/70 backdrop-blur-sm shadow-xl border border-white/20">
                <CardContent className="p-12 text-center">
                  <HelpCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Nenhuma pergunta encontrada</h3>
                  <p className="text-slate-600 mb-6">
                    Não encontramos perguntas que correspondam à sua busca.
                  </p>
                  <Button
                    onClick={() => {
                      setBusca('');
                      setCategoriaAtiva('todas');
                    }}
                    className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white"
                  >
                    Ver todas as perguntas
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {perguntasFiltradas.map((pergunta, index) => (
                  <motion.div
                    key={pergunta.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-white/70 backdrop-blur-sm shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-0">
                        <button
                          onClick={() => togglePergunta(pergunta.id)}
                          className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-50/50 transition-colors duration-200"
                        >
                          <h3 className="text-lg font-semibold text-slate-800 pr-4">
                            {pergunta.pergunta}
                          </h3>
                          {perguntaAberta === pergunta.id ? (
                            <ChevronUp className="w-5 h-5 text-orange-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                          )}
                        </button>
                        
                        <AnimatePresence>
                          {perguntaAberta === pergunta.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 border-t border-slate-100">
                                <p className="text-slate-600 leading-relaxed pt-4">
                                  {pergunta.resposta}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-xl border border-white/20 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="relative">
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f59820' fill-opacity='0.1'%3E%3Cpolygon points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`n                  }}></div>
                  
                  <div className="relative z-10">
                    <MessageCircle className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-4">
                      Não encontrou sua resposta?
                    </h3>
                    <p className="text-slate-300 mb-6">
                      Nossa equipe de suporte está pronta para ajudá-lo com qualquer dúvida.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link to="/contato">
                        <Button className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105">
                          Entre em Contato
                        </Button>
                      </Link>
                      <Link to="/como-funciona">
                        <Button variant="outline" className="border-white text-white hover:bg-white hover:text-slate-800 px-6 py-3 rounded-xl font-semibold transition-all duration-200">
                          Como Funciona
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

export default FAQ;