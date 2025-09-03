import { useState } from 'react'
import { Save, Key } from 'lucide-react'
import { Button } from '../../components/ui/button'

const Configuracoes = () => {
  const [configuracoes, setConfiguracoes] = useState({
    // Mercado Pago
    mercadoPagoAccessToken: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setConfiguracoes(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Configurações salvas:', configuracoes)
  }



  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Configurações do Sistema
        </h1>
        <p className="text-gray-600">
          Configure as integrações e parâmetros globais do sistema
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Configurações do Mercado Pago */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-center space-x-2 mb-6">
            <Key className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Mercado Pago
            </h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Access Token
              </label>
              <input
                type="password"
                name="mercadoPagoAccessToken"
                value={configuracoes.mercadoPagoAccessToken}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="APP_USR_..."
              />
            </div>
          </div>
        </div>

        {/* Botão Salvar */}
        <div className="flex justify-end">
          <Button type="submit" className="flex items-center space-x-2">
            <Save className="h-4 w-4" />
            <span>Salvar Configurações</span>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Configuracoes
