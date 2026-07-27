import type { VercelRequest, VercelResponse } from "@vercel/node";
import { DAILY_INSIGHTS, methodNotAllowed } from "../lib/news";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") return methodNotAllowed(res, "GET");
  return res.status(200).json({ success: true, insights: DAILY_INSIGHTS });
}
