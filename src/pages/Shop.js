import React, { useState, useEffect } from 'react';
import '../styles/Shop.css';

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1>المتجر</h1>
      {loading ? (
        <div>جاري التحميل...</div>
      ) : (
        <div className="grid">
          {products.map(product => (
            <div key={product._id} className="card">
              <h3>{product.title}</h3>
              <p>{product.price} ر.س</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Shop;
