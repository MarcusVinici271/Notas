// Container.js
import React from 'react';
import { useDrop } from 'react-dnd';
import Item from './Item'; // Importe o componente Item

const Container = ({ id, items, moveItem }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'ITEM',
    drop: (item) => {
      moveItem(item.id, id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        padding: '10px',
        width: '300px',
        minHeight: '500px',
        backgroundColor: isOver ? '#f0f0f0' : '#e9ecef',
        borderRadius: '4px',
        margin: '0 10px',
        position: 'relative',
      }}
    >
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Container;
