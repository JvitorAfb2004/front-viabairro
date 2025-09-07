import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const PublicLayout = () => {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden flex flex-col">
      <Header />
      <main className="overflow-x-hidden flex-1">
        <Outlet />
      </main>
      {!isHomePage && <Footer />}
    </div>
  )
}

export default PublicLayout
