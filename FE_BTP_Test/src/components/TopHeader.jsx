import React from 'react';
import { Navbar, Container, Dropdown } from 'react-bootstrap';
import { FaUserCircle, FaBuilding } from 'react-icons/fa';
import LanguageToggler from '../atoms/LanguageToggler';
import translations from '../i18n/translations';

const headerStyle = {
  background: 'linear-gradient(90deg, #19376d 0%, #0a2342 100%)',
  color: '#fff',
  boxShadow: '0 2px 8px rgba(10,35,66,0.10)',
  minHeight: 64,
  zIndex: 102,
};

const companies = [
  { id: 1, name: 'Acme Corp' },
  { id: 2, name: 'MotiveMinds' },
  { id: 3, name: 'Globex' },
];

function TopHeader({ user, language = 'en', setLanguage, company = 1, setCompany }) {
  const t = translations[language]?.topHeader || translations.en.topHeader;

  return (
    <Navbar style={headerStyle} expand="lg" className="px-4">
      <Container fluid>
        <Navbar.Brand style={{ color: '#fff', fontWeight: 700, fontSize: 22, letterSpacing: 1 }}>
          <span style={{ color: '#1e90ff', fontWeight: 900 }}>MotiveMinds</span>
        </Navbar.Brand>
        <div className="d-flex align-items-center gap-3" style={{ minWidth: 0 }}>
          <div className="d-flex align-items-center gap-2 flex-nowrap">
            <Dropdown align="end">
              <Dropdown.Toggle variant="outline-light" size="sm" style={{ fontWeight: 700, border: 'none', color: '#fff', background: 'transparent', boxShadow: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                <FaBuilding style={{ marginRight: 2 }} /> {companies.find(c => c.id === company)?.name || t.selectCompany}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {companies.map(c => (
                  <Dropdown.Item key={c.id} active={c.id === company} onClick={() => setCompany && setCompany(c.id)}>
                    {c.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <LanguageToggler language={language} setLanguage={setLanguage} />
          </div>
          <div className="d-flex align-items-center gap-2 flex-nowrap" style={{ whiteSpace: 'nowrap' }}>
            <FaUserCircle size={28} style={{ color: '#1e90ff' }} />
            <span style={{ color: '#fff', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 180, display: 'inline-block' }}>{user}</span>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default TopHeader;
