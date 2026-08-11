import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const link = process.env.TELEGRAM_GROUP_LINK;
  
  if (!link) {
    return new NextResponse('Telegram-linkkiä ei ole konfiguroitu.', { status: 404 });
  }
  
  return NextResponse.redirect(link);
}
