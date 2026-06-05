import { useState, useEffect } from 'react';
import { getOrders } from '../api/orders';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then((res) => setOrders(res.data)).catch(() => {});
  }, []);

  return (
    <div style={styles.container}>
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p style={styles.empty}>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} style={styles.card}>
            <div style={styles.header}>
              <span>Order #{order._id.slice(-8)}</span>
              <span style={{ ...styles.badge, background: order.status === 'delivered' ? '#4caf50' : order.status === 'cancelled' ? '#e94560' : '#ff9800' }}>
                {order.status}
              </span>
            </div>
            <p style={styles.date}>{new Date(order.createdAt).toLocaleString()}</p>
            {order.items.map((item, i) => (
              <div key={i} style={styles.item}>
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <p style={styles.total}>Total: <strong>${order.total.toFixed(2)}</strong></p>
            <p style={styles.ship}>Ship to: {order.shippingAddress?.address}, {order.shippingAddress?.city}</p>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' },
  empty: { color: '#888', textAlign: 'center', padding: '3rem' },
  card: { border: '1px solid #eee', borderRadius: '8px', padding: '1.2rem', marginBottom: '1rem', background: '#fff' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' },
  badge: { color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', textTransform: 'capitalize' },
  date: { fontSize: '0.85rem', color: '#888', marginBottom: '0.8rem' },
  item: { display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', fontSize: '0.9rem', color: '#555' },
  total: { textAlign: 'right', marginTop: '0.5rem', fontSize: '1.1rem' },
  ship: { fontSize: '0.85rem', color: '#888', marginTop: '0.3rem' },
};
