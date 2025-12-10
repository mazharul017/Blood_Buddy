import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import Preloader from './components/Preloader'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Donate from './pages/Donate'
import Help from './pages/Help'
import Profile from './pages/Profile'
import DonorSearch from './pages/DonorSearch'
import EmergencyRequests from './pages/EmergencyRequests'
import Notifications from './pages/Notifications'
import MyDonations from './pages/MyDonations'
import BloodBanks from './pages/BloodBanks'
import CommunityFeed from './pages/CommunityFeed'
import Dashboard from './pages/Dashboard'
import DonationRecord from './pages/DonationRecord'

function ScrollToSection() {
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      // If on home page, scroll to section
      if (window.location.pathname === '/') {
        setTimeout(() => {
          const element = document.querySelector(hash)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      }
    }
  }, [])

  // Also listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash && window.location.pathname === '/') {
        setTimeout(() => {
          const element = document.querySelector(hash)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return null
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Preloader />
        <ScrollToTop />
        <ScrollToSection />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/help" element={<Help />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/donors" element={<DonorSearch />} />
          <Route path="/emergency" element={<EmergencyRequests />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/donations" element={<MyDonations />} />
          <Route path="/donation-record" element={<DonationRecord />} />
          <Route path="/blood-banks" element={<BloodBanks />} />
          <Route path="/community" element={<CommunityFeed />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
