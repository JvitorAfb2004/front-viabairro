import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden flex flex-col">
      <Header />
      <main className="overflow-x-hidden flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default PublicLayout
