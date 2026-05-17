'use client';

import { useState } from 'react';
import { Article } from '@/lib/types';
import NewsCard from './NewsCard';

interface CategoryArticlesListProps {
  articles: Article[];
}

export default function CategoryArticlesList({ articles }: CategoryArticlesListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(articles.length / itemsPerPage);
  
  // Get articles for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticles = articles.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of category section
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  if (articles.length === 0) return null;

  return (
    <div>
      <div className="news-grid-main news-grid-3">
        {paginatedArticles.map((article, idx) => (
          <NewsCard key={article.id} article={article} priority={currentPage === 1 && idx < 3} />
        ))}
      </div>

      {totalPages > 1 && (
        <nav 
          aria-label="Pagination Navigation" 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: 8, 
            marginTop: 40,
            fontFamily: 'var(--font-condensed)'
          }}
        >
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: '8px 16px',
              borderRadius: 4,
              border: '1px solid #ddd',
              background: currentPage === 1 ? '#f5f5f5' : 'white',
              color: currentPage === 1 ? '#999' : '#1a1a2e',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              fontWeight: 600,
              fontSize: 14,
              transition: 'all 0.2s',
            }}
          >
            ← Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            const isActive = page === currentPage;
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 4,
                  border: '1px solid',
                  borderColor: isActive ? 'var(--color-primary)' : '#ddd',
                  background: isActive ? 'var(--color-primary)' : 'white',
                  color: isActive ? 'white' : '#1a1a2e',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: 14,
                  transition: 'all 0.2s',
                }}
              >
                {page}
              </button>
            );
          })}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: '8px 16px',
              borderRadius: 4,
              border: '1px solid #ddd',
              background: currentPage === totalPages ? '#f5f5f5' : 'white',
              color: currentPage === totalPages ? '#999' : '#1a1a2e',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              fontWeight: 600,
              fontSize: 14,
              transition: 'all 0.2s',
            }}
          >
            Next →
          </button>
        </nav>
      )}
    </div>
  );
}
