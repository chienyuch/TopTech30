import React, { useState, useEffect } from 'react';
import { NewsArticle } from '../types';
import { SourceBadge } from './SourceBadges';
import { getBestArticleUrl, getMediaHomepage } from '../utils/urlHelper';
import {
  X,
  Sparkles,
  ExternalLink,
  Volume2,
  VolumeX,
  Bookmark,
  Share2,
  BookOpen,
  TrendingUp,
  Cpu,
  CheckCircle2,
  Clock,
  Flame,
  Loader2,
  Globe
} from 'lucide-react';

interface ArticleModalProps {
  article: NewsArticle | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [deepAnalysis, setDeepAnalysis] = useState<any>(null);
  const [isLoadingDeep, setIsLoadingDeep] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speechUtterance, setSpeechUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (article) {
      // Trigger AI deep analysis call
      fetchDeepAnalysis(article);
    } else {
      stopAudio();
      setDeepAnalysis(null);
    }
  }, [article]);

  const fetchDeepAnalysis = async (item: NewsArticle) => {
    setIsLoadingDeep(true);
    try {
      const res = await fetch('/api/ai-summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titleZh: item.titleZh,
          titleEn: item.titleEn,
          source: item.source,
          summaryZh: item.summaryZh,
        }),
      });
      const data = await res.json();
      if (data.success && data.deepSummary) {
        setDeepAnalysis(data.deepSummary);
      }
    } catch (err) {
      console.error('Error fetching deep summary:', err);
    } finally {
      setIsLoadingDeep(false);
    }
  };

  const toggleSpeech = () => {
    if (!article) return;

    if (isPlayingAudio) {
      stopAudio();
    } else {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();

        const textToRead = `${article.titleZh}。來自 ${article.source} 的導讀。${
          deepAnalysis?.executiveSummary || article.summaryZh
        }`;

        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = 'zh-TW';
        utterance.rate = 1.0;

        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);

        setSpeechUtterance(utterance);
        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
      } else {
        alert('您的瀏覽器暫不支援語音朗讀功能');
      }
    }
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
  };

  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative text-slate-100 my-auto">
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 p-4 sm:p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white font-mono font-bold text-xs">
              #{article.rank} 熱門榜
            </span>
            <SourceBadge source={article.source} size="md" />
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              {article.publishDate}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Speech Button */}
            <button
              onClick={toggleSpeech}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isPlayingAudio
                  ? 'bg-red-500/20 text-red-300 border-red-500/40 animate-pulse'
                  : 'bg-indigo-950/80 text-indigo-300 border-indigo-800 hover:bg-indigo-900'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4 text-red-400" />
                  <span>停止朗讀</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-indigo-400" />
                  <span>語音朗讀</span>
                </>
              )}
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 rounded-lg border transition-all ${
                isBookmarked
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>

            {/* Close modal */}
            <button
              onClick={() => {
                stopAudio();
                onClose();
              }}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 space-y-6">
          
          {/* Main Title Section */}
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-mono mb-2">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500/20" />
              <span>熱度指數：{article.hotScore}</span>
              <span>•</span>
              <span className="text-slate-400">閱讀時間約 {article.readTime}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight mb-2">
              {article.titleZh}
            </h2>

            <p className="text-sm font-mono text-slate-400 border-l-2 border-slate-700 pl-3 py-0.5">
              Original: {article.titleEn}
            </p>
          </div>

          {/* AI Executive Summary Block */}
          <div className="bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 p-5 rounded-2xl border border-indigo-500/30 shadow-lg">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-indigo-500/20 rounded-lg text-indigo-300">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                </div>
                <h3 className="text-base font-bold text-white tracking-wide">
                  AI 30 秒高階決策速讀
                </h3>
              </div>
              {isLoadingDeep && (
                <span className="flex items-center gap-1.5 text-xs text-indigo-300">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Gemini 深層分析中...
                </span>
              )}
            </div>

            <p className="text-sm text-slate-200 leading-relaxed">
              {deepAnalysis?.executiveSummary || article.summaryZh}
            </p>

            {deepAnalysis?.actionableTakeaway && (
              <div className="mt-3 pt-3 border-t border-indigo-500/20 text-xs text-amber-300 font-medium">
                🎯 關鍵行動建議：{deepAnalysis.actionableTakeaway}
              </div>
            )}
          </div>

          {/* Key Takeaways Points */}
          <div>
            <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              核心看點與要點總結 (Key Takeaways)
            </h3>

            <div className="grid grid-cols-1 gap-2.5">
              {(deepAnalysis?.keyTakeaways || article.keyTakeaways || []).map((point: string, idx: number) => (
                <div
                  key={idx}
                  className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Industry Impact Analysis */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
            <h3 className="text-sm font-bold text-indigo-300 mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              產業影響力與市場走向分析
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {deepAnalysis?.industryAnalysis || article.industryImpact}
            </p>
          </div>

          {/* Tech Terms Glossary */}
          {(deepAnalysis?.techTerms || article.techTerms) && (
            <div>
              <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-400" />
                關鍵科技名詞白話對照
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(deepAnalysis?.techTerms || article.techTerms).map((term: any, idx: number) => (
                  <div key={idx} className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                    <span className="text-xs font-bold text-purple-300 font-mono block mb-1">
                      {term.term}
                    </span>
                    <span className="text-xs text-slate-400 leading-normal block">
                      {term.explanation}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Action Bar */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-400">
              出處來源：<strong className="text-slate-200">{article.source}</strong> 官方即時數據
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              <a
                href={getMediaHomepage(article.source)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-4 py-2.5 rounded-xl font-medium text-xs border border-slate-700 transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>{article.source} 官網</span>
              </a>

              <a
                href={getBestArticleUrl(article)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-emerald-900/30 transition-all hover:scale-[1.02]"
              >
                <span>前往 {article.source} 原文報導</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
