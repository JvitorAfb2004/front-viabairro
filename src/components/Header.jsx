import { MapPin, User, LogIn, Menu, X, Home, Briefcase, Star, LogOut, Settings, Search, Plus } from 'lucide-react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

const Header = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleSearch = () => {
    navigate('/buscar');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handlePainelClick = () => {
    if (isAdmin()) {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  const navigationItems = [];
  return (
    <>
      <header className="bg-[#1a1b1b] shadow-sm sticky top-0 z-50 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => navigate('/')}
            >
              <img 
                src="/logo.png" 
                alt="Via Bairro" 
                className="h-12 w-auto"
              />
            </div>

            {/* Navigation Desktop */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navigationItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className="flex cursor-pointer items-center space-x-2 px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </nav>


            {/* Action Buttons Desktop */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Botão Início */}
              <Button 
                variant="ghost" 
                className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={() => navigate('/')}
              >
                <Home className="h-4 w-4" />
                <span>Início</span>
              </Button>
              
              {/* Botão Buscar */}
              <Button 
                variant="ghost" 
                className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={handleSearch}
              >
                <Search className="h-4 w-4" />
                <span>Buscar</span>
              </Button>
              
              {isAuthenticated() ? (
                <>
                  {/* Usuário logado */}
                  <div className="flex items-center space-x-2 text-gray-300">
                    <img 
                      src={user?.foto_perfil || '/favicon.ico'} 
                      alt={user?.nome || 'Usuário'}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium">{user?.nome || 'Usuário'}</span>
                  </div>
                  
                  <Button 
                    className="flex items-center space-x-2 bg-[#f59820] hover:bg-[#e8891a] text-white font-semibold"
                    onClick={handlePainelClick}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Painel</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-800"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sair</span>
                  </Button>
                </>
              ) : (
                <>
                  {/* Usuário não logado */}
                  <Button 
                    variant="ghost" 
                    className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-800"
                    onClick={() => navigate('/login')}
                  >
                    <User className="h-4 w-4" />
                    <span>Entrar</span>
                  </Button>
                  
                  <Button 
                    className="flex items-center space-x-2 bg-[#f59820] hover:bg-[#e8891a] text-white font-semibold"
                    onClick={() => navigate('/cadastro')}
                  >
                    <Plus className="h-4 w-4" />
                    <span>Anunciar</span>
                  </Button>
                  
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute top-16 left-0 right-0 bg-[#1a1b1b] border-b border-gray-700 shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="px-4 py-6 space-y-6">
              {/* Mobile Search Button */}
              <Button 
                variant="outline"
                className="w-full flex items-center justify-center space-x-2 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white py-3"
                onClick={() => {
                  handleSearch();
                  setIsMobileMenuOpen(false);
                }}
              >
                <Search className="h-5 w-5" />
                <span>Buscar</span>
              </Button>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {navigationItems.map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 w-full p-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                ))}
              </nav>

              {/* Mobile Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-gray-700">
                {/* Botão Início - Mobile */}
                <Button 
                  variant="outline"
                  className="w-full flex items-center justify-center space-x-2 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white py-3"
                  onClick={() => {
                    navigate('/');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Home className="h-5 w-5" />
                  <span>Início</span>
                </Button>
                
                {isAuthenticated() ? (
                  <>
                    {/* Usuário logado - Mobile */}
                    <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                      <img 
                        src={user?.foto_perfil || '/favicon.ico'} 
                        alt={user?.nome || 'Usuário'}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-white font-medium">{user?.nome || 'Usuário'}</p>
                        <p className="text-gray-400 text-sm">{user?.email || ''}</p>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full flex items-center justify-center space-x-2 bg-[#f59820] hover:bg-[#e8891a] text-white font-semibold py-3"
                      onClick={() => {
                        handlePainelClick();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Settings className="h-5 w-5" />
                      <span>Painel</span>
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="w-full flex items-center justify-center space-x-2 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white py-3"
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Sair</span>
                    </Button>
                  </>
                ) : (
                  <>
                    {/* Usuário não logado - Mobile */}
                    <Button 
                      className="w-full flex items-center justify-center space-x-2 bg-[#f59820] hover:bg-[#e8891a] text-white font-semibold py-3"
                      onClick={() => {
                        navigate('/cadastro');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Plus className="h-5 w-5" />
                      <span>Anunciar</span>
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="w-full flex items-center justify-center space-x-2 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white py-3"
                      onClick={() => {
                        navigate('/login');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <User className="h-5 w-5" />
                      <span>Fazer Login</span>
                    </Button>
                    
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
