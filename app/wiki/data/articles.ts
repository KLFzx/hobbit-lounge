// Wiki Articles Data
// Add new articles here - they will automatically appear in the wiki

export interface WikiArticle {
  slug: string;           // URL slug (e.g., 'bilbo-baggins' -> /wiki/bilbo-baggins)
  title: string;          // Display title
  category: string;       // Category for sidebar grouping
  image?: string;         // Main image path
  infobox?: {
    label: string;
    value: string;
    link?: string;        // Optional link to another article
  }[];
  sections: {
    heading: string;
    content: string;
    image?: string;       // Optional section image
    imageCaption?: string;
  }[];
  relatedArticles?: string[];  // Slugs of related articles
  tags?: string[];        // Tags for categorization
}

export const wikiCategories = [
  'Characters',
  'Locations', 
  'Levels',
  'Items',
  'Enemies',
  'Gameplay',
  'Development',
];

export const articles: WikiArticle[] = [
  // ============================================
  // CHARACTERS
  // ============================================
  {
    slug: 'bilbo-baggins',
    title: 'Bilbo Baggins',
    category: 'Characters',
    image: '/images/beta/Hobbit_The_PS2_-_Trading_Card_-_Bilbo_Baggins.jpg',
    infobox: [
      { label: 'Race', value: 'Hobbit' },
      { label: 'Home', value: 'Bag End, Hobbiton', link: 'bag-end' },
      { label: 'Weapon', value: 'Sting, Walking Stick', link: 'sting' },
      { label: 'Abilities', value: 'Stealth, Rock Throwing' },
      { label: 'Voice Actor', value: 'Michael Beattie' },
    ],
    sections: [
      {
        heading: 'Overview',
        content: 'Bilbo Baggins is the main protagonist and playable character in The Hobbit (2003) video game. He is a hobbit of the Shire who embarks on an unexpected adventure with Gandalf and thirteen dwarves to reclaim the Lonely Mountain from the dragon Smaug.',
      },
      {
        heading: 'Gameplay',
        content: 'Players control Bilbo throughout the entire game. He starts with basic abilities like jumping and climbing, but gains new skills as the game progresses. His main weapons include a walking stick for melee combat, rocks for ranged attacks, and later the legendary elvish blade Sting.',
      },
      {
        heading: 'Abilities',
        content: 'Bilbo can perform various actions including: climbing ropes and ladders, swimming, pushing and pulling objects, sneaking past enemies, and using the One Ring to become invisible (after obtaining it from Gollum).',
      },
      {
        heading: 'Trivia',
        content: "Bilbo's character model was carefully designed to match his description in the book while also being appealing for a video game protagonist. His animations include over 200 unique movements.",
      },
    ],
    relatedArticles: ['gandalf', 'sting', 'the-one-ring', 'bag-end'],
    tags: ['protagonist', 'playable', 'hobbit'],
  },
  {
    slug: 'gandalf',
    title: 'Gandalf',
    category: 'Characters',
    image: '/images/beta/Hobbit_The_PS2_-_Trading_Card_-_Gandalf_the_Wizard.jpg',
    infobox: [
      { label: 'Race', value: 'Maia (Wizard)' },
      { label: 'Also Known As', value: 'Gandalf the Grey' },
      { label: 'Weapon', value: 'Staff, Glamdring' },
      { label: 'Role', value: 'Quest Giver, Guide' },
    ],
    sections: [
      {
        heading: 'Overview',
        content: 'Gandalf the Grey is a powerful wizard who recruits Bilbo for the quest to reclaim Erebor. He serves as a guide and mentor throughout the adventure, though he often disappears at crucial moments.',
      },
      {
        heading: 'Role in Game',
        content: 'Gandalf appears in cutscenes and provides guidance to Bilbo at various points. He helps during the troll encounter and leads the company to Rivendell. Players cannot control Gandalf directly.',
      },
    ],
    relatedArticles: ['bilbo-baggins', 'thorin-oakenshield', 'rivendell'],
    tags: ['wizard', 'npc', 'ally'],
  },
  {
    slug: 'thorin-oakenshield',
    title: 'Thorin Oakenshield',
    category: 'Characters',
    infobox: [
      { label: 'Race', value: 'Dwarf' },
      { label: 'Title', value: 'King under the Mountain' },
      { label: 'Home', value: 'Erebor', link: 'erebor' },
      { label: 'Weapon', value: 'Orcrist' },
    ],
    sections: [
      {
        heading: 'Overview',
        content: 'Thorin Oakenshield is the leader of the company of dwarves and the rightful King under the Mountain. He seeks to reclaim his homeland of Erebor from the dragon Smaug.',
      },
      {
        heading: 'Role in Game',
        content: 'Thorin leads the dwarf company and appears in many cutscenes throughout the game. He provides context for the quest and motivates the party to continue despite dangers.',
      },
    ],
    relatedArticles: ['bilbo-baggins', 'erebor', 'smaug'],
    tags: ['dwarf', 'npc', 'ally', 'royalty'],
  },
  {
    slug: 'gollum',
    title: 'Gollum',
    category: 'Characters',
    image: '/images/beta/Hobbit_The_PS2_-_Trading_Card_-_Gollum.jpg',
    infobox: [
      { label: 'Race', value: 'Hobbit (corrupted)' },
      { label: 'Also Known As', value: 'Sméagol' },
      { label: 'Home', value: 'Goblin Caves' },
      { label: 'Precious', value: 'The One Ring', link: 'the-one-ring' },
    ],
    sections: [
      {
        heading: 'Overview',
        content: 'Gollum is a creature corrupted by the One Ring, which he possessed for nearly 500 years. He lives in the depths of the Goblin caves beneath the Misty Mountains.',
      },
      {
        heading: 'Riddles in the Dark',
        content: "Bilbo encounters Gollum in one of the game's most memorable levels. Players must engage in a riddle contest with Gollum, answering his riddles correctly to progress. This is where Bilbo obtains the One Ring.",
        image: '/images/beta/Hobbit_The_PS2_-_Trading_Card_-_Gollum_back.jpg',
        imageCaption: 'Gollum in his cave',
      },
    ],
    relatedArticles: ['bilbo-baggins', 'the-one-ring', 'riddles-in-the-dark'],
    tags: ['antagonist', 'corrupted', 'ring-bearer'],
  },
  {
    slug: 'smaug',
    title: 'Smaug',
    category: 'Characters',
    image: '/images/beta/Hobbit_The_PS2_-_Trading_Card_-_Smaug_the_Dragon.jpg',
    infobox: [
      { label: 'Race', value: 'Dragon' },
      { label: 'Home', value: 'Erebor', link: 'erebor' },
      { label: 'Title', value: 'The Magnificent' },
      { label: 'Weakness', value: 'Missing scale on left breast' },
    ],
    sections: [
      {
        heading: 'Overview',
        content: 'Smaug is a great fire-drake and the main antagonist of the story. He attacked the Dwarf kingdom of Erebor and claimed its vast treasure hoard as his own.',
      },
      {
        heading: 'Boss Fight',
        content: 'The confrontation with Smaug is the climactic final battle of the game. Players must use stealth and cunning to navigate his treasure hoard while avoiding his deadly fire breath.',
        image: '/images/beta/Hobbit_The_PS2_-_Trading_Card_-_Smaug_the_Dragon_back.jpg',
        imageCaption: 'Smaug guarding his treasure',
      },
    ],
    relatedArticles: ['erebor', 'thorin-oakenshield', 'inside-information'],
    tags: ['dragon', 'boss', 'antagonist'],
  },

  // ============================================
  // LOCATIONS
  // ============================================
  {
    slug: 'bag-end',
    title: 'Bag End',
    category: 'Locations',
    image: '/images/beta/bilbo house01.jpg',
    infobox: [
      { label: 'Type', value: 'Hobbit Hole' },
      { label: 'Location', value: 'Hobbiton, The Shire' },
      { label: 'Owner', value: 'Bilbo Baggins', link: 'bilbo-baggins' },
      { label: 'Appears In', value: 'Dream World, An Unexpected Party' },
    ],
    sections: [
      {
        heading: 'Overview',
        content: 'Bag End is the comfortable hobbit-hole home of Bilbo Baggins, located in Hobbiton. It is where the adventure begins when Gandalf and the dwarves arrive unexpectedly.',
      },
      {
        heading: 'In Game',
        content: 'Players explore Bag End during the tutorial Dream World level and at the start of An Unexpected Party. The iconic round green door and cozy interior are faithfully recreated.',
        image: '/images/beta/new hobbit hole day.jpg',
        imageCaption: 'Bag End exterior',
      },
    ],
    relatedArticles: ['bilbo-baggins', 'dream-world', 'an-unexpected-party'],
    tags: ['hobbiton', 'home', 'the-shire'],
  },
  {
    slug: 'rivendell',
    title: 'Rivendell',
    category: 'Locations',
    image: '/images/beta/rivendell_ztavern area.jpg',
    infobox: [
      { label: 'Type', value: 'Elven Settlement' },
      { label: 'Ruler', value: 'Lord Elrond' },
      { label: 'Also Known As', value: 'Imladris, The Last Homely House' },
      { label: 'Levels', value: '2' },
    ],
    sections: [
      {
        heading: 'Overview',
        content: 'Rivendell is a peaceful elven refuge hidden in the foothills of the Misty Mountains. It serves as a safe haven for the company during their journey and is home to Lord Elrond.',
      },
      {
        heading: 'In Game',
        content: 'Rivendell serves as a hub area where players can explore, collect items, and interact with various characters. The beautiful elven architecture provides a stark contrast to the dangers that await beyond.',
        image: '/images/beta/rivendell fire hall 01.jpg',
        imageCaption: 'Rivendell Fire Hall',
      },
      {
        heading: 'Extended Edition Content',
        content: 'The Extended Edition adds new areas to explore in Rivendell, including the Secret Grotto, additional shops, and new side quests involving the elven residents.',
        image: '/images/beta/rivendell_treehouse.JPG',
        imageCaption: 'Rivendell Treehouse - Extended Edition',
      },
    ],
    relatedArticles: ['gandalf', 'over-hill-and-under-hill'],
    tags: ['elven', 'hub', 'safe-zone'],
  },
  {
    slug: 'erebor',
    title: 'Erebor',
    category: 'Locations',
    infobox: [
      { label: 'Type', value: 'Dwarven Kingdom' },
      { label: 'Also Known As', value: 'The Lonely Mountain' },
      { label: 'Ruler', value: 'Smaug (current)', link: 'smaug' },
      { label: 'Former Ruler', value: 'Thrór' },
    ],
    sections: [
      {
        heading: 'Overview',
        content: 'Erebor, also known as the Lonely Mountain, is the ancient kingdom of the dwarves and the ultimate destination of the quest. It was conquered by the dragon Smaug, who now sleeps atop its vast treasure hoard.',
      },
      {
        heading: 'In Game',
        content: 'The final levels of the game take place within Erebor. Players must navigate the mountain\'s halls while avoiding detection by Smaug.',
      },
    ],
    relatedArticles: ['smaug', 'thorin-oakenshield', 'inside-information'],
    tags: ['dwarven', 'mountain', 'final-area'],
  },
  {
    slug: 'mirkwood',
    title: 'Mirkwood',
    category: 'Locations',
    image: '/images/beta/wood elf cave enterance01.jpg',
    infobox: [
      { label: 'Type', value: 'Forest' },
      { label: 'Also Known As', value: 'The Forest of Great Fear' },
      { label: 'Inhabitants', value: 'Wood Elves, Spiders' },
      { label: 'Levels', value: 'Flies and Spiders, Barrels Out of Bond' },
    ],
    sections: [
      {
        heading: 'Overview',
        content: 'Mirkwood is a vast and dangerous forest that the company must traverse. It is home to giant spiders, hostile creatures, and the Wood Elves who capture the dwarves.',
      },
      {
        heading: 'In Game',
        content: 'The Mirkwood levels feature dense forest environments with platforming challenges and spider enemies. Players must navigate carefully to avoid getting lost or overwhelmed.',
        image: '/images/beta/wood elf cave enterance02.jpg',
        imageCaption: 'Wood Elf Cave Entrance',
      },
    ],
    relatedArticles: ['flies-and-spiders', 'barrels-out-of-bond'],
    tags: ['forest', 'dangerous', 'spiders'],
  },

  // ============================================
  // LEVELS
  // ============================================
  {
    slug: 'dream-world',
    title: 'Dream World',
    category: 'Levels',
    infobox: [
      { label: 'Type', value: 'Tutorial Level' },
      { label: 'Location', value: 'Bag End', link: 'bag-end' },
      { label: 'Enemies', value: 'None' },
      { label: 'Collectibles', value: 'Tutorial Items' },
    ],
    sections: [
      {
        heading: 'Overview',
        content: 'Dream World is the tutorial level where players learn the basic controls and mechanics. Bilbo dreams of exploring his home and the surrounding area.',
      },
      {
        heading: 'Gameplay',
        content: 'This level teaches jumping, climbing, swimming, and basic interaction. There are no enemies, making it a safe environment to learn the controls.',
      },
    ],
    relatedArticles: ['bilbo-baggins', 'bag-end', 'an-unexpected-party'],
    tags: ['tutorial', 'beginner', 'first-level'],
  },
  {
    slug: 'an-unexpected-party',
    title: 'An Unexpected Party',
    category: 'Levels',
    image: '/images/beta/hobbit holes.jpg',
    infobox: [
      { label: 'Type', value: 'Story Level' },
      { label: 'Location', value: 'Hobbiton' },
      { label: 'Enemies', value: 'Wolves (later)' },
      { label: 'Key Item', value: 'Contract' },
    ],
    sections: [
      {
        heading: 'Overview',
        content: 'An Unexpected Party is the first story level, beginning with the famous gathering of dwarves at Bag End. Bilbo must prepare for the journey and eventually sets out with the company.',
      },
      {
        heading: 'Objectives',
        content: 'Players explore Hobbiton, gather supplies, and complete tasks for the dwarves before setting out on the adventure.',
      },
    ],
    relatedArticles: ['bilbo-baggins', 'gandalf', 'bag-end', 'roast-mutton'],
    tags: ['story', 'hobbiton', 'beginning'],
  },
  {
    slug: 'roast-mutton',
    title: 'Roast Mutton',
    category: 'Levels',
    image: '/images/beta/Roast mutton 01.jpg',
    infobox: [
      { label: 'Type', value: 'Story Level' },
      { label: 'Location', value: 'Troll Forest' },
      { label: 'Enemies', value: 'Wolves, Trolls' },
      { label: 'Boss', value: 'Tom, Bert, and William' },
    ],
    sections: [
      {
        heading: 'Overview',
        content: 'Roast Mutton is the second major level in the game. Bilbo must navigate through a dangerous forest and eventually confront three hungry trolls who have captured the dwarves.',
      },
      {
        heading: 'Gameplay',
        content: 'This level introduces more complex combat and stealth mechanics. Players must sneak through the forest, avoiding or fighting wolves, before reaching the troll camp.',
        image: '/images/beta/Roast mutton 02.jpg',
        imageCaption: 'The Troll Camp',
      },
      {
        heading: 'Extended Edition',
        content: 'The Extended Edition features additional troll dialogue and expanded areas to explore in this level, including new secrets and collectibles.',
        image: '/images/beta/Roast mutton 03.jpg',
        imageCaption: 'Extended areas in Roast Mutton',
      },
    ],
    relatedArticles: ['an-unexpected-party', 'over-hill-and-under-hill'],
    tags: ['story', 'trolls', 'combat'],
  },
  {
    slug: 'over-hill-and-under-hill',
    title: 'Over Hill and Under Hill',
    category: 'Levels',
    infobox: [
      { label: 'Type', value: 'Story Level' },
      { label: 'Location', value: 'Misty Mountains' },
      { label: 'Enemies', value: 'Goblins, Stone Giants' },
      { label: 'Boss', value: 'Great Goblin' },
    ],
    sections: [
      {
        heading: 'Overview',
        content: 'Over Hill and Under Hill takes place in the treacherous Misty Mountains. The company must cross the mountain passes and eventually ends up captured in the goblin caves.',
      },
      {
        heading: 'Gameplay',
        content: 'This challenging level features mountain climbing, cave exploration, and intense combat with goblin enemies. The Stone Giant encounter is a memorable set piece.',
      },
    ],
    relatedArticles: ['roast-mutton', 'riddles-in-the-dark', 'rivendell'],
    tags: ['story', 'goblins', 'mountains'],
  },
  {
    slug: 'riddles-in-the-dark',
    title: 'Riddles in the Dark',
    category: 'Levels',
    infobox: [
      { label: 'Type', value: 'Story Level' },
      { label: 'Location', value: 'Goblin Caves' },
      { label: 'Key Character', value: 'Gollum', link: 'gollum' },
      { label: 'Key Item', value: 'The One Ring', link: 'the-one-ring' },
    ],
    sections: [
      {
        heading: 'Overview',
        content: "One of the game's most iconic levels, Riddles in the Dark features Bilbo's encounter with Gollum. Players must win a riddle contest to escape the caves.",
      },
      {
        heading: 'The Riddle Game',
        content: 'Players engage in a back-and-forth riddle contest with Gollum. Answering incorrectly has consequences, making this a tense and memorable sequence.',
      },
      {
        heading: 'Obtaining the Ring',
        content: 'During this level, Bilbo discovers the One Ring, which grants him the ability to become invisible - a crucial ability for later levels.',
      },
    ],
    relatedArticles: ['gollum', 'the-one-ring', 'over-hill-and-under-hill'],
    tags: ['story', 'riddles', 'gollum', 'ring'],
  },

  // ============================================
  // ITEMS
  // ============================================
  {
    slug: 'sting',
    title: 'Sting',
    category: 'Items',
    infobox: [
      { label: 'Type', value: 'Weapon (Sword)' },
      { label: 'Origin', value: 'Elvish' },
      { label: 'Found In', value: 'Troll Hoard' },
      { label: 'Special', value: 'Glows blue near Orcs/Goblins' },
    ],
    sections: [
      {
        heading: 'Overview',
        content: "Sting is an ancient Elvish blade that Bilbo discovers in the trolls' hoard. It becomes his primary weapon for the rest of the adventure.",
      },
      {
        heading: 'In Game',
        content: 'Sting replaces the walking stick as Bilbo\'s melee weapon after it is obtained. It deals more damage and has a unique blue glow effect when enemies are nearby.',
      },
    ],
    relatedArticles: ['bilbo-baggins', 'roast-mutton'],
    tags: ['weapon', 'elvish', 'sword'],
  },
  {
    slug: 'the-one-ring',
    title: 'The One Ring',
    category: 'Items',
    infobox: [
      { label: 'Type', value: 'Magical Item' },
      { label: 'Ability', value: 'Invisibility' },
      { label: 'Found In', value: 'Riddles in the Dark', link: 'riddles-in-the-dark' },
      { label: 'Previous Owner', value: 'Gollum', link: 'gollum' },
    ],
    sections: [
      {
        heading: 'Overview',
        content: 'The One Ring is a powerful artifact that grants its wearer invisibility. Bilbo finds it in the goblin caves and uses it throughout the rest of his adventure.',
      },
      {
        heading: 'Gameplay Mechanic',
        content: 'Using the Ring makes Bilbo invisible to most enemies, allowing for stealth gameplay. However, it drains a meter while active, limiting how long it can be used.',
      },
    ],
    relatedArticles: ['gollum', 'riddles-in-the-dark', 'bilbo-baggins'],
    tags: ['magical', 'stealth', 'key-item'],
  },

  // ============================================
  // GAMEPLAY
  // ============================================
  {
    slug: 'combat-system',
    title: 'Combat System',
    category: 'Gameplay',
    infobox: [
      { label: 'Type', value: 'Game Mechanic' },
      { label: 'Weapons', value: 'Walking Stick, Sting, Rocks' },
      { label: 'Defense', value: 'Dodge, Block' },
    ],
    sections: [
      {
        heading: 'Overview',
        content: 'The combat system in The Hobbit combines melee attacks, ranged rock throwing, and stealth mechanics.',
      },
      {
        heading: 'Melee Combat',
        content: 'Bilbo can perform basic attacks, charged attacks, and combos using his walking stick or Sting. Timing and positioning are important for effective combat.',
      },
      {
        heading: 'Ranged Combat',
        content: 'Rocks can be thrown at enemies from a distance. This is useful for triggering traps, distracting enemies, or dealing with foes from safety.',
      },
      {
        heading: 'Stealth',
        content: 'Many encounters can be avoided entirely through stealth. The One Ring enhances stealth capabilities by making Bilbo invisible.',
      },
    ],
    relatedArticles: ['sting', 'the-one-ring', 'bilbo-baggins'],
    tags: ['mechanics', 'combat', 'guide'],
  },
];

// Helper function to get article by slug
export function getArticleBySlug(slug: string): WikiArticle | undefined {
  return articles.find(a => a.slug === slug);
}

// Helper function to get articles by category
export function getArticlesByCategory(category: string): WikiArticle[] {
  return articles.filter(a => a.category === category);
}

// Helper function to get all slugs (for static generation)
export function getAllSlugs(): string[] {
  return articles.map(a => a.slug);
}

// Helper function to search articles
export function searchArticles(query: string): WikiArticle[] {
  const lowercaseQuery = query.toLowerCase();
  return articles.filter(a => 
    a.title.toLowerCase().includes(lowercaseQuery) ||
    a.sections.some(s => s.content.toLowerCase().includes(lowercaseQuery)) ||
    a.tags?.some(t => t.toLowerCase().includes(lowercaseQuery))
  );
}
