import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getCategories } from '../api/products';
import { useCart } from '../context/CartContext';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState({ category: '', search: '' });
  const { addItem } = useCart();

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    const params = {};
    if (filter.category) params.category = filter.category;
    if (filter.search) params.search = filter.search;
    getProducts(params).then((res) => setProducts(res.data)).catch(() => {});
  }, [filter]);

  return (
    <div style={styles.container}>
      <h1>Products</h1>
      <div style={styles.filters}>
        <input style={styles.search} placeholder="Search products..."
          value={filter.search} onChange={(e) => setFilter({ ...filter, search: e.target.value })} />
        <select style={styles.select} value={filter.category}
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}>
          <option value="">All Categories</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div style={styles.grid}>
        {products.map((p) => (
          <div key={p._id} style={styles.card}>
            <img src={p.image} alt={p.name} style={styles.img} />
            <div style={styles.info}>
              <Link to={`/products/${p._id}`} style={styles.name}>{p.name}</Link>
              <p style={styles.price}>${p.price.toFixed(2)}</p>
              <p style={styles.rating}>★ {p.rating} | Stock: {p.stock}</p>
              <button style={styles.btn} onClick={() => addItem(p)} disabled={p.stock === 0}>
                {p.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' },
  filters: { display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' },
  search: { flex: 1, minWidth: '200px', padding: '0.6rem', border: '1px solid #ddd', borderRadius: '4px' },
  select: { padding: '0.6rem', border: '1px solid #ddd', borderRadius: '4px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' },
  card: { border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden', background: '#fff' },
  img: { width: '100%', height: '200px', objectFit: 'cover', background: '#f5f5f5' },
  info: { padding: '1rem' },
  name: { fontWeight: '600', color: '#1a1a2e', textDecoration: 'none', display: 'block', marginBottom: '0.5rem' },
  price: { fontSize: '1.2rem', color: '#e94560', fontWeight: 'bold', margin: '0.3rem 0' },
  rating: { fontSize: '0.85rem', color: '#888', margin: '0.3rem 0' },
  btn: {
    width: '100%', padding: '0.5rem', background: '#1a1a2e', color: '#fff',
    border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '0.5rem',
  },
};
