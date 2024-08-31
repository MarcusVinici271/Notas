// NoteAdder.js
import React, { useState } from 'react';

const NoteAdder = ({ addNote }) => {
  const [text, setText] = useState('');

  const handleAddNote = () => {
    if (text.trim()) {
      addNote(text);
      setText('');
    }
  };

  return (
    <div style={{ margin: '16px 0' }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Digite sua anotação"
        style={{ marginRight: '8px', padding: '8px', width: '200px' }}
      />
      <button onClick={handleAddNote} style={{ padding: '8px' }}>
        Adicionar Anotação
      </button>
    </div>
  );
};

export default NoteAdder;
