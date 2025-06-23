import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaGlobe } from 'react-icons/fa';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'ar', label: 'العربية' },
];

function LanguageToggler({ language, setLanguage }) {
  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="outline-light" size="sm" style={{ fontWeight: 700, border: 'none', color: '#fff', background: 'transparent', boxShadow: 'none' }}>
        <FaGlobe style={{ marginRight: 6 }} /> {languages.find(l => l.code === language)?.label || 'Language'}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {languages.map(l => (
          <Dropdown.Item key={l.code} active={l.code === language} onClick={() => setLanguage(l.code)}>
            {l.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default LanguageToggler;
