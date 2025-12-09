import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Header({ variant = 'light' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const handleSectionClick = (e, hash) => {
    e.preventDefault()
    if (window.location.pathname !== '/') {
      navigate(`/${hash}`)
    } else {
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    closeMenu()
  }

  const textColor = variant === 'light' ? 'text-black' : 'text-white'
  const hoverColor = variant === 'light' ? 'hover:text-indianred' : 'hover:text-indianred'
  const logo = variant === 'light' ? '/Images/bb_logo(black).png' : '/Images/bb_logo(white).png'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-transparent ${textColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Blood Buddy Logo" className="h-16 w-auto md:h-20" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="/#about-us"
              onClick={(e) => handleSectionClick(e, '#about-us')}
              className={`font-fredoka text-xl ${textColor} ${hoverColor} transition-all duration-300 border-b-2 border-transparent hover:border-indianred pb-1 cursor-pointer`}
            >
              About Us
            </a>
            <a
              href="/#volunteers"
              onClick={(e) => handleSectionClick(e, '#volunteers')}
              className={`font-fredoka text-xl ${textColor} ${hoverColor} transition-all duration-300 border-b-2 border-transparent hover:border-indianred pb-1 cursor-pointer`}
            >
              Volunteer
            </a>
            <Link
              to="/donate"
              className={`font-fredoka text-xl ${textColor} ${hoverColor} transition-all duration-300 border-b-2 border-transparent hover:border-indianred pb-1`}
            >
              Donate
            </Link>
            <Link
              to="/help"
              className={`font-fredoka text-xl ${textColor} ${hoverColor} transition-all duration-300 border-b-2 border-transparent hover:border-indianred pb-1`}
            >
              Get Help
            </Link>
            <a
              href="/#emergency"
              onClick={(e) => handleSectionClick(e, '#emergency')}
              className={`font-fredoka text-xl ${textColor} ${hoverColor} transition-all duration-300 border-b-2 border-transparent hover:border-indianred pb-1 cursor-pointer`}
            >
              🚨 Emergency
            </a>
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`font-fredoka text-xl ${textColor} ${hoverColor} transition-all duration-300 border-b-2 border-transparent hover:border-indianred pb-1`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/donation-record"
                  className={`font-fredoka text-xl ${textColor} ${hoverColor} transition-all duration-300 border-b-2 border-transparent hover:border-indianred pb-1`}
                >
                  Record Donation
                </Link>
                <Link
                  to="/donations"
                  className={`font-fredoka text-xl ${textColor} ${hoverColor} transition-all duration-300 border-b-2 border-transparent hover:border-indianred pb-1`}
                >
                  Donation History
                </Link>
                <div className="relative group">
                  <button className={`font-fredoka text-xl ${textColor} ${hoverColor} transition-all duration-300 border-b-2 border-transparent hover:border-indianred pb-1 flex items-center gap-2`}>
                    {user?.name || 'Account'}
                    <i className="fa fa-chevron-down text-sm"></i>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 font-fredoka"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/notifications"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 font-fredoka"
                    >
                      Notifications
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        navigate('/')
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 font-fredoka"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`font-fredoka text-xl ${textColor} ${hoverColor} transition-all duration-300 border-b-2 border-transparent hover:border-indianred pb-1`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`font-fredoka text-xl bg-indianred text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300`}
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-2xl focus:outline-none z-50"
          >
            <i className={`fa ${isMenuOpen ? 'fa-times' : 'fa-bars'} ${textColor}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-52 bg-coral transform transition-transform duration-500 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          onClick={closeMenu}
          className="absolute top-6 right-6 text-white text-2xl"
        >
          <i className="fa fa-times"></i>
        </button>
        <ul className="flex flex-col space-y-4 mt-20 px-8">
          <li>
            <a
              href="/#about-us"
              onClick={(e) => handleSectionClick(e, '#about-us')}
              className="font-fredoka text-xl text-white hover:text-indianred transition-colors cursor-pointer"
            >
              About Us
            </a>
          </li>
          <li>
            <a
              href="/#volunteers"
              onClick={(e) => handleSectionClick(e, '#volunteers')}
              className="font-fredoka text-xl text-white hover:text-indianred transition-colors cursor-pointer"
            >
              Volunteer
            </a>
          </li>
          <li>
            <Link
              to="/donate"
              onClick={closeMenu}
              className="font-fredoka text-xl text-white hover:text-indianred transition-colors"
            >
              Donate
            </Link>
          </li>
          <li>
            <Link
              to="/help"
              onClick={closeMenu}
              className="font-fredoka text-xl text-white hover:text-indianred transition-colors"
            >
              Get Help
            </Link>
          </li>
          <li>
            <a
              href="/#emergency"
              onClick={(e) => handleSectionClick(e, '#emergency')}
              className="font-fredoka text-xl text-white hover:text-indianred transition-colors cursor-pointer"
            >
              🚨 Emergency
            </a>
          </li>
          
          {isAuthenticated ? (
            <>
              <li className="border-t border-white/20 pt-4 mt-4">
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="font-fredoka text-xl text-white hover:text-indianred transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/donation-record"
                  onClick={closeMenu}
                  className="font-fredoka text-xl text-white hover:text-indianred transition-colors"
                >
                  Record Donation
                </Link>
              </li>
              <li>
                <Link
                  to="/donations"
                  onClick={closeMenu}
                  className="font-fredoka text-xl text-white hover:text-indianred transition-colors"
                >
                  Donation History
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="font-fredoka text-xl text-white hover:text-indianred transition-colors"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/notifications"
                  onClick={closeMenu}
                  className="font-fredoka text-xl text-white hover:text-indianred transition-colors"
                >
                  Notifications
                </Link>
              </li>
              <li className="border-t border-white/20 pt-4 mt-4">
                <button
                  onClick={() => {
                    logout()
                    navigate('/')
                    closeMenu()
                  }}
                  className="font-fredoka text-xl text-white hover:text-indianred transition-colors"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="border-t border-white/20 pt-4 mt-4">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="font-fredoka text-xl text-white hover:text-indianred transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="font-fredoka text-xl bg-indianred text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 inline-block"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Header

