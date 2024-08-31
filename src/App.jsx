import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Container from './Container'; // Importe o componente Container
import Sidebar from './Sidebar'; // Importe o componente Sidebar
import TrashCan from './TrashCan'; // Importe o componente TrashCan
import Header from './Header'; // Importe o componente Header
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { auth, firestore, GoogleAuthProvider, signInWithPopup, signOut, collection, addDoc, getDocs, doc, deleteDoc } from './firebase'; // Importe o Firebase

const App = () => {
  const [containers, setContainers] = useState({
    container1: [],
    container2: [],
    container3: [],
  });
  const [showSidebar, setShowSidebar] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleCloseSidebar = () => setShowSidebar(false);
  const handleShowSidebar = () => setShowSidebar(true);

  const addNote = async ({ text, date }) => {
    const newNote = {
      id: `note-${Date.now()}`, // Gerar um ID único para a anotação
      text,
      date,
    };

    if (user) {
      const userNotesRef = collection(firestore, 'users', user.uid, 'notes');
      await addDoc(userNotesRef, newNote);
      fetchNotes(); // Atualiza as notas após adicionar uma nova
    }

    setContainers(prevContainers => ({
      ...prevContainers,
      container1: [...prevContainers.container1, newNote],
    }));
  };

  const fetchNotes = async () => {
    if (user) {
      const userNotesRef = collection(firestore, 'users', user.uid, 'notes');
      const snapshot = await getDocs(userNotesRef);
      const notes = snapshot.docs.map(doc => doc.data());
      setContainers(prevContainers => ({
        ...prevContainers,
        container1: notes,
      }));
    }
  };

  const moveItem = (itemId, toContainerId) => {
    // Implementar a lógica de mover itens
  };

  const removeItem = async (itemId) => {
    if (user) {
      const userNotesRef = doc(firestore, 'users', user.uid, 'notes', itemId);
      await deleteDoc(userNotesRef);
      fetchNotes(); // Atualiza as notas após remover uma
    }

    const updatedContainers = { ...containers };

    Object.keys(updatedContainers).forEach(containerId => {
      updatedContainers[containerId] = updatedContainers[containerId].filter(
        item => item.id !== itemId
      );
    });

    setContainers(updatedContainers);
  };

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Header /> {/* Adiciona o componente Header */}
      {user ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
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
          <div style={{ display: 'flex', marginTop: '60px', marginLeft: '16px', marginRight: '16px' }}>
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
        </div>
      ) : (
        <button
          onClick={handleLogin}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#4285F4',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            position: 'fixed',
            top: '16px',
            right: '16px',
            zIndex: 1000,
          }}
        >
          Login with Google
        </button>
      )}
    </DndProvider>
  );
};

export default App;
