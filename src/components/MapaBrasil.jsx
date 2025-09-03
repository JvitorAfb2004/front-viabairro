import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Users, TrendingUp, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MapaBrasil = ({ onEstadoClick }) => {
  const [estadoHover, setEstadoHover] = useState(null);
  const [filtroAtivo, setFiltroAtivo] = useState('todos');
  const [buscaTexto, setBuscaTexto] = useState('');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const estados = [
    { id: 'AC', nome: 'Acre', sigla: 'AC', cor: '#FF6B6B', anuncios: 45, usuarios: 120 },
    { id: 'AL', nome: 'Alagoas', sigla: 'AL', cor: '#4ECDC4', anuncios: 78, usuarios: 200 },
    { id: 'AP', nome: 'Amapá', sigla: 'AP', cor: '#45B7D1', anuncios: 23, usuarios: 65 },
    { id: 'AM', nome: 'Amazonas', sigla: 'AM', cor: '#96CEB4', anuncios: 156, usuarios: 420 },
    { id: 'BA', nome: 'Bahia', sigla: 'BA', cor: '#FFEAA7', anuncios: 234, usuarios: 680 },
    { id: 'CE', nome: 'Ceará', sigla: 'CE', cor: '#DDA0DD', anuncios: 189, usuarios: 520 },
    { id: 'DF', nome: 'Distrito Federal', sigla: 'DF', cor: '#98D8C8', anuncios: 145, usuarios: 380 },
    { id: 'ES', nome: 'Espírito Santo', sigla: 'ES', cor: '#F7DC6F', anuncios: 98, usuarios: 250 },
    { id: 'GO', nome: 'Goiás', sigla: 'GO', cor: '#BB8FCE', anuncios: 167, usuarios: 450 },
    { id: 'MA', nome: 'Maranhão', sigla: 'MA', cor: '#85C1E9', anuncios: 112, usuarios: 300 },
    { id: 'MT', nome: 'Mato Grosso', sigla: 'MT', cor: '#F8C471', anuncios: 89, usuarios: 240 },
    { id: 'MS', nome: 'Mato Grosso do Sul', sigla: 'MS', cor: '#82E0AA', anuncios: 67, usuarios: 180 },
    { id: 'MG', nome: 'Minas Gerais', sigla: 'MG', cor: '#F1948A', anuncios: 456, usuarios: 1200 },
    { id: 'PA', nome: 'Pará', sigla: 'PA', cor: '#85C1E9', anuncios: 134, usuarios: 360 },
    { id: 'PB', nome: 'Paraíba', sigla: 'PB', cor: '#F7DC6F', anuncios: 76, usuarios: 210 },
    { id: 'PR', nome: 'Paraná', sigla: 'PR', cor: '#D7BDE2', anuncios: 298, usuarios: 780 },
    { id: 'PE', nome: 'Pernambuco', sigla: 'PE', cor: '#A9DFBF', anuncios: 187, usuarios: 490 },
    { id: 'PI', nome: 'Piauí', sigla: 'PI', cor: '#F9E79F', anuncios: 54, usuarios: 145 },
    { id: 'RJ', nome: 'Rio de Janeiro', sigla: 'RJ', cor: '#AED6F1', anuncios: 523, usuarios: 1350 },
    { id: 'RN', nome: 'Rio Grande do Norte', sigla: 'RN', cor: '#A3E4D7', anuncios: 89, usuarios: 230 },
    { id: 'RS', nome: 'Rio Grande do Sul', sigla: 'RS', cor: '#FADBD8', anuncios: 234, usuarios: 620 },
    { id: 'RO', nome: 'Rondônia', sigla: 'RO', cor: '#D5DBDB', anuncios: 43, usuarios: 115 },
    { id: 'RR', nome: 'Roraima', sigla: 'RR', cor: '#D6EAF8', anuncios: 21, usuarios: 58 },
    { id: 'SC', nome: 'Santa Catarina', sigla: 'SC', cor: '#D1F2EB', anuncios: 198, usuarios: 520 },
    { id: 'SP', nome: 'São Paulo', sigla: 'SP', cor: '#FAD7A0', anuncios: 1234, usuarios: 3200 },
    { id: 'SE', nome: 'Sergipe', sigla: 'SE', cor: '#F8D7DA', anuncios: 67, usuarios: 180 },
    { id: 'TO', nome: 'Tocantins', sigla: 'TO', cor: '#D4EDDA', anuncios: 45, usuarios: 120 }
  ];

  const handleEstadoClick = (estado) => {
    onEstadoClick && onEstadoClick(estado);
  };

  const filtrarEstados = () => {
    let estadosFiltrados = estados;

    // Filtro por texto de busca
    if (buscaTexto) {
      estadosFiltrados = estadosFiltrados.filter(estado => 
        estado.nome.toLowerCase().includes(buscaTexto.toLowerCase()) ||
        estado.sigla.toLowerCase().includes(buscaTexto.toLowerCase())
      );
    }

    // Filtro por quantidade de anúncios
    switch (filtroAtivo) {
      case 'poucos':
        estadosFiltrados = estadosFiltrados.filter(estado => estado.anuncios <= 50);
        break;
      case 'medio':
        estadosFiltrados = estadosFiltrados.filter(estado => estado.anuncios > 50 && estado.anuncios <= 200);
        break;
      case 'muitos':
        estadosFiltrados = estadosFiltrados.filter(estado => estado.anuncios > 200);
        break;
      default:
        break;
    }

    return estadosFiltrados;
  };

  const estadosFiltrados = filtrarEstados();

  const filtros = [
    { id: 'todos', label: 'Todos os Estados', count: estados.length },
    { id: 'poucos', label: 'Poucos Anúncios (≤50)', count: estados.filter(e => e.anuncios <= 50).length },
    { id: 'medio', label: 'Médio (51-200)', count: estados.filter(e => e.anuncios > 50 && e.anuncios <= 200).length },
    { id: 'muitos', label: 'Muitos Anúncios (>200)', count: estados.filter(e => e.anuncios > 200).length }
  ];

  const getIntensidadeCor = (anuncios) => {
    if (anuncios > 500) return 'opacity-100';
    if (anuncios > 200) return 'opacity-80';
    if (anuncios > 100) return 'opacity-60';
    if (anuncios > 50) return 'opacity-40';
    return 'opacity-20';
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Mapa do Brasil - Via Bairro
            </CardTitle>
            <p className="text-sm text-gray-600">
              Clique em um estado para ver os anúncios disponíveis
            </p>
          </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Mapa */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-lg p-4 min-h-[400px] flex items-center justify-center">
                <div className="grid grid-cols-6 gap-1 max-w-2xl">
                  {estados.map((estado, index) => (
                    <motion.div
                      key={estado.id}
                      className={`
                        relative p-2 rounded cursor-pointer transition-all duration-200 hover:scale-105
                        ${getIntensidadeCor(estado.anuncios)}
                        border-2 border-gray-300 hover:border-[#f59820]
                      `}
                      style={{ backgroundColor: estado.cor }}
                      onClick={() => handleEstadoClick(estado)}
                      onMouseEnter={() => setEstadoHover(estado)}
                      onMouseLeave={() => setEstadoHover(null)}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.02,
                        type: "spring",
                        stiffness: 100
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-center">
                        <div className="text-xs font-bold text-white drop-shadow-lg">
                          {estado.sigla}
                        </div>
                        <div className="text-xs text-white drop-shadow-lg">
                          {estado.anuncios}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Legenda */}
              <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-300 opacity-20 rounded"></div>
                  <span>Poucos anúncios</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-300 opacity-60 rounded"></div>
                  <span>Médio</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-300 opacity-100 rounded"></div>
                  <span>Muitos anúncios</span>
                </div>
              </div>
            </div>

            {/* Informações do estado */}
            <div className="space-y-4">
              {estadoHover ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{estadoHover.nome}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <TrendingUp className="w-4 h-4 mr-2 text-[#f59820]" />
                          <span className="text-sm">Anúncios</span>
                        </div>
                        <Badge variant="secondary">{estadoHover.anuncios}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2 text-[#f59820]" />
                          <span className="text-sm">Usuários</span>
                        </div>
                        <Badge variant="secondary">{estadoHover.usuarios}</Badge>
                      </div>
                      <Button 
                        className="w-full bg-[#f59820] hover:bg-[#e8891a] text-white" 
                        onClick={() => handleEstadoClick(estadoHover)}
                      >
                        Ver Anúncios
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Selecione um Estado</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Passe o mouse sobre um estado para ver as informações ou clique para acessar os anúncios.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Estatísticas gerais */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Estatísticas Gerais</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total de Anúncios</span>
                      <Badge variant="outline">
                        {estados.reduce((total, estado) => total + estado.anuncios, 0).toLocaleString()}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total de Usuários</span>
                      <Badge variant="outline">
                        {estados.reduce((total, estado) => total + estado.usuarios, 0).toLocaleString()}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Estados Ativos</span>
                      <Badge variant="outline">{estados.length}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
      </motion.div>
    </div>
  );
};

export default MapaBrasil;
