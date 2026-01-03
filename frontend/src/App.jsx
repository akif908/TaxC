import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import LandingHeader from './components/LandingHeader';
import LandingFooter from './components/LandingFooter';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import TaxForm from './pages/TaxForm';
import Payment from './pages/Payment';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminSlabs from './pages/AdminSlabs';
import AdminFeedback from './pages/AdminFeedback';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import DashboardLayout from './components/DashboardLayout';
import Account from './pages/Account';
import authService from './services/authService';
import './index.css';
import './pages/LandingPage.css';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { user } = await authService.getCurrentUser();
        setUser(user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  const isPublicRoute = ['/', '/landing', '/login', '/register'].includes(location.pathname);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      sessionStorage.removeItem('taxDeadlineDismissed'); // Reset popup for next login
      setUser(null);
    }
  };

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login onLogin={setUser} />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <Register onRegister={setUser} />} />

        {/* Protected Routes wrapped in DashboardLayout */}
        <Route path="/dashboard" element={user ? (
          <DashboardLayout user={user} onLogout={handleLogout}>
            <Dashboard user={user} />
          </DashboardLayout>
        ) : <Navigate to="/login" replace />} />

        <Route path="/profile" element={user ? (
          <DashboardLayout user={user} onLogout={handleLogout}>
            <Profile />
          </DashboardLayout>
        ) : <Navigate to="/login" replace />} />

        <Route path="/tax-form" element={user ? (
          <DashboardLayout user={user} onLogout={handleLogout}>
            <TaxForm />
          </DashboardLayout>
        ) : <Navigate to="/login" replace />} />

        <Route path="/payment" element={user ? (
          <DashboardLayout user={user} onLogout={handleLogout}>
            <Payment />
          </DashboardLayout>
        ) : <Navigate to="/login" replace />} />

        <Route path="/account" element={user ? (
          <DashboardLayout user={user} onLogout={handleLogout}>
            <Account />
          </DashboardLayout>
        ) : <Navigate to="/login" replace />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={user?.role === 'admin' ? (
          <DashboardLayout user={user} onLogout={handleLogout}>
            <AdminDashboard />
          </DashboardLayout>
        ) : <Navigate to="/login" replace />} />

        <Route path="/admin/users" element={user?.role === 'admin' ? (
          <DashboardLayout user={user} onLogout={handleLogout}>
            <AdminUsers />
          </DashboardLayout>
        ) : <Navigate to="/login" replace />} />

        <Route path="/admin/slabs" element={user?.role === 'admin' ? (
          <DashboardLayout user={user} onLogout={handleLogout}>
            <AdminSlabs />
          </DashboardLayout>
        ) : <Navigate to="/login" replace />} />

        <Route path="/admin/feedback" element={user?.role === 'admin' ? (
          <DashboardLayout user={user} onLogout={handleLogout}>
            <AdminFeedback />
          </DashboardLayout>
        ) : <Navigate to="/login" replace />} />
      </Routes>

      {user && !isPublicRoute && <Chatbot />}
    </>
  );
}

export default App;
