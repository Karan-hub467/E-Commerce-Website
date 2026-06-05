import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form.name, form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Register</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input style={styles.input} placeholder="Full Name"
          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input style={styles.input} type="email" placeholder="Email"
          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input style={styles.input} type="password" placeholder="Password (min 6 chars)"
          value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={6} />
        <button style={styles.btn} type="submit">Register</button>
        <p style={styles.text}>Already have an account? <Link to="/login">Login</Link></p>
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
