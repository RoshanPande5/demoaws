import React from 'react';
import { Card } from 'react-bootstrap';
import translations from '../i18n/translations';

function Reports({ language = 'en' }) {
  const t = translations[language]?.reports || translations.en.reports;
  return (
    <Card style={{ background: 'rgba(20, 30, 48, 0.95)', color: '#fff', borderRadius: '1.5rem', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', border: '1px solid rgba(255,255,255,0.1)', padding: '2rem', marginBottom: '2rem' }}>
      <h4>{t.reportsSection}</h4>
      <p>{t.viewReports}</p>
    </Card>
  );
}

export default Reports;
