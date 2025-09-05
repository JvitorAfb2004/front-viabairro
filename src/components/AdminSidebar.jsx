import { NavLink } from 'react-router-dom'
import { BarChart3, Users, Package, CreditCard } from 'lucide-react'

const AdminSidebar = () => {
  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: BarChart3 },
    { path: '/admin/usuarios', label: 'Usuários', icon: Users },
    { path: '/admin/anuncios', label: 'Anúncios', icon: Package },
    { path: '/admin/planos', label: 'Planos', icon: CreditCard },
  ]

  return (
    <aside className="w-64 bg-white shadow-sm border-r min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

export default AdminSidebar
