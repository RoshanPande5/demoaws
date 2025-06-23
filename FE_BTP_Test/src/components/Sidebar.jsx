import React from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaChartBar, FaSignOutAlt, FaAngleDoubleRight, FaAngleDoubleLeft } from 'react-icons/fa';
import translations from '../i18n/translations';

const sidebarStyle = (minimized) => ({
  height: '100vh',
  background: 'linear-gradient(180deg, #0a2342 0%, #19376d 100%)',
  color: '#fff',
  minWidth: minimized ? 64 : 220,
  width: minimized ? 64 : 220,
  boxShadow: '2px 0 12px rgba(10,35,66,0.12)',
  paddingTop: 24,
  position: 'fixed',
  left: 0,
  top: '60px',
  zIndex: 101,
  display: 'flex',
  flexDirection: 'column',
  alignItems: minimized ? 'center' : 'flex-start',
  transition: 'all 0.2s',
});

const navLinkStyle = (minimized) => ({
  color: '#b0c4de',
  fontWeight: 600,
  fontSize: '1.1rem',
  padding: minimized ? '16px 0' : '16px 24px',
  display: 'flex',
  alignItems: 'center',
  gap: minimized ? 0 : 12,
  border: 'none',
  justifyContent: minimized ? 'center' : 'flex-start',
  width: '100%',
  cursor: 'pointer',
});

const activeStyle = {
  background: 'rgba(30,144,255,0.12)',
  color: '#1e90ff',
  borderLeft: '4px solid #1e90ff',
};

function Sidebar({ active, minimized, setMinimized, language = 'en' }) {
  const t = translations[language]?.sidebar || translations.en.sidebar;
  const navigate = useNavigate();
  return (
    <div style={sidebarStyle(minimized)}>
      <div className="mb-4 text-center w-100" style={{ fontWeight: 800, fontSize: 24, letterSpacing: 1, color: '#fff', paddingLeft: minimized ? 0 : 8, paddingRight: minimized ? 0 : 8 }}>
        {!minimized && <span><FaChartBar style={{ color: '#1e90ff', marginRight: 8 }} /> {t.enterprise}</span>}
        <span style={{ cursor: 'pointer', float: 'right', marginLeft: minimized ? 0 : 12 }} onClick={() => setMinimized(!minimized)}>
          {minimized ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
        </span>
      </div>
      <Nav className="flex-column w-100">
        <div style={active === 'dashboard' ? { ...navLinkStyle(minimized), ...activeStyle } : navLinkStyle(minimized)} onClick={() => navigate('/') }><FaHome /> {!minimized && t.dashboard}</div>
        <div style={active === 'users' ? { ...navLinkStyle(minimized), ...activeStyle } : navLinkStyle(minimized)} onClick={() => navigate('/users') }><FaUser /> {!minimized && t.users}</div>
        <div style={active === 'reports' ? { ...navLinkStyle(minimized), ...activeStyle } : navLinkStyle(minimized)} onClick={() => navigate('/reports') }><FaChartBar /> {!minimized && t.reports}</div>
        <div style={navLinkStyle(minimized)} onClick={() => window.location.reload()}><FaSignOutAlt /> {!minimized && t.logout}</div>
      </Nav>
    </div>
  );
}

export default Sidebar;
