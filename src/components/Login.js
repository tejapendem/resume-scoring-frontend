

import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      alert('Username and password are required!');
      return;
    }

    try {
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);

      const response = await axios.post('http://localhost:8000/token', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { access_token } = response.data;
      localStorage.setItem("token", access_token);
      onLogin(); // navigate to dashboard
    } catch (err) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Resume Screening Login</h2>
        <input
          type="text"
          placeholder="👤 Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="🔒 Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
