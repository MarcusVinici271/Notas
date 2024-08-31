// App.js
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Container from './Container'; 
import Sidebar from './Sidebar'; 
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TrashCan from './TrashCan';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from './Header';
import { auth, firestore } from './firebase'; 

const App = () => {
  const [containers, setContainers] = useState({
    container1: [],
    container2: [],
    container3: [],
  });
  const [showSidebar, setShowSidebar] = useState(false);

  const handleCloseSidebar = () => setShowSidebar(false);
  const handleShowSidebar = () => setShowSidebar(true);

  const addNote = ({ text, date }) => {
    const newNote = {
      id: `note-${Date.now()}`, // Gerar um ID único para a anotação
      text,
      date,
    };
    // Adiciona a nova nota ao contêiner 1 por padrão
    setContainers(prevContainers => ({
      ...prevContainers,
      container1: [...prevContainers.container1, newNote],
    }));
  };

  const moveItem = (itemId, toContainerId) => {
    const fromContainerId = Object.keys(containers).find(containerId =>
      containers[containerId].find(item => item.id === itemId)
    );
    if (!fromContainerId || fromContainerId === toContainerId) return;

    const item = containers[fromContainerId].find(item => item.id === itemId);
    const updatedContainers = { ...containers };

    // Remove item from the source container
    updatedContainers[fromContainerId] = containers[fromContainerId].filter(
      (item) => item.id !== itemId
    );

    // Ensure the destination container is an array
    updatedContainers[toContainerId] = [
      ...(updatedContainers[toContainerId] || []),
      item,
    ];

    setContainers(updatedContainers);
  };

  const removeItem = (itemId) => {
    const updatedContainers = { ...containers };

    Object.keys(updatedContainers).forEach(containerId => {
      updatedContainers[containerId] = updatedContainers[containerId].filter(
        item => item.id !== itemId
      );
    });

    setContainers(updatedContainers);
  };

  return (
    <DndProvider backend={HTML5Backend}> {/* Use HTML5Backend */}
      <Header /> 
        <FontAwesomeIcon
          icon={faPlus}
          size="2x"
          style={{
            position: 'fixed',
            bottom: '16px',
            right: '16px',
            zIndex: 1000,
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: '#fff',
            borderRadius: '50%',
            padding: '10px',
          }}
          onClick={handleShowSidebar}
        />
        <Sidebar show={showSidebar} handleClose={handleCloseSidebar} addNote={addNote} />
        <div style={{ display: 'flex', marginTop: '70px' }}>
        <Container
          id="container1"
          items={containers.container1}
          moveItem={moveItem}
        />
        <Container
          id="container2"
          items={containers.container2}
          moveItem={moveItem}
        />
        <Container
          id="container3"
          items={containers.container3}
          moveItem={moveItem}
        />
      </div>
       <TrashCan removeItem={removeItem} />
    </DndProvider>
  );
};

export default App;
