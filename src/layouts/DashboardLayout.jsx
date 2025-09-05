import { Outlet } from 'react-router-dom'
import DashboardHeader from '../components/DashboardHeader'
import DashboardNav from '../components/DashboardNav'
import Footer from '../components/Footer'
import useEmailVerification from '../hooks/useEmailVerification'
import EmailVerificationModal from '../components/EmailVerificationModal'

const DashboardLayout = () => {
  const { showVerificationModal, closeVerificationModal } = useEmailVerification()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader />
      <DashboardNav />
      <main className="p-6 flex-1">
        <Outlet />
      </main>
      <Footer />
      
      {/* Modal de Verificação de Email Global */}
      <EmailVerificationModal
        isOpen={showVerificationModal}
        onClose={closeVerificationModal}
      />
    </div>
  )
}

export default DashboardLayout
