import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const link = process.env.TELEGRAM_GROUP_LINK || "https://t.me/+Nm3aFR1smAtkZmM0";
  return NextResponse.redirect(link);
}
