// Dados mockados para simular API real

// Categorias de negócios
export const categorias = [
  { id: 1, nome: 'Alimentação', icon: '🍽️', cor: '#FF6B6B' },
  { id: 2, nome: 'Beleza & Estética', icon: '💄', cor: '#4ECDC4' },
  { id: 3, nome: 'Saúde & Bem-estar', icon: '🏥', cor: '#45B7D1' },
  { id: 4, nome: 'Educação', icon: '📚', cor: '#96CEB4' },
  { id: 5, nome: 'Tecnologia', icon: '💻', cor: '#FFEAA7' },
  { id: 6, nome: 'Construção & Reforma', icon: '🔨', cor: '#DDA0DD' },
  { id: 7, nome: 'Automóveis', icon: '🚗', cor: '#98D8C8' },
  { id: 8, nome: 'Serviços Domésticos', icon: '🏠', cor: '#F7DC6F' },
  { id: 9, nome: 'Lazer & Entretenimento', icon: '🎭', cor: '#BB8FCE' },
  { id: 10, nome: 'Moda & Vestuário', icon: '👗', cor: '#85C1E9' }
];

// Estados e cidades
export const estados = [
  {
    id: 1,
    nome: 'São Paulo',
    sigla: 'SP',
    cidades: ['São Paulo', 'Campinas', 'Santos', 'Ribeirão Preto', 'Sorocaba'],
    totalAnuncios: 1247
  },
  {
    id: 2,
    nome: 'Rio de Janeiro',
    sigla: 'RJ',
    cidades: ['Rio de Janeiro', 'Niterói', 'Petrópolis', 'Nova Iguaçu', 'Campos dos Goytacazes'],
    totalAnuncios: 892
  },
  {
    id: 3,
    nome: 'Minas Gerais',
    sigla: 'MG',
    cidades: ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim'],
    totalAnuncios: 654
  },
  {
    id: 4,
    nome: 'Bahia',
    sigla: 'BA',
    cidades: ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Itabuna'],
    totalAnuncios: 423
  },
  {
    id: 5,
    nome: 'Paraná',
    sigla: 'PR',
    cidades: ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel'],
    totalAnuncios: 387
  }
];

// Usuários mockados
export const usuarios = [
  {
    id: 1,
    nome: 'Maria Silva',
    email: 'maria.silva@email.com',
    telefone: '(11) 99999-1234',
    cidade: 'São Paulo',
    estado: 'SP',
    bairro: 'Vila Madalena',
    foto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    descricao: 'Empreendedora apaixonada por gastronomia, oferecendo os melhores sabores da culinária brasileira.',
    dataCadastro: '2024-01-15',
    plano: 'Premium',
    avaliacoes: 4.8,
    totalAvaliacoes: 127,
    redesSociais: {
      instagram: '@maria_sabores',
      whatsapp: '11999991234'
    }
  },
  {
    id: 2,
    nome: 'João Santos',
    email: 'joao.santos@email.com',
    telefone: '(11) 98888-5678',
    cidade: 'São Paulo',
    estado: 'SP',
    bairro: 'Pinheiros',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    descricao: 'Barbeiro profissional com mais de 10 anos de experiência. Especialista em cortes modernos.',
    dataCadastro: '2024-01-10',
    plano: 'Básico',
    avaliacoes: 4.9,
    totalAvaliacoes: 89,
    redesSociais: {
      instagram: '@joao_barber',
      whatsapp: '11988885678'
    }
  },
  {
    id: 3,
    nome: 'Ana Costa',
    email: 'ana.costa@email.com',
    telefone: '(21) 97777-9012',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    bairro: 'Copacabana',
    foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    descricao: 'Personal trainer certificada, especializada em treinamento funcional e pilates.',
    dataCadastro: '2024-01-05',
    plano: 'Premium',
    avaliacoes: 4.7,
    totalAvaliacoes: 203,
    redesSociais: {
      instagram: '@ana_fitness',
      whatsapp: '21977779012'
    }
  }
];

