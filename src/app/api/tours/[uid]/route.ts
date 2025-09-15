import { NextResponse } from 'next/server';
import { fetchTourByUID } from '@/lib/contentstack';

export async function GET(
  request: Request,
  { params }: { params: { uid: string } }
) {
  try {
    const tour = await fetchTourByUID(params.uid);
    if (!tour) {
      return NextResponse.json(
        { error: 'Tour not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(tour);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tour' },
      { status: 500 }
    );
  }
}
