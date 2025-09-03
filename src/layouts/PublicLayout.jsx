import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Header />
      <main className="overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  )
}

export default PublicLayout
