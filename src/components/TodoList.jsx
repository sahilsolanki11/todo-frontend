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

  // ✅ Redirect if no token (protect route)
  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchTodos = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/todos', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTodos(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch todos');
      }
    };

    fetchTodos();
  }, [token, navigate]);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTask) return;
    try {
      const res = await axios.post(
        'http://localhost:5000/api/todos',
        { task: newTask },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos([...todos, res.data]);
      setNewTask('');
    } catch (err) {
      console.error(err);
      alert('Failed to add todo');
    }
  };

  const toggleCompleted = async (id, completed) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/todos/${id}`,
        { completed: !completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
    } catch (err) {
      console.error(err);
      alert('Failed to update todo');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete todo');
    }
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/todos/${id}`,
        { task: editingText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
      setEditingId(null);
      setEditingText('');
    } catch (err) {
      console.error(err);
      alert('Failed to edit todo');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#007bff' }}>My Todo List</h2>
      </div>

      {/* Add Task Form */}
      <form onSubmit={addTodo} style={{ display: 'flex', marginBottom: '20px', gap: '10px' }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task..."
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            border: 'none',
            backgroundColor: '#28a745',
            color: '#fff',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Add
        </button>
      </form>

      {/* Todo List */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo._id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px',
              borderBottom: '1px solid #eee',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleCompleted(todo._id, todo.completed)}
              />

              {editingId === todo._id ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  style={{ padding: '5px', fontSize: '16px' }}
                />
              ) : (
                <span
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    fontSize: '16px',
                  }}
                >
                  {todo.task}
                </span>
              )}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              {editingId === todo._id ? (
                <button
                  onClick={() => saveEdit(todo._id)}
                  style={{
                    border: 'none',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => startEditing(todo._id, todo.task)}
                  style={{
                    border: 'none',
                    backgroundColor: '#ffc107',
                    color: '#fff',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Edit
                </button>
              )}

              <button
                onClick={() => deleteTodo(todo._id)}
                style={{
                  border: 'none',
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
