import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // ✅ Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/todos', { replace: true }); // replace prevents back navigation
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const API_URL = process.env.REACT_APP_API_URL;
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });

      localStorage.setItem('token', res.data.token);
      navigate('/todos', { replace: true }); // replace prevents back navigation
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
      background: 'linear-gradient(135deg, #FF6B6B 0%, #FFD93D 100%)',
      fontFamily: 'Arial, sans-serif',
      padding: '0 16px',
    }}>
      <div style={{
        background: 'linear-gradient(145deg, #6A11CB 0%, #2575FC 100%)',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
        width: '100%',
        maxWidth: '400px',
        color: '#fff',
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '30px',
          fontWeight: '700',
          textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
        }}>Login</h2>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: '14px 18px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '16px',
              outline: 'none',
              background: 'rgba(255,255,255,0.2)',
              color: '#fff',
              backdropFilter: 'blur(5px)',
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: '14px 18px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '16px',
              outline: 'none',
              background: 'rgba(255,255,255,0.2)',
              color: '#fff',
              backdropFilter: 'blur(5px)',
            }}
          />

          <button
            type="submit"
            style={{
              padding: '14px 18px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(90deg, #FFD93D 0%, #FF6B6B 100%)',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            Login
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#fff' }}>
          Don't have an account? <Link to="/signup" style={{ color: '#FFD93D', fontWeight: 'bold', textDecoration: 'none' }}>Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
