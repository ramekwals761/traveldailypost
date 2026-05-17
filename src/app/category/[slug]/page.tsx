import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { categories, getArticlesByCategory } from '@/lib/news-data';
import Sidebar from '@/components/Sidebar';
import CategoryArticlesList from '@/components/CategoryArticlesList';
import { articles } from '@/lib/news-data';

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return { title: 'Category Not Found' };

    return {
      title: `${category.name} – Latest News & Updates`,
      description: `Stay updated with the latest ${category.name.toLowerCase()} — breaking news, analysis, and expert coverage from Travel Daily Post.`,
      alternates: { canonical: `https://traveldailypost.com/category/${category.slug}` },
      openGraph: {
        title: `${category.name} – Travel Daily Post`,
        description: `Latest ${category.name.toLowerCase()} from around the world.`,
        url: `https://traveldailypost.com/category/${category.slug}`,
        type: 'website',
      },
    };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const categoryArticles = getArticlesByCategory(slug);
  const trending = articles.filter((a) => a.category !== slug).slice(0, 5);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://traveldailypost.com' },
      { '@type': 'ListItem', position: 2, name: category.name, item: `https://traveldailypost.com/category/${category.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Category Header */}
      <div className="category-header">
        <div className="container">
          <span className="category-header-badge">Category</span>
          <h1 className="category-header-title">{category.name}</h1>
          <p className="category-header-count">
            {categoryArticles.length} article{categoryArticles.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div style={{ padding: '32px 0 48px' }}>
        <div className="container">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: 24, display: 'flex', gap: 6, alignItems: 'center', fontFamily: 'var(--font-condensed)', fontSize: 12, color: 'var(--color-gray-500)' }}>
            <Link href="/" style={{ color: 'inherit', transition: 'color 0.2s' }}>Home</Link>
            <span aria-hidden="true">›</span>
            <span aria-current="page" style={{ color: 'var(--color-gray-700)', fontWeight: 600 }}>{category.name}</span>
          </nav>

          <div className="content-with-sidebar">
            <div>
              {categoryArticles.length > 0 ? (
                <CategoryArticlesList articles={categoryArticles} />
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '80px 20px',
                  background: 'white',
                  borderRadius: 12,
                  boxShadow: 'var(--shadow-sm)',
                }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>📰</div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, color: 'var(--color-gray-900)', marginBottom: 8 }}>
                    No articles yet
                  </h2>
                  <p style={{ color: 'var(--color-gray-500)', marginBottom: 24 }}>
                    We&apos;re working on fresh {category.name} content. Check back soon!
                  </p>
                  <Link href="/" style={{ background: 'var(--color-primary)', color: 'white', padding: '10px 24px', borderRadius: 4, fontFamily: 'var(--font-condensed)', fontSize: 14, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none' }}>
                    ← Back to Home
                  </Link>
                </div>
              )}
            </div>
            <Sidebar trendingArticles={trending} />
          </div>
        </div>
      </div>
    </>
  );
}
