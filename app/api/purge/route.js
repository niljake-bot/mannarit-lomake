import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET() {
  revalidatePath('/view');
  revalidatePath('/view', 'layout');
  revalidatePath('/view', 'page');
  return NextResponse.json({ purged: true, timestamp: Date.now() });
}
