import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function GET(_request: NextRequest) {
  try {
    const response = await fetch(`${API_URL}/api/fraud-type-counts`);

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch fraud type counts' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Fetch fraud type counts error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
