import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // ✅ Corrected API URL
      const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.user.username);
      navigate('/todos');
    } catch (err) {
      console.error(err);
      alert('Login failed. Check your credentials.');
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '80px auto',
      padding: '30px',
      border: '1px solid #eee',
      borderRadius: '10px',
      boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ textAlign: 'center', color: '#007bff', marginBottom: '20px' }}>Loginn</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{
          padding: '10px',
          backgroundColor: '#28a745',
          color: '#fff',
          fontSize: '16px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Login
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Don't have an account? <Link to="/signup" style={{ color: '#007bff' }}>Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
