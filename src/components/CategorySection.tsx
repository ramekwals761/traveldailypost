import Link from 'next/link';
import NewsCard from './NewsCard';
import { Article } from '@/lib/types';

interface CategorySectionProps {
  title: string;
  slug: string;
  articles: Article[];
  layout?: 'grid-3' | 'grid-2' | 'featured';
  background?: 'white' | 'gray';
}

export default function CategorySection({
  title,
  slug,
  articles,
  layout = 'grid-3',
  background = 'white',
}: CategorySectionProps) {
  return (
    <section
      className={`home-section${background === 'gray' ? ' home-section--alt' : ''}`}
      aria-labelledby={`section-${slug}`}
    >
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" id={`section-${slug}`}>
            {title}
          </h2>
          <Link href={`/category/${slug}`} className="section-view-all" aria-label={`View all ${title}`}>
            View All
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        {layout === 'featured' ? (
          <div className="news-grid-main news-grid-featured">
            {articles.slice(0, 3).map((article, idx) => (
              <NewsCard
                key={article.id}
                article={article}
                variant={idx === 0 ? 'large' : 'default'}
              />
            ))}
          </div>
        ) : layout === 'grid-2' ? (
          <div className="news-grid-main news-grid-2">
            {articles.slice(0, 2).map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="news-grid-main news-grid-3">
            {articles.slice(0, 3).map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
