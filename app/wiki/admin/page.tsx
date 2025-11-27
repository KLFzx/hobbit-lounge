'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { wikiCategories, WikiArticle } from '../data/articles';

interface InfoboxItem {
  label: string;
  value: string;
  link?: string;
}

interface Section {
  heading: string;
  content: string;
  image?: string;
  imageCaption?: string;
}

const AdminPage: React.FC = () => {
  // Form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState(wikiCategories[0]);
  const [image, setImage] = useState('');
  const [infobox, setInfobox] = useState<InfoboxItem[]>([{ label: '', value: '', link: '' }]);
  const [sections, setSections] = useState<Section[]>([{ heading: 'Overview', content: '', image: '', imageCaption: '' }]);
  const [relatedArticles, setRelatedArticles] = useState('');
  const [tags, setTags] = useState('');
  
  // UI state
  const [activeTab, setActiveTab] = useState<'edit' | 'preview' | 'code'>('edit');
  const [savedArticles, setSavedArticles] = useState<WikiArticle[]>([]);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Auto-generate slug from title
  useEffect(() => {
    const generatedSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    setSlug(generatedSlug);
  }, [title]);

  // Load saved articles on mount
  useEffect(() => {
    const loadArticles = async () => {
      try {
        const res = await fetch('/api/wiki/articles');
        if (res.ok) {
          const data = await res.json();
          setSavedArticles(data.articles || []);
        }
      } catch (error) {
        console.log('No saved articles found');
      }
    };
    loadArticles();
  }, []);

  // Add infobox item
  const addInfoboxItem = () => {
    setInfobox([...infobox, { label: '', value: '', link: '' }]);
  };

  // Remove infobox item
  const removeInfoboxItem = (index: number) => {
    setInfobox(infobox.filter((_, i) => i !== index));
  };

  // Update infobox item
  const updateInfoboxItem = (index: number, field: keyof InfoboxItem, value: string) => {
    const newInfobox = [...infobox];
    newInfobox[index] = { ...newInfobox[index], [field]: value };
    setInfobox(newInfobox);
  };

  // Add section
  const addSection = () => {
    setSections([...sections, { heading: '', content: '', image: '', imageCaption: '' }]);
  };

  // Remove section
  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  // Update section
  const updateSection = (index: number, field: keyof Section, value: string) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setSections(newSections);
  };

  // Build article object
  const buildArticle = (): WikiArticle => {
    const filteredInfobox = infobox
      .filter(item => item.label && item.value)
      .map(item => item.link ? item : { label: item.label, value: item.value });
    
    const filteredSections = sections
      .filter(s => s.heading && s.content)
      .map(s => {
        const section: any = { heading: s.heading, content: s.content };
        if (s.image) section.image = s.image;
        if (s.imageCaption) section.imageCaption = s.imageCaption;
        return section;
      });

    const article: WikiArticle = {
      slug,
      title,
      category,
      sections: filteredSections,
    };

    if (image) article.image = image;
    if (filteredInfobox.length > 0) article.infobox = filteredInfobox;
    if (relatedArticles.trim()) {
      article.relatedArticles = relatedArticles.split(',').map(s => s.trim()).filter(Boolean);
    }
    if (tags.trim()) {
      article.tags = tags.split(',').map(s => s.trim()).filter(Boolean);
    }

    return article;
  };

  // Generate TypeScript code
  const generateCode = (): string => {
    const article = buildArticle();
    return JSON.stringify(article, null, 2)
      .replace(/"([^"]+)":/g, '$1:')  // Remove quotes from keys
      .replace(/"/g, "'");  // Use single quotes for strings
  };

  // Save article to API
  const saveArticle = async () => {
    setSaveStatus('saving');
    try {
      const article = buildArticle();
      const res = await fetch('/api/wiki/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article),
      });
      
      if (res.ok) {
        setSaveStatus('saved');
        const data = await res.json();
        setSavedArticles(data.articles || []);
        setTimeout(() => setSaveStatus('idle'), 2000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      setSaveStatus('error');
    }
  };

  // Load article for editing
  const loadArticle = (article: WikiArticle) => {
    setTitle(article.title);
    setSlug(article.slug);
    setCategory(article.category);
    setImage(article.image || '');
    setInfobox(article.infobox?.map(i => ({ ...i, link: i.link || '' })) || [{ label: '', value: '', link: '' }]);
    setSections(article.sections.map(s => ({ ...s, image: s.image || '', imageCaption: s.imageCaption || '' })));
    setRelatedArticles(article.relatedArticles?.join(', ') || '');
    setTags(article.tags?.join(', ') || '');
    setActiveTab('edit');
  };

  // Clear form
  const clearForm = () => {
    setTitle('');
    setSlug('');
    setCategory(wikiCategories[0]);
    setImage('');
    setInfobox([{ label: '', value: '', link: '' }]);
    setSections([{ heading: 'Overview', content: '', image: '', imageCaption: '' }]);
    setRelatedArticles('');
    setTags('');
  };

  // Delete article
  const deleteArticle = async (slugToDelete: string) => {
    if (!confirm(`Delete article "${slugToDelete}"?`)) return;
    
    try {
      const res = await fetch(`/api/wiki/articles?slug=${slugToDelete}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        const data = await res.json();
        setSavedArticles(data.articles || []);
      }
    } catch (error) {
      console.error('Failed to delete article');
    }
  };

  return (
    <div className='min-h-screen bg-[#1a1a1a]'>
      <Navbar id={4}></Navbar>

      {/* Header */}
      <div className='bg-[#2a2a2a] border-b border-[#3a3a3a] pt-20 pb-4 px-4'>
        <div className='max-w-7xl mx-auto flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <Link href='/wiki' className='text-[#f5c518] hover:underline'>← Wiki</Link>
            <h1 className='text-2xl font-bold text-[#f5c518]'>Wiki Admin Panel</h1>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto p-6 flex gap-6'>
        {/* Saved Articles Sidebar */}
        <aside className='w-64 flex-shrink-0'>
          <div className='bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-4 sticky top-24'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-[#f5c518] font-bold'>Saved Articles</h2>
              <button
                onClick={clearForm}
                className='text-xs bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white px-2 py-1 rounded'
              >
                + New
              </button>
            </div>
            
            {savedArticles.length === 0 ? (
              <p className='text-gray-400 text-sm'>No saved articles yet</p>
            ) : (
              <ul className='space-y-2'>
                {savedArticles.map((article) => (
                  <li key={article.slug} className='flex items-center justify-between group'>
                    <button
                      onClick={() => loadArticle(article)}
                      className='text-[#8ab4f8] hover:underline text-sm text-left flex-1 truncate'
                    >
                      {article.title}
                    </button>
                    <button
                      onClick={() => deleteArticle(article.slug)}
                      className='text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 ml-2'
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
            
            <div className='mt-4 pt-4 border-t border-[#3a3a3a]'>
              <p className='text-gray-400 text-xs'>
                Articles are saved to a JSON file. Copy the generated code to <code className='text-[#8ab4f8]'>articles.ts</code> for permanent storage.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Editor */}
        <main className='flex-1'>
          {/* Tabs */}
          <div className='flex gap-2 mb-4'>
            <button
              onClick={() => setActiveTab('edit')}
              className={`px-4 py-2 rounded-t ${activeTab === 'edit' ? 'bg-[#2a2a2a] text-[#f5c518]' : 'bg-[#1a1a1a] text-gray-400 hover:text-white'}`}
            >
              Edit
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 rounded-t ${activeTab === 'preview' ? 'bg-[#2a2a2a] text-[#f5c518]' : 'bg-[#1a1a1a] text-gray-400 hover:text-white'}`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-4 py-2 rounded-t ${activeTab === 'code' ? 'bg-[#2a2a2a] text-[#f5c518]' : 'bg-[#1a1a1a] text-gray-400 hover:text-white'}`}
            >
              Generated Code
            </button>
          </div>

          <div className='bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-6'>
            {/* Edit Tab */}
            {activeTab === 'edit' && (
              <div className='space-y-6'>
                {/* Basic Info */}
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-gray-400 text-sm mb-1'>Title *</label>
                    <input
                      type='text'
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className='w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded px-3 py-2 text-white focus:outline-none focus:border-[#f5c518]'
                      placeholder='Article Title'
                    />
                  </div>
                  <div>
                    <label className='block text-gray-400 text-sm mb-1'>URL Slug</label>
                    <input
                      type='text'
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className='w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded px-3 py-2 text-white focus:outline-none focus:border-[#f5c518]'
                      placeholder='article-slug'
                    />
                    <p className='text-gray-500 text-xs mt-1'>/wiki/{slug || 'article-slug'}</p>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-gray-400 text-sm mb-1'>Category *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className='w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded px-3 py-2 text-white focus:outline-none focus:border-[#f5c518]'
                    >
                      {wikiCategories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className='block text-gray-400 text-sm mb-1'>Main Image URL</label>
                    <input
                      type='text'
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className='w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded px-3 py-2 text-white focus:outline-none focus:border-[#f5c518]'
                      placeholder='/images/beta/image.jpg'
                    />
                  </div>
                </div>

                {/* Infobox */}
                <div>
                  <div className='flex items-center justify-between mb-2'>
                    <label className='text-gray-400 text-sm'>Infobox (Sidebar Info)</label>
                    <button
                      onClick={addInfoboxItem}
                      className='text-xs bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white px-2 py-1 rounded'
                    >
                      + Add Field
                    </button>
                  </div>
                  <div className='space-y-2'>
                    {infobox.map((item, idx) => (
                      <div key={idx} className='flex gap-2'>
                        <input
                          type='text'
                          value={item.label}
                          onChange={(e) => updateInfoboxItem(idx, 'label', e.target.value)}
                          className='flex-1 bg-[#1a1a1a] border border-[#3a3a3a] rounded px-3 py-2 text-white text-sm'
                          placeholder='Label (e.g., Race)'
                        />
                        <input
                          type='text'
                          value={item.value}
                          onChange={(e) => updateInfoboxItem(idx, 'value', e.target.value)}
                          className='flex-1 bg-[#1a1a1a] border border-[#3a3a3a] rounded px-3 py-2 text-white text-sm'
                          placeholder='Value (e.g., Hobbit)'
                        />
                        <input
                          type='text'
                          value={item.link || ''}
                          onChange={(e) => updateInfoboxItem(idx, 'link', e.target.value)}
                          className='w-32 bg-[#1a1a1a] border border-[#3a3a3a] rounded px-3 py-2 text-white text-sm'
                          placeholder='Link slug'
                        />
                        <button
                          onClick={() => removeInfoboxItem(idx)}
                          className='text-red-400 hover:text-red-300 px-2'
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sections */}
                <div>
                  <div className='flex items-center justify-between mb-2'>
                    <label className='text-gray-400 text-sm'>Content Sections *</label>
                    <button
                      onClick={addSection}
                      className='text-xs bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white px-2 py-1 rounded'
                    >
                      + Add Section
                    </button>
                  </div>
                  <div className='space-y-4'>
                    {sections.map((section, idx) => (
                      <div key={idx} className='bg-[#1a1a1a] border border-[#3a3a3a] rounded p-4'>
                        <div className='flex items-center justify-between mb-2'>
                          <input
                            type='text'
                            value={section.heading}
                            onChange={(e) => updateSection(idx, 'heading', e.target.value)}
                            className='bg-transparent border-b border-[#3a3a3a] text-white font-medium focus:outline-none focus:border-[#f5c518] flex-1'
                            placeholder='Section Heading'
                          />
                          <button
                            onClick={() => removeSection(idx)}
                            className='text-red-400 hover:text-red-300 ml-2'
                          >
                            ×
                          </button>
                        </div>
                        <textarea
                          value={section.content}
                          onChange={(e) => updateSection(idx, 'content', e.target.value)}
                          className='w-full bg-[#252525] border border-[#3a3a3a] rounded px-3 py-2 text-white text-sm min-h-[100px] focus:outline-none focus:border-[#f5c518]'
                          placeholder='Section content...'
                        />
                        <div className='grid grid-cols-2 gap-2 mt-2'>
                          <input
                            type='text'
                            value={section.image || ''}
                            onChange={(e) => updateSection(idx, 'image', e.target.value)}
                            className='bg-[#252525] border border-[#3a3a3a] rounded px-3 py-2 text-white text-sm'
                            placeholder='Section image URL (optional)'
                          />
                          <input
                            type='text'
                            value={section.imageCaption || ''}
                            onChange={(e) => updateSection(idx, 'imageCaption', e.target.value)}
                            className='bg-[#252525] border border-[#3a3a3a] rounded px-3 py-2 text-white text-sm'
                            placeholder='Image caption (optional)'
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Meta */}
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-gray-400 text-sm mb-1'>Related Articles (comma-separated slugs)</label>
                    <input
                      type='text'
                      value={relatedArticles}
                      onChange={(e) => setRelatedArticles(e.target.value)}
                      className='w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded px-3 py-2 text-white focus:outline-none focus:border-[#f5c518]'
                      placeholder='bilbo-baggins, gandalf, rivendell'
                    />
                  </div>
                  <div>
                    <label className='block text-gray-400 text-sm mb-1'>Tags (comma-separated)</label>
                    <input
                      type='text'
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className='w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded px-3 py-2 text-white focus:outline-none focus:border-[#f5c518]'
                      placeholder='character, protagonist, hobbit'
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className='flex gap-4 pt-4 border-t border-[#3a3a3a]'>
                  <button
                    onClick={saveArticle}
                    disabled={!title || !slug || sections.filter(s => s.heading && s.content).length === 0}
                    className='bg-[#f5c518] text-black px-6 py-2 rounded font-medium hover:bg-[#d4a914] disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? '✓ Saved!' : 'Save Article'}
                  </button>
                  <button
                    onClick={() => setActiveTab('preview')}
                    className='bg-[#3a3a3a] text-white px-6 py-2 rounded hover:bg-[#4a4a4a]'
                  >
                    Preview
                  </button>
                  <button
                    onClick={clearForm}
                    className='text-gray-400 hover:text-white px-4 py-2'
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}

            {/* Preview Tab */}
            {activeTab === 'preview' && (
              <div>
                <div className='border-b border-[#3a3a3a] pb-4 mb-6'>
                  <h1 className='text-4xl font-serif text-white mb-2'>{title || 'Untitled Article'}</h1>
                  <div className='flex gap-4 text-sm text-gray-400'>
                    <span className='bg-[#3a3a3a] px-2 py-1 rounded'>{category}</span>
                    {tags && tags.split(',').map((tag, idx) => (
                      <span key={idx} className='text-[#8ab4f8]'>#{tag.trim()}</span>
                    ))}
                  </div>
                </div>

                <div className='flex gap-6'>
                  <div className='flex-1'>
                    {sections.filter(s => s.heading && s.content).map((section, idx) => (
                      <div key={idx} className='mb-8'>
                        <h2 className='text-2xl font-serif text-white border-b border-[#3a3a3a] pb-2 mb-4'>
                          {section.heading}
                        </h2>
                        <p className='text-gray-300 leading-relaxed'>{section.content}</p>
                        {section.image && (
                          <figure className='my-4'>
                            <img src={section.image} alt={section.imageCaption || ''} className='max-w-md rounded' />
                            {section.imageCaption && (
                              <figcaption className='text-sm text-gray-400 mt-2 italic'>{section.imageCaption}</figcaption>
                            )}
                          </figure>
                        )}
                      </div>
                    ))}
                  </div>

                  {(image || infobox.some(i => i.label && i.value)) && (
                    <div className='w-64 flex-shrink-0'>
                      <div className='bg-[#252525] border border-[#3a3a3a] rounded overflow-hidden'>
                        <div className='bg-[#f5c518] px-4 py-2'>
                          <h3 className='text-black font-bold text-center'>{title}</h3>
                        </div>
                        {image && (
                          <div className='p-4 flex justify-center bg-[#1a1a1a]'>
                            <img src={image} alt={title} className='max-w-full h-auto max-h-48 object-contain' />
                          </div>
                        )}
                        <table className='w-full text-sm'>
                          <tbody>
                            {infobox.filter(i => i.label && i.value).map((item, idx) => (
                              <tr key={idx} className={idx % 2 === 0 ? 'bg-[#2a2a2a]' : 'bg-[#252525]'}>
                                <td className='px-3 py-2 text-gray-400 font-medium border-r border-[#3a3a3a]'>{item.label}</td>
                                <td className='px-3 py-2 text-white'>{item.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Code Tab */}
            {activeTab === 'code' && (
              <div>
                <p className='text-gray-400 mb-4'>
                  Copy this code and add it to the <code className='text-[#8ab4f8]'>articles</code> array in{' '}
                  <code className='text-[#8ab4f8]'>app/wiki/data/articles.ts</code>
                </p>
                <div className='relative'>
                  <pre className='bg-[#1a1a1a] border border-[#3a3a3a] rounded p-4 text-sm text-gray-300 overflow-x-auto'>
                    {generateCode()}
                  </pre>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generateCode());
                    }}
                    className='absolute top-2 right-2 bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white px-3 py-1 rounded text-sm'
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
