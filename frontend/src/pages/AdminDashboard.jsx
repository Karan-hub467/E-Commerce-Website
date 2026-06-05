import { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api/products';
import { getOrders, updateOrderStatus } from '../api/orders';

export default function AdminDashboard() {
  const [tab, setTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', stock: '', image: '' });
  const [editing, setEditing] = useState(null);

  const load = () => {
    getProducts().then((r) => setProducts(r.data)).catch(() => {});
    getOrders().then((r) => setOrders(r.data)).catch(() => {});
  };

  useEffect(load, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, price: Number(form.price), stock: Number(form.stock) };
    try {
      if (editing) {
        await updateProduct(editing, data);
      } else {
        await createProduct(data);
      }
      setForm({ name: '', description: '', price: '', category: '', stock: '', image: '' });
      setEditing(null);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save product');
    }
  };

  const edit = (p) => {
    setForm({ name: p.name, description: p.description, price: String(p.price), category: p.category, stock: String(p.stock), image: p.image || '' });
    setEditing(p._id);
  };

  const remove = async (id) => {
    if (!confirm('Delete this product?')) return;
    await deleteProduct(id);
    load();
  };

  const updateStatus = async (id, status) => {
    await updateOrderStatus(id, status);
    load();
  };

  return (
    <div style={styles.container}>
      <h1>Admin Dashboard</h1>
      <div style={styles.tabs}>
        <button style={tab === 'products' ? styles.active : styles.tab} onClick={() => setTab('products')}>Products</button>
        <button style={tab === 'orders' ? styles.active : styles.tab} onClick={() => setTab('orders')}>Orders</button>
      </div>

      {tab === 'products' && (
        <div>
          <form onSubmit={handleSubmit} style={styles.form}>
            <h3>{editing ? 'Edit Product' : 'Add Product'}</h3>
            <div style={styles.row}>
              <input style={styles.input} placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <input style={styles.input} placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
            </div>
            <textarea style={styles.textarea} placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
            <div style={styles.row}>
              <input style={styles.input} type="number" step="0.01" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
              <input style={styles.input} type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
              <input style={{ ...styles.input, flex: 2 }} placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            </div>
            <button style={styles.btn} type="submit">{editing ? 'Update' : 'Add'} Product</button>
            {editing && <button style={{ ...styles.btn, background: '#666' }} onClick={() => { setEditing(null); setForm({ name: '', description: '', price: '', category: '', stock: '', image: '' }); }}>Cancel</button>}
          </form>

          <table style={styles.table}>
            <thead>
              <tr><th>Name</th><th>Price</th><th>Stock</th><th>Category</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>${p.price.toFixed(2)}</td>
                  <td>{p.stock}</td>
                  <td>{p.category}</td>
                  <td>
                    <button style={styles.edit} onClick={() => edit(p)}>Edit</button>
                    <button style={styles.del} onClick={() => remove(p._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'orders' && (
        <div>
          {orders.map((order) => (
            <div key={order._id} style={styles.order}>
              <div style={styles.orderHeader}>
                <span>Order #{order._id.slice(-8)}</span>
                <span style={{ ...styles.badge, background: order.status === 'delivered' ? '#4caf50' : order.status === 'cancelled' ? '#e94560' : '#ff9800' }}>
                  {order.status}
                </span>
              </div>
              <p style={styles.orderMeta}>Customer: {order.user?.name} ({order.user?.email})</p>
              <p style={styles.orderMeta}>{order.items.map((i) => `${i.name} × ${i.quantity}`).join(', ')}</p>
              <p style={styles.orderMeta}>Total: ${order.total.toFixed(2)}</p>
              <div style={styles.orderActions}>
                <button style={styles.statusBtn} onClick={() => updateStatus(order._id, 'confirmed')}>Confirm</button>
                <button style={styles.statusBtn} onClick={() => updateStatus(order._id, 'shipped')}>Ship</button>
                <button style={styles.statusBtn} onClick={() => updateStatus(order._id, 'delivered')}>Deliver</button>
                <button style={{ ...styles.statusBtn, background: '#e94560' }} onClick={() => updateStatus(order._id, 'cancelled')}>Cancel</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: '1100px', margin: '0 auto', padding: '2rem 1rem' },
  tabs: { display: 'flex', gap: '0', marginBottom: '2rem' },
  tab: { padding: '0.6rem 1.5rem', border: '1px solid #ddd', background: '#f5f5f5', cursor: 'pointer' },
  active: { padding: '0.6rem 1.5rem', border: '1px solid #1a1a2e', background: '#1a1a2e', color: '#fff', cursor: 'pointer' },
  form: { background: '#f9f9f9', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' },
  row: { display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' },
  input: { flex: 1, padding: '0.6rem', border: '1px solid #ddd', borderRadius: '4px' },
  textarea: { width: '100%', padding: '0.6rem', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '0.5rem', minHeight: '70px', boxSizing: 'border-box' },
  btn: { padding: '0.6rem 1.5rem', background: '#1a1a2e', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '0.5rem' },
  table: { width: '100%', borderCollapse: 'collapse' },
  edit: { padding: '0.3rem 0.8rem', background: '#2196f3', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer', marginRight: '0.3rem' },
  del: { padding: '0.3rem 0.8rem', background: '#e94560', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' },
  order: { border: '1px solid #eee', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' },
  orderHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' },
  badge: { color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', textTransform: 'capitalize' },
  orderMeta: { fontSize: '0.9rem', color: '#555', margin: '0.2rem 0' },
  orderActions: { display: 'flex', gap: '0.5rem', marginTop: '0.5rem' },
  statusBtn: { padding: '0.3rem 0.8rem', background: '#4caf50', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' },
};
