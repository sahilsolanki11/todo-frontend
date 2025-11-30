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
    if (!newTask) return;

    try {
      const res = await axios.post(
        `${API_URL}/api/todos`,
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
        `${API_URL}/api/todos/${id}`,
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
      await axios.delete(`${API_URL}/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete todo');
    }
  };

  const saveEdit = async (id) => {
    try {
      const res = await axios.put(
        `${API_URL}/api/todos/${id}`,
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
    <div style={{ maxWidth: '500px', margin: '50px auto' }}>
      <h2>My Todo List</h2>

      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task..."
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(todo._id, todo.completed)}
            />

            {editingId === todo._id ? (
              <input
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <span>{todo.task}</span>
            )}

            {editingId === todo._id ? (
              <button onClick={() => saveEdit(todo._id)}>Save</button>
            ) : (
              <button onClick={() => { setEditingId(todo._id); setEditingText(todo.task); }}>
                Edit
              </button>
            )}

            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
