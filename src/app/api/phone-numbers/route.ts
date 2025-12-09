import { NextRequest, NextResponse } from 'next/server';
import { getPhoneNumber, searchPhoneNumbers, addReport } from '../../../../backend/api/phoneNumbers';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const number = searchParams.get('number');
  const search = searchParams.get('search');

  try {
    if (number) {
      const phoneNumber = await getPhoneNumber(number);
      if (!phoneNumber) {
        return NextResponse.json({ error: 'Phone number not found' }, { status: 404 });
      }
      return NextResponse.json(phoneNumber);
    }

    if (search) {
      const results = await searchPhoneNumbers(search);
      return NextResponse.json(results);
    }

    return NextResponse.json({ error: 'Missing query parameters' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phoneNumberId, content, author } = body;

    if (!phoneNumberId || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const report = await addReport(phoneNumberId, content, author || 'Anonymous');
    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
