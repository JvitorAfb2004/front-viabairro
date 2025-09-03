import { Outlet } from 'react-router-dom'
import DashboardHeader from '../components/DashboardHeader'
import DashboardNav from '../components/DashboardNav'

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <DashboardNav />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
