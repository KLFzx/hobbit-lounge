'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import '../../styles/liquid-glass.css';
import { 
  articles as hardcodedArticles, 
  wikiCategories, 
  WikiArticle 
} from '../data/articles';

export default function WikiArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [allArticles, setAllArticles] = useState<WikiArticle[]>(hardcodedArticles);
  const [loading, setLoading] = useState(true);

  // Load user-created articles
  useEffect(() => {
    const loadUserArticles = async () => {
      try {
        const res = await fetch('/api/wiki/articles');
        if (res.ok) {
          const data = await res.json();
          // Merge hardcoded and user articles, user articles override hardcoded ones with same slug
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
      setLoading(false);
    };
    loadUserArticles();
  }, []);

  const getArticleBySlug = (s: string) => allArticles.find(a => a.slug === s);
  const getArticlesByCategory = (cat: string) => allArticles.filter(a => a.category === cat);
  
  const article = getArticleBySlug(slug);

  if (loading) {
    return (
      <div className='min-h-screen bg-[#1a1a1a]'>
        <Navbar id={4}></Navbar>
        <div className='pt-32 text-center'>
          <p className='text-gray-400'>Loading...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className='min-h-screen bg-[#1a1a1a]'>
        <Navbar id={4}></Navbar>
        <div className='pt-32 text-center'>
          <h1 className='text-4xl text-white mb-4'>Article Not Found</h1>
          <p className='text-gray-400 mb-8'>The article "{slug}" does not exist.</p>
          <Link href='/wiki' className='text-[#f5c518] hover:underline'>
            ← Return to Wiki Home
          </Link>
        </div>
      </div>
    );
  }

  // Get related articles
  const relatedArticles = article.relatedArticles
    ?.map(slug => getArticleBySlug(slug))
    .filter(Boolean) as WikiArticle[];

  return (
    <div className='min-h-screen bg-[#050509] bg-[url("/images/back-2.jpg")] bg-cover bg-center bg-fixed'>
      <Navbar id={4}></Navbar>

      {/* Wiki Header */}
      <div
        className='relative h-[260px] flex items-end'
      >

        <div className='relative z-10 w-full max-w-7xl mx-auto px-6 pb-6 flex items-center justify-between'>
          <div className='flex items-center gap-4 flex-wrap'>
            <Link href='/wiki' className='text-[#f5c518] hover:underline'>
              ← Wiki Home
            </Link>
            <span className='text-gray-500'>/</span>
            <span className='text-gray-400'>{article.category}</span>
            <span className='text-gray-500'>/</span>
            <span className='text-white text-lg md:text-2xl font-bold'>{article.title}</span>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto flex lg-panel'>
        {/* Sidebar */}
        <aside className='w-64 hidden lg:block'>
          <div className='p-4 lg-card'>
            <Link href='/wiki' className='text-[#f5c518] font-bold mb-4 text-lg block hover:underline'>
              Wiki Home
            </Link>
            
            {wikiCategories.map((category, idx) => {
              const categoryArticles = getArticlesByCategory(category);
              if (categoryArticles.length === 0) return null;
              
              return (
                <div key={idx} className='mb-4'>
                  <h3 className='text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2'>
                    {category}
                  </h3>
                  <ul className='space-y-1'>
                    {categoryArticles.map((art) => (
                      <li key={art.slug}>
                        <Link
                          href={`/wiki/${art.slug}`}
                          className={`block w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${
                            slug === art.slug
                              ? 'bg-[#f5c518] text-black font-medium'
                              : 'text-gray-300 hover:bg-[#3a3a3a] hover:text-white'
                          }`}
                        >
                          {art.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Main Content */}
        <main className='flex-1 p-6'>
          {/* Article Header */}
          <div className='border-b border-[#3a3a3a] pb-4 mb-6'>
            <h1 className='text-4xl font-serif text-white mb-2'>{article.title}</h1>
            <div className='flex gap-4 text-sm text-gray-400'>
              <span className='bg-[#3a3a3a] px-2 py-1 rounded'>{article.category}</span>
              {article.tags?.map((tag, idx) => (
                <span key={idx} className='text-[#8ab4f8]'>#{tag}</span>
              ))}
            </div>
          </div>

          <div className='flex gap-6 flex-col lg:flex-row'>
            {/* Article Body */}
            <div className='flex-1 order-2 lg:order-1'>
              {/* Table of Contents */}
              <div className='lg-card p-4 mb-6 inline-block'>
                <h3 className='font-bold text-white mb-2'>Contents</h3>
                <ol className='list-decimal list-inside text-sm space-y-1'>
                  {article.sections.map((section, idx) => (
                    <li key={idx}>
                      <a href={`#section-${idx}`} className='text-[#8ab4f8] hover:underline'>
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Article Sections */}
              {article.sections.map((section, idx) => (
                <div key={idx} id={`section-${idx}`} className='mb-8'>
                  <h2 className='text-2xl font-serif text-white border-b border-[#3a3a3a] pb-2 mb-4'>
                    {section.heading}
                  </h2>
                  <p className='text-gray-300 leading-relaxed mb-4'>
                    {section.content}
                  </p>
                  {section.image && (
                    <figure className='my-4'>
                      <img
                        src={section.image}
                        alt={section.imageCaption || section.heading}
                        className='max-w-md rounded border border-[#3a3a3a]'
                      />
                      {section.imageCaption && (
                        <figcaption className='text-sm text-gray-400 mt-2 italic'>
                          {section.imageCaption}
                        </figcaption>
                      )}
                    </figure>
                  )}
                </div>
              ))}

              {/* Related Articles */}
              {relatedArticles && relatedArticles.length > 0 && (
                <div className='mt-12 pt-4 border-t border-[#3a3a3a]'>
                  <h3 className='text-white font-bold mb-4'>Related Articles</h3>
                  <div className='flex flex-wrap gap-2'>
                    {relatedArticles.map((related) => (
                      <Link
                        key={related.slug}
                        href={`/wiki/${related.slug}`}
                        className='lg-card px-3 py-2 rounded text-[#8ab4f8] hover:bg-[#3a3a3a] transition-colors'
                      >
                        {related.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories Footer */}
              <div className='mt-8 pt-4 border-t border-[#3a3a3a]'>
                <span className='text-gray-400 text-sm'>Category: </span>
                <Link href={`/wiki?category=${article.category}`} className='text-[#8ab4f8] text-sm hover:underline'>
                  {article.category}
                </Link>
                {article.tags && article.tags.length > 0 && (
                  <>
                    <span className='text-gray-400 text-sm ml-4'>Tags: </span>
                    {article.tags.map((tag, idx) => (
                      <span key={idx}>
                        <span className='text-[#8ab4f8] text-sm hover:underline cursor-pointer'>{tag}</span>
                        {idx < article.tags!.length - 1 && <span className='text-gray-400'>, </span>}
                      </span>
                    ))}
                  </>
                )}
              </div>
            </div>

            {/* Infobox */}
            {article.infobox && (
              <div className='w-full lg:w-72 flex-shrink-0 order-1 lg:order-2'>
                <div className='lg-card rounded overflow-hidden sticky top-24'>
                  {/* Infobox Header */}
                  <div className='bg-[#f5c518] px-4 py-2'>
                    <h3 className='text-black font-bold text-center'>{article.title}</h3>
                  </div>
                  
                  {/* Infobox Image */}
                  {article.image && (
                    <div className='p-4 flex justify-center bg-[#1a1a1a]'>
                      <img
                        src={article.image}
                        alt={article.title}
                        className='max-w-full h-auto max-h-64 object-contain'
                      />
                    </div>
                  )}

                  {/* Infobox Data */}
                  <table className='w-full text-sm'>
                    <tbody>
                      {article.infobox.map((item, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-[#2a2a2a]' : 'bg-[#252525]'}>
                          <td className='px-3 py-2 text-gray-400 font-medium border-r border-[#3a3a3a] w-1/3'>
                            {item.label}
                          </td>
                          <td className='px-3 py-2 text-white'>
                            {item.link ? (
                              <Link href={`/wiki/${item.link}`} className='text-[#8ab4f8] hover:underline'>
                                {item.value}
                              </Link>
                            ) : (
                              item.value
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className='bg-[#2a2a2a] border-t border-[#3a3a3a] py-4 px-6 mt-8'>
        <div className='max-w-7xl mx-auto text-center text-gray-400 text-sm'>
          <p>The Hobbit 2003 Wiki is a fan-made resource for The Hobbit video game.</p>
        </div>
      </footer>
    </div>
  );
}
