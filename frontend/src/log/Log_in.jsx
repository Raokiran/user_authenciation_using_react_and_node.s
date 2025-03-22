import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './log.css';
import axios from 'axios';

function LogIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!username || !password) {
      setMessage('Username and password required');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/log', { username, password });

      setMessage(response.data.message);
      if (response.data.success) {
        setTimeout(() => navigate('/home'), 1000);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
      setUsername('');
      setPassword('');
    }
  };

  return (
    <div className="background_log">
      <div className="content_log">
        <h1>Log In</h1>

        <h2>Username</h2>
        <input 
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Username"
          disabled={loading}
        />

        <h2>Password</h2>
        <input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          disabled={loading}
        />

        <div style={{position:'relative',right:'-20px',top:'10px'}}>
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Logging in..." : "Confirm"}
          </button>
        </div>

        {message && <h6 style={{ color: 'red' }}>{message}</h6>}
      </div>
    </div>
  );
}

export default LogIn;
