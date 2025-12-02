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
      const API_URL = process.env.REACT_APP_API_URL;
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      navigate('/todos');
    } catch (err) {
      console.error('Login Error:', err);
      alert('Invalid email or password');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
      fontFamily: 'Arial, sans-serif',
      padding: '0 16px',
    }}>
      <div style={{
        background: '#fff',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '30px',
          color: '#333',
          fontSize: '28px',
          fontWeight: '600',
        }}>Login</h2>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '16px',
              outline: 'none',
              transition: '0.3s',
            }}
            onFocus={(e) => e.target.style.borderColor = '#6B73FF'}
            onBlur={(e) => e.target.style.borderColor = '#ccc'}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '16px',
              outline: 'none',
              transition: '0.3s',
            }}
            onFocus={(e) => e.target.style.borderColor = '#6B73FF'}
            onBlur={(e) => e.target.style.borderColor = '#ccc'}
          />

          <button
            type="submit"
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              border: 'none',
              background: '#6B73FF',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: '0.3s',
            }}
            onMouseEnter={(e) => e.target.style.background = '#000DFF'}
            onMouseLeave={(e) => e.target.style.background = '#6B73FF'}
          >
            Login
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#555', fontSize: '14px' }}>
          Don't have an account? <Link to="/signup" style={{ color: '#6B73FF', fontWeight: 'bold', textDecoration: 'none' }}>Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
