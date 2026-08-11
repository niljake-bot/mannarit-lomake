import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const MEMES_DIR = path.join(process.cwd(), 'public', 'memes');
const ALLOWED_EXT = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp']);

export async function GET() {
  try {
    const files = fs
      .readdirSync(MEMES_DIR)
      .filter((f) => ALLOWED_EXT.has(path.extname(f).toLowerCase()));

    return NextResponse.json({ memes: files.map((f) => `/memes/${f}`) });
  } catch (e) {
    // Directory missing or empty - no memes yet.
    return NextResponse.json({ memes: [] });
  }
}
