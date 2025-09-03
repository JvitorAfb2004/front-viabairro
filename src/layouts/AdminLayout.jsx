import { Outlet } from 'react-router-dom'
import AdminHeader from '../components/AdminHeader'
import AdminNav from '../components/AdminNav'

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <AdminNav />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
