// TrashCan.js
import React from 'react';
import { useDrop } from 'react-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const TrashCan = ({ removeItem }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'ITEM',
    drop: (item) => removeItem(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        width: '100px',
        height: '100px',
        backgroundColor: isOver ? '#f8d7da' : '#f5c6cb',
        border: '2px dashed #dc3545',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        bottom: '16px',
        left: '16px', // Alterado para a esquerda
        zIndex: 1000,
      }}
    >
      <FontAwesomeIcon icon={faTrash} size="2x" color="#dc3545" />
    </div>
  );
};

export default TrashCan;
