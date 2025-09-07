import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { X, Download, Smartphone, Star } from 'lucide-react';

const PWAInstallBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [nativeBannerShown, setNativeBannerShown] = useState(false);

  useEffect(() => {
    // Verifica se já foi instalado
    const isInstalled = localStorage.getItem('pwaInstalled');
    if (isInstalled) return;

    // Verifica se está em modo standalone (já instalado)
    const standalone = window.matchMedia('(display-mode: standalone)').matches;
    const isStandaloneMode = window.navigator.standalone || standalone;
    setIsStandalone(isStandaloneMode);

    if (isStandaloneMode) return;

    // Detecta iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Detecta se é mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Para Android/Chrome - aguarda o evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setNativeBannerShown(true);
      
      // No mobile, aguarda mais tempo para não conflitar com banner nativo
      if (isMobile) {
        setTimeout(() => {
          // Só mostra se o banner nativo não foi aceito/rejeitado
          const dismissed = localStorage.getItem('pwaInstallDismissed');
          if (!dismissed) {
            setIsVisible(true);
          }
        }, 10000); // 10 segundos no mobile para dar tempo do nativo
      } else {
        setIsVisible(true); // Desktop mostra imediatamente
      }
    };

    // Para iOS - mostra banner após delay maior
    if (iOS) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 8000); // 8 segundos no iOS para não conflitar
      return () => clearTimeout(timer);
    }

    // Para outros navegadores
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listener para detectar quando o app é instalado (banner nativo aceito)
    const handleAppInstalled = () => {
      localStorage.setItem('pwaInstalled', 'true');
      setIsVisible(false);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      // Android/Chrome
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        localStorage.setItem('pwaInstalled', 'true');
        setIsVisible(false);
      }
      
      setDeferredPrompt(null);
    } else if (isIOS) {
      // iOS - instruções
      alert('Para instalar o ViaBairro no seu iPhone:\n\n1. Toque no botão de compartilhar (□↑)\n2. Role para baixo e toque em "Adicionar à Tela de Início"\n3. Toque em "Adicionar"');
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('pwaInstallDismissed', 'true');
    setIsVisible(false);
  };

  const handleLater = () => {
    setIsVisible(false);
    // Mostra novamente em 24h
    setTimeout(() => {
      localStorage.removeItem('pwaInstallDismissed');
    }, 24 * 60 * 60 * 1000);
  };

  // Verifica se foi dispensado recentemente
  useEffect(() => {
    const dismissed = localStorage.getItem('pwaInstallDismissed');
    if (dismissed) {
      setIsVisible(false);
    }
  }, []);

  // No mobile, só mostra se não há banner nativo disponível
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (!isVisible || isStandalone) return null;
  
  // No mobile, se o banner nativo apareceu, não mostra o nosso
  if (isMobile && nativeBannerShown && !deferredPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm"
      >
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0 shadow-2xl">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Smartphone className="w-6 h-6" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 text-yellow-300" />
                  <h3 className="font-semibold text-sm">Instalar ViaBairro</h3>
                </div>
                
                <p className="text-xs text-blue-100 mb-3 leading-relaxed">
                  {isIOS 
                    ? "Adicione à tela inicial para acesso rápido e notificações"
                    : "Instale o app para melhor desempenho!!"
                  }
                </p>
                
                <div className="flex gap-2">
                  <Button
                    onClick={handleInstall}
                    size="sm"
                    className="bg-white text-blue-600 hover:bg-blue-50 text-xs font-medium px-3 py-1.5 h-auto"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    {isIOS ? 'Como instalar' : 'Instalar'}
                  </Button>
                  
                  <Button
                    onClick={handleLater}
                    variant="ghost"
                    size="sm"
                    className="text-blue-100 hover:bg-white/10 text-xs px-2 py-1.5 h-auto"
                  >
                    Depois
                  </Button>
                </div>
              </div>
              
              <Button
                onClick={handleDismiss}
                variant="ghost"
                size="sm"
                className="text-blue-200 hover:bg-white/10 p-1 h-auto"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default PWAInstallBanner;
