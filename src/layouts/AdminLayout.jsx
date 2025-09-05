import { Outlet } from 'react-router-dom'
import AdminHeader from '../components/AdminHeader'
import AdminNav from '../components/AdminNav'
import Footer from '../components/Footer'

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminHeader />
      <AdminNav />
      <main className="p-6 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default AdminLayout
