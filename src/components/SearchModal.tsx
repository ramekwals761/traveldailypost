'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryName: string;
  image: string;
  date: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch articles once
  useEffect(() => {
    if (isOpen && allArticles.length === 0) {
      setIsLoading(true);
      fetch('/api/articles')
        .then((r) => r.json())
        .then((data) => {
          setAllArticles(data);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  }, [isOpen, allArticles.length]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Escape key closes the modal
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    if (!value.trim()) {
      setResults([]);
      return;
    }
    const q = value.toLowerCase();
    const filtered = allArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.categoryName.toLowerCase().includes(q)
    );
    setResults(filtered.slice(0, 8));
  }, [allArticles]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 9998,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          animation: 'fadeIn 0.15s ease',
        }}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search articles"
        style={{
          position: 'fixed', top: '10%', left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          width: '100%', maxWidth: 640,
          background: 'white',
          borderRadius: 12,
          boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
          overflow: 'hidden',
          animation: 'slideDown 0.2s ease',
        }}
      >
        {/* Search input row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '16px 20px',
          borderBottom: '1px solid #eee',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#CC0000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search articles, categories…"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            style={{
              flex: 1, border: 'none', outline: 'none',
              fontSize: 17, fontFamily: 'var(--font-body)',
              color: '#1a1a2e', background: 'transparent',
            }}
          />
          {query && (
            <button
              onClick={() => handleSearch('')}
              aria-label="Clear search"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', fontSize: 18, lineHeight: 1 }}
            >
              ✕
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close search"
            style={{
              background: '#f5f5f5', border: 'none', cursor: 'pointer',
              padding: '5px 10px', borderRadius: 6, fontSize: 12,
              color: '#666', fontFamily: 'var(--font-condensed)', fontWeight: 700,
              letterSpacing: '0.05em',
            }}
          >
            ESC
          </button>
        </div>

        {/* Results */}
        <div style={{ maxHeight: 460, overflowY: 'auto' }}>
          {isLoading && (
            <div style={{ padding: '32px', textAlign: 'center', color: '#999', fontSize: 14 }}>
              Loading articles…
            </div>
          )}

          {!isLoading && !query && (
            <div style={{ padding: '28px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>🔍</div>
              <p style={{ color: '#888', fontSize: 14 }}>Start typing to search Travel Daily Post…</p>
            </div>
          )}

          {!isLoading && query && results.length === 0 && (
            <div style={{ padding: '28px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>😔</div>
              <p style={{ color: '#888', fontSize: 14 }}>No articles found for <strong>&ldquo;{query}&rdquo;</strong></p>
            </div>
          )}

          {results.length > 0 && (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {results.map((article, idx) => (
                <li key={article.id} style={{ borderBottom: idx < results.length - 1 ? '1px solid #f3f3f3' : 'none' }}>
                  <Link
                    href={`/${article.slug}`}
                    onClick={onClose}
                    style={{ display: 'flex', gap: 14, padding: '14px 20px', textDecoration: 'none', transition: 'background 0.15s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#fafafa')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ width: 72, height: 52, borderRadius: 6, overflow: 'hidden', flexShrink: 0, position: 'relative', background: '#eee' }}>
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="72px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{
                        display: 'inline-block', fontSize: 10, fontWeight: 700,
                        letterSpacing: '0.08em', textTransform: 'uppercase',
                        color: 'var(--color-primary)', marginBottom: 4,
                        fontFamily: 'var(--font-condensed)',
                      }}>
                        {article.categoryName}
                      </span>
                      <p style={{
                        fontSize: 14, fontWeight: 700, color: '#1a1a2e',
                        lineHeight: 1.3, marginBottom: 4,
                        display: '-webkit-box', WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical', overflow: 'hidden',
                      }}>
                        {article.title}
                      </p>
                      <span style={{ fontSize: 12, color: '#999' }}>
                        {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {results.length > 0 && (
          <div style={{
            padding: '10px 20px', borderTop: '1px solid #f0f0f0',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: '#fafafa',
          }}>
            <span style={{ fontSize: 12, color: '#999' }}>
              {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
            </span>
            <span style={{ fontSize: 11, color: '#bbb', fontFamily: 'var(--font-condensed)' }}>
              ↵ to open · ESC to close
            </span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideDown { from { opacity: 0; transform: translateX(-50%) translateY(-16px) } to { opacity: 1; transform: translateX(-50%) translateY(0) } }
      `}</style>
    </>
  );
}
