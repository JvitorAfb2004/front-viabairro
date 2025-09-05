import React, { useState } from 'react';
import { Button } from './ui/button';
import { Settings } from 'lucide-react';

const Footer = () => {
  const [showCookieManager, setShowCookieManager] = useState(false);

  const handleCookieManager = () => {
    // Limpar o localStorage para forçar o banner a aparecer novamente
    localStorage.removeItem('cookieConsent');
    localStorage.removeItem('cookiePreferences');
    // Recarregar a página para mostrar o banner
    window.location.reload();
  };

  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo e descrição */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src="/logo-transparent.png" 
                alt="ViaBairro" 
                className="h-8 w-auto mr-3"
              />
            
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Conectando pessoas e facilitando a vida no seu bairro. 
              Encontre serviços, produtos e oportunidades próximas a você.
            </p>
          </div>

          {/* Links úteis */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Úteis</h4>
            <ul className="space-y-2">
              <li>
                <a href="/termos" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="/privacidade" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <button 
                  onClick={handleCookieManager}
                  className="text-gray-300 hover:text-white text-sm transition-colors flex items-center gap-1"
                >
                  <Settings className="w-3 h-3" />
                  Gerenciar Cookies
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha divisória e copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 ViaBairro. Todos os direitos reservados.
            </p>
            <p className="text-gray-400 text-sm mt-2 sm:mt-0">
              Feito por{' '}
              <a 
                href="https://jvitor.tech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                J Vitor AFB
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
