import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../api/orders';

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState({ address: '', city: '', zip: '' });
  const [placing, setPlacing] = useState(false);

  const handleCheckout = async () => {
    if (!user) return navigate('/login');
    if (!address.address || !address.city || !address.zip) return alert('Please fill in shipping address');

    setPlacing(true);
    try {
      await createOrder({
        items: items.map((i) => ({ productId: i._id, quantity: i.quantity })),
        shippingAddress: address,
      });
      clearCart();
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      alert(err.response?.data?.message || 'Order failed');
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div style={styles.empty}>
        <h2>Your cart is empty</h2>
        <Link to="/products" style={styles.cta}>Browse Products</Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>Shopping Cart ({items.length} items)</h1>
      <div style={styles.layout}>
        <div style={styles.items}>
          {items.map((item) => (
            <div key={item._id} style={styles.card}>
              <img src={item.image} alt={item.name} style={styles.img} />
              <div style={styles.info}>
                <Link to={`/products/${item._id}`} style={styles.name}>{item.name}</Link>
                <p style={styles.price}>${item.price.toFixed(2)}</p>
                <div style={styles.actions}>
                  <button style={styles.mini} onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                  <span style={styles.qty}>{item.quantity}</span>
                  <button style={styles.mini} onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                  <button style={styles.remove} onClick={() => removeItem(item._id)}>Remove</button>
                </div>
              </div>
              <p style={styles.total}>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div style={styles.summary}>
          <h3>Order Summary</h3>
          <p>Subtotal: <strong>${subtotal.toFixed(2)}</strong></p>
          <p>Shipping: <strong>Free</strong></p>
          <hr />
          <p>Total: <strong>${subtotal.toFixed(2)}</strong></p>
          <h4 style={{ marginTop: '1.5rem' }}>Shipping Address</h4>
          <input style={styles.input} placeholder="Street Address" value={address.address}
            onChange={(e) => setAddress({ ...address, address: e.target.value })} />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input style={{ ...styles.input, flex: 1 }} placeholder="City" value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })} />
            <input style={{ ...styles.input, width: '100px' }} placeholder="ZIP" value={address.zip}
              onChange={(e) => setAddress({ ...address, zip: e.target.value })} />
          </div>
          <button style={styles.checkout} onClick={handleCheckout} disabled={placing}>
            {placing ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '1100px', margin: '0 auto', padding: '2rem 1rem' },
  empty: { textAlign: 'center', padding: '4rem 1rem' },
  cta: { background: '#e94560', color: '#fff', padding: '0.7rem 1.5rem', borderRadius: '4px', textDecoration: 'none', display: 'inline-block', marginTop: '1rem' },
  layout: { display: 'flex', gap: '2rem', flexWrap: 'wrap' },
  items: { flex: 2, minWidth: '300px' },
  summary: { flex: 1, minWidth: '280px', background: '#f9f9f9', padding: '1.5rem', borderRadius: '8px', height: 'fit-content' },
  card: { display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #eee', alignItems: 'center' },
  img: { width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', background: '#f5f5f5' },
  info: { flex: 1 },
  name: { fontWeight: '600', color: '#1a1a2e', textDecoration: 'none' },
  price: { color: '#e94560', fontWeight: 'bold', margin: '0.3rem 0' },
  actions: { display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.5rem' },
  mini: { width: '30px', height: '30px', border: '1px solid #ddd', borderRadius: '4px', background: '#fff', cursor: 'pointer' },
  qty: { minWidth: '20px', textAlign: 'center' },
  remove: { color: '#e94560', background: 'none', border: 'none', cursor: 'pointer', marginLeft: '0.5rem', fontSize: '0.85rem' },
  total: { fontWeight: 'bold', fontSize: '1.1rem', minWidth: '80px', textAlign: 'right' },
  input: { width: '100%', padding: '0.6rem', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '0.5rem', boxSizing: 'border-box' },
  checkout: { width: '100%', padding: '0.8rem', background: '#e94560', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', marginTop: '1rem' },
};
