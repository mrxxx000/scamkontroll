import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function POST(request: NextRequest) {
  const { phone, category, message } = await request.json();

  if (!phone || !category || !message) {
    return NextResponse.json(
      { error: 'Phone, category, and message are required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${API_URL}/api/numbers/${encodeURIComponent(phone)}/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category, message }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to submit report' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Report submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
