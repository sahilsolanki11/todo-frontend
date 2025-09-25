import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
     await axios.post('http://localhost:5000/api/users/signup', { username, email, password });

      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Signup failed. Email may already be in use.');
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
      <h2 style={{ textAlign: 'center', color: '#007bff', marginBottom: '20px' }}>Sign Up</h2>
      <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
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
          Sign Up
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Already have an account? <Link to="/login" style={{ color: '#007bff' }}>Login</Link>
      </p>
    </div>
  );
};

export default Signup;
