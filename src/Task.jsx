// Task.js
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            padding: '10px',
            margin: '5px',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div>{task.text}</div>
          <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>{task.date}</div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
