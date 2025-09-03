import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft, MapPin, Users, Heart, Shield, Sparkles, Target, Award, TrendingUp } from 'lucide-react';

const SobreNos = () => {
  const valores = [
    {
      icon: Heart,
      titulo: 'Comunidade',
      descricao: 'Acreditamos no poder das conexões locais e no fortalecimento dos laços comunitários.'
    },
    {
      icon: Shield,
      titulo: 'Confiança',
      descricao: 'Priorizamos a segurança e transparência em todas as transações e interações.'
    },
    {
      icon: Sparkles,
      titulo: 'Inovação',
      descricao: 'Utilizamos tecnologia de ponta para criar soluções simples e eficazes.'
    },
    {
      icon: Target,
      titulo: 'Propósito',
      descricao: 'Nosso objetivo é democratizar o acesso a oportunidades locais para todos.'
    }
  ];

  const estatisticas = [
    { numero: '50K+', label: 'Usuários Ativos' },
    { numero: '200K+', label: 'Anúncios Publicados' },
    { numero: '1000+', label: 'Cidades Atendidas' },
    { numero: '98%', label: 'Satisfação dos Usuários' }
  ];

  const equipe = [
    {
      nome: 'Ana Silva',
      cargo: 'CEO & Fundadora',
      descricao: 'Visionária por trás da Via Bairro, com 15 anos de experiência em tecnologia e empreendedorismo social.'
    },
    {
      nome: 'Carlos Santos',
      cargo: 'CTO',
      descricao: 'Especialista em desenvolvimento de plataformas escaláveis e arquitetura de sistemas distribuídos.'
    },
    {
      nome: 'Maria Oliveira',
      cargo: 'Head de Produto',
      descricao: 'Focada em criar experiências excepcionais para usuários, com background em UX/UI e psicologia.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div>
          <Link to="/">
            <Button
              variant="ghost"
              className="flex items-center text-slate-600 hover:text-slate-800 hover:bg-gray-50 mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao início
            </Button>
          </Link>
        </div>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-black rounded-full mb-6">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Sobre o <span className="text-black">Via Bairro</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Conectamos comunidades locais através de uma plataforma inovadora que facilita 
              o comércio e os serviços entre vizinhos, fortalecendo a economia local.
            </p>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {estatisticas.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white border border-gray-200 rounded-lg">
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.numero}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Nossa História */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Nossa História</h2>
              <div className="w-24 h-1 bg-black mx-auto rounded-full"></div>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-lg p-8">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  A Via Bairro nasceu em 2020 com uma missão simples: facilitar as conexões 
                  entre pessoas da mesma comunidade. Percebemos que muitas oportunidades 
                  se perdiam por falta de uma plataforma dedicada ao comércio local.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Começamos como um pequeno projeto em São Paulo e hoje estamos presentes 
                  em mais de 1000 cidades brasileiras, conectando milhares de pessoas 
                  diariamente e fortalecendo a economia local.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  Nossa jornada é guiada pela crença de que tecnologia deve servir às 
                  pessoas e às comunidades, criando valor real e duradouro.
                </p>
              </div>
            </div>
          </div>

          {/* Nossos Valores */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Nossos Valores</h2>
              <div className="w-24 h-1 bg-black mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {valores.map((valor, index) => {
                const Icon = valor.icon;
                return (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-6 text-center"
                  >
                    <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">{valor.titulo}</h4>
                    <p className="text-gray-600 leading-relaxed">{valor.descricao}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Nossa Equipe */}
           <div className="mb-16">
             <div className="text-center mb-12">
               <h3 className="text-3xl font-bold text-gray-900 mb-4">Nossa Equipe</h3>
               <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                 Pessoas apaixonadas por tecnologia e comunidade
               </p>
             </div>
             
             <div className="grid md:grid-cols-3 gap-8">
               {equipe.map((membro, index) => (
                 <div
                   key={index}
                   className="bg-white border border-gray-200 rounded-lg p-6 text-center"
                 >
                   <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                     <Users className="w-10 h-10 text-white" />
                   </div>
                   <h4 className="text-xl font-bold text-gray-900 mb-2">{membro.nome}</h4>
                   <p className="text-gray-600 font-medium mb-3">{membro.cargo}</p>
                   <p className="text-gray-600 text-sm leading-relaxed">{membro.descricao}</p>
                 </div>
               ))}
             </div>
           </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-black rounded-lg p-8 md:p-12 text-white">
              <h3 className="text-3xl font-bold mb-4">Faça Parte da Nossa Comunidade</h3>
              <p className="text-xl mb-8 text-gray-300">
                Junte-se a milhares de pessoas que já descobriram o poder da conexão local
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-black hover:bg-gray-100 font-semibold px-8 py-3"
                  onClick={() => window.location.href = '/cadastro'}
                >
                  Criar Conta Grátis
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 font-semibold px-8 py-3"
                  onClick={() => window.location.href = '/contato'}
                >
                  Entre em Contato
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SobreNos;