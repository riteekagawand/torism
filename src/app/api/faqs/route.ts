import { NextResponse } from 'next/server';
import { fetchFAQs } from '@/lib/contentstack';

export async function GET() {
  try {
    const result = await fetchFAQs();
    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch FAQs' },
      { status: 500 }
    );
  }
}
