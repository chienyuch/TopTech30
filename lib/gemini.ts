import { GoogleGenAI } from "@google/genai";

/**
 * Creates the Gemini client only in Functions that actually call Gemini.
 * Keeping this separate prevents a Gemini SDK load failure from affecting
 * the static news and insights endpoints.
 */
export function geminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  return apiKey ? new GoogleGenAI({ apiKey }) : null;
}
