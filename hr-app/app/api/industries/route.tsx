import { NextResponse } from 'next/server';
import  industries from '@/app/fake_data/Industries';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const industry = industries.find((industry) => industry.uuid === id);
    if (industry) {
      return NextResponse.json(industry, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Industry not found' }, { status: 404 });
    }
  } else {
    return NextResponse.json(industries, { status: 200 });
  }
}
