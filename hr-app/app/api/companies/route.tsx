import { NextResponse } from 'next/server';
import  companies from '@/app/fake_data/Companies';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const company = companies.find((company) => company.uuid === id);
    if (company) {
      return NextResponse.json(company, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }
  } else {
    return NextResponse.json(companies, { status: 200 });
  }
}
