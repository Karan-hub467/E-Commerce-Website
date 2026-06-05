import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input style={styles.input} type="email" placeholder="Email"
          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input style={styles.input} type="password" placeholder="Password"
          value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button style={styles.btn} type="submit">Login</button>
        <p style={styles.text}>No account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', padding: '4rem 1rem' },
  form: { width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' },
  input: { padding: '0.7rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem' },
  btn: { padding: '0.7rem', background: '#1a1a2e', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' },
  error: { color: '#e94560', fontSize: '0.9rem' },
  text: { textAlign: 'center', color: '#666' },
};
