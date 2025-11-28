'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { articles as hardcodedArticles, wikiCategories, WikiArticle } from './data/articles';

const WikiHomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allArticles, setAllArticles] = useState<WikiArticle[]>(hardcodedArticles);

  // Load user-created articles
  useEffect(() => {
    const loadUserArticles = async () => {
      try {
        const res = await fetch('/api/wiki/articles');
        if (res.ok) {
          const data = await res.json();
          const userArticles = data.articles || [];
          const merged = [...hardcodedArticles];
          userArticles.forEach((ua: WikiArticle) => {
            const existingIdx = merged.findIndex(a => a.slug === ua.slug);
            if (existingIdx >= 0) {
              merged[existingIdx] = ua;
            } else {
              merged.push(ua);
            }
          });
          setAllArticles(merged);
        }
      } catch (error) {
        console.log('Using hardcoded articles only');
      }
    };
    loadUserArticles();
  }, []);

  // Helper functions using merged articles
  const getArticlesByCategory = (cat: string) => allArticles.filter(a => a.category === cat);
  const searchArticlesLocal = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return allArticles.filter(a => 
      a.title.toLowerCase().includes(lowercaseQuery) ||
      a.sections.some(s => s.content.toLowerCase().includes(lowercaseQuery)) ||
      a.tags?.some(t => t.toLowerCase().includes(lowercaseQuery))
    );
  };

  const searchResults = searchQuery ? searchArticlesLocal(searchQuery) : [];

  // Featured articles (first article from each category)
  const featuredArticles = wikiCategories
    .map(cat => getArticlesByCategory(cat)[0])
    .filter(Boolean)
    .slice(0, 4);

  return (
    <div className='min-h-screen bg-[#1a1a1a] bg-[url("/images/back-2.jpg")] bg-cover bg-center bg-fixed'>
      <Navbar id={4}></Navbar>

      {/* Wiki Header */}
      <div 
        className='relative h-[240px] flex items-end'
      >
        <div className='relative z-10 w-full max-w-7xl mx-auto px-6 pb-6 flex items-center justify-between flex-wrap gap-4'>
          <h1 className='text-3xl md:text-4xl font-bold text-[#f5c518]'>The Hobbit 2003 Wiki</h1>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search wiki...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='bg-[#1a1a1a]/80 border border-[#3a3a3a] rounded px-4 py-2 text-white w-64 focus:outline-none focus:border-[#f5c518]'
            />
            <span className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'>🔍</span>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div className='max-w-7xl mx-auto p-6 bg-[#1a1a1a]/95'>
          <h2 className='text-xl text-white mb-4'>
            Search results for "{searchQuery}" ({searchResults.length} found)
          </h2>
          {searchResults.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {searchResults.map((article) => (
                <Link
                  key={article.slug}
                  href={`/wiki/${article.slug}`}
                  className='bg-[#2a2a2a] border border-[#3a3a3a] rounded p-4 hover:border-[#f5c518] transition-colors'
                >
                  <div className='flex gap-4'>
                    {article.image && (
                      <img src={article.image} alt={article.title} className='w-16 h-16 object-cover rounded' />
                    )}
                    <div>
                      <h3 className='text-[#f5c518] font-medium'>{article.title}</h3>
                      <p className='text-gray-400 text-sm'>{article.category}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className='text-gray-400'>No articles found matching your search.</p>
          )}
        </div>
      )}

      {/* Main Content (shown when not searching) */}
      {!searchQuery && (
        <div className='max-w-7xl mx-auto p-6 bg-[#1a1a1a]/95'>
          {/* Welcome Section */}
          <div className='bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-6 mb-8'>
            <h2 className='text-3xl font-serif text-white mb-4'>Welcome to The Hobbit 2003 Wiki</h2>
            <p className='text-gray-300 mb-4'>
              Your comprehensive guide to The Hobbit (2003) video game. Explore articles about characters,
              locations, levels, items, and gameplay mechanics. This wiki is maintained by the Hobbit modding community.
            </p>
            <div className='flex gap-4 text-sm'>
              <span className='text-[#f5c518]'>📚 {allArticles.length} Articles</span>
              <span className='text-gray-400'>|</span>
              <span className='text-[#f5c518]'>📁 {wikiCategories.length} Categories</span>
            </div>
          </div>

          {/* Featured Articles */}
          <div className='mb-8'>
            <h2 className='text-2xl font-serif text-white mb-4 border-b border-[#3a3a3a] pb-2'>Featured Articles</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
              {featuredArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/wiki/${article.slug}`}
                  className='bg-[#2a2a2a] border border-[#3a3a3a] rounded overflow-hidden hover:border-[#f5c518] transition-colors group'
                >
                  {article.image && (
                    <div className='h-32 overflow-hidden'>
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform'
                      />
                    </div>
                  )}
                  <div className='p-4'>
                    <h3 className='text-[#f5c518] font-medium'>{article.title}</h3>
                    <p className='text-gray-400 text-sm'>{article.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Browse by Category */}
          <div>
            <h2 className='text-2xl font-serif text-white mb-4 border-b border-[#3a3a3a] pb-2'>Browse by Category</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {wikiCategories.map((category) => {
                const categoryArticles = getArticlesByCategory(category);
                if (categoryArticles.length === 0) return null;
                
                return (
                  <div key={category} className='bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg overflow-hidden'>
                    <div className='bg-[#f5c518] px-4 py-2'>
                      <h3 className='text-black font-bold'>{category}</h3>
                      <span className='text-black/60 text-sm'>{categoryArticles.length} articles</span>
                    </div>
                    <ul className='p-4 space-y-2'>
                      {categoryArticles.slice(0, 5).map((article) => (
                        <li key={article.slug}>
                          <Link
                            href={`/wiki/${article.slug}`}
                            className='text-[#8ab4f8] hover:underline text-sm flex items-center gap-2'
                          >
                            {article.image && (
                              <img src={article.image} alt='' className='w-6 h-6 rounded object-cover' />
                            )}
                            {article.title}
                          </Link>
                        </li>
                      ))}
                      {categoryArticles.length > 5 && (
                        <li className='text-gray-400 text-sm pt-2 border-t border-[#3a3a3a]'>
                          +{categoryArticles.length - 5} more articles
                        </li>
                      )}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* All Articles */}
          <div className='mt-8'>
            <h2 className='text-2xl font-serif text-white mb-4 border-b border-[#3a3a3a] pb-2'>All Articles</h2>
            <div className='bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-4'>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
                {allArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/wiki/${article.slug}`}
                    className='text-[#8ab4f8] hover:underline text-sm py-1'
                  >
                    {article.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* How to Add Articles */}
          <div className='mt-8 bg-[#252525] border border-[#3a3a3a] rounded-lg p-6'>
            <h2 className='text-xl font-serif text-[#f5c518] mb-2'>📝 Contributing to the Wiki</h2>
            <p className='text-gray-300 text-sm mb-3'>
              Use the Admin Panel to create and manage wiki articles through a visual editor.
            </p>
            <Link 
              href='/wiki/admin' 
              className='inline-block bg-[#f5c518] text-black px-4 py-2 rounded font-medium hover:bg-[#d4a914] transition-colors'
            >
              Open Admin Panel
            </Link>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className='bg-[#2a2a2a] border-t border-[#3a3a3a] py-4 px-6 mt-8'>
        <div className='max-w-7xl mx-auto text-center text-gray-400 text-sm'>
          <p>The Hobbit 2003 Wiki is a fan-made resource for The Hobbit video game.</p>
        </div>
      </footer>
    </div>
  );
};

export default WikiHomePage;
