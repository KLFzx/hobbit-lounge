import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Path to the JSON file storing user-created articles
const DATA_FILE = path.join(process.cwd(), 'app/wiki/data/user-articles.json');

interface WikiArticle {
  slug: string;
  title: string;
  category: string;
  image?: string;
  infobox?: { label: string; value: string; link?: string }[];
  sections: { heading: string; content: string; image?: string; imageCaption?: string }[];
  relatedArticles?: string[];
  tags?: string[];
}

// Ensure the data file exists
async function ensureDataFile(): Promise<WikiArticle[]> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    // Create the file if it doesn't exist
    await fs.writeFile(DATA_FILE, '[]', 'utf-8');
    return [];
  }
}

// GET - Retrieve all saved articles
export async function GET() {
  try {
    const articles = await ensureDataFile();
    return NextResponse.json({ articles });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load articles' }, { status: 500 });
  }
}

// POST - Save a new article or update existing
export async function POST(request: NextRequest) {
  try {
    const article: WikiArticle = await request.json();
    
    if (!article.slug || !article.title || !article.category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const articles = await ensureDataFile();
    
    // Check if article with this slug already exists
    const existingIndex = articles.findIndex(a => a.slug === article.slug);
    
    if (existingIndex >= 0) {
      // Update existing article
      articles[existingIndex] = article;
    } else {
      // Add new article
      articles.push(article);
    }

    await fs.writeFile(DATA_FILE, JSON.stringify(articles, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true, articles });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save article' }, { status: 500 });
  }
}

// DELETE - Remove an article
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const articles = await ensureDataFile();
    const filteredArticles = articles.filter(a => a.slug !== slug);
    
    await fs.writeFile(DATA_FILE, JSON.stringify(filteredArticles, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true, articles: filteredArticles });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}
