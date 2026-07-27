import { INITIAL_NEWS, DAILY_INSIGHTS } from "../src/data/initialNews";
import type { NewsArticle, NewsPeriod, TechSource } from "../src/types";

export { DAILY_INSIGHTS };
export type { NewsArticle, NewsPeriod, TechSource };

const SOURCES: TechSource[] = ["TechCrunch", "The Verge", "Wired", "Ars Technica", "Engadget"];
const CATEGORIES = ["AI", "Hardware", "Software", "Business", "Security"] as const;

export function getDynamicFormattedDate(hoursAgo = 0): string {
  const date = new Date(Date.now() - hoursAgo * 60 * 60 * 1000);
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function seededNews(): NewsArticle[] {
  return INITIAL_NEWS.map((article, index) => {
    const hoursAgo = article.period === "weekly" ? 12 * (index + 1)
      : article.period === "monthly" ? 36 * (index + 1)
      : 0.25 * (index + 1);
    return { ...article, publishDate: getDynamicFormattedDate(hoursAgo) };
  });
}

export function fallbackNews(period: NewsPeriod): NewsArticle[] {
  return seededNews()
    .filter((article) => article.period === period)
    .map((article) => ({
      ...article,
      publishDate: getDynamicFormattedDate(0.15 * article.rank),
      views: article.views + Math.floor(Math.random() * 320 + 80),
      likes: article.likes + Math.floor(Math.random() * 85 + 15),
      hotScore: Math.min(99.9, Number((article.hotScore + (Math.random() * 0.2 - 0.1)).toFixed(1))),
    }));
}

export function asPeriod(value: unknown): NewsPeriod {
  return value === "weekly" || value === "monthly" ? value : "daily";
}

export function asGeneratedNews(raw: unknown, period: NewsPeriod): NewsArticle[] {
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, 10).map((item: Record<string, unknown>, index) => ({
    id: `gen-${period}-${Date.now()}-${index}`,
    rank: index + 1,
    period,
    titleZh: String(item.titleZh || item.title || "科技新聞頭條"),
    titleEn: String(item.titleEn || "US Tech News Headline"),
    source: SOURCES.includes(item.source as TechSource) ? item.source as TechSource : "TechCrunch",
    sourceUrl: String(item.sourceUrl || "https://techcrunch.com"),
    category: CATEGORIES.includes(item.category as typeof CATEGORIES[number])
      ? item.category as NewsArticle["category"] : "AI",
    publishDate: String(item.publishDate || getDynamicFormattedDate(index * 0.15)),
    hotScore: Number(item.hotScore) || Number((99.5 - index * 0.5).toFixed(1)),
    summaryZh: String(item.summaryZh || item.summary || "精選美國科技頭條，提供即時洞察。"),
    keyTakeaways: Array.isArray(item.keyTakeaways)
      ? item.keyTakeaways.map(String).slice(0, 4)
      : ["聚焦最新科技趨勢", "產業生態變革", "關鍵指標領先"],
    industryImpact: String(item.industryImpact || "對全球科技生態系產生深遠影響。"),
    readTime: String(item.readTime || "4 分鐘"),
    views: Math.floor(10_000 + Math.random() * 5_000),
    likes: Math.floor(2_000 + Math.random() * 1_000),
  }));
}

export function parseJsonArray(text: string): unknown[] {
  try {
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) return [];
    try { return JSON.parse(match[0]); } catch { return []; }
  }
}

export function methodNotAllowed(res: { setHeader: Function; status: Function; json: Function }, allowed: string) {
  res.setHeader("Allow", allowed);
  return res.status(405).json({ success: false, error: "Method not allowed" });
}
