export type NewsPeriod = 'daily' | 'weekly' | 'monthly';

export type TechSource = 
  | 'TechCrunch' 
  | 'The Verge' 
  | 'Wired' 
  | 'Ars Technica' 
  | 'Engadget';

export type TechCategory = 
  | 'AI' 
  | 'Hardware' 
  | 'Software' 
  | 'Business' 
  | 'Security';

export interface TechTerm {
  term: string;
  explanation: string;
}

export interface NewsArticle {
  id: string;
  rank: number;
  titleZh: string;
  titleEn: string;
  source: TechSource;
  sourceUrl: string;
  category: TechCategory;
  period: NewsPeriod;
  publishDate: string;
  hotScore: number;
  summaryZh: string;
  keyTakeaways: string[];
  industryImpact: string;
  techTerms?: TechTerm[];
  imageUrl?: string;
  readTime: string;
  views: number;
  likes: number;
}

export interface FilterState {
  period: NewsPeriod;
  selectedSource: string; // 'all' or TechSource
  selectedCategory: string; // 'all' or TechCategory
  searchQuery: string;
  sortBy: 'rank' | 'hot' | 'date';
  onlyBookmarked: boolean;
}

export interface DailyInsight {
  id: string;
  topic: string;
  titleZh: string;
  descriptionZh: string;
  keyTakeaway: string;
  impactLevel: '極高' | '高' | '中';
  sources: TechSource[];
}
