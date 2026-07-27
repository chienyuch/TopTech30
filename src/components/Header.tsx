import React from 'react';
import { NewsPeriod, TechSource } from '../types';
import { Flame, RefreshCw, Sparkles, Globe, Calendar, TrendingUp } from 'lucide-react';
import { SOURCE_CONFIG } from './SourceBadges';

interface HeaderProps {
  activePeriod: NewsPeriod;
  onPeriodChange: (period: NewsPeriod) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  totalArticlesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activePeriod,
  onPeriodChange,
  onRefresh,
  isRefreshing,
  totalArticlesCount
}) => {
  const sources: TechSource[] = ['TechCrunch', 'The Verge', 'Wired', 'Ars Technica', 'Engadget'];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-purple-900/40 border-b border-indigo-800/30 px-4 py-1.5 text-xs text-indigo-200 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
          <span className="inline-flex items-center gap-1 bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-medium text-[11px] border border-indigo-500/30">
            <Globe className="w-3 h-3 text-indigo-400" /> 美國5大科技媒體
          </span>
          <span className="hidden sm:inline text-slate-300 truncate">
            即時整合 TechCrunch、The Verge、Wired、Ars Technica、Engadget 熱門新聞與 AI 繁中導讀
          </span>
          <span className="ml-auto text-slate-400 text-[11px]">
            目前展示：<strong className="text-amber-400 font-semibold">{totalArticlesCount}</strong> 則精選新聞
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo & Main Title */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 rounded-xl shadow-lg shadow-orange-500/20 ring-1 ring-white/20">
              <Flame className="w-7 h-7 text-white fill-white/20" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent tracking-tight">
                  美國科技新聞熱榜 <span className="text-amber-400 font-extrabold font-mono">TOP 30</span>
                </h1>
                <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-[11px] font-bold rounded-full border border-red-500/30 flex items-center gap-1 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  繁體中文版
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 hidden sm:block">
                每日、每週、每月三大熱門排行 × AI 30秒核心快速導讀
              </p>
            </div>
          </div>

          {/* Period Selection Switcher */}
          <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 shadow-inner">
            <button
              onClick={() => onPeriodChange('daily')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activePeriod === 'daily'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-orange-500/20 ring-1 ring-amber-400/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>每日熱門</span>
              <span className={`px-1.5 py-0.2 rounded text-[10px] ${activePeriod === 'daily' ? 'bg-black/30 text-amber-100' : 'bg-slate-800 text-slate-400'}`}>
                TOP 30
              </span>
            </button>

            <button
              onClick={() => onPeriodChange('weekly')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activePeriod === 'weekly'
                  ? 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-md shadow-indigo-500/20 ring-1 ring-indigo-400/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>每週熱門</span>
              <span className={`px-1.5 py-0.2 rounded text-[10px] ${activePeriod === 'weekly' ? 'bg-black/30 text-indigo-100' : 'bg-slate-800 text-slate-400'}`}>
                TOP 30
              </span>
            </button>

            <button
              onClick={() => onPeriodChange('monthly')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activePeriod === 'monthly'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md shadow-purple-500/20 ring-1 ring-purple-400/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>每月熱門</span>
              <span className={`px-1.5 py-0.2 rounded text-[10px] ${activePeriod === 'monthly' ? 'bg-black/30 text-purple-100' : 'bg-slate-800 text-slate-400'}`}>
                TOP 30
              </span>
            </button>
          </div>

          {/* AI Refresh Button */}
          <div>
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 hover:from-teal-500 hover:to-green-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-900/30 border border-emerald-400/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
            >
              {isRefreshing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-teal-200" />
                  <span>Gemini 掃描更新中...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>AI 掃描最新頭條</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* 5 Major Outlets Live Indicators bar */}
        <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 text-xs text-slate-400 whitespace-nowrap">
            <span className="font-semibold text-slate-300 text-[11px] uppercase tracking-wider">整合 5 大源頭：</span>
            {sources.map((s) => {
              const cfg = SOURCE_CONFIG[s];
              return (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[11px]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className={cfg.color}>{s}</span>
                </span>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-400">
            <span className="px-2 py-0.5 bg-slate-800/80 rounded text-slate-300">全自動繁簡轉換</span>
            <span className="px-2 py-0.5 bg-slate-800/80 rounded text-slate-300">Google Grounded AI 驗證</span>
          </div>
        </div>

      </div>
    </header>
  );
};
