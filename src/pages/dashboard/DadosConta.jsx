import { useState, useEffect } from 'react'
import { User, Mail, Phone, MapPin, Save, Loader2 } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { useAuth } from '../../contexts/AuthContext'
import { useToast } from '../../contexts/ToastContext'
import ibgeService from '../../services/ibgeService'

const DadosConta = () => {
  const { user, updateUser } = useAuth()
  const { showSuccess, showError } = useToast()
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    cidade: '',
    estado: '',
    bairro: '',
    senha: '',
    confirmarSenha: ''
  })


  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [estados, setEstados] = useState([])
  const [cidades, setCidades] = useState([])
  const [cidadesFiltradas, setCidadesFiltradas] = useState([])
  const [estadosFiltrados, setEstadosFiltrados] = useState([])
  const [loadingEstados, setLoadingEstados] = useState(false)
  const [loadingCidades, setLoadingCidades] = useState(false)
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false)
  const [mostrarSugestoesEstado, setMostrarSugestoesEstado] = useState(false)
  const [carregandoDadosIniciais, setCarregandoDadosIniciais] = useState(false)
  const [dadosIniciaisCarregados, setDadosIniciaisCarregados] = useState(false)

  // Carregar estados do IBGE
  useEffect(() => {
    const carregarEstados = async () => {
      setLoadingEstados(true)
      try {
        const estadosData = await ibgeService.getEstados()
        setEstados(estadosData)
      } catch (error) {
        console.error('Erro ao carregar estados:', error)
        showError('Erro ao carregar lista de estados')
      } finally {
        setLoadingEstados(false)
      }
    }
    
    carregarEstados()
  }, [showError])

  // Carregar dados do usuário quando o componente montar
  useEffect(() => {
    if (user) {
      const carregarDadosUsuario = async () => {
        setCarregandoDadosIniciais(true) // Marcar que estamos carregando dados iniciais
        
        // Se o estado vem como sigla do backend, converter para nome
        let nomeEstado = user.estado || ''
        if (user.estado && estados.length > 0) {
          // Verificar se é sigla (2 caracteres) ou nome
          if (user.estado.length === 2) {
            const estadoEncontrado = estados.find(e => e.sigla === user.estado)
            if (estadoEncontrado) {
              nomeEstado = estadoEncontrado.nome
            }
          } else {
            // Já é um nome, usar diretamente
            nomeEstado = user.estado
          }
        }

        const dadosFormulario = {
          nome: user.nome || '',
          email: user.email || '',
          telefone: user.telefone || '',
          endereco: user.endereco || '',
          cidade: user.cidade || '',
          estado: nomeEstado, // Usar nome para exibição
          bairro: user.bairro || '',
          senha: '',
          confirmarSenha: ''
        }
        
        setFormData(dadosFormulario)
        
        setCarregandoDadosIniciais(false) // Marcar que terminamos de carregar dados iniciais
        setDadosIniciaisCarregados(true) // Marcar que os dados iniciais foram carregados
      }
      
      carregarDadosUsuario()
    }
  }, [user])

  // Carregar cidades quando estados forem carregados e usuário tiver dados
  useEffect(() => {
    const carregarCidadesIniciais = async () => {
      if (user && user.estado && user.cidade && estados.length > 0 && !carregandoDadosIniciais) {
        try {
          // Converter nome do estado para sigla para buscar cidades
          const estadoEncontrado = estados.find(e => e.nome === user.estado)
          
          if (estadoEncontrado) {
            const cidadesData = await ibgeService.getCidadesPorSigla(estadoEncontrado.sigla)
            setCidades(cidadesData)
          } else {
            // Se não encontrar por nome, tentar por sigla (compatibilidade)
            const cidadesData = await ibgeService.getCidadesPorSigla(user.estado)
            setCidades(cidadesData)
          }
        } catch (error) {
          console.error('Erro ao carregar cidades para exibição:', error)
        }
      }
    }

    carregarCidadesIniciais()
  }, [estados, user, carregandoDadosIniciais])

  // Carregar cidades quando estado for selecionado
  useEffect(() => {
    if (formData.estado && dadosIniciaisCarregados) {
      const carregarCidades = async () => {
        setLoadingCidades(true)
        setCidades([]) // Limpar cidades anteriores
        
        // Só limpar cidade se a cidade estiver vazia
        if (!formData.cidade) {
          setFormData(prev => ({ ...prev, cidade: '' })) // Limpar cidade selecionada
        }
        
        try {
          // Converter nome do estado para sigla para buscar cidades
          const estadoEncontrado = estados.find(e => e.nome === formData.estado)
          if (estadoEncontrado) {
            const cidadesData = await ibgeService.getCidadesPorSigla(estadoEncontrado.sigla)
            setCidades(cidadesData)
          }
        } catch (error) {
          console.error('Erro ao carregar cidades:', error)
          showError('Erro ao carregar lista de cidades')
        } finally {
          setLoadingCidades(false)
        }
      }
      
      carregarCidades()
    } else {
      setCidades([])
    }
  }, [formData.estado, showError, estados, dadosIniciaisCarregados])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpar erro quando usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 6) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 10) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
  }

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({
      ...prev,
      telefone: formatted
    }));
  }

  const handleCidadeChange = (e) => {
    const valor = e.target.value;
    setFormData(prev => ({
      ...prev,
      cidade: valor
    }));

    // Filtrar cidades baseado no que o usuário está digitando
    if (valor.length > 0) {
      const filtradas = cidades.filter(cidade =>
        cidade.nome.toLowerCase().includes(valor.toLowerCase())
      );
      setCidadesFiltradas(filtradas.slice(0, 10)); // Limitar a 10 sugestões
      setMostrarSugestoes(true);
    } else {
      setCidadesFiltradas([]);
      setMostrarSugestoes(false);
    }
  }

  const handleEstadoChange = (e) => {
    const valor = e.target.value;
    setFormData(prev => ({
      ...prev,
      estado: valor
    }));

    // Filtrar estados baseado no que o usuário está digitando
    if (valor.length > 0) {
      const filtrados = estados.filter(estado =>
        estado.nome.toLowerCase().includes(valor.toLowerCase())
      );
      setEstadosFiltrados(filtrados.slice(0, 10)); // Limitar a 10 sugestões
      setMostrarSugestoesEstado(true);
    } else {
      setEstadosFiltrados([]);
      setMostrarSugestoesEstado(false);
    }
  }

  const selecionarCidade = (cidade) => {
    setFormData(prev => ({
      ...prev,
      cidade: cidade.nome
    }));
    setMostrarSugestoes(false);
  }

  const selecionarEstado = (estado) => {
    setFormData(prev => ({
      ...prev,
      estado: estado.nome
    }));
    setMostrarSugestoesEstado(false);
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    if (formData.senha && formData.senha.length < 6) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres'
    }

    if (formData.senha && formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = 'Senhas não coincidem'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    
    try {
      const updateData = {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        endereco: formData.endereco,
        cidade: formData.cidade,
        estado: formData.estado, // Salvar o nome do estado diretamente
        bairro: formData.bairro
      }

      // Se a senha foi preenchida, incluir na atualização
      if (formData.senha) {
        updateData.senha = formData.senha
      }

      await updateUser(updateData)
      showSuccess('Dados atualizados com sucesso!')
      
      // Limpar campos de senha
      setFormData(prev => ({
        ...prev,
        senha: '',
        confirmarSenha: ''
      }))
    } catch (error) {
      showError(error.message || 'Erro ao atualizar dados')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dados da Conta
        </h1>
        <p className="text-gray-600">
          Atualize suas informações pessoais
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Informações Pessoais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nome" className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  Nome Completo
                </Label>
                <Input
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className={errors.nome ? 'border-red-500' : ''}
                  required
                />
                {errors.nome && (
                  <p className="text-red-500 text-sm">{errors.nome}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  E-mail
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'border-red-500' : ''}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone" className="flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  Telefone
                </Label>
                <Input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  value={formData.telefone}
                  onChange={handlePhoneChange}
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endereco" className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Endereço
                </Label>
                <Input
                  id="endereco"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleInputChange}
                  placeholder="Rua, número"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bairro" className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Bairro
                </Label>
                <Input
                  id="bairro"
                  name="bairro"
                  value={formData.bairro}
                  onChange={handleInputChange}
                  placeholder="Nome do bairro"
                />
              </div>

              <div className="space-y-2 relative">
                <Label htmlFor="estado" className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Estado
                </Label>
                <Input
                  id="estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleEstadoChange}
                  onFocus={() => {
                    if (formData.estado.length > 0) {
                      setMostrarSugestoesEstado(true);
                    }
                  }}
                  onBlur={() => {
                    setTimeout(() => setMostrarSugestoesEstado(false), 200);
                  }}
                  placeholder="Digite o nome do estado"
                />
                
                {/* Sugestões de estados */}
                {mostrarSugestoesEstado && estadosFiltrados.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {estadosFiltrados.map(estado => (
                      <div
                        key={estado.id}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                        onClick={() => selecionarEstado(estado)}
                      >
                        {estado.nome}
                      </div>
                    ))}
                  </div>
                )}
                
                {loadingEstados && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Carregando estados...
                  </div>
                )}
              </div>

              <div className="space-y-2 relative">
                <Label htmlFor="cidade" className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Cidade
                </Label>
                <Input
                  id="cidade"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleCidadeChange}
                  onFocus={() => {
                    if (formData.cidade.length > 0) {
                      setMostrarSugestoes(true);
                    }
                  }}
                  onBlur={() => {
                    setTimeout(() => setMostrarSugestoes(false), 200);
                  }}
                  placeholder="Digite o nome da cidade"
                />
                
                {/* Sugestões de cidades */}
                {mostrarSugestoes && cidadesFiltradas.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {cidadesFiltradas.map(cidade => (
                      <div
                        key={cidade.id}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                        onClick={() => selecionarCidade(cidade)}
                      >
                        {cidade.nome}
                      </div>
                    ))}
                  </div>
                )}
                
              </div>
            </div>

            {/* Alteração de Senha */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Alterar Senha
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="senha">Nova Senha</Label>
                  <Input
                    id="senha"
                    name="senha"
                    type="password"
                    value={formData.senha}
                    onChange={handleInputChange}
                    className={errors.senha ? 'border-red-500' : ''}
                  />
                  {errors.senha && (
                    <p className="text-red-500 text-sm">{errors.senha}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmarSenha">Confirmar Nova Senha</Label>
                  <Input
                    id="confirmarSenha"
                    name="confirmarSenha"
                    type="password"
                    value={formData.confirmarSenha}
                    onChange={handleInputChange}
                    className={errors.confirmarSenha ? 'border-red-500' : ''}
                  />
                  {errors.confirmarSenha && (
                    <p className="text-red-500 text-sm">{errors.confirmarSenha}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Botão Salvar */}
            <div className="flex justify-end pt-6">
              <Button 
                type="submit" 
                className="flex items-center space-x-2"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                <span>{loading ? 'Salvando...' : 'Salvar Alterações'}</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default DadosConta
