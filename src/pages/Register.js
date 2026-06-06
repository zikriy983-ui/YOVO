import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

function Register({ onRegister }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        onRegister();
        navigate('/');
      }
    } catch (err) {
      setError('خطأ في التسجيل');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>إنشاء حساب</h1>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="الاسم" onChange={handleChange} required />
          <input type="email" name="email" placeholder="البريد الإلكتروني" onChange={handleChange} required />
          <input type="password" name="password" placeholder="كلمة المرور" onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="تأكيد كلمة المرور" onChange={handleChange} required />
          <button type="submit">تسجيل</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
