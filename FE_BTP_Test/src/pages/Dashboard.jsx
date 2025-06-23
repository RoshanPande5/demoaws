import React from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import AppLayout from '../components/AppLayout';
import { FaTable } from 'react-icons/fa';
import translations from '../i18n/translations';

const cardStyle = {
  background: 'rgba(20, 30, 48, 0.95)',
  borderRadius: '1.5rem',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#fff',
  padding: '2rem',
  marginBottom: '2rem',
};

const tableStyle = {
  background: 'rgba(10, 35, 66, 0.98)',
  color: '#fff',
  borderRadius: '1rem',
  boxShadow: '0 4px 16px 0 rgba(30, 144, 255, 0.10)',
  overflow: 'hidden',
};

const thStyle = {
  background: 'linear-gradient(90deg, #1e90ff 0%, #4682b4 100%)',
  color: '#fff',
  fontWeight: 800,
  fontSize: '1.1rem',
  border: 'none',
};

const tdStyle = {
  background: 'rgba(20, 30, 48, 0.95)',
  color: '#fff',
  fontWeight: 600,
  border: 'none',
};

function Dashboard({ user, language = 'en' }) {
  const t = translations[language]?.dashboard || translations.en.dashboard;
  return (
    <Container fluid>
      <Row>
        <Col>
          <Card style={cardStyle}>
            <h4 style={{ fontWeight: 700, color: '#fff', marginBottom: 20 }}>{t.quickStats}</h4>
            <Table hover responsive style={tableStyle} className="mb-0">
              <thead>
                <tr>
                  <th style={thStyle}><FaTable style={{ marginRight: 8 }} />{t.module}</th>
                  <th style={thStyle}>{t.status}</th>
                  <th style={thStyle}>{t.count}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tdStyle}>{t.users}</td>
                  <td style={tdStyle}>{t.active}</td>
                  <td style={tdStyle}>120</td>
                </tr>
                <tr>
                  <td style={tdStyle}>{t.projects}</td>
                  <td style={tdStyle}>{t.ongoing}</td>
                  <td style={tdStyle}>8</td>
                </tr>
                <tr>
                  <td style={tdStyle}>{t.reports}</td>
                  <td style={tdStyle}>{t.generated}</td>
                  <td style={tdStyle}>34</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
