import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Contexts
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";
import { WebSocketProvider } from "./contexts/WebSocketContext";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import ToastContainer from "./components/Toast";
import CookieBanner from "./components/CookieBanner";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import AdminLayout from "./layouts/AdminLayout";

// Páginas Públicas
import Home from "./pages/Home";
import Buscar from "./pages/Buscar";
import PerfilPublico from "./pages/PerfilPublico";
import DetalhesAnuncio from "./pages/DetalhesAnuncio";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import RecuperarSenha from "./pages/RecuperarSenha";
import ResetarSenha from "./pages/ResetarSenha";
import VerificarEmail from "./pages/VerificarEmail";
import Termos from "./pages/Termos";
import Privacidade from "./pages/Privacidade";

// Páginas do Dashboard
import DadosConta from "./pages/dashboard/DadosConta";
import MeusAnuncios from "./pages/dashboard/MeusAnuncios";
import Pagamento from "./pages/dashboard/Pagamento";
import PerfilPublicoDashboard from "./pages/dashboard/PerfilPublico";
import CriarAnuncio from "./pages/dashboard/CriarAnuncio";

// Páginas do Admin
import AdminDashboard from "./pages/admin/Dashboard";
import Usuarios from "./pages/admin/Usuarios";
import Anuncios from "./pages/admin/Anuncios";
import Planos from "./pages/admin/Planos";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <WebSocketProvider>
          <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <CookieBanner />
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="buscar" element={<Buscar />} />
              <Route path="perfil/:id" element={<PerfilPublico />} />
              <Route path="anuncio/:slug" element={<DetalhesAnuncio />} />
            </Route>

            {/* Rotas de Autenticação */}
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/recuperar-senha" element={<RecuperarSenha />} />
            <Route path="/resetar-senha" element={<ResetarSenha />} />
            <Route path="/verificar-email/:token" element={<VerificarEmail />} />

            {/* Rotas de Termos e Privacidade */}
            <Route path="/termos" element={<Termos />} />
            <Route path="/privacidade" element={<Privacidade />} />

            {/* Rotas do Dashboard - Protegidas */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DadosConta />} />
              <Route path="anuncios" element={<MeusAnuncios />} />
              <Route path="criar-anuncio" element={<CriarAnuncio />} />
              <Route path="pagamento" element={<Pagamento />} />
              <Route
                path="perfil-publico"
                element={<PerfilPublicoDashboard />}
              />
            </Route>

            {/* Rotas do Admin - Protegidas e só para Admins */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="usuarios" element={<Usuarios />} />
              <Route path="anuncios" element={<Anuncios />} />
              <Route path="planos" element={<Planos />} />
            </Route>

            {/* Rota 404 */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                      404
                    </h1>
                    <p className="text-gray-600 mb-4">Página não encontrada</p>
                    <a href="/" className="text-blue-600 hover:underline">
                      Voltar ao início
                    </a>
                  </div>
                </div>
              }
            />
          </Routes>
          </BrowserRouter>
          <ToastContainer />
        </WebSocketProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
