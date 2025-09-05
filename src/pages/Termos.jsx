import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

const Termos = () => {
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
              Termos de Uso
            </h1>
            <p className="text-gray-600">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>

          {/* Conteúdo */}
          <Card>
            <CardHeader>
              <CardTitle>1. Aceitação dos Termos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Ao acessar e usar o Via Bairro, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes termos, não deve usar nosso serviço.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>2. Descrição do Serviço</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                O Via Bairro é uma plataforma que conecta usuários a profissionais e empreendedores locais, permitindo a busca e descoberta de serviços e negócios em sua região.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Busca de serviços e negócios locais</li>
                <li>Visualização de perfis de profissionais</li>
                <li>Publicação de anúncios (para usuários cadastrados)</li>
                <li>Sistema de avaliações e comentários</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>3. Cadastro e Conta do Usuário</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Para utilizar certas funcionalidades da plataforma, você deve criar uma conta fornecendo informações precisas e atualizadas.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Você é responsável por manter a confidencialidade de sua senha</li>
                <li>Você é responsável por todas as atividades que ocorrem em sua conta</li>
                <li>Você deve notificar-nos imediatamente sobre qualquer uso não autorizado</li>
                <li>Reservamo-nos o direito de suspender ou encerrar contas que violem estes termos</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>4. Uso Aceitável</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Você concorda em usar o Via Bairro apenas para fins legais e de acordo com estes termos. É proibido:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Publicar conteúdo falso, enganoso ou fraudulento</li>
                <li>Violar direitos de propriedade intelectual</li>
                <li>Usar a plataforma para atividades ilegais</li>
                <li>Interferir no funcionamento normal do serviço</li>
                <li>Coletar informações de outros usuários sem autorização</li>
                <li>Publicar conteúdo ofensivo, difamatório ou inadequado</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>5. Propriedade Intelectual</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                O Via Bairro e seu conteúdo original, recursos e funcionalidades são e permanecerão propriedade exclusiva da empresa e seus licenciadores. O serviço está protegido por direitos autorais, marcas registradas e outras leis.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>6. Limitação de Responsabilidade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Em nenhuma circunstância o Via Bairro será responsável por danos diretos, indiretos, incidentais, especiais ou consequenciais resultantes do uso ou incapacidade de usar o serviço.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>7. Modificações dos Termos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Reservamo-nos o direito de modificar estes termos a qualquer momento. As modificações entrarão em vigor imediatamente após a publicação. Seu uso continuado do serviço constitui aceitação dos termos modificados.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6" id="cookies">
            <CardHeader>
              <CardTitle>8. Política de Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Utilizamos cookies e tecnologias similares para melhorar sua experiência em nosso site, 
                analisar o uso da plataforma e personalizar conteúdo e anúncios.
              </p>
              
              <h4 className="font-semibold text-gray-800 mt-6 mb-3">Tipos de Cookies que Utilizamos:</h4>
              
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h5 className="font-medium text-gray-800">Cookies Essenciais</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Necessários para o funcionamento básico do site. Incluem cookies de sessão, 
                    autenticação e segurança. Estes cookies não podem ser desabilitados.
                  </p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4">
                  <h5 className="font-medium text-gray-800">Cookies Funcionais</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Permitem funcionalidades aprimoradas e personalização, como lembrar suas 
                    preferências de idioma e região.
                  </p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4">
                  <h5 className="font-medium text-gray-800">Cookies de Análise</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Ajudam-nos a entender como os visitantes interagem com o site, fornecendo 
                    informações sobre as páginas visitadas e tempo de permanência.
                  </p>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4">
                  <h5 className="font-medium text-gray-800">Cookies de Marketing</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Usados para exibir anúncios relevantes e medir a eficácia das campanhas publicitárias.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mt-6">
                <h5 className="font-medium text-gray-800 mb-2">Como Gerenciar Seus Cookies</h5>
                <p className="text-sm text-gray-600 mb-3">
                  Você pode gerenciar suas preferências de cookies a qualquer momento através do 
                  banner de cookies que aparece na primeira visita ao site, ou clicando no botão 
                  "Gerenciar Cookies" no rodapé.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Importante:</strong> Desabilitar certos cookies pode afetar a funcionalidade 
                  do site e sua experiência de navegação.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>9. Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Se você tiver dúvidas sobre estes Termos de Uso ou nossa Política de Cookies, entre em contato conosco:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Email: contato@viabairro.com</li>
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

export default Termos;



