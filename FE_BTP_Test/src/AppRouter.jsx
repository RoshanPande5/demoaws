import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Reports from './pages/Reports';
import Login from './Login';
import AppLayout from './components/AppLayout';

function AppRouter() {
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('en');

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <Router>
      <AppLayout user={user} language={language} setLanguage={setLanguage}>
        <Routes>
          <Route path="/" element={<Dashboard language={language} />} />
          <Route path="/users" element={<Users language={language} />} />
          <Route path="/reports" element={<Reports language={language} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default AppRouter;
