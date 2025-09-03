import { useEffect } from 'react'

/**
 * Hook para prevenir scroll da página quando um modal/dialog está aberto
 * @param {boolean} isOpen - Estado que indica se o modal está aberto
 */
export const usePreventScroll = (isOpen) => {
  useEffect(() => {
    if (isOpen) {
      // Prevenir scroll quando modal está aberto
      document.body.style.overflow = 'hidden'
    } else {
      // Restaurar scroll quando modal fecha
      document.body.style.overflow = 'unset'
    }

    // Cleanup quando componente desmontar
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])
}

export default usePreventScroll
