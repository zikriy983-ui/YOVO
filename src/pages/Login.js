import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        onLogin();
        navigate('/');
      }
    } catch (err) {
      setError('خطأ في تسجيل الدخول');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>تسجيل الدخول</h1>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="البريد الإلكتروني" onChange={handleChange} required />
          <input type="password" name="password" placeholder="كلمة المرور" onChange={handleChange} required />
          <button type="submit">دخول</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
