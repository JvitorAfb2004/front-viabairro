import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Search, Star, MapPin, TrendingUp, Users, Award } from 'lucide-react';
import { categorias, obterAnunciosDestaque, testemunhos, estatisticas } from '../data/mockData';

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const anunciosDestaque = obterAnunciosDestaque();

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
              Conecte-se ao seu{' '}
              <span className="text-blue-600">
                bairro
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Descubra negócios locais, conecte-se com empreendedores da sua região e fortaleça a economia do seu bairro.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto mt-10">
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
                  className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Buscar
                </Button>
              </div>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">{estatisticas.totalUsuarios.toLocaleString()}</div>
              <div className="text-gray-600 mt-1">Usuários Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">{estatisticas.totalAnuncios.toLocaleString()}</div>
              <div className="text-gray-600 mt-1">Anúncios</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">{estatisticas.totalCidades}</div>
              <div className="text-gray-600 mt-1">Cidades</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">{estatisticas.avaliacaoMedia}</div>
              <div className="text-gray-600 mt-1">Avaliação Média</div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Home
