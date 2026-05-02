'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/types';

interface RegionalNewsProps {
  articlesByRegion: Record<string, Article[]>;
}

const REGIONS = ['Europe', 'Americas', 'Middle East', 'Asia', 'Africa'];

export default function RegionalNews({ articlesByRegion }: RegionalNewsProps) {
  const [activeTab, setActiveTab] = useState('Europe');
  const currentArticles = articlesByRegion[activeTab] || [];

  return (
    <section className="home-section" aria-labelledby="regional-news-heading">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" id="regional-news-heading">Regional News</h2>
        </div>

        {/* Tabs */}
        <div className="regional-tabs" role="tablist" aria-label="News by region">
          {REGIONS.map((region) => (
            <button
              key={region}
              role="tab"
              aria-selected={activeTab === region}
              aria-controls={`region-panel-${region}`}
              className={`regional-tab${activeTab === region ? ' active' : ''}`}
              onClick={() => setActiveTab(region)}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Content */}
        <div
          role="tabpanel"
          id={`region-panel-${activeTab}`}
          aria-label={`${activeTab} news`}
        >
          {currentArticles.length > 0 ? (
            <div className="news-grid-main news-grid-3">
              {currentArticles.slice(0, 3).map((article) => (
                <Link key={article.id} href={`/${article.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="news-card">
                    <div className="news-card__image-wrap" style={{ position: 'relative' }}>
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        style={{ objectFit: 'cover' }}
                      />
                      <span className="news-card__category-badge">{article.categoryName}</span>
                    </div>
                    <div className="news-card__body">
                      <div className="news-card__meta">
                        <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span className="news-card__meta-dot" />
                        <span>{article.readTime}</span>
                      </div>
                      <h3 className="news-card__title">{article.title}</h3>
                      <p className="news-card__excerpt">{article.excerpt}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--color-gray-500)', textAlign: 'center', padding: '40px 0', fontFamily: 'var(--font-condensed)' }}>
              Regional news coming soon. Stay tuned!
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
