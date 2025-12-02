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
      navigate('/todos', { replace: true });
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
      background: 'linear-gradient(135deg, #3ac5ca 0%, #90e0ef 100%)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '0 16px',
    }}>
      <div style={{
        background: 'linear-gradient(145deg, #00796B 0%, #00ACC1 100%)',
        padding: '50px 40px',
        borderRadius: '25px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
        width: '100%',
        maxWidth: '420px',
        color: '#fff',
        transition: 'all 0.3s ease',
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '35px',
          fontSize: '32px',
          fontWeight: '700',
          textShadow: '2px 2px 5px rgba(0,0,0,0.4)',
        }}>Login</h2>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: '16px 20px',
              borderRadius: '15px',
              border: 'none',
              fontSize: '16px',
              outline: 'none',
              background: 'rgba(255,255,255,0.15)',
              color: '#fff',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.3s ease',
            }}
            onFocus={(e) => e.target.style.background = 'rgba(255,255,255,0.25)'}
            onBlur={(e) => e.target.style.background = 'rgba(255,255,255,0.15)'}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: '16px 20px',
              borderRadius: '15px',
              border: 'none',
              fontSize: '16px',
              outline: 'none',
              background: 'rgba(255,255,255,0.15)',
              color: '#fff',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.3s ease',
            }}
            onFocus={(e) => e.target.style.background = 'rgba(255,255,255,0.25)'}
            onBlur={(e) => e.target.style.background = 'rgba(255,255,255,0.15)'}
          />

          <button
            type="submit"
            style={{
              padding: '16px 20px',
              borderRadius: '15px',
              border: 'none',
              background: 'linear-gradient(90deg, #26C6DA 0%, #00ACC1 100%)',
              color: '#fff',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            Login
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '25px', fontSize: '15px', color: '#e0f7fa' }}>
          Don't have an account? <Link to="/signup" style={{ color: '#00E5FF', fontWeight: '700', textDecoration: 'none' }}>Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
