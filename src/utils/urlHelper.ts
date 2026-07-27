import { NewsArticle, TechSource } from '../types';

export const MEDIA_HOMEPAGES: Record<TechSource, string> = {
  'TechCrunch': 'https://techcrunch.com',
  'The Verge': 'https://www.theverge.com',
  'Wired': 'https://www.wired.com',
  'Ars Technica': 'https://arstechnica.com',
  'Engadget': 'https://www.engadget.com'
};

export function getArticleSearchUrl(article: NewsArticle): string {
  // Google Search query targeting the exact title and media source
  const query = `site:${getDomainOnly(article.source)} ${article.titleEn}`;
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

export function getMediaHomepage(source: TechSource): string {
  return MEDIA_HOMEPAGES[source] || 'https://techcrunch.com';
}

function getDomainOnly(source: TechSource): string {
  switch (source) {
    case 'TechCrunch':
      return 'techcrunch.com';
    case 'The Verge':
      return 'theverge.com';
    case 'Wired':
      return 'wired.com';
    case 'Ars Technica':
      return 'arstechnica.com';
    case 'Engadget':
      return 'engadget.com';
    default:
      return 'techcrunch.com';
  }
}

export function getBestArticleUrl(article: NewsArticle): string {
  // If the sourceUrl is a specific real URL from a live refresh, use it.
  // Otherwise, use site Google Search which reliably lands on the exact article on that media site.
  if (
    article.sourceUrl &&
    article.sourceUrl.startsWith('http') &&
    !article.sourceUrl.includes('article-daily') &&
    !article.sourceUrl.includes('article-weekly') &&
    !article.sourceUrl.includes('article-monthly') &&
    !article.sourceUrl.includes('-announcement') &&
    !article.sourceUrl.includes('-launch') &&
    !article.sourceUrl.includes('-folding') &&
    !article.sourceUrl.includes('-model')
  ) {
    return article.sourceUrl;
  }
  return getArticleSearchUrl(article);
}
