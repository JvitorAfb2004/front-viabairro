import { useState } from 'react'
import { Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '../../components/ui/button'

const Planos = () => {
  const [planos] = useState([
    {
      id: 1,
      nome: 'Plano Básico',
      descricao: 'Ideal para pequenos negócios',
      valor: 29.90,
      qtdAnuncios: 3,
      ativo: true,
      dataCriacao: '2024-01-01'
    },
    {
      id: 2,
      nome: 'Plano Mensal',
      descricao: 'Para negócios em crescimento',
      valor: 49.90,
      qtdAnuncios: 5,
      ativo: true,
      dataCriacao: '2024-01-01'
    },
    {
      id: 3,
      nome: 'Plano Anual',
      descricao: 'Melhor custo-benefício',
      valor: 99.90,
      qtdAnuncios: 10,
      ativo: true,
      dataCriacao: '2024-01-01'
    },
    {
      id: 4,
      nome: 'Plano Premium',
      descricao: 'Para grandes empresas',
      valor: 199.90,
      qtdAnuncios: 25,
      ativo: false,
      dataCriacao: '2024-01-01'
    }
  ])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingPlano, setEditingPlano] = useState(null)

  const handleCreatePlano = () => {
    setShowCreateForm(true)
  }

  const handleEditPlano = (plano) => {
    setEditingPlano(plano)
  }

  const handleDeletePlano = (id) => {
    console.log('Excluir plano:', id)
  }

  const handleToggleStatus = (id) => {
    console.log('Alterar status do plano:', id)
  }

  return (
    <div className="max-w-7xl mx-auto">
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
                  R$ {plano.valor.toFixed(2).replace('.', ',')}
                </div>
                <div className="text-sm text-gray-500">
                  por mês
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
                  onClick={() => handleToggleStatus(plano.id)}
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
                  onClick={() => handleDeletePlano(plano.id)}
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
      {(showCreateForm || editingPlano) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {editingPlano ? 'Editar Plano' : 'Novo Plano'}
            </h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Plano
                </label>
                <input
                  type="text"
                  defaultValue={editingPlano?.nome || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Plano Premium"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição
                </label>
                <textarea
                  defaultValue={editingPlano?.descricao || ''}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Descreva o plano..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor Mensal (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  defaultValue={editingPlano?.valor || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="99.90"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantidade de Anúncios
                </label>
                <input
                  type="number"
                  defaultValue={editingPlano?.qtdAnuncios || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="10"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="ativo"
                  defaultChecked={editingPlano?.ativo || false}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="ativo" className="text-sm text-gray-700">
                  Plano ativo
                </label>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button type="submit" className="flex-1">
                  {editingPlano ? 'Salvar Alterações' : 'Criar Plano'}
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
          </div>
        </div>
      )}

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
    </div>
  )
}

export default Planos
