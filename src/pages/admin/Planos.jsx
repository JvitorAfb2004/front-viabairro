import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, CheckCircle, XCircle, Loader2, CreditCard, DollarSign, AlertTriangle } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import Dialog from '../../components/ui/dialog'
import adminService from '../../services/adminService'
import { useToast } from '../../contexts/ToastContext'

const Planos = () => {
  const { showSuccess, showError } = useToast()
  const [planos, setPlanos] = useState([])
  const [loading, setLoading] = useState(true)

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingPlano, setEditingPlano] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [planoSelecionado, setPlanoSelecionado] = useState(null)
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    valor: '',
    qtdAnuncios: '',
    ativo: true
  })
  const [submitting, setSubmitting] = useState(false)

  // Função para formatar valor em reais
  const formatCurrency = (value) => {
    const numericValue = value.replace(/\D/g, '')
    const formattedValue = (numericValue / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
    return formattedValue
  }

  // Função para extrair valor numérico
  const extractNumericValue = (formattedValue) => {
    return formattedValue.replace(/\D/g, '') / 100
  }

  useEffect(() => {
    const carregarPlanos = async () => {
      try {
        setLoading(true)
        const response = await adminService.getPlanos()
        if (response.sucesso) {
          setPlanos(response.dados.planos || [])
        }
      } catch (error) {
        console.error('Erro ao carregar planos:', error)
        showError('Erro ao carregar planos')
      } finally {
        setLoading(false)
      }
    }

    carregarPlanos()
  }, [showError])

  const handleCreatePlano = () => {
    setFormData({
      nome: '',
      descricao: '',
      valor: '',
      qtdAnuncios: '',
      ativo: true
    })
    setEditingPlano(null)
    setShowCreateForm(true)
  }

  const handleEditPlano = (plano) => {
    setFormData({
      nome: plano.nome || '',
      descricao: plano.descricao || '',
      valor: plano.valor ? formatCurrency((plano.valor * 100).toString()) : '',
      qtdAnuncios: plano.qtdAnuncios || '',
      ativo: plano.ativo || false
    })
    setEditingPlano(plano)
    setShowCreateForm(true)
  }

  const handleInputChange = (field, value) => {
    if (field === 'valor') {
      const formatted = formatCurrency(value)
      setFormData(prev => ({ ...prev, [field]: formatted }))
    } else {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      const planoData = {
        nome: formData.nome,
        descricao: formData.descricao || '',
        valor: formData.valor ? extractNumericValue(formData.valor) : 0,
        qtd_anuncios: parseInt(formData.qtdAnuncios) || 0,
        ativo: formData.ativo
      }

      // Validação básica
      if (!planoData.nome.trim()) {
        showError('Nome do plano é obrigatório')
        return
      }
      if (planoData.valor <= 0) {
        showError('Valor deve ser maior que zero')
        return
      }
      if (planoData.qtd_anuncios <= 0) {
        showError('Quantidade de anúncios deve ser maior que zero')
        return
      }

      let response
      if (editingPlano) {
        response = await adminService.atualizarPlano(editingPlano.id, planoData)
      } else {
        response = await adminService.criarPlano(planoData)
      }

      if (response.sucesso) {
        showSuccess(`Plano ${editingPlano ? 'atualizado' : 'criado'} com sucesso!`)
        setShowCreateForm(false)
        setEditingPlano(null)
        // Recarregar lista
        const response = await adminService.getPlanos()
        if (response.sucesso) {
          setPlanos(response.dados.planos || [])
        }
      }
    } catch (error) {
      console.error('Erro ao salvar plano:', error)
      showError('Erro ao salvar plano')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeletePlano = async (plano) => {
    try {
      const response = await adminService.excluirPlano(plano.id)
      if (response.sucesso) {
        showSuccess('Plano excluído com sucesso!')
        // Recarregar lista
        const response = await adminService.getPlanos()
        if (response.sucesso) {
          setPlanos(response.dados.planos || [])
        }
      }
    } catch (error) {
      console.error('Erro ao excluir plano:', error)
      showError('Erro ao excluir plano')
    }
  }

  const handleConfirmDelete = (plano) => {
    setPlanoSelecionado(plano)
    setDialogOpen(true)
  }

  const handleToggleStatus = async (plano) => {
    try {
      const novoStatus = !plano.ativo
      const response = await adminService.atualizarPlano(plano.id, { ativo: novoStatus })
      if (response.sucesso) {
        showSuccess(`Plano ${novoStatus ? 'ativado' : 'desativado'} com sucesso!`)
        // Recarregar lista
        const response = await adminService.getPlanos()
        if (response.sucesso) {
          setPlanos(response.dados.planos || [])
        }
      }
    } catch (error) {
      console.error('Erro ao alterar status do plano:', error)
      showError('Erro ao alterar status do plano')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando planos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Gerenciar Planos
            </h1>
            <p className="text-gray-600">
              Configure os planos de assinatura disponíveis
            </p>
          </div>
          <Button onClick={handleCreatePlano} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Novo Plano</span>
          </Button>
        </div>
      </div>

      {/* Grid de Planos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {planos.map((plano) => (
          <div key={plano.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {plano.nome}
                </h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  plano.ativo 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {plano.ativo ? 'Ativo' : 'Inativo'}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">
                {plano.descricao}
              </p>
              
              <div className="mb-4">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  R$ {Number(plano.valor).toFixed(2).replace('.', ',')}
                </div>
                <div className="text-sm text-gray-500">
                  por ano
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Anúncios incluídos:</span>
                  <span className="font-medium text-gray-900">
                    {plano.qtdAnuncios}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditPlano(plano)}
                  className="w-full flex items-center justify-center space-x-1"
                >
                  <Edit className="h-4 w-4" />
                  <span>Editar</span>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleStatus(plano)}
                  className={`w-full flex items-center justify-center space-x-1 ${
                    plano.ativo 
                      ? 'text-red-600 hover:text-red-700 hover:bg-red-50'
                      : 'text-green-600 hover:text-green-700 hover:bg-green-50'
                  }`}
                >
                  {plano.ativo ? (
                    <>
                      <XCircle className="h-4 w-4" />
                      <span>Desativar</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      <span>Ativar</span>
                    </>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleConfirmDelete(plano)}
                  className="w-full flex items-center justify-center space-x-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Excluir</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Formulário de Criação/Edição */}
      {/* Modal de Criar/Editar Plano */}
      <Dialog
        isOpen={showCreateForm}
        onClose={() => {
          setShowCreateForm(false)
          setEditingPlano(null)
        }}
        title={editingPlano ? 'Editar Plano' : 'Novo Plano'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome do Plano
            </label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => handleInputChange('nome', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Ex: Plano Premium"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição
            </label>
            <textarea
              value={formData.descricao}
              onChange={(e) => handleInputChange('descricao', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Descreva o plano..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor Anual
            </label>
            <input
              type="text"
              value={formData.valor}
              onChange={(e) => handleInputChange('valor', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="R$ 1.200,00"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantidade de Anúncios
            </label>
            <input
              type="number"
              value={formData.qtdAnuncios}
              onChange={(e) => handleInputChange('qtdAnuncios', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="10"
              required
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="ativo"
              checked={formData.ativo}
              onChange={(e) => handleInputChange('ativo', e.target.checked)}
              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
            />
            <label htmlFor="ativo" className="text-sm text-gray-700">
              Plano ativo
            </label>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button 
              type="submit" 
              className="flex-1 bg-orange-600 hover:bg-orange-700"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                editingPlano ? 'Salvar Alterações' : 'Criar Plano'
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowCreateForm(false)
                setEditingPlano(null)
              }}
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Dialog>

      {planos.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="text-gray-400 mb-4">
            <Plus className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum plano criado
          </h3>
          <p className="text-gray-600 mb-4">
            Crie seu primeiro plano de assinatura
          </p>
          <Button onClick={handleCreatePlano}>
            <Plus className="h-4 w-4 mr-2" />
            Criar Primeiro Plano
          </Button>
        </div>
      )}

      {/* Dialog de Confirmação */}
      <Dialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="Excluir Plano"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">
                Excluir plano
              </p>
              <p className="text-sm text-gray-600">
                {planoSelecionado?.nome}
              </p>
            </div>
          </div>
          
          <p className="text-gray-600">
            Tem certeza que deseja excluir este plano? Esta ação não pode ser desfeita.
          </p>
          
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => {
                handleDeletePlano(planoSelecionado)
                setDialogOpen(false)
              }}
            >
              Excluir
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default Planos
