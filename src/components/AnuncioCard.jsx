import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { MapPin, Calendar, Eye, Heart, MessageCircle, Share2, Phone, Mail, User } from 'lucide-react';

const AnuncioCard = ({ anuncio, onView, onLike, onShare, onContact }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ativo':
        return 'bg-green-100 text-green-800';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'expirado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={anuncio.usuario.avatar} alt={anuncio.usuario.nome} />
              <AvatarFallback>
                {anuncio.usuario.nome.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{anuncio.titulo}</CardTitle>
              <p className="text-sm text-gray-600">{anuncio.usuario.nome}</p>
            </div>
          </div>
          <Badge className={getStatusColor(anuncio.status)}>
            {anuncio.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Imagem do anúncio */}
        {anuncio.imagens && anuncio.imagens.length > 0 && (
          <div className="relative">
            <img
              src={anuncio.imagens[0]}
              alt={anuncio.titulo}
              className="w-full h-48 object-cover rounded-lg"
            />
            {anuncio.imagens.length > 1 && (
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                +{anuncio.imagens.length - 1} fotos
              </div>
            )}
          </div>
        )}

        {/* Descrição */}
        <p className="text-gray-700 line-clamp-3">{anuncio.descricao}</p>

        {/* Informações do Anunciante */}
        <div className="bg-gray-50 rounded-lg p-3 space-y-2">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">{anuncio.usuario.nome}</span>
          </div>
          
          {anuncio.usuario.cidade && anuncio.usuario.estado && (
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {anuncio.usuario.cidade}, {anuncio.usuario.estado}
              </span>
            </div>
          )}
          
          {anuncio.usuario.telefone && (
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{anuncio.usuario.telefone}</span>
            </div>
          )}
          
          {anuncio.usuario.email && (
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{anuncio.usuario.email}</span>
            </div>
          )}
        </div>

        {/* Preço */}
        {anuncio.preco && (
          <div className="text-2xl font-bold text-green-600">
            {formatPrice(anuncio.preco)}
          </div>
        )}

        {/* Informações adicionais */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Publicado em {formatDate(anuncio.dataPublicacao)}</span>
          </div>
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-1" />
            <span>{anuncio.visualizacoes}</span>
          </div>
        </div>

        {/* Tags */}
        {anuncio.tags && anuncio.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {anuncio.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Ações */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onLike && onLike(anuncio.id)}
              className="flex items-center"
            >
              <Heart className="h-4 w-4 mr-1" />
              {anuncio.likes || 0}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onShare && onShare(anuncio.id)}
              className="flex items-center"
            >
              <Share2 className="h-4 w-4 mr-1" />
              Compartilhar
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onContact && onContact(anuncio.id)}
              className="flex items-center"
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              Contatar
            </Button>
            <Button
              onClick={() => onView && onView(anuncio.slug)}
              size="sm"
            >
              Ver Detalhes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnuncioCard;
