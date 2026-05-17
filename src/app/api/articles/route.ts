import { NextResponse } from 'next/server';
import { articles } from '@/lib/news-data';

export const dynamic = 'force-static';

export async function GET() {
  // Map articles to a safe format for search and breaking news ticker (excluding large content body if needed, but here we can just return what's required)
  const safeArticles = articles.map((art) => ({
    id: art.id,
    slug: art.slug,
    title: art.title,
    excerpt: art.excerpt,
    category: art.category,
    categoryName: art.categoryName,
    image: art.image,
    date: art.date,
  }));

  return NextResponse.json(safeArticles);
}
