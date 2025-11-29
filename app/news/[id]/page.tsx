'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { ReplyIcon, RepostIcon, LikeIcon } from '@/components/NewsIcons';
import '../../styles/liquid-glass.css';

type NewsComment = {
  id: string;
  post_id: string;
  content: string;
  created_at: string;
};

type NewsPost = {
  id: string;
  content: string;
  created_at: string;
  source: string;
};

const NewsDetailPage: React.FC = () => {
  const params = useParams();
  const id = params.id as string;
  const [post, setPost] = useState<NewsPost | null>(null);
  const [comments, setComments] = useState<NewsComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/news/${id}`);
        if (res.status === 404) {
          setNotFound(true);
          return;
        }
        if (!res.ok) throw new Error('Failed to load post');
        const data = await res.json();
        setPost(data.post);
        setComments(data.comments ?? []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    if (id) load();
  }, [id]);

  const formatTime = (iso: string) => {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleString();
  };

  if (notFound) {
    return (
      <div className='min-h-screen bg-[#050509] text-white'>
        <Navbar id={7} />
        <div className='pt-32 text-center'>
          <h1 className='text-3xl mb-4'>Post not found</h1>
          <a href='/news' className='text-[#f5c518] hover:underline'>
            Return to News Feed
          </a>
        </div>
      </div>
    );
  }

  if (loading || !post) {
    return (
      <div className='min-h-screen bg-[#050509] text-white'>
        <Navbar id={7} />
        <div className='pt-32 text-center'>
          <p className='text-gray-400'>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#050509] bg-[url("/images/back-2.jpg")] bg-cover bg-center bg-fixed text-white'>
      <Navbar id={7} />

      <main className='max-w-4xl mx-auto pt-28 pb-12 px-4 md:px-6'>
        <header className='mb-6'>
          <div className='relative h-[120px] flex items-end lg-panel overflow-hidden'>
            <div className='lg-blob left-[-80px] top-[-40px]' />
            <div className='lg-blob right-[-60px] bottom-[-40px]' />
            <div className='relative z-10 w-full px-5 pb-4 flex items-center justify-between gap-3'>
              <div>
                <h1 className='text-xl md:text-2xl font-bold text-[#f5c518]'>
                  Post
                </h1>
                <p className='text-sm text-gray-200 mt-1'>
                  Full view with comments.
                </p>
              </div>
              <a
                href='/news'
                className='text-xs md:text-sm text-gray-300 hover:text-white underline-offset-2 hover:underline'
              >
                Back to feed
              </a>
            </div>
          </div>
        </header>

        {/* Main post */}
        <article className='lg-card p-5 mb-6'>
          <div className='flex gap-3'>
            <div className='flex-shrink-0'>
              <div className='h-12 w-12 rounded-full overflow-hidden border border-white/20 bg-black/40'>
                <img
                  src='/images/logo.png'
                  alt='Hobbit Lounge'
                  className='h-full w-full object-cover'
                />
              </div>
            </div>

            <div className='flex-1 min-w-0'>
              <div className='flex items-center gap-2 text-sm'>
                <span className='font-semibold truncate'>Hobbit Lounge</span>
                <span className='text-gray-400 truncate'>@hobbit_news</span>
                <span className='text-gray-500'>•</span>
                <span className='text-gray-400'>{formatTime(post.created_at)}</span>
              </div>

              <p className='mt-3 text-sm md:text-[15px] leading-relaxed text-gray-100 whitespace-pre-line'>
                {post.content}
              </p>

              <div className='mt-4 flex gap-6 text-xs text-gray-400'>
                <span className='flex items-center gap-1'>
                  <ReplyIcon />
                  <span>{comments.length}</span>
                </span>
                <span className='flex items-center gap-1'>
                  <RepostIcon />
                  <span>0</span>
                </span>
                <span className='flex items-center gap-1'>
                  <LikeIcon />
                  <span>0</span>
                </span>
              </div>
            </div>
          </div>
        </article>

        {/* Comments */}
        <section className='lg-card p-5'>
          <h2 className='text-lg font-semibold mb-4'>Comments</h2>

          {item.comments && item.comments.length > 0 ? (
            <div className='space-y-4'>
              {comments.map((comment: NewsComment) => (
                <div key={comment.id} className='flex gap-3'>
                  <div className='flex-shrink-0 pt-1'>
                    <div className='h-9 w-9 rounded-full overflow-hidden border border-white/20 bg-black/40'>
                      <img
                        src={comment.avatar}
                        alt={comment.author}
                        className='h-full w-full object-cover'
                      />
                    </div>
                  </div>

                  <div className='flex-1 min-w-0 pb-4 border-b border-white/5 last:border-b-0'>
                    <div className='flex items-center gap-2 text-xs md:text-sm'>
                      <span className='font-medium truncate'>{comment.author}</span>
                      <span className='text-gray-400 truncate'>{comment.handle}</span>
                      <span className='text-gray-500'>•</span>
                      <span className='text-gray-400'>{comment.time}</span>
                    </div>
                    <p className='mt-1 text-xs md:text-sm text-gray-100 whitespace-pre-line'>
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-sm text-gray-400'>No comments yet.</p>
          )}

          {/* Simple non-functional input placeholder */}
          <div className='mt-5 border-t border-white/10 pt-4'>
            <p className='text-xs text-gray-400 mb-2'>
              Commenting is not wired to a backend yet, but this is where the
              reply box will live.
            </p>
            <div className='flex gap-3'>
              <div className='hidden sm:block'>
                <div className='h-9 w-9 rounded-full overflow-hidden border border-white/20 bg-black/40'>
                  <img src={item.avatar} alt='' className='h-full w-full object-cover' />
                </div>
              </div>
              <div className='flex-1'>
                <div className='bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs md:text-sm text-gray-400'>
                  Write a reply — coming soon.
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NewsDetailPage;
