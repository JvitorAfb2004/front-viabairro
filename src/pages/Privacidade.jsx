import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

const Privacidade = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        className="bg-[#1a1b1b] shadow-sm border-b border-gray-700"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div 
              className="flex items-center cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={() => navigate('/')}
            >
              <img 
                src="/logo.png" 
                alt="Via Bairro" 
                className="h-14 w-auto"
              />
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button 
                variant="ghost" 
                className="flex items-center space-x-2 text-white hover:bg-gray-800"
                onClick={() => navigate('/login')}
              >
                <span className="hidden sm:inline">Entrar</span>
              </Button>
              
              <Button 
                className="flex items-center space-x-2 bg-[#f59820] hover:bg-[#e8891a] text-white"
                onClick={() => navigate('/cadastro')}
              >
                <span className="hidden sm:inline">Cadastrar</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Conteúdo */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Botão voltar */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center text-[#1a1b1b] hover:text-[#f59820]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </div>

          {/* Título */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#1a1b1b] mb-4">
              Política de Privacidade
            </h1>
            <p className="text-gray-600">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>

          {/* Conteúdo */}
          <Card>
            <CardHeader>
              <CardTitle>1. Informações que Coletamos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Coletamos informações que você nos fornece diretamente e informações que coletamos automaticamente quando você usa nosso serviço.
              </p>
              <h4 className="font-semibold text-gray-800">Informações que você nos fornece:</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Nome completo e informações de contato</li>
                <li>Endereço de email e número de telefone</li>
                <li>Informações do perfil e preferências</li>
                <li>Conteúdo que você publica (anúncios, comentários, avaliações)</li>
              </ul>
              <h4 className="font-semibold text-gray-800">Informações coletadas automaticamente:</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Informações de dispositivo e navegador</li>
                <li>Endereço IP e localização aproximada</li>
                <li>Dados de uso e interação com a plataforma</li>
                <li>Cookies e tecnologias similares</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>2. Como Usamos suas Informações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Utilizamos suas informações para:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Fornecer e melhorar nossos serviços</li>
                <li>Processar transações e gerenciar sua conta</li>
                <li>Comunicar-nos com você sobre o serviço</li>
                <li>Personalizar sua experiência na plataforma</li>
                <li>Detectar e prevenir fraudes e abusos</li>
                <li>Cumprir obrigações legais</li>
                <li>Enviar comunicações de marketing (com seu consentimento)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>3. Compartilhamento de Informações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Não vendemos suas informações pessoais. Podemos compartilhar suas informações nas seguintes situações:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Com seu consentimento explícito</li>
                <li>Para cumprir obrigações legais</li>
                <li>Com prestadores de serviços que nos ajudam a operar a plataforma</li>
                <li>Em caso de fusão, aquisição ou venda de ativos</li>
                <li>Para proteger nossos direitos e segurança</li>
                <li>Informações públicas que você escolheu compartilhar</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>4. Segurança dos Dados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Implementamos medidas de segurança técnicas, administrativas e físicas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Criptografia de dados em trânsito e em repouso</li>
                <li>Controles de acesso rigorosos</li>
                <li>Monitoramento regular de segurança</li>
                <li>Treinamento de funcionários sobre privacidade</li>
                <li>Auditorias regulares de segurança</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>5. Seus Direitos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Você tem os seguintes direitos em relação às suas informações pessoais:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Acesso às suas informações pessoais</li>
                <li>Correção de informações incorretas ou incompletas</li>
                <li>Exclusão de suas informações pessoais</li>
                <li>Portabilidade de dados</li>
                <li>Restrição do processamento</li>
                <li>Oposição ao processamento</li>
                <li>Retirada do consentimento</li>
              </ul>
              <p className="text-gray-700">
                Para exercer esses direitos, entre em contato conosco através dos canais indicados nesta política.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>6. Cookies e Tecnologias Similares</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o uso da plataforma e personalizar conteúdo.
              </p>
              <h4 className="font-semibold text-gray-800">Tipos de cookies que usamos:</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Cookies essenciais (necessários para o funcionamento)</li>
                <li>Cookies de desempenho (para análise de uso)</li>
                <li>Cookies de funcionalidade (para personalização)</li>
                <li>Cookies de marketing (para publicidade direcionada)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>7. Retenção de Dados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos descritos nesta política, a menos que um período de retenção mais longo seja exigido ou permitido por lei.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>8. Menores de Idade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Nossos serviços não são direcionados a menores de 18 anos. Não coletamos intencionalmente informações pessoais de menores. Se tomarmos conhecimento de que coletamos informações de um menor, tomaremos medidas para excluir essas informações.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>9. Alterações nesta Política</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre mudanças significativas através do serviço ou por outros meios apropriados.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>10. Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos suas informações pessoais, entre em contato conosco:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Email: privacidade@viabairro.com</li>
                <li>Telefone: (11) 99999-9999</li>
                <li>Endereço: São Paulo, SP - Brasil</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacidade;



