// Sidebar.js
import React, { useState } from 'react';
import { Offcanvas, Button, Form } from 'react-bootstrap';

const Sidebar = ({ show, handleClose, addNote }) => {
  const [text, setText] = useState('');
  const [date, setDate] = useState('');

  const handleAddNote = () => {
    if (text.trim() && date) {
      addNote({
        text,
        date,
      });
      setText('');
      setDate('');
      handleClose();
    }
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Adicionar Tarefa</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Texto da Tarefa</Form.Label>
            <Form.Control
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Digite a tarefa"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Data</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleAddNote}>
            Adicionar
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Sidebar;
