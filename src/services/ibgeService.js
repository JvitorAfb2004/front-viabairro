// Serviço para buscar dados de estados e cidades do IBGE
class IBGEService {
  constructor() {
    this.baseURL = 'https://servicodados.ibge.gov.br/api/v1';
  }

  // Buscar todos os estados do Brasil
  async getEstados() {
    try {
      const response = await fetch(`${this.baseURL}/localidades/estados`);
      if (!response.ok) {
        throw new Error('Erro ao buscar estados');
      }
      const estados = await response.json();
      
      // Retornar apenas os dados necessários, ordenados por nome
      return estados
        .map(estado => ({
          id: estado.id,
          sigla: estado.sigla,
          nome: estado.nome
        }))
        .sort((a, b) => a.nome.localeCompare(b.nome));
    } catch (error) {
      console.error('Erro ao buscar estados:', error);
      throw error;
    }
  }

  // Buscar cidades de um estado específico
  async getCidadesPorEstado(estadoId) {
    try {
      const response = await fetch(`${this.baseURL}/localidades/estados/${estadoId}/municipios`);
      if (!response.ok) {
        throw new Error('Erro ao buscar cidades');
      }
      const cidades = await response.json();
      
      // Retornar apenas os dados necessários, ordenados por nome
      return cidades
        .map(cidade => ({
          id: cidade.id,
          nome: cidade.nome
        }))
        .sort((a, b) => a.nome.localeCompare(b.nome));
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
      throw error;
    }
  }

  // Buscar cidades por sigla do estado (mais conveniente para o frontend)
  async getCidadesPorSigla(siglaEstado) {
    try {
      // Primeiro buscar o ID do estado pela sigla
      const estados = await this.getEstados();
      const estado = estados.find(e => e.sigla === siglaEstado);
      
      if (!estado) {
        throw new Error('Estado não encontrado');
      }
      
      // Depois buscar as cidades
      return await this.getCidadesPorEstado(estado.id);
    } catch (error) {
      console.error('Erro ao buscar cidades por sigla:', error);
      throw error;
    }
  }
}

export default new IBGEService();
