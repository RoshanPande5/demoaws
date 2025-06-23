import React, { useEffect, useState } from 'react';
import { Card, Table, Form, InputGroup, Button, Spinner, Modal, Row, Col } from 'react-bootstrap';
import { fetchUsers } from '../services/userService';
import { insertUser } from '../services/userInsertService';
import { FaSearch, FaPlus } from 'react-icons/fa';
import translations from '../i18n/translations';

function Users({ language = 'en' }) {
  const t = translations[language]?.users || translations.en.users;
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ username: '', address: '', department: '' });
  const [insertLoading, setInsertLoading] = useState(false);
  const [insertError, setInsertError] = useState('');
  const [insertSuccess, setInsertSuccess] = useState('');

  const loadUsers = async (criteria = '') => {
    setLoading(true);
    setError('');
    try {
      const res = await fetchUsers(criteria);
      setUsers(res.data || []);
    } catch (e) {
      setError(t.failLoad);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    loadUsers(search);
  };

  const handleShowModal = () => {
    setForm({ username: '', address: '', department: '' });
    setInsertError('');
    setInsertSuccess('');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleInsert = async (e) => {
    e.preventDefault();
    setInsertLoading(true);
    setInsertError('');
    setInsertSuccess('');
    try {
      const res = await insertUser(form);
      if (res && res.message === 'Ok') {
        setInsertSuccess(t.success);
        setForm({ username: '', address: '', department: '' });
        loadUsers();
      } else {
        setInsertError(t.failAdd);
      }
    } catch (err) {
      setInsertError(t.failAdd);
    } finally {
      setInsertLoading(false);
    }
  };

  return (
    <Card style={{ background: 'rgba(20, 30, 48, 0.95)', color: '#fff', borderRadius: '1.5rem', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', border: '1px solid rgba(255,255,255,0.1)', padding: '2rem', marginBottom: '2rem' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">{t.users}</h4>
        <Button variant="success" onClick={handleShowModal}><FaPlus /> {t.addUser}</Button>
      </div>
      <Form onSubmit={handleSearch} className="mb-3">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ maxWidth: 300 }}
          />
          <Button type="submit" variant="primary"><FaSearch /></Button>
        </InputGroup>
      </Form>
      {loading ? (
        <div className="text-center py-4"><Spinner animation="border" variant="primary" /></div>
      ) : error ? (
        <div className="text-danger text-center py-2">{t.failLoad}</div>
      ) : (
        <Table hover responsive bordered style={{ background: 'rgba(10, 35, 66, 0.98)', color: '#fff', borderRadius: '1rem', overflow: 'hidden' }}>
          <thead style={{ background: 'linear-gradient(90deg, #1e90ff 0%, #4682b4 100%)', color: '#fff', fontWeight: 800 }}>
            <tr>
              <th>{t.userId}</th>
              <th>{t.name}</th>
              <th>{t.department}</th>
              <th>{t.address}</th>
              <th>{t.created}</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr><td colSpan={5} className="text-center">{t.noUsers}</td></tr>
            ) : users.map(u => (
              <tr key={u.userid}>
                <td>{u.userid}</td>
                <td>{u.username}</td>
                <td>{u.department}</td>
                <td>{u.address}</td>
                <td>{u.createdtimestamp ? new Date(u.createdtimestamp).toLocaleString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton style={{ background: '#19376d', color: '#fff' }}>
          <Modal.Title>{t.addUser}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: 'rgba(20, 30, 48, 0.95)', color: '#fff' }}>
          <Form onSubmit={handleInsert}>
            <Row>
              <Col md={12} className="mb-3">
                <Form.Label>{t.name}</Form.Label>
                <Form.Control name="username" value={form.username} onChange={handleFormChange} required autoFocus />
              </Col>
              <Col md={12} className="mb-3">
                <Form.Label>{t.department}</Form.Label>
                <Form.Control name="department" value={form.department} onChange={handleFormChange} required />
              </Col>
              <Col md={12} className="mb-3">
                <Form.Label>{t.address}</Form.Label>
                <Form.Control name="address" value={form.address} onChange={handleFormChange} required />
              </Col>
            </Row>
            {insertError && <div className="text-danger mb-2">{t.failAdd}</div>}
            {insertSuccess && <div className="text-success mb-2">{t.success}</div>}
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleCloseModal} className="me-2">{t.cancel}</Button>
              <Button type="submit" variant="success" disabled={insertLoading}>
                {insertLoading ? <Spinner animation="border" size="sm" /> : t.add}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Card>
  );
}

export default Users;
