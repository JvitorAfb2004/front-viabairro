import { Shield, LogOut } from 'lucide-react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const AdminHeader = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-[#1a1b1b] shadow-sm border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img 
              src="/favicon.ico" 
              alt="Via Bairro" 
              className="h-14 w-auto"
            />
            <span className="ml-3 px-3 py-1 text-xs font-medium bg-red-600 text-white rounded-full">
              Admin
            </span>
          </div>

          {/* Informações do admin */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-white">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium">Administrador</span>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center space-x-2 text-white hover:bg-gray-800"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
