import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Search, Filter, X, MapPin, DollarSign, Calendar } from 'lucide-react';

const FiltrosBusca = ({ onFiltrosChange, filtrosIniciais = {} }) => {
  const [filtros, setFiltros] = useState({
    termo: filtrosIniciais.termo || '',
    categoria: filtrosIniciais.categoria || '',
    precoMin: filtrosIniciais.precoMin || '',
    precoMax: filtrosIniciais.precoMax || '',
    ordenacao: filtrosIniciais.ordenacao || 'relevancia',
    ...filtrosIniciais
  });

  const [filtrosAtivos, setFiltrosAtivos] = useState([]);

  const categorias = [
    'Vendas',
    'Aluguel',
    'Serviços',
    'Emprego',
    'Automóveis',
    'Imóveis',
    'Eletrônicos',
    'Casa e Jardim',
    'Moda e Beleza',
    'Esportes',
    'Livros',
    'Outros'
  ];


  const opcoesOrdenacao = [
    { value: 'relevancia', label: 'Mais Relevante' },
    { value: 'preco_menor', label: 'Menor Preço' },
    { value: 'preco_maior', label: 'Maior Preço' },
    { value: 'data_recente', label: 'Mais Recente' },
    { value: 'data_antiga', label: 'Mais Antigo' }
  ];

  const handleFiltroChange = (campo, valor) => {
    const novosFiltros = { ...filtros, [campo]: valor };
    setFiltros(novosFiltros);
    
    // Adicionar filtro ativo se não estiver vazio
    if (valor && valor !== '') {
      const filtroAtivo = { campo, valor, label: getFiltroLabel(campo, valor) };
      setFiltrosAtivos(prev => {
        const filtrosSemAtual = prev.filter(f => f.campo !== campo);
        return [...filtrosSemAtual, filtroAtivo];
      });
    } else {
      setFiltrosAtivos(prev => prev.filter(f => f.campo !== campo));
    }
    
    onFiltrosChange && onFiltrosChange(novosFiltros);
  };

  const getFiltroLabel = (campo, valor) => {
    switch (campo) {
      case 'categoria':
        return `Categoria: ${valor}`;
      case 'precoMin':
        return `Preço mínimo: R$ ${valor}`;
      case 'precoMax':
        return `Preço máximo: R$ ${valor}`;
      case 'ordenacao':
        return opcoesOrdenacao.find(o => o.value === valor)?.label || valor;
      default:
        return `${campo}: ${valor}`;
    }
  };

  const removerFiltro = (campo) => {
    handleFiltroChange(campo, '');
  };

  const limparTodosFiltros = () => {
    const filtrosLimpos = {
      termo: '',
      categoria: '',
      precoMin: '',
      precoMax: '',
      ordenacao: 'relevancia'
    };
    setFiltros(filtrosLimpos);
    setFiltrosAtivos([]);
    onFiltrosChange && onFiltrosChange(filtrosLimpos);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filtros de Busca
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Termo de busca */}
        <div>
          <Label htmlFor="termo">Buscar por</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="termo"
              placeholder="Digite o que você está procurando..."
              value={filtros.termo}
              onChange={(e) => handleFiltroChange('termo', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filtros ativos */}
        {filtrosAtivos.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Filtros Ativos</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={limparTodosFiltros}
                className="text-xs"
              >
                Limpar todos
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {filtrosAtivos.map((filtro, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {filtro.label}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removerFiltro(filtro.campo)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Categoria */}
        <div>
          <Label htmlFor="categoria">Categoria</Label>
          <Select value={filtros.categoria || "all"} onValueChange={(valor) => handleFiltroChange('categoria', valor === "all" ? "" : valor)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {categorias.map((categoria) => (
                <SelectItem key={categoria} value={categoria}>
                  {categoria}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Preço */}
        <div>
          <Label>Faixa de Preço</Label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="precoMin" className="text-xs">Mínimo</Label>
              <div className="relative">
                <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="precoMin"
                  type="number"
                  placeholder="0"
                  value={filtros.precoMin}
                  onChange={(e) => handleFiltroChange('precoMin', e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="precoMax" className="text-xs">Máximo</Label>
              <div className="relative">
                <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="precoMax"
                  type="number"
                  placeholder="1000"
                  value={filtros.precoMax}
                  onChange={(e) => handleFiltroChange('precoMax', e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </div>
        </div>


        {/* Ordenação */}
        <div>
          <Label htmlFor="ordenacao">Ordenar por</Label>
          <Select value={filtros.ordenacao} onValueChange={(valor) => handleFiltroChange('ordenacao', valor)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {opcoesOrdenacao.map((opcao) => (
                <SelectItem key={opcao.value} value={opcao.value}>
                  {opcao.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Botão de busca */}
        <Button className="w-full" onClick={() => onFiltrosChange && onFiltrosChange(filtros)}>
          <Search className="w-4 h-4 mr-2" />
          Buscar Anúncios
        </Button>
      </CardContent>
    </Card>
  );
};

export default FiltrosBusca;
