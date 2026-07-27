import React from 'react';
import { SOURCE_CONFIG } from './SourceBadges';
import { TechSource } from '../types';
import { Flame, Globe, Shield, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const sources: TechSource[] = ['TechCrunch', 'The Verge', 'Wired', 'Ars Technica', 'Engadget'];

  return (
    <footer className="mt-16 bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg text-white">
                <Flame className="w-5 h-5 fill-white/20" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                TechTop30 科技熱榜
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              整合美國 TechCrunch、The Verge、Wired、Ars Technica、Engadget 5 大權威科技媒體之每日、每週、每月 Top 30 熱門頭條新聞。
            </p>
          </div>

          {/* 5 Media Sites Info */}
          <div className="space-y-2 md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              整合之美國 5 大科技媒體
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {sources.map((s) => {
                const cfg = SOURCE_CONFIG[s];
                return (
                  <div
                    key={s}
                    className="p-2 bg-slate-900 rounded-lg border border-slate-800/80 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                    <div>
                      <span className={`font-semibold block ${cfg.color}`}>{s}</span>
                      <span className="text-[10px] text-slate-500 block">美國頂尖科技報導</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Feature highlights */}
          <div className="space-y-2 md:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              系統核心亮點
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Google Grounded Gemini 翻譯導讀</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                <span>原生繁體中文極速對照與專有名詞解析</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>零延遲 AI 語音朗讀與核心要點摘要</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-slate-500 text-[11px]">
          <p>© 2026 TechTop30 美國五大科技新聞熱榜。內容來源版權均屬原媒體 TechCrunch, The Verge, Wired, Ars Technica, Engadget 所有。</p>
          <div className="flex items-center gap-4">
            <span>每日 24 小時自動維護更新</span>
            <span>•</span>
            <span>繁體中文 (台灣/香港) 最佳化</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
