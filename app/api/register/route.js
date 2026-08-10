import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

const MAX_NAME_LEN = 255;
const MAX_EMAIL_LEN = 255;
const MAX_MESSAGE_LEN = 1000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, message } = data;

    // Syötteen validointi
    if (!name || typeof name !== 'string' || name.trim().length === 0 || name.length > MAX_NAME_LEN) {
      return NextResponse.json({ error: 'Virheellinen nimi' }, { status: 400 });
    }
    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email) || email.length > MAX_EMAIL_LEN) {
      return NextResponse.json({ error: 'Virheellinen sähköposti' }, { status: 400 });
    }
    if (message !== undefined && (typeof message !== 'string' || message.length > MAX_MESSAGE_LEN)) {
      return NextResponse.json({ error: 'Viesti liian pitkä' }, { status: 400 });
    }

    // Varmistetaan että taulu on olemassa
    await sql`
      CREATE TABLE IF NOT EXISTS registrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      INSERT INTO registrations (name, email, message)
      VALUES (${name.trim()}, ${email.trim()}, ${message?.trim() ?? null});
    `;

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
