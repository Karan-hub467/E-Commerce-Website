import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>ShopMERN</Link>
      <div style={styles.links}>
        <Link to="/products" style={styles.link}>Products</Link>
        <Link to="/cart" style={styles.link}>Cart ({itemCount})</Link>
        {user ? (
          <>
            {user.role === 'admin' && <Link to="/admin" style={styles.link}>Admin</Link>}
            <Link to="/orders" style={styles.link}>Orders</Link>
            <span style={styles.user}>Hi, {user.name}</span>
            <button onClick={handleLogout} style={styles.btn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '1rem 2rem', background: '#1a1a2e', color: '#fff',
  },
  brand: { fontSize: '1.5rem', fontWeight: 'bold', color: '#e94560', textDecoration: 'none' },
  links: { display: 'flex', alignItems: 'center', gap: '1.2rem' },
  link: { color: '#ddd', textDecoration: 'none', fontSize: '0.95rem' },
  user: { color: '#aaa', fontSize: '0.85rem' },
  btn: {
    background: '#e94560', color: '#fff', border: 'none', padding: '0.4rem 1rem',
    borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem',
  },
};
