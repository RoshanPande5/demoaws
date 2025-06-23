import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import LanguageToggler from '../atoms/LanguageToggler';
import { Container, Row, Col } from 'react-bootstrap';

function AppLayout({ user, children, language = 'en', setLanguage, companyProp }) {
  const [minimized, setMinimized] = useState(true);
  const [company, setCompany] = useState(1);
  // Track active route for sidebar highlighting
  const path = window.location.pathname;
  let active = 'dashboard';
  if (path.startsWith('/users')) active = 'users';
  if (path.startsWith('/reports')) active = 'reports';

  const sidebarWidth = minimized ? 64 : 220;
  const headerHeight = 64;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a2342 0%, #19376d 100%)', width: '100vw', overflowX: 'hidden' }}>
      {/* Fixed Header */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', zIndex: 200 }}>
        <TopHeader user={user} language={language} setLanguage={setLanguage} company={company} setCompany={setCompany} />
      </div>
      {/* Sidebar (fixed) */}
      <div style={{ position: 'fixed', top: headerHeight, left: 0, zIndex: 101 }}>
        <Sidebar minimized={minimized} setMinimized={setMinimized} active={active} language={language} onNav={() => {}} />
      </div>
      {/* Main Content */}
      <main
        style={{
          marginLeft: sidebarWidth,
          marginTop: headerHeight,
          width: `calc(100vw - ${sidebarWidth}px)`,
          minHeight: `calc(100vh - ${headerHeight}px)` ,
          padding: '2rem 2rem 2rem 2.5rem',
          transition: 'margin-left 0.2s',
          background: 'none',
        }}
      >
        {children}
      </main>
    </div>
  );
}

export default AppLayout;
