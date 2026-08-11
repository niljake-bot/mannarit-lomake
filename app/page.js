'use client';
import { useState } from 'react';
import './globals.css';

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Home() {
  const [status, setStatus] = useState('idle');
  const [memeOpen, setMemeOpen] = useState(false);
  const [memeList, setMemeList] = useState([]);
  const [memeIndex, setMemeIndex] = useState(0);
  const [memeLoading, setMemeLoading] = useState(false);

  async function onMemeClick() {
    if (memeList.length > 0) {
      setMemeIndex(0);
      setMemeOpen(true);
      return;
    }
    setMemeLoading(true);
    try {
      const res = await fetch('/api/memes');
      const data = await res.json();
      setMemeList(shuffle(data.memes || []));
      setMemeIndex(0);
      setMemeOpen(true);
    } catch (err) {
      setMemeList([]);
      setMemeOpen(true);
    } finally {
      setMemeLoading(false);
    }
  }

  function showNextMeme() {
    setMemeIndex((i) => (i + 1) % memeList.length);
  }

  function showPrevMeme() {
    setMemeIndex((i) => (i - 1 + memeList.length) % memeList.length);
  }

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
          <div style={styles.success}>Ilmoittautuminen tallennettu!<br/>Nähdään mannareilla 24.8.2026!</div>
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <video 
              src="/success.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              style={{ maxWidth: '100%', borderRadius: '8px' }} 
            />
          </div>
          <div style={{ marginTop: '25px', textAlign: 'center' }}>
            <a href="https://t.me/+Nm3aFR1smAtkZmM0" target="_blank" rel="noopener noreferrer" style={styles.telegramButton}>
              Liity Telegram-ryhmään
            </a>
          </div>
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
          
          <label style={styles.label}>Mannariterveiset</label>
          <textarea name="message" rows="3" placeholder="Kirjoita terveisiä..." style={styles.input}></textarea>
          
          <button type="submit" disabled={status === 'loading'} style={styles.button}>
            {status === 'loading' ? 'Tallennetaan...' : 'Ilmoittaudu mukaan'}
          </button>
          
          {status === 'error' && <p style={{color: 'red', marginTop: '10px', textAlign: 'center'}}>Virhe tallennuksessa. Yritä uudelleen.</p>}
        </form>

        <button type="button" onClick={onMemeClick} disabled={memeLoading} style={styles.memeButton}>
          {memeLoading ? 'Haetaan...' : '🍺 Maanantain motivaatio'}
        </button>
      </div>

      {memeOpen && (
        <div style={styles.modalOverlay} onClick={() => setMemeOpen(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {memeList.length === 0 ? (
              <p>Ei meemejä saatavilla vielä. Lisää kuvia public/memes-kansioon.</p>
            ) : (
              <>
                <img src={memeList[memeIndex]} alt="Maanantain motivaatio" style={styles.memeImage} />
                {memeList.length > 1 && (
                  <div style={styles.memeNav}>
                    <button type="button" onClick={showPrevMeme} style={styles.memeNavButton}>‹ Edellinen</button>
                    <button type="button" onClick={showNextMeme} style={styles.memeNavButton}>Seuraava ›</button>
                  </div>
                )}
              </>
            )}
            <button type="button" onClick={() => setMemeOpen(false)} style={styles.modalClose}>Sulje</button>
          </div>
        </div>
      )}
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
  button: { marginTop: '25px', width: '100%', padding: '14px', background: '#0066cc', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },
  telegramButton: { display: 'inline-block', width: '100%', padding: '14px', background: '#24A1DE', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'none', boxSizing: 'border-box' },
  success: { color: '#155724', backgroundColor: '#d4edda', border: '1px solid #c3e6cb', padding: '15px', borderRadius: '6px', textAlign: 'center', fontWeight: '500' },
  memeButton: { marginTop: '15px', width: '100%', padding: '12px', background: '#ff9800', color: 'white', border: 'none', borderRadius: '6px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' },
  modalContent: { background: '#fff', borderRadius: '12px', padding: '20px', maxWidth: '500px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  memeImage: { maxWidth: '100%', maxHeight: '65vh', borderRadius: '8px' },
  memeNav: { display: 'flex', gap: '10px', marginTop: '15px' },
  memeNavButton: { padding: '10px 16px', background: '#0066cc', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' },
  modalClose: { marginTop: '15px', padding: '10px 20px', background: '#333', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }
};
