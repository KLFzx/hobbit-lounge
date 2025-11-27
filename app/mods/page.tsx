'use client';

import React, { useState, useMemo } from 'react';
import Section from '@/components/Section';
import Navbar from '@/components/Navbar';
import './styles.css';
import ModCard from '@/components/mods/ModCard';
import { mods, categories, Mod } from '@/components/variables/mods';

type SortOption = 'newest' | 'updated' | 'downloads' | 'endorsements';

const Page: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<SortOption>('downloads');

  const filteredMods = useMemo(() => {
    let result = [...mods];

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (mod) =>
          mod.title.toLowerCase().includes(query) ||
          mod.author.toLowerCase().includes(query) ||
          mod.desc.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter((mod) => mod.category === selectedCategory);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'downloads':
          return parseInt(b.downloads.replace(/,/g, '')) - parseInt(a.downloads.replace(/,/g, ''));
        case 'endorsements':
          return parseInt(b.endorsements.replace(/,/g, '')) - parseInt(a.endorsements.replace(/,/g, ''));
        case 'newest':
          return new Date(b.date.split('.').reverse().join('-')).getTime() - 
                 new Date(a.date.split('.').reverse().join('-')).getTime();
        case 'updated':
          return new Date(b.updateDate.split('.').reverse().join('-')).getTime() - 
                 new Date(a.updateDate.split('.').reverse().join('-')).getTime();
        default:
          return 0;
      }
    });

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className='min-h-screen bg-[#1a1a1a]'>
      <Navbar id={3} />
      
      {/* Hero Section */}
      <div 
        className='relative h-[300px] flex items-end'
        style={{
          backgroundImage: 'url(/images/back-2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/60 to-transparent' />
        <div className='relative z-10 w-full max-w-7xl mx-auto px-6 pb-8'>
          <h1 className='text-5xl font-bold mb-2'>MODS</h1>
          <p className='text-gray-400 text-lg'>Browse and download community-created modifications</p>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-6 py-8'>
        <div className='flex gap-8'>
          {/* Sidebar */}
          <div className='w-[220px] flex-shrink-0'>
            {/* Search */}
            <div className='mb-6'>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Search mods...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors'
                />
                <svg className='absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                </svg>
              </div>
            </div>

            {/* Categories */}
            <div className='mb-6'>
              <h3 className='text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3'>Categories</h3>
              <div className='space-y-1'>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === category
                        ? 'bg-yellow-500/20 text-yellow-400 border-l-2 border-yellow-500'
                        : 'text-gray-300 hover:bg-[#2a2a2a] hover:text-white'
                    }`}
                  >
                    {category}
                    {category !== 'All' && (
                      <span className='float-right text-gray-500'>
                        {mods.filter((m) => m.category === category).length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className='bg-[#242424] rounded-lg p-4'>
              <h3 className='text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3'>Stats</h3>
              <div className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-gray-400'>Total Mods</span>
                  <span className='text-white'>{mods.length}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-400'>Total Downloads</span>
                  <span className='text-white'>
                    {mods.reduce((acc, mod) => acc + parseInt(mod.downloads.replace(/,/g, '')), 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mod Grid */}
          <div className='flex-1'>
            {/* Sort Bar */}
            <div className='flex items-center justify-between mb-6'>
              <p className='text-gray-400'>
                Showing <span className='text-white font-medium'>{filteredMods.length}</span> mods
              </p>
              <div className='flex items-center gap-2'>
                <span className='text-sm text-gray-400'>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className='bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-500 cursor-pointer'
                >
                  <option value='downloads'>Most Downloaded</option>
                  <option value='endorsements'>Most Endorsed</option>
                  <option value='updated'>Recently Updated</option>
                  <option value='newest'>Newest</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {filteredMods.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {filteredMods.map((mod: Mod) => (
                  <ModCard key={mod.slug} mod={mod} />
                ))}
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center py-20 text-center'>
                <svg className='w-16 h-16 text-gray-600 mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                <h3 className='text-xl font-medium text-gray-400 mb-2'>No mods found</h3>
                <p className='text-gray-500'>Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
