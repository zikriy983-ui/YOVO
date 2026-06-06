import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <h1>مرحباً بك في متجر YOVO</h1>
          <p>منصة تسوق إلكترونية متخصصة في المنتجات الرقمية</p>
          <Link to="/shop" className="btn btn-primary btn-large">ابدأ التسوق</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
