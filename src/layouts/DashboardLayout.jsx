import { Outlet } from 'react-router-dom'
import DashboardHeader from '../components/DashboardHeader'
import DashboardNav from '../components/DashboardNav'
import Footer from '../components/Footer'

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader />
      <DashboardNav />
      <main className="p-6 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default DashboardLayout
