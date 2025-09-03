import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent } from '../components/ui/card';
import { ArrowLeft, MapPin, Mail, Phone, Clock, Send, MessageCircle, HeadphonesIcon, Globe } from 'lucide-react';

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpar erro quando usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.assunto.trim()) newErrors.assunto = 'Assunto é obrigatório';
    if (!formData.mensagem.trim()) newErrors.mensagem = 'Mensagem é obrigatória';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simular envio
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setFormData({ nome: '', email: '', telefone: '', assunto: '', mensagem: '' });
      
      // Esconder mensagem de sucesso após 5 segundos
      setTimeout(() => setShowSuccess(false), 5000);
    }, 2000);
  };

  const informacoesContato = [
    {
      icon: Mail,
      titulo: 'Email',
      info: 'contato@viabairro.com.br',
      descricao: 'Resposta em até 24 horas'
    },
    {
      icon: Phone,
      titulo: 'Telefone',
      info: '(11) 3000-0000',
      descricao: 'Seg à Sex, 8h às 18h'
    },
    {
      icon: MessageCircle,
      titulo: 'WhatsApp',
      info: '(11) 99999-9999',
      descricao: 'Atendimento rápido'
    },
    {
      icon: Clock,
      titulo: 'Horário',
      info: 'Segunda à Sexta',
      descricao: '8h às 18h (Brasília)'
    }
  ];

  const departamentos = [
    { value: 'suporte', label: 'Suporte Técnico' },
    { value: 'comercial', label: 'Comercial' },
    { value: 'parcerias', label: 'Parcerias' },
    { value: 'imprensa', label: 'Imprensa' },
    { value: 'outros', label: 'Outros' }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
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
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mr-4">
                <HeadphonesIcon className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-slate-800">Contato</h1>
            </div>
            
            <h2 className="text-3xl font-bold text-slate-700 mb-4">
              Estamos aqui para
              <span className="block text-orange-600">
                ajudar você
              </span>
            </h2>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Tem alguma dúvida, sugestão ou precisa de ajuda? Nossa equipe está pronta 
              para atendê-lo da melhor forma possível.
            </p>
          </div>

          {/* Informações de Contato */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {informacoesContato.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg border text-center"
                >
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{info.titulo}</h3>
                  <p className="text-orange-600 font-semibold mb-1">{info.info}</p>
                  <p className="text-slate-600 text-sm">{info.descricao}</p>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Formulário de Contato */}
            <div>
              <Card className="bg-white shadow-xl border">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Envie sua mensagem</h3>
                    <p className="text-slate-600">Preencha o formulário e entraremos em contato</p>
                  </div>

                  {/* Mensagem de Sucesso */}
                  {showSuccess && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                          <Send className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-green-800 font-semibold">Mensagem enviada com sucesso!</p>
                          <p className="text-green-600 text-sm">Responderemos em breve.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nome" className="text-slate-700 font-medium mb-2 block">
                          Nome completo *
                        </Label>
                        <Input
                          id="nome"
                          name="nome"
                          type="text"
                          value={formData.nome}
                          onChange={handleInputChange}
                          className={`bg-white border-slate-200 focus:border-orange-500 ${errors.nome ? 'border-red-500' : ''}`}
                          placeholder="Seu nome completo"
                        />
                        {errors.nome && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.nome}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-slate-700 font-medium mb-2 block">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`bg-white border-slate-200 focus:border-orange-500 ${errors.email ? 'border-red-500' : ''}`}
                          placeholder="seu@email.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="telefone" className="text-slate-700 font-medium mb-2 block">
                          Telefone
                        </Label>
                        <Input
                          id="telefone"
                          name="telefone"
                          type="tel"
                          value={formData.telefone}
                          onChange={handleInputChange}
                          className="bg-white border-slate-200 focus:border-orange-500"
                          placeholder="(11) 99999-9999"
                        />
                      </div>

                      <div>
                        <Label htmlFor="assunto" className="text-slate-700 font-medium mb-2 block">
                          Assunto *
                        </Label>
                        <select
                          id="assunto"
                          name="assunto"
                          value={formData.assunto}
                          onChange={handleInputChange}
                          className={`w-full bg-white border border-slate-200 rounded-lg px-3 py-2 focus:border-orange-500 focus:outline-none ${errors.assunto ? 'border-red-500' : ''}`}
                        >
                          <option value="">Selecione um assunto</option>
                          {departamentos.map((dept) => (
                            <option key={dept.value} value={dept.value}>
                              {dept.label}
                            </option>
                          ))}
                        </select>
                        {errors.assunto && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.assunto}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="mensagem" className="text-slate-700 font-medium mb-2 block">
                        Mensagem *
                      </Label>
                      <textarea
                        id="mensagem"
                        name="mensagem"
                        value={formData.mensagem}
                        onChange={handleInputChange}
                        rows={5}
                        className={`w-full bg-white border border-slate-200 rounded-lg px-3 py-2 focus:border-orange-500 focus:outline-none resize-none ${errors.mensagem ? 'border-red-500' : ''}`}
                        placeholder="Descreva sua dúvida, sugestão ou como podemos ajudá-lo..."
                      />
                      {errors.mensagem && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.mensagem}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Enviando...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Send className="w-5 h-5 mr-2" />
                          Enviar Mensagem
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Informações Adicionais */}
            <div className="space-y-8">
              {/* FAQ Rápido */}
              <Card className="bg-white shadow-xl border">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">Perguntas Frequentes</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Como criar um anúncio?</h4>
                      <p className="text-slate-600 text-sm">Faça login, clique em "Anunciar" e siga o passo a passo.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">É gratuito?</h4>
                      <p className="text-slate-600 text-sm">Sim! Criar conta e publicar anúncios básicos é totalmente gratuito.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Como entro em contato com vendedores?</h4>
                      <p className="text-slate-600 text-sm">Através dos botões de contato disponíveis em cada anúncio.</p>
                    </div>
                  </div>
                  <Link to="/faq">
                    <Button variant="outline" className="w-full mt-6 border-orange-200 text-orange-600 hover:bg-orange-50">
                      Ver todas as perguntas
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Redes Sociais */}
              <Card className="bg-slate-800 text-white shadow-xl border">
                <CardContent className="p-8 text-center">
                  <Globe className="w-12 h-12 mx-auto mb-4 text-orange-400" />
                  <h3 className="text-xl font-bold mb-4">Siga-nos nas redes sociais</h3>
                  <p className="text-slate-300 mb-6">Fique por dentro das novidades e dicas</p>
                  <div className="flex justify-center space-x-4">
                    <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-slate-800">
                      Facebook
                    </Button>
                    <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-slate-800">
                      Instagram
                    </Button>
                    <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-slate-800">
                      LinkedIn
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contato;