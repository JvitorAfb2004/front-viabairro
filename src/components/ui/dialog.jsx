import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const Dialog = ({ isOpen, onClose, title, children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      // Pequeno delay para garantir que o DOM foi atualizado
      requestAnimationFrame(() => {
        setIsAnimating(true)
      })
      // Prevenir scroll do body quando modal está aberto
      document.body.style.overflow = 'hidden'
    } else {
      setIsAnimating(false)
      // Restaurar scroll do body quando modal fecha
      document.body.style.overflow = 'unset'
      // Aguardar animação terminar antes de remover do DOM
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop com blur */}
      <div 
        className={`fixed inset-0 backdrop-blur-sm transition-all duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Modal com animação profissional */}
      <div className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full border border-gray-200 transition-all duration-300 transform ${
        isAnimating 
          ? 'opacity-100 scale-100 translate-y-0' 
          : 'opacity-0 scale-95 translate-y-8'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Dialog
