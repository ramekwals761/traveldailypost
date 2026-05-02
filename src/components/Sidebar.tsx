import Link from 'next/link';
import { Article } from '@/lib/types';
import { categories } from '@/lib/news-data';

interface SidebarProps {
  trendingArticles: Article[];
}

export default function Sidebar({ trendingArticles }: SidebarProps) {
  return (
    <aside className="sidebar" aria-label="Sidebar">
      {/* Trending Widget */}
      <div className="sidebar-widget">
        <div className="sidebar-widget-header">Trending Now</div>
        <div className="sidebar-widget-body" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {trendingArticles.slice(0, 5).map((article, idx) => (
            <Link key={article.id} href={`/${article.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 0', borderBottom: idx < 4 ? '1px solid var(--color-gray-100)' : 'none' }}>
                <span style={{ fontSize: '22px', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--color-gray-200)', lineHeight: 1, flexShrink: 0, minWidth: 28, paddingTop: 2 }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div>
                  <p style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-gray-800)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: 3 }}>
                    {article.title}
                  </p>
                  <p style={{ fontSize: '11px', color: 'var(--color-gray-500)', fontFamily: 'var(--font-condensed)' }}>
                    {article.categoryName} · {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories Widget */}
      <div className="sidebar-widget">
        <div className="sidebar-widget-header">Browse Categories</div>
        <div className="sidebar-widget-body">
          <div className="category-pills">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/category/${cat.slug}`} className="category-pill">
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </aside>
  );
}
