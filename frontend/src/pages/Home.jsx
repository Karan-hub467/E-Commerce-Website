import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to ShopMERN</h1>
      <p style={styles.sub}>Discover amazing products at great prices</p>
      <Link to="/products" style={styles.cta}>Shop Now</Link>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', minHeight: '80vh', textAlign: 'center',
  },
  title: { fontSize: '3rem', margin: '0 0 1rem', color: '#1a1a2e' },
  sub: { fontSize: '1.2rem', color: '#666', marginBottom: '2rem' },
  cta: {
    background: '#e94560', color: '#fff', padding: '0.8rem 2rem',
    borderRadius: '6px', textDecoration: 'none', fontSize: '1.1rem',
  },
};
