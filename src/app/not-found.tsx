import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        <div style={{ fontSize: 72, marginBottom: 16, color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>404</div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, color: 'var(--color-gray-900)', marginBottom: 12 }}>
          Page Not Found
        </h1>
        <p style={{ color: 'var(--color-gray-500)', fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>
          The article or page you&apos;re looking for has been moved, deleted, or never existed. Head back to the homepage for the latest travel news.
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            background: 'var(--color-primary)',
            color: 'white',
            padding: '12px 28px',
            borderRadius: 4,
            fontFamily: 'var(--font-condensed)',
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'background 0.2s',
          }}
        >
          ← Back to Travel Daily Post
        </Link>
      </div>
    </div>
  );
}
