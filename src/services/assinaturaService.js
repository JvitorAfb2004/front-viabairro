// Serviço para gerenciar assinaturas e pagamentos
import api from './api.js'

class AssinaturaService {
  // Buscar assinatura atual do usuário
  async getMinhaAssinatura() {
    return await api.get('/planos/minha-assinatura')
  }

  // Buscar histórico de pagamentos
  async getHistoricoPagamentos() {
    return await api.get('/planos/historico-pagamentos')
  }

  // Buscar planos disponíveis
  async getPlanos() {
    return await api.get('/planos')
  }

  // Criar nova assinatura
  async criarAssinatura(planoId) {
    return await api.post('/planos/assinar', { planoId })
  }

  // Renovar assinatura
  async renovarAssinatura(planoId) {
    return await api.post('/planos/renovar', { planoId })
  }

  // Cancelar assinatura
  async cancelarAssinatura() {
    return await api.post('/planos/cancelar')
  }
}

export default new AssinaturaService()
