// App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = window.localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    const storedTodos = window.localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const handleNewTodo = (newTodo, category) => {
    setTodos([...todos, { id: Date.now(), name: newTodo, done: false, category }]);
  };

  const handleCheck = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleDeleteCompleted = () => {
    setTodos(todos.filter(todo => !todo.done));
  };

  const [editing, setEditing] = useState(null);

  const handleEdit = (id, name) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, name } : todo));
    setEditing(null);
  };

  return (
    <div className='container'>
      <Header />
      <TodoForm handleNewTodo={handleNewTodo} />
      <hr />
      <TodoList 
        todos={todos} 
        onTodoToggle={handleCheck} 
        onDelete={handleDelete} 
        remaining={todos.filter(todo => !todo.done).length}
        handleDeleteCompleted={handleDeleteCompleted}
        completed={todos.filter(todo => todo.done).length}
        onEdit={handleEdit}
        editing={editing}
        setEditing={setEditing}
      />
    </div>
  );
}

export default App;