import React, { useState, useEffect, useRef } from 'react';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Search } from 'lucide-react';

const AutocompleteSearch = ({ 
  placeholder = "Buscar anúncios...", 
  onSearch, 
  onSelect,
  className = "",
  suggestions = []
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Sugestões padrão se não fornecidas
  const defaultSuggestions = [
    'Furadeira da Electrolux',
    'Apartamento 2 quartos',
    'Carro usado Honda Civic',
    'Serviço de limpeza residencial',
    'Casa para alugar 3 quartos',
    'Vaga de emprego vendedor',
    'Moto Honda CG 160',
    'Notebook Dell Inspiron',
    'Sofá 3 lugares',
    'Aulas de inglês',
    'Eletricista 24h',
    'Manicure e pedicure',
    'Academia completa',
    'Consultório médico',
    'Auto escola',
    'Pizzaria delivery',
    'Salão de beleza',
    'Oficina mecânica',
    'Pet shop',
    'Farmácia 24h'
  ];

  const allSuggestions = suggestions.length > 0 ? suggestions : defaultSuggestions;

  useEffect(() => {
    if (query.length > 0) {
      const filtered = allSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setIsOpen(true);
    } else {
      setFilteredSuggestions(allSuggestions.slice(0, 8)); // Mostrar sugestões populares
      setIsOpen(true);
    }
    setSelectedIndex(-1);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelect(filteredSuggestions[selectedIndex]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSelect = (suggestion) => {
    setQuery(suggestion);
    setIsOpen(false);
    setSelectedIndex(-1);
    onSelect && onSelect(suggestion);
  };

  const handleSearch = () => {
    setIsOpen(false);
    onSearch && onSearch(query);
  };



  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-4"
        />
      </div>

      {isOpen && (
        <Card 
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 z-50 max-h-80 overflow-y-auto"
        >
          <CardContent className="p-0">
            {filteredSuggestions.length > 0 ? (
              <div className="py-2">
                {filteredSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`
                      px-4 py-3 cursor-pointer transition-colors
                      ${index === selectedIndex 
                        ? 'bg-[#f59820] bg-opacity-10 border-l-4 border-[#f59820]' 
                        : 'hover:bg-gray-50'
                      }
                    `}
                    onClick={() => handleSelect(suggestion)}
                  >
                    <div className="font-medium text-gray-900">
                      {suggestion}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-4 py-8 text-center text-gray-500">
                <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>Nenhuma sugestão encontrada</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AutocompleteSearch;
