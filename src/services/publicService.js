import apiService from './api'

const publicService = {
  // Obter estatísticas gerais
  async getEstatisticas() {
    try {
      const response = await apiService.get('/public/estatisticas')
      return response
    } catch (error) {
      throw new Error(error.message || 'Erro ao carregar estatísticas')
    }
  },

  // Obter anúncios em destaque
  async getAnunciosDestaque(limite = 6) {
    try {
      const response = await apiService.get(`/public/anuncios-destaque?limite=${limite}`)
      return response
    } catch (error) {
      throw new Error(error.message || 'Erro ao carregar anúncios em destaque')
    }
  },

  // Obter anúncios relacionados
  async getAnunciosRelacionados(categoria, excluirId, limite = 3) {
    try {
      const params = new URLSearchParams({
        categoria,
        excluirId,
        limite
      })
      const response = await apiService.get(`/public/anuncios-relacionados?${params}`)
      return response
    } catch (error) {
      throw new Error(error.message || 'Erro ao carregar anúncios relacionados')
    }
  },

  // Buscar anúncios
  async buscarAnuncios(filtros = {}) {
    try {
      const params = new URLSearchParams()
      
      if (filtros.termo) params.append('termo', filtros.termo)
      if (filtros.categoria) params.append('categoria', filtros.categoria)
      if (filtros.estado) params.append('estado', filtros.estado)
      if (filtros.cidade) params.append('cidade', filtros.cidade)
      if (filtros.bairro) params.append('bairro', filtros.bairro)
      if (filtros.pagina) params.append('pagina', filtros.pagina)
      if (filtros.limite) params.append('limite', filtros.limite)
      if (filtros.ordenar) params.append('ordenar', filtros.ordenar)
      if (filtros.direcao) params.append('direcao', filtros.direcao)

      const response = await apiService.get(`/items/buscar?${params}`)
      return response
    } catch (error) {
      throw new Error(error.message || 'Erro ao buscar anúncios')
    }
  },

  // Obter anúncio público específico
  async getAnuncioPublico(slug) {
    try {
      const response = await apiService.get(`/items/publico/${slug}`)
      return response
    } catch (error) {
      throw new Error(error.message || 'Erro ao carregar anúncio')
    }
  },

  // Obter categorias disponíveis
  async getCategorias() {
    try {
      const response = await apiService.get('/items/categorias')
      return response
    } catch (error) {
      throw new Error(error.message || 'Erro ao carregar categorias')
    }
  },

  // Obter perfil público
  async getPerfilPublico(id) {
    try {
      const response = await apiService.get(`/user/perfil-publico/${id}`)
      return response
    } catch (error) {
      throw new Error(error.message || 'Erro ao carregar perfil público')
    }
  },

  // Obter anúncios do mesmo usuário
  async getAnunciosDoUsuario(usuarioId, excluirId, limite = 5) {
    try {
      const params = new URLSearchParams({
        usuarioId,
        excluirId,
        limite
      })
      const response = await apiService.get(`/public/anuncios-usuario?${params}`)
      return response
    } catch (error) {
      throw new Error(error.message || 'Erro ao carregar anúncios do usuário')
    }
  },

  // Obter bairros por cidade
  async getBairrosPorCidade(cidade, estado) {
    try {
      const params = new URLSearchParams({
        cidade,
        estado
      })
      const response = await apiService.get(`/public/bairros-por-cidade?${params}`)
      return response
    } catch (error) {
      throw new Error(error.message || 'Erro ao carregar bairros')
    }
  }
}

export default publicService
