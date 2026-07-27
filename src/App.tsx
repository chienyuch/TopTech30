import React, { useState, useEffect, useMemo } from 'react';
import { NewsArticle, NewsPeriod, TechSource, TechCategory, DailyInsight } from './types';
import { Header } from './components/Header';
import { DailyInsightBanner } from './components/DailyInsightBanner';
import { ArticleCard } from './components/ArticleCard';
import { ArticleModal } from './components/ArticleModal';
import { Footer } from './components/Footer';
import { SOURCE_CONFIG } from './components/SourceBadges';
import {
  Search,
  Filter,
  Flame,
  Bookmark,
  LayoutGrid,
  List,
  Sparkles,
  RefreshCw,
  X,
  SlidersHorizontal,
  ArrowUpDown
} from 'lucide-react';

export default function App() {
  const [activePeriod, setActivePeriod] = useState<NewsPeriod>('daily');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'rank' | 'hot' | 'date'>('rank');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [onlyBookmarked, setOnlyBookmarked] = useState<boolean>(false);

  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [insights, setInsights] = useState<DailyInsight[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [selectedModalArticle, setSelectedModalArticle] = useState<NewsArticle | null>(null);

  // Bookmarks state with localStorage persistence
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('techtop30_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('techtop30_bookmarks', JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedIds]);

  // Fetch articles from backend API when period changes
  useEffect(() => {
    fetchNews(activePeriod);
    fetchInsights();
  }, [activePeriod]);

  const fetchNews = async (period: NewsPeriod) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/news?period=${period}`);
      const data = await res.json();
      if (data.success && data.articles) {
        setArticles(data.articles);
      }
    } catch (err) {
      console.error('Failed to fetch news:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInsights = async () => {
    try {
      const res = await fetch('/api/tech-insights');
      const data = await res.json();
      if (data.success && data.insights) {
        setInsights(data.insights);
      }
    } catch (err) {
      console.error('Failed to fetch insights:', err);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setToastMessage(null);
    try {
      const res = await fetch('/api/refresh-news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ period: activePeriod }),
      });
      const data = await res.json();
      if (data.success && data.articles) {
        setArticles(data.articles);
        const timeMsg = data.message || `已成功掃描並更新最新頭條 (時間：${data.lastRefreshed || new Date().toLocaleTimeString()})`;
        setToastMessage(timeMsg);
        setTimeout(() => setToastMessage(null), 5000);
      }
    } catch (err) {
      console.error('Error refreshing news:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter & Sort Logic
  const filteredArticles = useMemo(() => {
    let result = [...articles];

    // Source Filter
    if (selectedSource !== 'all') {
      result = result.filter((item) => item.source === selectedSource);
    }

    // Category Filter
    if (selectedCategory !== 'all') {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // Bookmarked filter
    if (onlyBookmarked) {
      result = result.filter((item) => bookmarkedIds.includes(item.id));
    }

    // Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.titleZh.toLowerCase().includes(q) ||
          item.titleEn.toLowerCase().includes(q) ||
          item.summaryZh.toLowerCase().includes(q) ||
          item.source.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'hot') {
        return b.hotScore - a.hotScore;
      }
      if (sortBy === 'date') {
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      }
      return a.rank - b.rank; // default rank 1 -> 30
    });

    return result;
  }, [articles, selectedSource, selectedCategory, searchQuery, sortBy, onlyBookmarked, bookmarkedIds]);

  const sourcesList: TechSource[] = ['TechCrunch', 'The Verge', 'Wired', 'Ars Technica', 'Engadget'];
  const categoriesList: { key: string; label: string }[] = [
    { key: 'all', label: '全部主題' },
    { key: 'AI', label: 'AI 機器學習' },
    { key: 'Hardware', label: '硬體與 3C 晶片' },
    { key: 'Software', label: '軟體與網路' },
    { key: 'Business', label: '商業與創投' },
    { key: 'Security', label: '資安與科學' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Sticky Header */}
      <Header
        activePeriod={activePeriod}
        onPeriodChange={(period) => {
          setActivePeriod(period);
          setOnlyBookmarked(false);
        }}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        totalArticlesCount={filteredArticles.length}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* AI Scan Success Toast Banner */}
        {toastMessage && (
          <div className="mb-4 p-3.5 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs sm:text-sm font-medium flex items-center justify-between shadow-lg animate-fade-in">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>{toastMessage}</span>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        
        {/* Executive AI Macro Insights Banner */}
        <DailyInsightBanner insights={insights} />

        {/* Filters and Controls Toolbar */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 mb-6 space-y-4 shadow-xl">
          
          {/* Row 1: Source Selectors & Search bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Source Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
              <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1 shrink-0">
                <Filter className="w-3.5 h-3.5 text-indigo-400" />
                媒體：
              </span>

              <button
                onClick={() => setSelectedSource('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  selectedSource === 'all'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/30'
                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                全部 5 大媒體
              </button>

              {sourcesList.map((src) => {
                const cfg = SOURCE_CONFIG[src];
                const isSelected = selectedSource === src;
                return (
                  <button
                    key={src}
                    onClick={() => setSelectedSource(src)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap border transition-all ${
                      isSelected
                        ? `${cfg.bg} ${cfg.color} ${cfg.border} ring-1 ring-white/20 shadow-md`
                        : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
                    }`}
                  >
                    {src}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="搜尋繁英標題、關鍵字或科技主題..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-9 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

          {/* Row 2: Category Chips, Sorting & View Mode */}
          <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Category Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
              <span className="text-xs text-slate-500 font-medium shrink-0">主題：</span>
              {categoriesList.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat.key
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                      : 'bg-slate-950/60 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort & Bookmarked & Layout View mode */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              
              {/* Only Bookmarked Toggle */}
              <button
                onClick={() => setOnlyBookmarked(!onlyBookmarked)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  onlyBookmarked
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${onlyBookmarked ? 'fill-amber-400' : ''}`} />
                <span>已收藏 ({bookmarkedIds.length})</span>
              </button>

              {/* Sort selector */}
              <div className="flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 px-2.5 py-1 rounded-lg text-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-slate-300 focus:outline-none cursor-pointer"
                >
                  <option value="rank" className="bg-slate-900 text-slate-100">按熱門排名 (#1-#30)</option>
                  <option value="hot" className="bg-slate-900 text-slate-100">按熱度指數 (Hot Score)</option>
                  <option value="date" className="bg-slate-900 text-slate-100">按發布時間</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-slate-950/80 border border-slate-800 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-slate-800 text-amber-400' : 'text-slate-500 hover:text-slate-300'}`}
                  title="條列檢視"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-slate-800 text-amber-400' : 'text-slate-500 hover:text-slate-300'}`}
                  title="網格卡片檢視"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Section Heading Notice */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500 fill-amber-500/20" />
              <span>
                {activePeriod === 'daily' ? '每日熱門榜單' : activePeriod === 'weekly' ? '每週熱門榜單' : '每月熱門榜單'}
              </span>
              <span className="text-xs font-mono font-normal text-slate-400">
                (展現 TOP 30 美國科技頭條)
              </span>
            </h2>
          </div>

          <span className="text-xs text-slate-400 font-mono">
            目前符合條件：<strong className="text-amber-400">{filteredArticles.length}</strong> 則新聞
          </span>
        </div>

        {/* Loading Spinner */}
        {isLoading ? (
          <div className="py-20 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin mx-auto" />
            <p className="text-sm text-slate-400 font-mono">載入美國 5 大科技新聞熱榜中...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          /* Empty State */
          <div className="py-16 bg-slate-900/60 rounded-2xl border border-slate-800 text-center max-w-md mx-auto space-y-4 my-8">
            <div className="p-4 bg-slate-800/80 rounded-full w-16 h-16 mx-auto flex items-center justify-center text-slate-400">
              <Search className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">找不到符合條件的科技新聞</h3>
              <p className="text-xs text-slate-400 mt-1">
                請嘗試清除關鍵字、切換媒體源或主題篩選。
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedSource('all');
                setSelectedCategory('all');
                setSearchQuery('');
                setOnlyBookmarked(false);
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
            >
              重置所有篩選
            </button>
          </div>
        ) : (
          /* News Feed Grid or List */
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'
                : 'space-y-4'
            }
          >
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onOpenModal={(item) => setSelectedModalArticle(item)}
                isBookmarked={bookmarkedIds.includes(article.id)}
                onToggleBookmark={toggleBookmark}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}

      </main>

      {/* Article Detail & AI Reader Modal */}
      <ArticleModal
        article={selectedModalArticle}
        onClose={() => setSelectedModalArticle(null)}
        isBookmarked={selectedModalArticle ? bookmarkedIds.includes(selectedModalArticle.id) : false}
        onToggleBookmark={toggleBookmark}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}
