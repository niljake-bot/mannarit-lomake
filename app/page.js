'use client';
import { useState } from 'react';
import './globals.css';

export default function Home() {
  const [status, setStatus] = useState('idle');

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <div style={styles.success}>Ilmoittautuminen tallennettu!<br/>Nähdään mannareilla!</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h1 style={styles.h1}>Kesä 2026 Mannarit (24.8.)</h1>
        <form onSubmit={onSubmit}>
          <label style={styles.label}>Nimi</label>
          <input type="text" name="name" required placeholder="Etunimi Sukunimi" style={styles.input} />
          
          <label style={styles.label}>Sähköposti</label>
          <input type="email" name="email" required placeholder="nimi@esimerkki.fi" style={styles.input} />
          
          <label style={styles.label}>Mannariterveiset</label>
          <textarea name="message" rows="3" placeholder="Kirjoita terveisiä..." style={styles.input}></textarea>
          
          <button type="submit" disabled={status === 'loading'} style={styles.button}>
            {status === 'loading' ? 'Tallennetaan...' : 'Ilmoittaudu mukaan'}
          </button>
          
          {status === 'error' && <p style={{color: 'red', marginTop: '10px', textAlign: 'center'}}>Virhe tallennuksessa. Yritä uudelleen.</p>}
        </form>
      </div>
    </div>
  );
}

const styles = {
  wrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' },
  container: { background: '#fff', padding: '30px 40px', borderRadius: '12px', boxShadow: '0 8px 16px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' },
  h1: { color: '#1a1a1a', fontSize: '26px', textAlign: 'center', marginBottom: '20px', marginTop: 0 },
  label: { display: 'block', marginTop: '15px', color: '#444', fontWeight: '500', fontSize: '14px' },
  input: { width: '100%', padding: '12px', marginTop: '8px', border: '1px solid #ddd', borderRadius: '6px', boxSizing: 'border-box', fontFamily: 'inherit' },
  button: { marginTop: '25px', width: '100%', padding: '14px', background: '#0066cc', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },
  success: { color: '#155724', backgroundColor: '#d4edda', border: '1px solid #c3e6cb', padding: '15px', borderRadius: '6px', textAlign: 'center', fontWeight: '500' }
};
