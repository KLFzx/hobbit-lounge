'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { ReplyIcon, RepostIcon, LikeIcon } from '@/components/NewsIcons';
import '../styles/liquid-glass.css';
import { sampleNews } from './data';

const NewsPage: React.FC = () => {
  return (
    <div className='min-h-screen bg-[#050509] bg-[url("/images/back-2.jpg")] bg-cover bg-center bg-fixed text-white'>
      <Navbar id={7} />

      <main className='max-w-6xl mx-auto pt-28 pb-12 px-4 md:px-6 flex gap-8'>
        {/* Left spacer / trending column placeholder */}
        <section className='hidden lg:block w-64 pt-4'>
          <div className='lg-card p-4 lg-news-sidebar'>
            <h2 className='text-lg font-semibold mb-2 text-[#f5c518]'>News Feed</h2>
            <p className='text-sm text-gray-300 mb-3'>
              Live updates from the Hobbit Lounge community. For now this feed is
              based on curated highlights.
            </p>
            <div className='flex flex-wrap gap-2 text-xs'>
              <span className='lg-chip px-3 py-1 bg-transparent'>
                #mods
              </span>
              <span className='lg-chip px-3 py-1 bg-transparent'>
                #extendedEdition
              </span>
              <span className='lg-chip px-3 py-1 bg-transparent'>
                #events
              </span>
            </div>
          </div>
        </section>

        {/* Main feed */}
        <section className='flex-1 max-w-2xl mx-auto'>
          <header className='mb-4'>
            <div className='relative h-[140px] flex items-end lg-panel overflow-hidden'>
              <div className='lg-blob left-[-80px] top-[-40px]' />
              <div className='lg-blob right-[-60px] bottom-[-40px]' />
              <div className='relative z-10 w-full px-5 pb-4 flex items-center justify-between flex-wrap gap-3'>
                <div>
                  <h1 className='text-2xl md:text-3xl font-bold text-[#f5c518]'>
                    Hobbit Lounge News
                  </h1>
                  <p className='text-sm text-gray-200 mt-1'>
                    X-style activity feed for the game, mods and community.
                  </p>
                </div>
                <button className='text-xs md:text-sm bg-[#f5c518] text-black px-3 py-2 rounded font-medium hover:bg-[#d4a914] transition-colors'>
                  Open Discord
                </button>
              </div>
            </div>
          </header>

          <div className='space-y-4 mt-4'>
            {sampleNews.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.id}`}
                className='block lg-card p-4 lg-tweet-card'
              >
                <div className='flex gap-3'>
                  <div className='flex-shrink-0'>
                    <div className='h-11 w-11 rounded-full overflow-hidden border border-white/20 bg-black/40'>
                      <img
                        src={item.avatar}
                        alt={item.author}
                        className='h-full w-full object-cover'
                      />
                    </div>
                  </div>

                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2 text-sm'>
                      <span className='font-semibold truncate'>{item.author}</span>
                      <span className='text-gray-400 truncate'>{item.handle}</span>
                      <span className='text-gray-500'>·</span>
                      <span className='text-gray-400'>{item.time}</span>
                      {item.tag && (
                        <span className='text-[11px] uppercase tracking-wide text-[#f5c518] ml-auto'>
                          {item.tag}
                        </span>
                      )}
                    </div>

                    <p className='mt-2 text-sm md:text-[15px] leading-relaxed text-gray-100 whitespace-pre-line'>
                      {item.content}
                    </p>

                    {item.image && (
                      <div className='mt-3 rounded-2xl overflow-hidden border border-white/10 max-h-80'>
                        <img
                          src={item.image}
                          alt='News image'
                          className='w-full h-full object-cover'
                        />
                      </div>
                    )}

                    <div className='mt-3 flex justify-between text-xs text-gray-400 max-w-sm'>
                      <button className='flex items-center gap-1 hover:text-[#8ab4f8] transition-colors'>
                        <ReplyIcon />
                        <span>{item.stats.replies}</span>
                      </button>
                      <button className='flex items-center gap-1 hover:text-green-400 transition-colors'>
                        <RepostIcon />
                        <span>{item.stats.reposts}</span>
                      </button>
                      <button className='flex items-center gap-1 hover:text-pink-400 transition-colors'>
                        <LikeIcon />
                        <span>{item.stats.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Right spacer for symmetry on large screens */}
        <section className='hidden xl:block w-40' />
      </main>
    </div>
  );
};

export default NewsPage;
