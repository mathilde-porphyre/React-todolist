// TodoList.jsx
import React, { useState, useRef, useEffect } from 'react';


function TodoList({ todos, onTodoToggle, onDelete, remaining, handleDeleteCompleted, completed, onEdit, editing, setEditing }) {
  const [editValue, setEditValue] = useState('');
  const editInputRef = useRef();

  useEffect(() => {
    if (editing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editing]);

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleBlur = (id) => {
    if (editValue.trim()) {
      onEdit(id, editValue);
    }
    setEditValue('');
  };

  return (
    <div className="todo-list">
      <div className="todo-list-header">
        <h2>To do <span>({remaining})</span></h2>
        {completed >= 2 && <button onClick={handleDeleteCompleted}>Delete All</button>}
      </div>
      <ul>
        {todos.map((todo) => {
          const textLength = todo.name.length;

          return (
            <li className="todo-item" key={todo.id}>
              <div className="todo-item-content" style={{ alignItems: textLength > 30 ? 'flex-start' : 'center' }}>
                <input 
                  type="checkbox" 
                  className="rounded-checkbox"
                  id={todo.id}
                  name={todo.name} 
                  checked={todo.done}
                  onChange={() => onTodoToggle(todo.id)}
                /> 

                {editing === todo.id ? (
                <input 
                  type="text" 
                  className="edit-input"
                  ref={editInputRef}
                  value={editValue} 
                  onChange={handleEditChange}
                  onBlur={() => handleBlur(todo.id)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleBlur(todo.id); }}
                />
                ) : (
                <span onClick={() => { setEditing(todo.id); setEditValue(todo.name); }}>{todo.name}</span>
                )}
                
                <span className={`category-label ${todo.category}`}>{todo.category}</span>
              </div>

              <div className='todo-item-actions'>
                <i 
                  className={`fas fa-pen ${editing === todo.id ? 'editing' : ''}`}
                  onClick={() => { setEditing(todo.id); setEditValue(todo.name); }}
                />
                {todo.done && (
                  <i 
                    className="fas fa-trash" 
                    onClick={() => { if (todo.done) onDelete(todo.id) }} 
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TodoList;