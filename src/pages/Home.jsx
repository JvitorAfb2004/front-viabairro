import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Search, MapPin, Loader2, AlertCircle } from 'lucide-react';
import geolocationService from '../services/geolocationService';
import Footer from '../components/Footer';

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationInfo, setLocationInfo] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [permissionRequested, setPermissionRequested] = useState(false);

  // Detectar localização do usuário
  useEffect(() => {
    const detectLocation = async () => {
      if (!geolocationService.isGeolocationAvailable()) {
        setLocationError('Geolocalização não é suportada por este navegador');
        return;
      }

      setLocationLoading(true);
      setLocationError(null);

      try {
        const locationData = await geolocationService.getLocationInfo();
        setLocationInfo(locationData);
        
        // Preencher campo de busca com o bairro se disponível
        if (locationData.address.suburb) {
          setSearchTerm(locationData.address.suburb);
        } else if (locationData.address.city) {
          setSearchTerm(locationData.address.city);
        }
      } catch (error) {
        console.error('Erro ao obter localização:', error);
        setLocationError(error.message);
      } finally {
        setLocationLoading(false);
        setPermissionRequested(true);
      }
    };

    // Aguardar um pouco antes de solicitar localização para melhor UX
    const timer = setTimeout(detectLocation, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCategoryClick = (categoria) => {
    navigate(`/buscar?categoria=${encodeURIComponent(categoria)}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 space-y-16">
        {/* Hero Section */}
        <section className="bg-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
                Conecte-se ao seu{' '}
                <span className="text-orange-400">
                  bairro
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Descubra negócios locais, conecte-se com empreendedores da sua região e fortaleça a economia do seu bairro.
              </p>

              {/* Mensagem de localização */}
              {locationLoading && (
                <div className="flex items-center justify-center space-x-2 text-blue-600 bg-blue-50 rounded-lg p-3 max-w-md mx-auto">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Detectando sua localização...</span>
                </div>
              )}

              {locationInfo && (
                <div className="flex items-center justify-center space-x-2 text-green-600 bg-green-50 rounded-lg p-3 max-w-md mx-auto">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">
                    {locationInfo.address.suburb && 
                     locationInfo.address.suburb !== locationInfo.address.city ? (
                      <>
                        Confira os anúncios no bairro <strong>{locationInfo.address.suburb}</strong>
                        <span> em <strong>{locationInfo.address.city}</strong></span>
                      </>
                    ) : (
                      <>
                        Confira os anúncios em <strong>{locationInfo.address.city}</strong>
                        {locationInfo.address.state && (
                          <span> - <strong>{locationInfo.address.state}</strong></span>
                        )}
                      </>
                    )}
                  </span>
                </div>
              )}

              {locationError && permissionRequested && (
                <div className="flex items-center justify-center space-x-2 text-amber-600 bg-amber-50 rounded-lg p-3 max-w-md mx-auto">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">
                    Não foi possível detectar sua localização. Você ainda pode buscar manualmente.
                  </span>
                </div>
              )}
              
              <div className="mt-10">
                <div className="bg-gray-50 rounded-lg p-4 border max-w-2xl mx-auto">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        type="text"
                        placeholder="Ex: eletricista, manicure, padaria..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="pl-10 h-12 bg-white border-gray-300"
                      />
                    </div>
                    <Button 
                      size="lg" 
                      onClick={handleSearch}
                      className="h-12 px-6 bg-orange-400 hover:bg-orange-500 text-white"
                    >
                      <Search className="w-5 h-5 mr-2" />
                      Buscar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Home
