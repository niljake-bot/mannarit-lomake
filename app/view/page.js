import { neon } from '@neondatabase/serverless';
import '../globals.css';

// Pakotetaan dynaamiseksi, jotta sivu renderöidään aina uudestaan palvelimella
export const dynamic = 'force-dynamic';

export default async function ViewPage() {
  let rows = [];
  try {
    const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
    if (connectionString) {
      const sql = neon(connectionString);
      // Oletuksena neon() palauttaa suoraan arrayn objekteja, ei { rows: [...] }
      rows = await sql`SELECT * FROM registrations ORDER BY created_at DESC;`;
    } else {
      console.error('DATABASE_URL is missing!');
    }
  } catch (e) {
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
            <th style={thStyle}>Mannariterveiset</th>
            <th style={thStyle}>Aika</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id}>
              <td style={tdStyle}>{r.id}</td>
              <td style={tdStyle}>{r.name}</td>
              <td style={tdStyle}>{r.email}</td>
              <td style={tdStyle}>{r.message}</td>
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
