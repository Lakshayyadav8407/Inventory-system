import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https://inventory-backend-xdc7.onrender.com';


const styles = {
  root: {
    fontFamily: "'DM Mono', 'Courier New', monospace",
    background: '#0a0e1a',
    minHeight: '100vh',
    color: '#e2e8f0',
    padding: '0',
    margin: '0',
  },
  header: {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
    borderBottom: '1px solid #334155',
    padding: '24px 40px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  headerTitle: {
    fontSize: '22px',
    fontWeight: '700',
    letterSpacing: '0.05em',
    color: '#f1f5f9',
    margin: 0,
  },
  badge: {
    background: '#4f46e5',
    color: '#e0e7ff',
    fontSize: '11px',
    padding: '3px 10px',
    borderRadius: '20px',
    letterSpacing: '0.08em',
    fontWeight: '600',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '40px 24px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '24px',
    marginBottom: '32px',
  },
  card: {
    background: '#111827',
    border: '1px solid #1f2937',
    borderRadius: '12px',
    padding: '28px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
  },
  cardTitle: {
    fontSize: '13px',
    fontWeight: '700',
    letterSpacing: '0.12em',
    color: '#6366f1',
    textTransform: 'uppercase',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  label: {
    display: 'block',
    fontSize: '11px',
    fontWeight: '600',
    color: '#94a3b8',
    letterSpacing: '0.08em',
    marginBottom: '6px',
    textTransform: 'uppercase',
  },
  input: {
    width: '100%',
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '8px',
    padding: '10px 14px',
    color: '#f1f5f9',
    fontSize: '14px',
    fontFamily: 'inherit',
    outline: 'none',
    boxSizing: 'border-box',
    marginBottom: '16px',
    transition: 'border-color 0.2s',
  },
  btn: {
    width: '100%',
    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '13px',
    fontWeight: '700',
    letterSpacing: '0.08em',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textTransform: 'uppercase',
    marginTop: '4px',
    transition: 'opacity 0.2s',
  },
  alertSuccess: {
    background: '#064e3b',
    border: '1px solid #10b981',
    color: '#6ee7b7',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '13px',
    marginTop: '14px',
  },
  alertError: {
    background: '#450a0a',
    border: '1px solid #ef4444',
    color: '#fca5a5',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '13px',
    marginTop: '14px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '13px',
  },
  th: {
    textAlign: 'left',
    padding: '10px 14px',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.1em',
    color: '#64748b',
    textTransform: 'uppercase',
    borderBottom: '1px solid #1f2937',
  },
  td: {
    padding: '11px 14px',
    borderBottom: '1px solid #1a2332',
    color: '#cbd5e1',
  },
  stockHigh: { color: '#4ade80', fontWeight: '700' },
  stockLow: { color: '#facc15', fontWeight: '700' },
  stockOut: { color: '#f87171', fontWeight: '700' },
  refreshBtn: {
    background: '#1e293b',
    border: '1px solid #334155',
    color: '#94a3b8',
    borderRadius: '6px',
    padding: '6px 14px',
    fontSize: '11px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    letterSpacing: '0.06em',
    fontWeight: '600',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
};

function OrderForm({ onSuccess }) {
  const [form, setForm] = useState({ customer_id: '', product_id: '', quantity: '' });
  const [msg, setMsg] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    setMsg(''); setIsError(false); setLoading(true);
    try {
      const res = await axios.post(`${API}/orders/`, {
        customer_id: parseInt(form.customer_id),
        product_id: parseInt(form.product_id),
        quantity: parseInt(form.quantity),
      });
      setMsg(`${res.data.message} — Remaining Stock: ${res.data.remaining_stock}`);
      setForm({ customer_id: '', product_id: '', quantity: '' });
      onSuccess && onSuccess();
    } catch (err) {
      setIsError(true);
      setMsg(err.response?.data?.detail || 'Connection error. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.cardTitle}>⚡ Place Order</div>
      <label style={styles.label}>Customer ID</label>
      <input style={styles.input} name="customer_id" value={form.customer_id} onChange={handle} placeholder="e.g. 1" />
      <label style={styles.label}>Product ID</label>
      <input style={styles.input} name="product_id" value={form.product_id} onChange={handle} placeholder="e.g. 1" />
      <label style={styles.label}>Quantity</label>
      <input style={styles.input} name="quantity" value={form.quantity} onChange={handle} placeholder="e.g. 2" />
      <button style={{ ...styles.btn, opacity: loading ? 0.6 : 1 }} onClick={submit} disabled={loading}>
        {loading ? 'Processing...' : 'Dispatch Order'}
      </button>
      {msg && <div style={isError ? styles.alertError : styles.alertSuccess}>{msg}</div>}
    </div>
  );
}

function AddProductForm({ onSuccess }) {
  const [form, setForm] = useState({ sku: '', name: '', price: '', stock_quantity: '' });
  const [msg, setMsg] = useState('');
  const [isError, setIsError] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    setMsg(''); setIsError(false);
    try {
      await axios.post(`${API}/products/`, {
        sku: form.sku, name: form.name,
        price: parseFloat(form.price),
        stock_quantity: parseInt(form.stock_quantity),
      });
      setMsg('Product added successfully!');
      setForm({ sku: '', name: '', price: '', stock_quantity: '' });
      onSuccess && onSuccess();
    } catch (err) {
      setIsError(true);
      setMsg(err.response?.data?.detail || 'Error adding product.');
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.cardTitle}>📦 Add Product</div>
      <label style={styles.label}>SKU</label>
      <input style={styles.input} name="sku" value={form.sku} onChange={handle} placeholder="e.g. PROD-202" />
      <label style={styles.label}>Product Name</label>
      <input style={styles.input} name="name" value={form.name} onChange={handle} placeholder="e.g. USB Hub" />
      <label style={styles.label}>Price ($)</label>
      <input style={styles.input} name="price" value={form.price} onChange={handle} placeholder="e.g. 19.99" />
      <label style={styles.label}>Stock Quantity</label>
      <input style={styles.input} name="stock_quantity" value={form.stock_quantity} onChange={handle} placeholder="e.g. 50" />
      <button style={styles.btn} onClick={submit}>Add to Inventory</button>
      {msg && <div style={isError ? styles.alertError : styles.alertSuccess}>{msg}</div>}
    </div>
  );
}

function AddCustomerForm({ onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '' });
  const [msg, setMsg] = useState('');
  const [isError, setIsError] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    setMsg(''); setIsError(false);
    try {
      await axios.post(`${API}/customers/`, form);
      setMsg('Customer registered!');
      setForm({ name: '', email: '' });
      onSuccess && onSuccess();
    } catch (err) {
      setIsError(true);
      setMsg(err.response?.data?.detail || 'Error adding customer.');
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.cardTitle}>👤 Register Customer</div>
      <label style={styles.label}>Full Name</label>
      <input style={styles.input} name="name" value={form.name} onChange={handle} placeholder="e.g. Jane Smith" />
      <label style={styles.label}>Email Address</label>
      <input style={styles.input} name="email" value={form.email} onChange={handle} placeholder="e.g. jane@example.com" />
      <button style={styles.btn} onClick={submit}>Register</button>
      {msg && <div style={isError ? styles.alertError : styles.alertSuccess}>{msg}</div>}
    </div>
  );
}

