import React from 'react';
import { NewsArticle } from '../types';
import { SourceBadge } from './SourceBadges';
import { getBestArticleUrl, getMediaHomepage } from '../utils/urlHelper';
import { Flame, Sparkles, ExternalLink, Bookmark, Clock, Eye, ThumbsUp, Tag, Share2, Globe } from 'lucide-react';

interface ArticleCardProps {
  article: NewsArticle;
  onOpenModal: (article: NewsArticle) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
  viewMode?: 'list' | 'grid';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onOpenModal,
  isBookmarked,
  onToggleBookmark,
  viewMode = 'list'
}) => {
  // Rank Badge Styles
  const getRankBadgeStyle = (rank: number) => {
    if (rank === 1) {
      return 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 font-black shadow-lg shadow-amber-500/30 ring-2 ring-amber-300';
    }
    if (rank === 2) {
      return 'bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 text-slate-950 font-bold shadow-md shadow-slate-300/20 ring-1 ring-slate-100';
    }
    if (rank === 3) {
      return 'bg-gradient-to-r from-amber-700 via-orange-700 to-amber-800 text-amber-100 font-bold shadow-md shadow-orange-900/30 ring-1 ring-orange-500/50';
    }
    return 'bg-slate-800 text-slate-300 font-semibold border border-slate-700';
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'AI':
        return 'bg-purple-950/80 text-purple-300 border-purple-800/60';
      case 'Hardware':
        return 'bg-blue-950/80 text-blue-300 border-blue-800/60';
      case 'Software':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60';
      case 'Business':
        return 'bg-amber-950/80 text-amber-300 border-amber-800/60';
      case 'Security':
        return 'bg-red-950/80 text-red-300 border-red-800/60';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: article.titleZh,
        text: `${article.titleZh} - 來自 ${article.source} 的熱門科技新聞`,
        url: article.sourceUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${article.titleZh}\n${article.sourceUrl}`);
      alert('已將新聞標題與連結複製至剪貼簿！');
    }
  };

  if (viewMode === 'grid') {
    return (
      <div
        onClick={() => onOpenModal(article)}
        className="group bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-900/20 flex flex-col justify-between overflow-hidden cursor-pointer relative"
      >
        {/* Top Header info */}
        <div className="p-5 pb-3">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-lg text-xs font-mono tracking-wider ${getRankBadgeStyle(article.rank)}`}>
                #{article.rank}
              </span>
              <SourceBadge source={article.source} size="sm" />
            </div>

            <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${getCategoryColor(article.category)}`}>
              {article.category}
            </span>
          </div>

          <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug line-clamp-2 mb-1.5">
            {article.titleZh}
          </h3>

          <p className="text-xs text-slate-400 font-mono line-clamp-1 mb-3">
            {article.titleEn}
          </p>

          <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60">
            {article.summaryZh}
          </p>
        </div>

        {/* Footer actions */}
        <div className="px-5 py-3 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold font-mono">
            <Flame className="w-4 h-4 fill-amber-400/20 text-amber-500" />
            <span>{article.hotScore} 熱度</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(article.id);
              }}
              className={`p-1.5 rounded-lg border transition-all ${
                isBookmarked
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
            </button>

            <button
              onClick={() => onOpenModal(article)}
              className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg font-semibold transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>AI 導讀</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default List View
  return (
    <div
      onClick={() => onOpenModal(article)}
      className="group bg-slate-900/80 hover:bg-slate-900 rounded-2xl border border-slate-800 hover:border-indigo-500/50 p-4 sm:p-5 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-950/30 cursor-pointer relative overflow-hidden"
    >
      {/* Accent Rank Glow for Top 3 */}
      {article.rank <= 3 && (
        <div
          className={`absolute left-0 top-0 bottom-0 w-1.5 ${
            article.rank === 1
              ? 'bg-amber-400'
              : article.rank === 2
              ? 'bg-slate-300'
              : 'bg-orange-500'
          }`}
        />
      )}

      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        {/* Rank & Main Details */}
        <div className="flex items-start gap-3 sm:gap-4 flex-1">
          {/* Rank Number Badge */}
          <div className="flex flex-col items-center justify-center shrink-0">
            <span
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center font-mono font-bold text-sm sm:text-base ${getRankBadgeStyle(
                article.rank
              )}`}
            >
              #{article.rank}
            </span>
            <span className="text-[10px] text-amber-400/90 font-mono font-semibold mt-1 flex items-center gap-0.5">
              <Flame className="w-3 h-3 fill-amber-400 text-amber-500" />
              {article.hotScore}
            </span>
          </div>

          {/* Title & Metadata */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <SourceBadge source={article.source} size="sm" />
              <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${getCategoryColor(article.category)}`}>
                {article.category}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3 text-slate-500" />
                {article.publishDate}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                • {article.readTime}
              </span>
            </div>

            {/* Translated Traditional Chinese Title */}
            <h3 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-amber-300 transition-colors leading-snug mb-1">
              {article.titleZh}
            </h3>

            {/* Original English Title */}
            <p className="text-xs text-slate-400 font-mono mb-2.5 line-clamp-1">
              Original: {article.titleEn}
            </p>

            {/* Summary Preview */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3 line-clamp-2">
              {article.summaryZh}
            </p>

            {/* Key Takeaways Pills */}
            {article.keyTakeaways && article.keyTakeaways.length > 0 && (
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 mb-2">
                <div className="text-[11px] font-bold text-amber-400 mb-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" /> AI 核心亮點：
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-xs text-slate-300">
                  {article.keyTakeaways.slice(0, 3).map((pt, i) => (
                    <li key={i} className="flex items-center gap-1.5 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                      <span className="truncate">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right side Actions */}
        <div className="flex lg:flex-col items-center justify-between lg:justify-start gap-2 shrink-0 border-t lg:border-t-0 lg:border-l border-slate-800 pt-3 lg:pt-0 lg:pl-4">
          <button
            onClick={() => onOpenModal(article)}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-indigo-900/30 transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>AI 30秒深度導讀</span>
          </button>

          <div className="flex items-center gap-2">
            <a
              href={getBestArticleUrl(article)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-xs text-indigo-300 hover:text-white bg-indigo-950/60 hover:bg-indigo-900 px-2.5 py-1.5 rounded-lg border border-indigo-700/50 transition-all font-medium shadow-sm"
              title={`前往 ${article.source} 原文報導`}
            >
              <span>原報導</span>
              <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
            </a>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(article.id);
              }}
              className={`p-1.5 rounded-lg border transition-all ${
                isBookmarked
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
              }`}
              title={isBookmarked ? '取消收藏' : '收藏新聞'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg bg-slate-800/80 text-slate-400 border border-slate-700 hover:text-white transition-all"
              title="分享新聞"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
