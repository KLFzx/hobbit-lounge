'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { getModBySlug, mods } from '@/components/variables/mods';
import './styles.css';

const ModDetailPage: React.FC = () => {
  const params = useParams();
  const slug = params.slug as string;
  const mod = getModBySlug(slug);
  const [activeTab, setActiveTab] = useState<'description' | 'files' | 'changelog'>('description');
  const [selectedImage, setSelectedImage] = useState(0);

  if (!mod) {
    return (
      <div className='min-h-screen bg-[#1a1a1a]'>
        <Navbar id={3} />
        <div className='flex flex-col items-center justify-center min-h-[80vh]'>
          <h1 className='text-4xl font-bold mb-4'>Mod Not Found</h1>
          <p className='text-gray-400 mb-6'>The mod you're looking for doesn't exist.</p>
          <Link href='/mods' className='bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-400 transition-colors'>
            Back to Mods
          </Link>
        </div>
      </div>
    );
  }

  const relatedMods = mods.filter((m) => m.category === mod.category && m.slug !== mod.slug).slice(0, 3);

  return (
    <div className='min-h-screen bg-[#1a1a1a]'>
      <Navbar id={3} />

      {/* Hero Header */}
      <div className='relative h-[400px]'>
        <div 
          className='absolute inset-0'
          style={{
            backgroundImage: `url(${mod.images?.[selectedImage] || mod.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/70 to-[#1a1a1a]/30' />
        
        {/* Breadcrumb */}
        <div className='relative z-10 max-w-7xl mx-auto px-6 pt-24'>
          <nav className='flex items-center gap-2 text-sm text-gray-400'>
            <Link href='/' className='hover:text-white transition-colors'>Home</Link>
            <span>/</span>
            <Link href='/mods' className='hover:text-white transition-colors'>Mods</Link>
            <span>/</span>
            <span className='text-yellow-400'>{mod.category}</span>
          </nav>
        </div>

        {/* Image Gallery Thumbnails */}
        {mod.images && mod.images.length > 1 && (
          <div className='absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2'>
            {mod.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-16 h-10 rounded overflow-hidden border-2 transition-all ${
                  selectedImage === index ? 'border-yellow-500 scale-110' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt='' className='w-full h-full object-cover' />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-6 py-8'>
        <div className='flex gap-8'>
          {/* Left Content */}
          <div className='flex-1'>
            {/* Title Section */}
            <div className='mb-6'>
              <div className='flex items-center gap-3 mb-2'>
                <span className='bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium'>
                  {mod.category}
                </span>
                <span className='text-gray-500 text-sm'>v{mod.version}</span>
              </div>
              <h1 className='text-4xl font-bold mb-3'>{mod.title}</h1>
              <p className='text-gray-400 text-lg'>{mod.desc}</p>
            </div>

            {/* Author Bar */}
            <div className='flex items-center justify-between bg-[#242424] rounded-lg px-6 py-4 mb-6'>
              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 bg-[#3a3a3a] rounded-full flex items-center justify-center'>
                  <span className='text-xl font-bold text-yellow-400'>{mod.author[0].toUpperCase()}</span>
                </div>
                <div>
                  <p className='text-sm text-gray-400'>Created by</p>
                  <p className='font-medium text-white'>{mod.author}</p>
                </div>
              </div>
              <div className='flex items-center gap-6 text-sm'>
                <div className='text-center'>
                  <p className='text-gray-400'>Released</p>
                  <p className='text-white'>{mod.date}</p>
                </div>
                <div className='text-center'>
                  <p className='text-gray-400'>Updated</p>
                  <p className='text-white'>{mod.updateDate}</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className='border-b border-[#3a3a3a] mb-6'>
              <div className='flex gap-1'>
                {(['description', 'files', 'changelog'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-[2px] ${
                      activeTab === tab
                        ? 'border-yellow-500 text-yellow-400'
                        : 'border-transparent text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className='bg-[#242424] rounded-lg p-6'>
              {activeTab === 'description' && (
                <div className='mod-description prose prose-invert max-w-none'>
                  {mod.fullDesc.split('\n').map((line, index) => {
                    if (line.startsWith('## ')) {
                      return <h2 key={index} className='text-xl font-bold mt-6 mb-3 text-yellow-400'>{line.replace('## ', '')}</h2>;
                    }
                    if (line.startsWith('- ')) {
                      return <li key={index} className='text-gray-300 ml-4'>{line.replace('- ', '')}</li>;
                    }
                    if (line.match(/^\d+\. /)) {
                      return <li key={index} className='text-gray-300 ml-4 list-decimal'>{line.replace(/^\d+\. /, '')}</li>;
                    }
                    if (line.trim() === '') {
                      return <br key={index} />;
                    }
                    return <p key={index} className='text-gray-300 leading-relaxed'>{line}</p>;
                  })}
                </div>
              )}

              {activeTab === 'files' && (
                <div>
                  <div className='bg-[#1a1a1a] rounded-lg p-4 flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                      <div className='w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center'>
                        <svg className='w-6 h-6 text-green-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10' />
                        </svg>
                      </div>
                      <div>
                        <p className='font-medium'>{mod.title} v{mod.version}</p>
                        <p className='text-sm text-gray-400'>Main file - {mod.size}</p>
                      </div>
                    </div>
                    <button className='bg-green-500 hover:bg-green-400 text-black px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2'>
                      <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' />
                      </svg>
                      Download
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'changelog' && (
                <div className='space-y-6'>
                  {mod.changelog?.map((entry, index) => (
                    <div key={index} className='border-l-2 border-yellow-500/50 pl-4'>
                      <div className='flex items-center gap-3 mb-2'>
                        <span className='bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-sm font-medium'>
                          v{entry.version}
                        </span>
                        <span className='text-gray-500 text-sm'>{entry.date}</span>
                      </div>
                      <ul className='space-y-1'>
                        {entry.changes.map((change, changeIndex) => (
                          <li key={changeIndex} className='text-gray-300 text-sm flex items-start gap-2'>
                            <span className='text-green-400 mt-1'>•</span>
                            {change}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Related Mods */}
            {relatedMods.length > 0 && (
              <div className='mt-8'>
                <h3 className='text-xl font-bold mb-4'>Related Mods</h3>
                <div className='grid grid-cols-3 gap-4'>
                  {relatedMods.map((relMod) => (
                    <Link key={relMod.slug} href={`/mods/${relMod.slug}`} className='group'>
                      <div className='bg-[#242424] rounded-lg overflow-hidden hover:ring-2 hover:ring-yellow-500/50 transition-all'>
                        <img src={relMod.image} alt={relMod.title} className='w-full h-24 object-cover' />
                        <div className='p-3'>
                          <p className='font-medium text-sm group-hover:text-yellow-400 transition-colors truncate'>{relMod.title}</p>
                          <p className='text-xs text-gray-500'>{relMod.downloads} downloads</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className='w-[300px] flex-shrink-0'>
            {/* Download Card */}
            <div className='bg-[#242424] rounded-lg p-6 mb-6'>
              <button className='w-full bg-green-500 hover:bg-green-400 text-black py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2 mb-4'>
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' />
                </svg>
                DOWNLOAD
              </button>
              <button className='w-full bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2'>
                <svg className='w-5 h-5 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                </svg>
                Endorse
              </button>
            </div>

            {/* Stats Card */}
            <div className='bg-[#242424] rounded-lg p-6 mb-6'>
              <h3 className='text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4'>Mod Stats</h3>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <svg className='w-5 h-5 text-green-400' fill='currentColor' viewBox='0 0 20 20'>
                      <path d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z' />
                    </svg>
                    <span className='text-gray-400'>Downloads</span>
                  </div>
                  <span className='text-white font-medium'>{mod.downloads}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <svg className='w-5 h-5 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                    </svg>
                    <span className='text-gray-400'>Endorsements</span>
                  </div>
                  <span className='text-white font-medium'>{mod.endorsements}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <svg className='w-5 h-5 text-blue-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' />
                    </svg>
                    <span className='text-gray-400'>Version</span>
                  </div>
                  <span className='text-white font-medium'>{mod.version}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <svg className='w-5 h-5 text-purple-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4' />
                    </svg>
                    <span className='text-gray-400'>Size</span>
                  </div>
                  <span className='text-white font-medium'>{mod.size}</span>
                </div>
              </div>
            </div>

            {/* Requirements */}
            {mod.requirements && mod.requirements.length > 0 && (
              <div className='bg-[#242424] rounded-lg p-6 mb-6'>
                <h3 className='text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4'>Requirements</h3>
                <ul className='space-y-2'>
                  {mod.requirements.map((req, index) => (
                    <li key={index} className='flex items-center gap-2 text-sm'>
                      <svg className='w-4 h-4 text-yellow-500 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                      </svg>
                      <span className='text-gray-300'>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            {mod.tags && mod.tags.length > 0 && (
              <div className='bg-[#242424] rounded-lg p-6'>
                <h3 className='text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4'>Tags</h3>
                <div className='flex flex-wrap gap-2'>
                  {mod.tags.map((tag, index) => (
                    <span key={index} className='bg-[#3a3a3a] text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-[#4a4a4a] cursor-pointer transition-colors'>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModDetailPage;
