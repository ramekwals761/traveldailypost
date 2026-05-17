import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

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
