import { NextResponse } from 'next/server';
import { fetchTours } from '@/lib/contentstack';

export async function GET() {
  try {
    const result = await fetchTours();
    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tours' },
      { status: 500 }
    );
  }
}
