import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { X, Cookie, Settings, Shield, BarChart3 } from 'lucide-react';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Verifica se o usuário já aceitou os cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookiePreferences', JSON.stringify({
      essential: true,
      analytics: true,
      marketing: true,
      functional: true
    }));
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('cookieConsent', 'essential');
    localStorage.setItem('cookiePreferences', JSON.stringify({
      essential: true,
      analytics: false,
      marketing: false,
      functional: false
    }));
    setIsVisible(false);
  };

  const handleCustomize = () => {
    setShowDetails(true);
  };

  const handleLearnMore = () => {
    window.location.href = '/termos#cookies';
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4"
      >
        <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-6">
            {!showDetails ? (
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="bg-[#f59820] p-2 rounded-full">
                    <Cookie className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      🍪 Usamos cookies para melhorar sua experiência
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Utilizamos cookies essenciais para o funcionamento do site e cookies opcionais 
                      para análise e personalização. Você pode escolher quais aceitar.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLearnMore}
                    className="text-xs"
                  >
                    Saiba mais
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCustomize}
                    className="text-xs"
                  >
                    <Settings className="w-3 h-3 mr-1" />
                    Personalizar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAcceptEssential}
                    className="text-xs"
                  >
                    Apenas essenciais
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleAcceptAll}
                    className="bg-[#f59820] hover:bg-[#e8891a] text-white text-xs"
                  >
                    Aceitar todos
                  </Button>
                </div>
              </div>
            ) : (
              <CookiePreferences 
                onBack={() => setShowDetails(false)}
                onSave={() => setIsVisible(false)}
              />
            )}
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

const CookiePreferences = ({ onBack, onSave }) => {
  const [preferences, setPreferences] = useState({
    essential: true, // Sempre true, não pode ser desabilitado
    functional: true,
    analytics: false,
    marketing: false
  });

  const handleToggle = (type) => {
    if (type === 'essential') return; // Não pode desabilitar cookies essenciais
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleSave = () => {
    localStorage.setItem('cookieConsent', 'customized');
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    onSave();
  };

  const cookieTypes = [
    {
      id: 'essential',
      name: 'Cookies Essenciais',
      description: 'Necessários para o funcionamento básico do site',
      icon: Shield,
      required: true
    },
    {
      id: 'functional',
      name: 'Cookies Funcionais',
      description: 'Permitem funcionalidades aprimoradas e personalização',
      icon: Settings,
      required: false
    },
    {
      id: 'analytics',
      name: 'Cookies de Análise',
      description: 'Ajudam-nos a entender como você usa o site',
      icon: BarChart3,
      required: false
    },
    {
      id: 'marketing',
      name: 'Cookies de Marketing',
      description: 'Usados para exibir anúncios relevantes',
      icon: Cookie,
      required: false
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Gerenciar Preferências de Cookies
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <p className="text-sm text-gray-600">
        Escolha quais tipos de cookies você deseja aceitar. Cookies essenciais são necessários 
        para o funcionamento básico do site.
      </p>

      <div className="space-y-3">
        {cookieTypes.map((type) => (
          <div key={type.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-start gap-3 flex-1">
              <type.icon className={`w-5 h-5 mt-0.5 ${
                type.required ? 'text-green-600' : 'text-gray-400'
              }`} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-gray-900">{type.name}</h4>
                  {type.required && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Obrigatório
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{type.description}</p>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => handleToggle(type.id)}
                disabled={type.required}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences[type.id]
                    ? 'bg-[#f59820]'
                    : 'bg-gray-200'
                } ${type.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences[type.id] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1 sm:flex-none"
        >
          Voltar
        </Button>
        <Button
          onClick={handleSave}
          className="flex-1 sm:flex-none bg-[#f59820] hover:bg-[#e8891a] text-white"
        >
          Salvar Preferências
        </Button>
      </div>
    </div>
  );
};

export default CookieBanner;
