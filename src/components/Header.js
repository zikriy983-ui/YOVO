import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

function Header({ isLoggedIn, user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">🛍️ YOVO</Link>
          <nav className="nav">
            <Link to="/">الرئيسية</Link>
            <Link to="/shop">المتجر</Link>
          </nav>
          <div className="header-actions">
            {isLoggedIn ? (
              <>
                <span>{user?.name}</span>
                <button onClick={handleLogout}>خروج</button>
              </>
            ) : (
              <>
                <Link to="/login">دخول</Link>
                <Link to="/register">تسجيل</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
