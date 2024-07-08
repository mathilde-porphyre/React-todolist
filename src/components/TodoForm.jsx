// TodoForm.jsx
import React, { useRef } from 'react';

function TodoForm({ handleNewTodo }) {
  const inputRef = useRef();
  const selectRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    const inputElement = inputRef.current;
    const selectElement = selectRef.current;
    if (inputElement.value.trim() !== '') {
      handleNewTodo(inputElement.value, selectElement.value);
      inputElement.value = '';
    }
  }

  return (
    <form onSubmit={handleSubmit}>
    <input 
      type="text" 
      name="todo" 
      placeholder="New todo" 
      ref={inputRef}
    />
    <select ref={selectRef}>
        <option value="private">Private</option>
        <option value="work">Work</option>
    </select>
    <button type="submit">Add Todo</button>
  </form>
  );
}

export default TodoForm;