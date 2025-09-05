import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Search } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

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
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Conteúdo do lado esquerdo */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
                Conecte-se ao seu{' '}
                <span className="text-orange-400">
                  bairro
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Descubra negócios locais, conecte-se com empreendedores da sua região e fortaleça a economia do seu bairro.
              </p>
              
              <div className="mt-10">
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        type="text"
                        placeholder="Ex: eletricista, manicure, produtos artesanais..."
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

            {/* Mapa do lado direito */}
            <div className="flex justify-center lg:justify-end">
              <img 
                src="/bg.png" 
                alt="Mapa do Brasil" 
                style={{
                  maxHeight: '500px'
                }}
                className="max-w-full h-auto  object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home
