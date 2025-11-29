export interface NewsComment {
  id: number;
  author: string;
  handle: string;
  avatar: string;
  time: string;
  content: string;
}

export interface NewsItem {
  id: number;
  author: string;
  handle: string;
  avatar: string;
  time: string;
  content: string;
  image?: string;
  stats: {
    replies: number;
    reposts: number;
    likes: number;
  };
  tag?: string;
  comments?: NewsComment[];
}

export const sampleNews: NewsItem[] = [
  {
    id: 1,
    author: 'Hobbit Kingdom',
    handle: '@hobbit_kingdom',
    avatar: '/images/logo.png',
    time: '2h',
    tag: 'Pinned',
    content:
      'Welcome to the new Hobbit Lounge News feed! Stay tuned for updates on mods, events, and new discoveries in The Hobbit (2003).',
    stats: { replies: 2, reposts: 4, likes: 32 },
    comments: [
      {
        id: 1,
        author: 'Bilbo Baggins',
        handle: '@there_and_back_again',
        avatar: '/images/1com.jpg',
        time: '1h',
        content: 'Already loving this place. Can we get more screenshots of Lake-town soon?',
      },
      {
        id: 2,
        author: 'Gandalf',
        handle: '@grey_pilgrim',
        avatar: '/images/1tools.jpg',
        time: '45m',
        content: 'A very good idea. I will bring some fireworks to celebrate the launch.',
      },
    ],
  },
  {
    id: 2,
    author: 'Extended Edition Team',
    handle: '@hobbit_extended',
    avatar: '/images/ext.jpg',
    time: '5h',
    content:
      'We are experimenting with a new secret area for the Extended Edition. Early playtesters report that trolls are angrier than ever.',
    image: '/images/1news.jpg',
    stats: { replies: 3, reposts: 7, likes: 54 },
    comments: [
      {
        id: 1,
        author: 'Troll Enthusiast',
        handle: '@stone_skin',
        avatar: '/images/unp.jpg',
        time: '3h',
        content: 'Angrier trolls sound perfect. Please do not nerf.',
      },
    ],
  },
  {
    id: 3,
    author: 'Modding Council',
    handle: '@hobbit_mods',
    avatar: '/images/1tools.jpg',
    time: '1d',
    content:
      'Community modding night this weekend on Discord. Bring your WIP levels, cursed screenshots, and questions about tools.',
    stats: { replies: 5, reposts: 8, likes: 73 },
    comments: [
      {
        id: 1,
        author: 'LevelDesigner42',
        handle: '@ld42',
        avatar: '/images/cln.jpg',
        time: '22h',
        content: 'I will bring my unfinished Over Hill and Under Hill rework. Please be gentle.',
      },
    ],
  },
];
