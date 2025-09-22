import { NextResponse } from 'next/server';
import { fetchTours } from '@/lib/contentstack';
import { createTourEntry } from '@/lib/contentstackManagement';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { title, description, country, duration, price, tags } = body || {};
    if (!title || !description || !country || !duration || typeof price !== 'number') {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, country, duration, price(number)' },
        { status: 400 }
      );
    }

    // Basic shared-secret guard to prevent public abuse
    const adminKeyHeader = request.headers.get('x-admin-key');
    const adminKeyBody = body?.adminKey;
    const adminKey = (adminKeyHeader || adminKeyBody || '').trim();

    const secret = (
      process.env.ADMIN_SHARED_SECRET ||
      process.env.NEXT_PUBLIC_ADMIN_SHARED_SECRET ||
      ''
    ).trim();
    if (!secret || adminKey !== secret) {
      console.log('Unauthorized create attempt', {
        hasSecret: !!secret,
        receivedHeader: !!adminKeyHeader,
        receivedBody: !!adminKeyBody,
      });
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const created = await createTourEntry({
      title,
      description,
      country,
      duration,
      price,
      tags,
    });

    return NextResponse.json({ entry: created }, { status: 201 });
  } catch (error: any) {
    console.error('Create Tour Error:', error?.response?.data || error);
    return NextResponse.json(
      { error: 'Failed to create tour', details: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