function ProductTable({ products, onRefresh }) {
  const stockColor = (q) => q === 0 ? styles.stockOut : q < 5 ? styles.stockLow : styles.stockHigh;
  return (
    <div style={styles.card}>
      <div style={styles.sectionHeader}>
        <div style={styles.cardTitle}>🗄️ Inventory</div>
        <button style={styles.refreshBtn} onClick={onRefresh}>↻ Refresh</button>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>SKU</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr><td colSpan={5} style={{ ...styles.td, textAlign: 'center', color: '#475569' }}>No products yet</td></tr>
          ) : products.map(p => (
            <tr key={p.id}>
              <td style={styles.td}>{p.id}</td>
              <td style={{ ...styles.td, color: '#818cf8' }}>{p.sku}</td>
              <td style={styles.td}>{p.name}</td>
              <td style={styles.td}>${p.price.toFixed(2)}</td>
              <td style={{ ...styles.td, ...stockColor(p.stock_quantity) }}>{p.stock_quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CustomerTable({ customers, onRefresh }) {
  return (
    <div style={styles.card}>
      <div style={styles.sectionHeader}>
        <div style={styles.cardTitle}>👥 Customers</div>
        <button style={styles.refreshBtn} onClick={onRefresh}>↻ Refresh</button>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
          </tr>
        </thead>
        <tbody>
          {customers.length === 0 ? (
            <tr><td colSpan={3} style={{ ...styles.td, textAlign: 'center', color: '#475569' }}>No customers yet</td></tr>
          ) : customers.map(c => (
            <tr key={c.id}>
              <td style={styles.td}>{c.id}</td>
              <td style={styles.td}>{c.name}</td>
              <td style={{ ...styles.td, color: '#38bdf8' }}>{c.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  const fetchAll = async () => {
    try {
      const [p, c] = await Promise.all([
        axios.get(`${API}/products/`),
        axios.get(`${API}/customers/`),
      ]);
      setProducts(p.data);
      setCustomers(c.data);
    } catch (_) {}
  };

  useEffect(() => { fetchAll(); }, []);

  return (
    <div style={styles.root}>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>📊 Inventory & Order Management</h1>
        <span style={styles.badge}>v1.0 · FastAPI + React</span>
      </div>
      <div style={styles.container}>
        <div style={styles.grid}>
          <OrderForm onSuccess={fetchAll} />
          <AddProductForm onSuccess={fetchAll} />
          <AddCustomerForm onSuccess={fetchAll} />
        </div>
        <div style={styles.grid}>
          <ProductTable products={products} onRefresh={fetchAll} />
          <CustomerTable customers={customers} onRefresh={fetchAll} />
        </div>
      </div>
    </div>
  );
}

export default App;
