import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'

const useEmailVerification = () => {
  const { user, isEmailVerified, refreshUser } = useAuth()
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const hasShownModal = useRef(false)

  useEffect(() => {
    // Só mostrar modal uma vez por sessão
    if (user && !hasShownModal.current) {
      hasShownModal.current = true
      
      // Aguardar um pouco para evitar mostrar imediatamente
      const timer = setTimeout(() => {
        if (!isEmailVerified()) {
          setShowVerificationModal(true)
        }
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [user, isEmailVerified])

  const handleVerificationSuccess = async () => {
    try {
      await refreshUser()
      setShowVerificationModal(false)
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error)
    }
  }

  const closeVerificationModal = () => {
    setShowVerificationModal(false)
  }

  const openVerificationModal = () => {
    setShowVerificationModal(true)
  }

  return {
    showVerificationModal,
    closeVerificationModal,
    openVerificationModal,
    handleVerificationSuccess,
    isEmailVerified: isEmailVerified(),
    user
  }
}

export default useEmailVerification
