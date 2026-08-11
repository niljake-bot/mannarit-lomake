import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

const MAX_NAME_LEN = 255;
const MAX_MESSAGE_LEN = 1000;

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, message } = data;

    // Syötteen validointi
    if (!name || typeof name !== 'string' || name.trim().length === 0 || name.length > MAX_NAME_LEN) {
      return NextResponse.json({ error: 'Virheellinen nimi' }, { status: 400 });
    }
    if (message !== undefined && (typeof message !== 'string' || message.length > MAX_MESSAGE_LEN)) {
      return NextResponse.json({ error: 'Viesti liian pitkä' }, { status: 400 });
    }

    const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
    if (!connectionString) {
      console.error('DATABASE_URL is missing!');
      return NextResponse.json({ error: 'Database misconfigured' }, { status: 500 });
    }

    const sql = neon(connectionString);

    // Varmistetaan että taulu on olemassa (jos luodaan tyhjästä, email sallii nullit)
    await sql`
      CREATE TABLE IF NOT EXISTS registrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Poistetaan email-sarakkeesta NOT NULL -rajoite varmuuden vuoksi, jos taulu oli jo olemassa
    await sql`ALTER TABLE registrations ALTER COLUMN email DROP NOT NULL`.catch(() => {});

    await sql`
      INSERT INTO registrations (name, message)
      VALUES (${name.trim()}, ${message?.trim() ?? null});
    `;

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