// Anúncios mockados
export const anuncios = [
  {
    id: 1,
    titulo: 'Padaria Artesanal - Pães Frescos Diários',
    descricao: 'Padaria tradicional com pães frescos, doces caseiros e salgados. Atendemos desde 1985 com receitas de família.\n\nNossos produtos são feitos diariamente com ingredientes selecionados e muito carinho. Venha conhecer nossos sabores únicos!',
    categoria: 'Alimentação',
    preco: 5.00,
    vendedor: {
      nome: usuarios[0].nome,
      telefone: usuarios[0].telefone,
      email: usuarios[0].email,
      avaliacao: usuarios[0].avaliacoes,
      totalAvaliacoes: usuarios[0].totalAvaliacoes,
      membroDesde: usuarios[0].dataCadastro,
      totalAnuncios: 3
    },
    imagens: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop'
    ],
    visualizacoes: 245,
    localizacao: 'Rua Augusta, 1234 - Vila Madalena, São Paulo, SP',
    dataPublicacao: '2024-01-15',
    caracteristicas: [
      'Pães frescos diários',
      'Doces caseiros',
      'Salgados artesanais',
      'Receitas de família',
      'Ingredientes selecionados'
    ],
    avaliacoes: 4.8,
    totalAvaliacoes: 127,
    endereco: 'Rua Augusta, 1234 - Vila Madalena',
    cidade: 'São Paulo',
    estado: 'SP',
    whatsapp: '11999991234',
    horarioFuncionamento: 'Seg-Sáb: 6h às 20h | Dom: 7h às 18h',
    destaque: true
  },
  {
    id: 2,
    titulo: 'Barbearia Moderna - Corte e Barba',
    descricao: 'Barbearia especializada em cortes modernos, barba e bigode. Ambiente descontraído e profissionais experientes.\n\nOferecemos serviços de corte, barba, bigode e tratamentos capilares. Venha conhecer nosso espaço!',
    categoria: 'Beleza & Estética',
    preco: 35.00,
    vendedor: {
      nome: usuarios[1].nome,
      telefone: usuarios[1].telefone,
      email: usuarios[1].email,
      avaliacao: usuarios[1].avaliacoes,
      totalAvaliacoes: usuarios[1].totalAvaliacoes,
      membroDesde: usuarios[1].dataCadastro,
      totalAnuncios: 1
    },
    imagens: [
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop'
    ],
    visualizacoes: 189,
    localizacao: 'Av. Paulista, 567 - Pinheiros, São Paulo, SP',
    dataPublicacao: '2024-01-10',
    caracteristicas: [
      'Cortes modernos',
      'Barba e bigode',
      'Ambiente descontraído',
      'Profissionais experientes',
      'Tratamentos capilares'
    ],
    avaliacoes: 4.9,
    totalAvaliacoes: 89,
    endereco: 'Av. Paulista, 567 - Pinheiros',
    cidade: 'São Paulo',
    estado: 'SP',
    whatsapp: '11988885678',
    horarioFuncionamento: 'Ter-Sáb: 9h às 19h',
    destaque: true
  },
  {
    id: 3,
    titulo: 'Personal Trainer - Treinamento Funcional',
    descricao: 'Aulas personalizadas de treinamento funcional, pilates e yoga. Atendimento domiciliar ou em estúdio.\n\nPersonal trainer certificada com mais de 5 anos de experiência. Treinos personalizados para seus objetivos!',
    categoria: 'Saúde & Bem-estar',
    preco: 80.00,
    vendedor: {
      nome: usuarios[2].nome,
      telefone: usuarios[2].telefone,
      email: usuarios[2].email,
      avaliacao: usuarios[2].avaliacoes,
      totalAvaliacoes: usuarios[2].totalAvaliacoes,
      membroDesde: usuarios[2].dataCadastro,
      totalAnuncios: 2
    },
    imagens: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop'
    ],
    visualizacoes: 156,
    localizacao: 'Rua Barata Ribeiro, 890 - Copacabana, Rio de Janeiro, RJ',
    dataPublicacao: '2024-01-05',
    caracteristicas: [
      'Treinamento funcional',
      'Pilates',
      'Yoga',
      'Atendimento domiciliar',
      'Personal trainer certificada'
    ],
    avaliacoes: 4.7,
    totalAvaliacoes: 203,
    endereco: 'Rua Barata Ribeiro, 890 - Copacabana',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    whatsapp: '21977779012',
    horarioFuncionamento: 'Seg-Sex: 6h às 22h | Sáb: 8h às 16h',
    destaque: false
  },
  {
    id: 4,
    titulo: 'Consultório Odontológico - Dr. Carlos',
    descricao: 'Clínica odontológica completa com tratamentos preventivos, estéticos e ortodontia. Atendimento humanizado.',
    categoria: 'Saúde & Bem-estar',
    preco: 'Consulta: R$ 120,00',
    usuario: {
      id: 4,
      nome: 'Dr. Carlos Mendes',
      foto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      avaliacoes: 4.9,
      totalAvaliacoes: 156
    },
    imagens: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop'
    ],
    avaliacoes: 4.9,
    totalAvaliacoes: 156,
    endereco: 'Rua das Flores, 123 - Centro',
    cidade: 'Belo Horizonte',
    estado: 'MG',
    whatsapp: '31988887777',
    horarioFuncionamento: 'Seg-Sex: 8h às 18h',
    destaque: true,
    dataPublicacao: '2024-01-08'
  },
  {
    id: 5,
    titulo: 'Aulas de Violão - Todos os Níveis',
    descricao: 'Professor experiente oferece aulas de violão para iniciantes e avançados. Método personalizado.',
    categoria: 'Educação',
    preco: 'R$ 60,00/aula',
    usuario: {
      id: 5,
      nome: 'Rafael Música',
      foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      avaliacoes: 4.8,
      totalAvaliacoes: 92
    },
    imagens: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop'
    ],
    avaliacoes: 4.8,
    totalAvaliacoes: 92,
    endereco: 'Rua da Música, 456 - Jardins',
    cidade: 'São Paulo',
    estado: 'SP',
    whatsapp: '11966665555',
    horarioFuncionamento: 'Seg-Sáb: 14h às 20h',
    destaque: false,
    dataPublicacao: '2024-01-12'
  }
];

