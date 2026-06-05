import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct } from '../api/products';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    getProduct(id).then((res) => setProduct(res.data)).catch(() => {});
  }, [id]);

  if (!product) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.container}>
      <Link to="/products" style={styles.back}>← Back to Products</Link>
      <div style={styles.content}>
        <img src={product.image} alt={product.name} style={styles.img} />
        <div style={styles.info}>
          <h1>{product.name}</h1>
          <p style={styles.price}>${product.price.toFixed(2)}</p>
          <p style={styles.desc}>{product.description}</p>
          <p style={styles.meta}>Category: {product.category}</p>
          <p style={styles.meta}>Rating: ★ {product.rating}</p>
          <p style={styles.meta}>Stock: {product.stock}</p>
          {product.stock > 0 && (
            <div style={styles.actions}>
              <input type="number" min="1" max={product.stock} value={qty}
                onChange={(e) => setQty(Math.min(product.stock, Math.max(1, Number(e.target.value))))}
                style={styles.qty} />
              <button style={styles.btn} onClick={() => addItem(product, qty)}>Add to Cart</button>
            </div>
          )}
          {product.stock === 0 && <p style={styles.out}>Out of Stock</p>}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' },
  back: { color: '#666', textDecoration: 'none', display: 'inline-block', marginBottom: '1.5rem' },
  loading: { textAlign: 'center', padding: '4rem', color: '#888' },
  content: { display: 'flex', gap: '3rem', flexWrap: 'wrap' },
  img: { width: '400px', maxWidth: '100%', height: '400px', objectFit: 'cover', borderRadius: '8px', background: '#f5f5f5' },
  info: { flex: 1, minWidth: '280px' },
  price: { fontSize: '2rem', color: '#e94560', fontWeight: 'bold', margin: '0.5rem 0' },
  desc: { color: '#555', lineHeight: '1.6', margin: '1rem 0' },
  meta: { color: '#888', margin: '0.3rem 0' },
  actions: { display: 'flex', gap: '1rem', marginTop: '1.5rem', alignItems: 'center' },
  qty: { width: '60px', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px', textAlign: 'center' },
  btn: { padding: '0.7rem 2rem', background: '#e94560', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' },
  out: { color: '#e94560', fontWeight: 'bold', marginTop: '1rem' },
};
