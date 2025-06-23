import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, InputGroup } from 'react-bootstrap';
import { FaUser, FaLock } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const darkBg = {
  minHeight: '100vh',
  width: '100vw',
  background: 'linear-gradient(135deg, #001f3f 0%, #003366 100%)', // SAP blue
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 100,
};

const cardStyle = {
  borderRadius: '1.5rem',
  boxShadow: '0 8px 32px 0 rgba(0, 51, 102, 0.25)',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid #0a2342',
  color: '#fff',
  padding: '2.5rem 2rem',
  maxWidth: 400,
  width: '100%',
  margin: 'auto',
  backdropFilter: 'blur(4px)',
};

const inputStyle = {
  background: '#eaf3fb',
  color: '#003366',
  border: '1.5px solid #0070f2',
  borderRadius: '0.75rem',
  fontWeight: 600,
  fontSize: '1.05rem',
};

const labelStyle = {
  color: '#0070f2',
  fontWeight: 700,
  fontSize: '1rem',
  letterSpacing: 0.5,
};

const buttonStyle = {
  background: 'linear-gradient(90deg, #0070f2 0%, #00b8f2 100%)',
  border: 'none',
  borderRadius: '0.75rem',
  fontWeight: 700,
  fontSize: '1.1rem',
  boxShadow: '0 2px 8px rgba(0,112,242,0.15)',
  letterSpacing: 1,
};

const logoStyle = {
  width: 80,
  height: 80,
  objectFit: 'contain',
  marginBottom: 16,
  filter: 'drop-shadow(0 2px 8px #0070f2cc)'
};

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      setError('');
      onLogin(username);
    } else {
      setError('Please enter username and password.');
    }
  };

  return (
    <div style={darkBg}>
      <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', padding: 0 }}>
        <Row className="w-100 justify-content-center align-items-center" style={{ minHeight: '100vh', margin: 0 }}>
          <Col xs={12} sm={8} md={6} lg={4} xl={3} className="d-flex align-items-center justify-content-center">
            <Card style={cardStyle} className="w-100">
              <div className="text-center mb-3">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg" alt="SAP Logo" style={logoStyle} />
              </div>
              <h2 className="mb-4 text-center" style={{ fontWeight: 800, letterSpacing: 1, color: '#fff', textShadow: '0 2px 8px #0070f2cc' }}>SAP Login</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label style={labelStyle}>Username</Form.Label>
                  <InputGroup>
                    <InputGroup.Text style={{ background: 'transparent', color: '#0070f2', border: 'none' }}>
                      <FaUser />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      style={inputStyle}
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      autoFocus
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label style={labelStyle}>Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text style={{ background: 'transparent', color: '#0070f2', border: 'none' }}>
                      <FaLock />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      style={inputStyle}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
                {error && <div className="mb-3 text-danger text-center" style={{ fontWeight: 600 }}>{error}</div>}
                <Button type="submit" style={buttonStyle} className="w-100 py-2 mb-2">
                  Sign In
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
