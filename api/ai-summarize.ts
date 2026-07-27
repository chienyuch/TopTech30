import type { VercelRequest, VercelResponse } from "@vercel/node";
import { geminiClient, methodNotAllowed } from "../lib/news";

const fallback = (summaryZh?: string) => ({
  executiveSummary: summaryZh || "此文章探討了最新科技突破對全球產業結構的重塑。",
  keyTakeaways: ["聚焦核心技術突破", "評估市場與商業模式影響", "關注未來 6 到 12 個月的落地進程"],
  industryAnalysis: "相關技術提高競爭門檻，並可能加速企業導入與資金投入。",
  techTerms: [
    { term: "AGI", explanation: "具備跨領域理解與問題解決能力的人工智慧系統。" },
    { term: "NPU", explanation: "針對神經網路推論與深度學習運算設計的處理器。" },
  ],
  actionableTakeaway: "建議持續關注技術成熟度與企業導入策略。",
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return methodNotAllowed(res, "POST");
  const { titleZh = "", titleEn = "", source = "", summaryZh = "" } = req.body || {};
  const ai = geminiClient();
  if (!ai) return res.status(200).json({ success: true, deepSummary: fallback(summaryZh) });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `請針對 ${source} 的科技新聞進行繁體中文導讀。中文標題：${titleZh}\n英文標題：${titleEn}\n摘要：${summaryZh}\n只輸出 JSON 物件，欄位為 executiveSummary、keyTakeaways、industryAnalysis、techTerms、actionableTakeaway。`,
      config: { responseMimeType: "application/json" },
    });
    const summary = JSON.parse(response.text || "{}");
    return res.status(200).json({ success: true, deepSummary: summary });
  } catch (error) {
    console.warn("Gemini summary failed; serving fallback", error);
    return res.status(200).json({ success: true, deepSummary: fallback(summaryZh) });
  }
}
