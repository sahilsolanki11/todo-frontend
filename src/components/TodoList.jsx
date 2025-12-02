import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const API_URL = process.env.REACT_APP_API_URL;

  // Redirect if no token
  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchTodos = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/todos`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTodos(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch todos');
      }
    };

    fetchTodos();
  }, [token, navigate, API_URL]);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const res = await axios.post(
        `${API_URL}/api/todos`,
        { task: newTask },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos([res.data, ...todos]);
      setNewTask('');
    } catch (err) {
      console.error(err);
      alert('Failed to add todo');
    }
  };

  const toggleCompleted = async (id, completed) => {
    try {
      const res = await axios.put(
        `${API_URL}/api/todos/${id}`,
        { completed: !completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos(todos.map(todo => todo._id === id ? res.data : todo));
    } catch (err) {
      console.error(err);
      alert('Failed to update todo');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete todo');
    }
  };

  const saveEdit = async (id) => {
    if (!editingText.trim()) return;

    try {
      const res = await axios.put(
        `${API_URL}/api/todos/${id}`,
        { task: editingText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos(todos.map(todo => todo._id === id ? res.data : todo));
      setEditingId(null);
      setEditingText('');
    } catch (err) {
      console.error(err);
      alert('Failed to edit todo');
    }
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '50px auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>My Todo List</h2>

      <form onSubmit={addTodo} style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task..."
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            outline: 'none',
            fontSize: '16px',
            transition: '0.3s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#6B73FF'}
          onBlur={(e) => e.target.style.borderColor = '#ccc'}
        />
        <button type="submit" style={{
          padding: '12px 20px',
          borderRadius: '8px',
          border: 'none',
          background: '#6B73FF',
          color: '#fff',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: '0.3s'
        }}
        onMouseEnter={(e) => e.target.style.background = '#000DFF'}
        onMouseLeave={(e) => e.target.style.background = '#6B73FF'}
        >
          Add
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li key={todo._id} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            marginBottom: '10px',
            borderRadius: '10px',
            background: todo.completed ? 'rgba(0,0,0,0.05)' : '#f9f9f9',
            boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
            transition: '0.3s'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
              <input type="checkbox" checked={todo.completed} onChange={() => toggleCompleted(todo._id, todo.completed)} />
              {editingId === todo._id ? (
                <input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  style={{ flex: 1, padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
              ) : (
                <span style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? '#999' : '#333',
                  flex: 1
                }}>{todo.task}</span>
              )}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {editingId === todo._id ? (
                <button onClick={() => saveEdit(todo._id)} style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  background: '#FFD93D',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}>Save</button>
              ) : (
                <button onClick={() => { setEditingId(todo._id); setEditingText(todo.task); }} style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  background: '#6B73FF',
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}>Edit</button>
              )}

              <button onClick={() => deleteTodo(todo._id)} style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: 'none',
                background: '#FF6B6B',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: '500'
              }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
