import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/types';

interface HeroSectionProps {
  featured: Article | undefined;
  secondary: Article[];
}

export default function HeroSection({ featured, secondary }: HeroSectionProps) {
  if (!featured) {
    return (
      <section className="hero-section" aria-label="Featured news">
        <div className="hero-grid">
          <div className="hero-card hero-main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f0f0', minHeight: '400px' }}>
            <p style={{ color: '#666', fontSize: '16px' }}>No articles available yet. Check back soon!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero-section" aria-label="Featured news">
      <div className="hero-grid">
        {/* Main featured article */}
        <Link href={`/${featured.slug}`} className="hero-card hero-main" style={{ display: 'block' }}>
          <Image
            src={featured.image}
            alt={featured.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 70vw"
            className="hero-card__image"
            style={{ objectFit: 'cover' }}
          />
          <div className="hero-card__overlay" aria-hidden="true" />
          <div className="hero-card__content">
            <span className="hero-card__badge">{featured.categoryName}</span>
            <h1 className="hero-card__title" style={{ fontSize: 'clamp(20px, 2.5vw, 30px)' }}>
              {featured.title}
            </h1>
            <div className="hero-card__meta">
              <span>{featured.author}</span>
              <span>·</span>
              <span>{new Date(featured.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              <span>·</span>
              <span>{featured.readTime}</span>
            </div>
          </div>
        </Link>

        {/* Side stories */}
        <div className="hero-side">
          {secondary.slice(0, 2).map((article) => (
            <Link key={article.id} href={`/${article.slug}`} className="hero-card" style={{ display: 'block', position: 'relative' }}>
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 50vw, 340px"
                className="hero-card__image"
                style={{ objectFit: 'cover' }}
              />
              <div className="hero-card__overlay" aria-hidden="true" />
              <div className="hero-card__content">
                <span className="hero-card__badge">{article.categoryName}</span>
                <h2 className="hero-card__title">{article.title}</h2>
                <div className="hero-card__meta">
                  <span>{article.author}</span>
                  <span>·</span>
                  <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
