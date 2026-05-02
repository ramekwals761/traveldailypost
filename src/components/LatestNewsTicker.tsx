import Link from 'next/link';
import { Article } from '@/lib/types';

interface LatestNewsTickerProps {
  articles: Article[];
}

export default function LatestNewsTicker({ articles }: LatestNewsTickerProps) {
  const doubled = [...articles, ...articles];

  return (
    <div className="latest-ticker" aria-label="Latest news headlines">
      <div style={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ flexShrink: 0, fontFamily: 'var(--font-condensed)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-primary)', padding: '0 16px 0 4px', borderRight: '2px solid var(--color-primary)', marginRight: '0', whiteSpace: 'nowrap' }}>
          Latest
        </div>
        <div style={{ overflow: 'hidden', flex: 1, maskImage: 'linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)' }}>
          <div className="latest-ticker-inner">
            {doubled.map((article, idx) => (
              <Link key={`${article.id}-${idx}`} href={`/${article.slug}`} className="latest-ticker-item" style={{ textDecoration: 'none' }}>
                <span className="latest-ticker-sep" aria-hidden="true" />
                {article.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
