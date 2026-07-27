import type { VercelRequest, VercelResponse } from "@vercel/node";
import { asPeriod, methodNotAllowed, seededNews } from "../lib/news";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") return methodNotAllowed(res, "GET");

  const period = asPeriod(req.query.period);
  const source = String(req.query.source || "all");
  const category = String(req.query.category || "all");
  const query = String(req.query.query || "").trim().toLowerCase();
  let articles = seededNews().filter((article) => article.period === period);

  if (source !== "all") articles = articles.filter((article) => article.source === source);
  if (category !== "all") articles = articles.filter((article) => article.category === category);
  if (query) {
    articles = articles.filter((article) =>
      [article.titleZh, article.titleEn, article.summaryZh, article.source]
        .some((value) => value.toLowerCase().includes(query)),
    );
  }
  articles.sort((a, b) => a.rank - b.rank);
  return res.status(200).json({ success: true, period, totalCount: articles.length, articles });
}
