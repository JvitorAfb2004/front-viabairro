import { useState, useEffect } from 'react'
import assinaturaService from '../services/assinaturaService'

export const useSubscription = () => {
  const [assinatura, setAssinatura] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const carregarAssinatura = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await assinaturaService.getMinhaAssinatura()
        if (response.sucesso) {
          setAssinatura(response.dados.assinatura)
        } else {
          setAssinatura(null)
        }
      } catch (error) {
        console.error('Erro ao carregar assinatura:', error)
        setError(error.message)
        setAssinatura(null)
      } finally {
        setLoading(false)
      }
    }

    carregarAssinatura()
  }, [])

  const isActive = assinatura && assinatura.status === 'ativa'
  const canCreateAds = isActive || !assinatura // Permite criar se não tem assinatura (plano gratuito)

  return {
    assinatura,
    loading,
    error,
    isActive,
    canCreateAds
  }
}