// Estatísticas da plataforma
export const estatisticas = {
  totalUsuarios: 2847,
  totalAnuncios: 3621,
  totalCidades: 127,
  totalEstados: 15,
  crescimentoMensal: 12.5,
  avaliacaoMedia: 4.7,
  categoriasAtivas: 10
};

// Testemunhos de usuários
export const testemunhos = [
  {
    id: 1,
    nome: 'Carla Rodrigues',
    foto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
    texto: 'Através do Via Bairro consegui divulgar meu salão de beleza e triplicar minha clientela em 3 meses!',
    avaliacao: 5,
    cidade: 'São Paulo, SP'
  },
  {
    id: 2,
    nome: 'Roberto Silva',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    texto: 'Plataforma incrível! Encontrei vários fornecedores locais para meu restaurante. Recomendo!',
    avaliacao: 5,
    cidade: 'Rio de Janeiro, RJ'
  },
  {
    id: 3,
    nome: 'Fernanda Costa',
    foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    texto: 'Como personal trainer, o Via Bairro me ajudou a encontrar novos alunos na minha região.',
    avaliacao: 5,
    cidade: 'Belo Horizonte, MG'
  }
];

// Planos de assinatura
export const planos = [
  {
    id: 1,
    nome: 'Básico',
    preco: 29.90,
    periodo: 'mensal',
    limiteAnuncios: 3,
    recursos: [
      'Até 3 anúncios',
      'Perfil básico',
      'Suporte por email',
      'Estatísticas básicas'
    ],
    popular: false
  },
  {
    id: 2,
    nome: 'Premium',
    preco: 79.90,
    periodo: 'mensal',
    limiteAnuncios: 10,
    recursos: [
      'Até 10 anúncios',
      'Perfil destacado',
      'Suporte prioritário',
      'Estatísticas avançadas',
      'Badge de verificado',
      'Aparece em destaque'
    ],
    popular: true
  },
  {
    id: 3,
    nome: 'Empresarial',
    preco: 149.90,
    periodo: 'mensal',
    limiteAnuncios: -1, // ilimitado
    recursos: [
      'Anúncios ilimitados',
      'Perfil premium',
      'Suporte 24/7',
      'Analytics completo',
      'API de integração',
      'Gerente de conta dedicado'
    ],
    popular: false
  }
];

// Função para buscar anúncios por filtros
export const buscarAnuncios = (filtros = {}) => {
  let resultados = [...anuncios];
  
  if (filtros.categoria) {
    resultados = resultados.filter(anuncio => 
      anuncio.categoria.toLowerCase().includes(filtros.categoria.toLowerCase())
    );
  }
  
  if (filtros.cidade) {
    resultados = resultados.filter(anuncio => 
      anuncio.cidade.toLowerCase().includes(filtros.cidade.toLowerCase())
    );
  }
  
  if (filtros.termo) {
    resultados = resultados.filter(anuncio => 
      anuncio.titulo.toLowerCase().includes(filtros.termo.toLowerCase()) ||
      anuncio.descricao.toLowerCase().includes(filtros.termo.toLowerCase())
    );
  }
  
  return resultados;
};

// Função para obter anúncios em destaque
export const obterAnunciosDestaque = () => {
  return anuncios.filter(anuncio => anuncio.destaque).slice(0, 6);
};

// Função para obter categorias populares
export const obterCategoriasPopulares = () => {
  return categorias.slice(0, 8);
};