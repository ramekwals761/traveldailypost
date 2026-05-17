# 🚧 Search Engine Indexing — Development Block

> **Status:** ACTIVE — Search engines are currently **blocked** from indexing this site.  
> **Date Applied:** 2026-05-17  
> **Commit:** `ec83dcb`  
> **Reason:** Site is under active development and not ready for public indexing.

---

## What Was Changed

Three files were modified to implement a full 3-layer indexing block:

---

### 1. `src/app/robots.ts`

Controls the `/robots.txt` file served to crawlers.

**Current (DEV — blocks all crawlers):**
```ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // 🚧 Site is under development — block ALL crawlers
        userAgent: '*',
        disallow: '/',
      },
    ],
    // Sitemap hidden during development to prevent discovery
  };
}
```

**Revert to (PRODUCTION):**
```ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'Googlebot-News',
        allow: '/',
      },
    ],
    sitemap: 'https://traveldailypost.com/sitemap.xml',
  };
}
```

---

### 2. `src/app/layout.tsx`

Controls the `<meta name="robots">` tag and `X-Robots-Tag` hints in the Next.js metadata export.

**Current (DEV — noindex/nofollow):**
```ts
robots: {
  // 🚧 Development mode — block all indexing
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
  },
},
```

**Revert to (PRODUCTION):**
```ts
robots: {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
},
```

Also revert this meta tag in the `<head>` block:

**Current (DEV):**
```tsx
{/* 🚧 Development: googlebot-news indexing disabled */}
<meta name="googlebot-news" content="noindex" />
```

**Revert to (PRODUCTION):**
```tsx
<meta name="googlebot-news" content="index, follow" />
```

---

### 3. `next.config.js`

Sets an HTTP-level `X-Robots-Tag` response header on every request — the strongest crawl signal.

**Current (DEV — adds noindex header to all responses):**
```js
// 🚧 DEVELOPMENT MODE — Block all search engine indexing via HTTP headers
// Remove this block when the site is ready to go live
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Robots-Tag',
          value: 'noindex, nofollow, noarchive, nosnippet',
        },
      ],
    },
  ];
},
```

**Revert to (PRODUCTION):** Remove the entire `headers()` block above from `next.config.js`.

---

## Go-Live Checklist

When the site is ready for production, complete **all three** steps below:

- [ ] **`src/app/robots.ts`** — Restore `allow: '/'` rules and uncomment the sitemap URL
- [ ] **`src/app/layout.tsx`** — Set `index: true, follow: true` in robots metadata + restore `googlebot-news` meta to `index, follow`
- [ ] **`next.config.js`** — Remove the `headers()` block entirely
- [ ] Commit with message: `feat: enable search engine indexing for production`
- [ ] Submit sitemap `https://traveldailypost.com/sitemap.xml` to [Google Search Console](https://search.google.com/search-console) and [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [ ] Verify `robots.txt` at `https://traveldailypost.com/robots.txt` shows `Allow: /`
- [ ] Use [Google Rich Results Test](https://search.google.com/test/rich-results) to confirm pages are indexable

---

## Why 3 Layers?

| Layer | File | Mechanism | Why It Matters |
|---|---|---|---|
| 1 | `robots.ts` | `robots.txt` — `Disallow: /` | First line of defence; well-behaved bots respect this |
| 2 | `layout.tsx` | `<meta name="robots" content="noindex">` | Catches bots that visit despite robots.txt |
| 3 | `next.config.js` | HTTP `X-Robots-Tag` header | Strongest signal; works even for bots ignoring HTML |
