import React, { useState } from 'react';
import { DailyInsight } from '../types';
import { Sparkles, ChevronDown, ChevronUp, Zap, ShieldAlert, Cpu } from 'lucide-react';
import { SourceBadge } from './SourceBadges';

interface DailyInsightBannerProps {
  insights: DailyInsight[];
}

export const DailyInsightBanner: React.FC<DailyInsightBannerProps> = ({ insights }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!insights || insights.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-indigo-500/20 rounded-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden my-6">
      {/* Background Subtle Accent Effect */}
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between gap-4 border-b border-indigo-500/20 pb-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-300 ring-1 ring-indigo-500/30">
            <Sparkles className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                AI 美國5大科技媒體交集趨勢洞察
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                跨站核心交集
              </span>
            </div>
            <p className="text-xs text-slate-400">
              綜合 TechCrunch、The Verge、Wired、Ars Technica、Engadget 熱門新聞之巨集趨勢
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-xs text-indigo-300 hover:text-white bg-indigo-950/60 hover:bg-indigo-900/60 px-3 py-1.5 rounded-lg border border-indigo-500/30 transition-all"
        >
          <span>{isExpanded ? '收合簡報' : '展開簡報'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {insights.map((item, idx) => (
            <div
              key={item.id || idx}
              className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-indigo-400 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-400" /> #{idx + 1} {item.topic}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-medium border ${
                      item.impactLevel === '極高'
                        ? 'bg-red-500/20 text-red-300 border-red-500/30'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    影響力: {item.impactLevel}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-100 leading-snug mb-2 hover:text-indigo-300 transition-colors">
                  {item.titleZh}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-3">
                  {item.descriptionZh}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 mt-2">
                <div className="text-[11px] text-amber-300 font-medium bg-amber-950/40 p-2 rounded border border-amber-900/30 mb-2">
                  💡 關鍵結論：{item.keyTakeaway}
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-slate-500 font-medium">涵蓋媒體：</span>
                  {item.sources.map((src) => (
                    <SourceBadge key={src} source={src} size="sm" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
