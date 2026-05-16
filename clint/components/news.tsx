'use client'

import axios from 'axios';
import React from 'react';
import { StockChart } from './chart';
import { Calendar, Tag, Flame, Newspaper, Clock } from 'lucide-react';

interface NewsItem {
  _id: string;
  title: string;
  description: string;
  category: string;
  content: string;
  tags: string | string[];
  publishedAt: string;
  isBreaking: boolean;
}

const NewsData = () => {
  const [news, setNews] = React.useState<NewsItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get<NewsItem[]>('http://localhost:3001/api/news');
        setNews(res.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading news...</p>
          </div>
        </div>
      </div>
    );
  }

  // Helper function to get tags array
  const getTagsArray = (tags: string | string[] | undefined): string[] => {
    if (!tags) return [];
    if (Array.isArray(tags)) return tags;
    if (typeof tags === 'string') return tags.split(',').map(tag => tag.trim());
    return [];
  };

  return (
    <div className="w-full flex p-12 gap-6">
      {/* Stock Chart - 70% width */}
      <div className="w-[70%] rounded-lg bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <StockChart />
      </div>
      
      {/* News Section - 30% width */}
      <div className="w-[30%]">
        <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Newspaper className="h-4 w-4 text-yellow-300" />
                <h2 className="text-white font-bold text-sm">Latest News</h2>
              </div>
              <span className="text-purple-200 text-xs bg-black/30 px-2 py-0.5 rounded-full">
                Live
              </span>
            </div>
          </div>

          <div 
            className="h-[600px] overflow-y-auto"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(139, 92, 246, 0.5) rgba(139, 92, 246, 0.1)'
            }}
          >
            {news.map((newsItem, index) => (
              <div
                key={newsItem._id}
                className={`border-b border-white/10 hover:bg-white/5 transition-all duration-300 ${
                  newsItem.isBreaking ? 'bg-rose-500/5' : ''
                }`}
              >
                <div className="p-3">
                  {/* Breaking News Badge */}
                  {newsItem.isBreaking && (
                    <div className="mb-2">
                      <span className="inline-flex items-center gap-1 bg-rose-500/20 text-rose-400 text-xs font-semibold px-1.5 py-0.5 rounded-full border border-rose-500/30">
                        <Flame className="h-2 w-2" />
                        Breaking News
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-white font-semibold text-sm mb-1 hover:text-purple-300 transition-colors line-clamp-2">
                    {newsItem.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-300 text-xs mb-2 line-clamp-2">
                    {newsItem.description}
                  </p>

                  {/* Metadata - Compact view for 30% width */}
                  <div className="space-y-1 mb-2">
                    {/* Category and Date */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        <Tag className="h-2.5 w-2.5 text-purple-400" />
                        <span className="text-xs text-slate-400">
                          {newsItem.category || 'General'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-2.5 w-2.5 text-purple-400" />
                        <span className="text-xs text-slate-400">
                          {new Date(newsItem.publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Tags - Limited to 2 tags for compact view */}
                    {newsItem.tags && getTagsArray(newsItem.tags).length > 0 && (
                      <div className="flex items-center gap-1 flex-wrap">
                        <Tag className="h-2.5 w-2.5 text-purple-400" />
                        {getTagsArray(newsItem.tags).slice(0, 2).map((tag: string, i: number) => (
                          <span key={i} className="text-xs bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded-full">
                            {tag.length > 10 ? `${tag.substring(0, 8)}...` : tag}
                          </span>
                        ))}
                        {getTagsArray(newsItem.tags).length > 2 && (
                          <span className="text-xs text-purple-400">+{getTagsArray(newsItem.tags).length - 2}</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Content Preview - Only show if space allows */}
                  {newsItem.content && (
                    <div className="pt-1 border-t border-white/10">
                      <p className="text-slate-400 text-xs line-clamp-1">
                        {newsItem.content.substring(0, 80)}...
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsData;