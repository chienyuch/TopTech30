import type { VercelRequest, VercelResponse } from "@vercel/node";
import { asGeneratedNews, asPeriod, fallbackNews, geminiClient, getDynamicFormattedDate, methodNotAllowed, parseJsonArray } from "../lib/news";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return methodNotAllowed(res, "POST");
  const period = asPeriod(req.body?.period);
  const now = getDynamicFormattedDate();
  const ai = geminiClient();

  if (!ai) {
    return res.status(200).json({
      success: true, refreshed: true, period, lastRefreshed: now,
      message: `已於 ${now} 更新展示資料。設定 GEMINI_API_KEY 後可啟用即時 AI 掃描。`,
      articles: fallbackNews(period),
    });
  }

  try {
    const periodText = period === "daily" ? "本日" : period === "weekly" ? "本週" : "本月";
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `你是科技新聞總編輯。請使用 Google Search，整理 TechCrunch、The Verge、Wired、Ars Technica、Engadget 在${periodText}截至 ${now} 的前 10 則科技新聞。只輸出 JSON 陣列；每筆需含 titleZh、titleEn、source、sourceUrl、category（AI、Hardware、Software、Business、Security）、publishDate、hotScore、summaryZh、keyTakeaways、industryImpact、readTime。`,
      config: { tools: [{ googleSearch: {} }], responseMimeType: "application/json" },
    });
    const articles = asGeneratedNews(parseJsonArray(response.text || ""), period);
    if (articles.length) {
      return res.status(200).json({ success: true, refreshed: true, period, lastRefreshed: now, message: `已於 ${now} 完成最新頭條掃描。`, articles });
    }
  } catch (error) {
    console.warn("Gemini refresh failed; serving fallback", error);
  }
  return res.status(200).json({
    success: true, refreshed: true, period, lastRefreshed: now,
    message: `已於 ${now} 更新展示資料。`, articles: fallbackNews(period),
  });
}
