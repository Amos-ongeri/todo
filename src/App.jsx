import './App.css';
import Home from './pages/home/Home';
import LoginPage from './pages/auth/LoginPage';
import { Route, Routes, useLocation, Link } from 'react-router-dom';
import Tasks from './pages/tasks/Tasks';
import Completed from './pages/completed/Completed';
import Analytics from './pages/stats/Analytics';
import Settings from './pages/settings/Settings';
import Account from './pages/account/Account';
import Chat from './components/chat/Chat';
import ImageBackgroundSelector from './pages/settings/ImageBackgroundSelector';
import { useState, useEffect, useRef } from 'react';
import { FaHome, FaTasks, FaHistory, FaChartBar, FaCog, FaUser, FaBars, FaTimes } from 'react-icons/fa';


function App() {
  const location = useLocation();
  const showChat = location.pathname !== '/login';
  const [background, setBackground] = useState(() => {
    return localStorage.getItem('background') || null;
  });
  useEffect(() => {
    if (background) {
      localStorage.setItem('background', background);
    }
  }, [background]);

  const navLinks = [
    { to: '/', label: 'Home', icon: <FaHome /> },
    { to: '/tasks', label: 'Tasks', icon: <FaTasks /> },
    { to: '/completed', label: 'History', icon: <FaHistory /> },
    { to: '/analytics', label: 'Analytics', icon: <FaChartBar /> },
    { to: '/settings', label: 'Settings', icon: <FaCog /> },
    { to: '/account', label: 'Account', icon: <FaUser /> },
  ];
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900)
  // const isMobile = window.innerWidth <= 900;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pageRef = useRef(null);

  useEffect(()=>{
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
      console.log(isMobile);
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  },[isMobile])
  

  return (
    <div className="new-layout-container">
      {/* Sidebar for desktop */}
      {!isMobile && (
        <aside className="sidebar-nav">
          <div className="sidebar-logo">📝 To-Do</div>
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`sidebar-link${location.pathname === link.to ? ' active' : ''}`}
            >
              <span className="sidebar-icon">{link.icon}</span>
              <span className="sidebar-label">{link.label}</span>
            </Link>
          ))}
        </aside>
      )}
      {/* Hamburger menu for mobile */}
      {isMobile && (
        <>
        <button className={`mobile-menu-btn ${isMobile} ? 'show' : ' '`} onClick={() => setDrawerOpen(true)}>
            <FaBars size={28} />
          </button>
          <div className={`mobile-drawer${drawerOpen ? ' open' : ''}`}>
            <div className="mobile-drawer-header">
              <span className="sidebar-logo">📝 To-Do</span>
              <button className="mobile-menu-close" onClick={() => setDrawerOpen(false)}>
                <FaTimes size={28} />
              </button>
            </div>
            <nav className="mobile-drawer-nav">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`mobile-drawer-link${location.pathname === link.to ? ' active' : ''}`}
                  onClick={() => setDrawerOpen(false)}
                >
                  <span className="sidebar-icon">{link.icon}</span>
                  <span className="sidebar-label">{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>
          {drawerOpen && <div className="mobile-drawer-backdrop" onClick={() => setDrawerOpen(false)}></div>}
        </>
      )}
      <main className="main-content">
        {showChat && <Chat />}
            <div ref={pageRef}>
              <Routes>
                <Route path='/' element={<Home background={background} />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/tasks' element={<Tasks background={background} />} />
                <Route path='/completed' element={<Completed background={background} />} />
                <Route path='/analytics' element={<Analytics background={background} />} />
                <Route path='/settings' element={<Settings background={background} />} />
                <Route path='/settings/backgrounds' element={<ImageBackgroundSelector />} />
                <Route path='/account' element={<Account background={background} />} />
              </Routes>
            </div>
      </main>
    </div>
  );
}

export default App;
