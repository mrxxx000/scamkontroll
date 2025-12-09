import { NextRequest, NextResponse } from 'next/server';
import { getAllFraudTypes, getFraudType } from '../../../../backend/api/fraudTypes';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  try {
    if (slug) {
      const fraudType = await getFraudType(slug);
      if (!fraudType) {
        return NextResponse.json({ error: 'Fraud type not found' }, { status: 404 });
      }
      return NextResponse.json(fraudType);
    }

    const fraudTypes = await getAllFraudTypes();
    return NextResponse.json(fraudTypes);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
