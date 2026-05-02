import { NextResponse } from 'next/server';
import { articles } from '@/lib/news-data';

export async function GET() {
  const lightweight = articles.map((a) => ({
    id: a.id,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    categoryName: a.categoryName,
    image: a.image,
    date: a.date,
  }));
  return NextResponse.json(lightweight);
}
