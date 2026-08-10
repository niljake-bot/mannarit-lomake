import { sql } from '@vercel/postgres';
import '../globals.css';

// Pakotetaan dynaamiseksi, jotta sivu renderöidään aina uudestaan palvelimella
export const dynamic = 'force-dynamic'; 

export default async function ViewPage() {
  let rows = [];
  try {
    const result = await sql`SELECT * FROM registrations ORDER BY created_at DESC;`;
    rows = result.rows;
  } catch (e) {
    // Jos taulua ei ole vielä luotu (yhtään ilmoittautumista ei ole tullut), tämä nappaa virheen.
    console.error("View error:", e);
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Ilmoittautuneet (Admin-näkymä)</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%', maxWidth: '800px' }}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Nimi</th>
            <th style={thStyle}>Sähköposti</th>
            <th style={thStyle}>Allergiat</th>
            <th style={thStyle}>Aika</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id}>
              <td style={tdStyle}>{r.id}</td>
              <td style={tdStyle}>{r.name}</td>
              <td style={tdStyle}>{r.email}</td>
              <td style={tdStyle}>{r.allergies}</td>
              <td style={tdStyle}>{r.created_at ? new Date(r.created_at).toLocaleString('fi-FI') : ''}</td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td colSpan="5" style={{...tdStyle, textAlign: 'center'}}>Ei ilmoittautumisia vielä.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = { border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' };
const tdStyle = { border: '1px solid #ddd', padding: '8px', textAlign: 'left' };
