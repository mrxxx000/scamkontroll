import { NextResponse } from 'next/server';

// Simple GET-only ping endpoint for uptime checks and lightweight scheduled work triggers.
export async function GET() {
  try {
    // This route intentionally does very little. You can expand it to call
    // internal update jobs or trigger a backend refresh endpoint if you have one.
    console.log('✅ /api/ping received');

    return NextResponse.json({ success: true, message: 'Ping received' }, { status: 200 });
  } catch (err) {
    console.error('Error in /api/ping', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
