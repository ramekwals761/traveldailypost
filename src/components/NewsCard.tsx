import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/types';

interface NewsCardProps {
  article: Article;
  variant?: 'default' | 'large' | 'horizontal' | 'compact';
  priority?: boolean;
}

export default function NewsCard({ article, variant = 'default', priority = false }: NewsCardProps) {
  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  if (variant === 'horizontal') {
    return (
      <Link href={`/${article.slug}`} className="news-card news-card--horizontal" style={{ textDecoration: 'none' }}>
        <div className="news-card__image-wrap" style={{ width: 120, height: 90, flexShrink: 0, position: 'relative', borderRadius: 0 }}>
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="120px"
            style={{ objectFit: 'cover' }}
            priority={priority}
          />
        </div>
        <div className="news-card__body" style={{ padding: '10px 12px' }}>
          <div className="news-card__meta">
            <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{article.categoryName}</span>
            <span className="news-card__meta-dot" />
            <span>{formattedDate}</span>
          </div>
          <h3 className="news-card__title" style={{ fontSize: '13.5px', WebkitLineClamp: 2 }}>{article.title}</h3>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link href={`/${article.slug}`} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: '1px solid var(--color-gray-100)', textDecoration: 'none' }}>
        <div style={{ position: 'relative', width: 72, height: 54, flexShrink: 0, borderRadius: 4, overflow: 'hidden' }}>
          <Image src={article.image} alt={article.title} fill sizes="72px" style={{ objectFit: 'cover' }} />
        </div>
        <div>
          <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-gray-800)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{article.title}</p>
          <p style={{ fontSize: '11px', color: 'var(--color-gray-500)', marginTop: 4, fontFamily: 'var(--font-condensed)' }}>{formattedDate}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/${article.slug}`} className={`news-card${variant === 'large' ? ' news-card--large' : ''}`} style={{ textDecoration: 'none' }}>
      <div className="news-card__image-wrap" style={{ position: 'relative' }}>
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes={variant === 'large' ? '(max-width: 768px) 100vw, 600px' : '(max-width: 768px) 100vw, 400px'}
          style={{ objectFit: 'cover' }}
          priority={priority}
        />
        <span className="news-card__category-badge">{article.categoryName}</span>
      </div>
      <div className="news-card__body">
        <div className="news-card__meta">
          <span>{formattedDate}</span>
          <span className="news-card__meta-dot" />
          <span>{article.readTime}</span>
        </div>
        <h2 className="news-card__title">{article.title}</h2>
        {variant !== 'large' && (
          <p className="news-card__excerpt">{article.excerpt}</p>
        )}
        {variant === 'large' && (
          <p className="news-card__excerpt" style={{ WebkitLineClamp: 3 }}>{article.excerpt}</p>
        )}
      </div>
    </Link>
  );
}
