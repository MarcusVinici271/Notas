// Header.js
import React from 'react';

const Header = () => {
  return (
    <header
      style={{
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 20px',
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        position: 'fixed',
        width: '100%',
        top: '0',
        left: '0',
        zIndex: 999, // Garante que o cabeçalho fique acima dos outros elementos
      }}
    >
      Lista de Tarefas
    </header>
  );
};

export default Header;
