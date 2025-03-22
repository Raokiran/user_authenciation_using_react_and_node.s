import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phone: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async () => {
    const { username, password, email, phone } = formData;

    if (!username || !password || !email || !phone) {
      setMessage('All fields are required');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/register', formData);
      setMessage(response.data.message);

      if (response.data.success) {
        setTimeout(() => navigate('/home'), 1500);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='background_rg'>
      <div className='content_rg'>
        <h1>Register</h1>
        <div style={{ display: 'flex', gap: '15px' ,marginLeft:'20px'}}>
          <div>
               <label>
            <h3>Set your Username</h3>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter Username"
              disabled={loading}
            />
          </label>

          <label>
            <h3>Set your Password</h3>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              disabled={loading}
            />
          </label>

          <label>
            <h3>Email ID</h3>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              disabled={loading}
            />
          </label>

          <label>
            <h3>Phone</h3>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              disabled={loading}
              
            />
          </label>
          </div>
       
<div style={{placeContent:'center',placeItems:'center', paddingLeft:'100px'}}>   <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Registering..." : "CONFIRM"}
          </button>

          {message && <h6 style={{ color: 'red' }}>{message}</h6>}
          </div>
       
        </div>
      </div>
    </div>
  );
}

export default Register;
