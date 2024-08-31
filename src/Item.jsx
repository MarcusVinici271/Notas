// Item.js
import React from 'react';
import { useDrag } from 'react-dnd';

const Item = ({ item }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'ITEM',
    item: { id: item.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        padding: '10px',
        margin: '5px',
        backgroundColor: '#fff',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div>{item.text}</div>
      <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>{item.date}</div>
    </div>
  );
};

export default Item;
