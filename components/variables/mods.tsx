export interface Mod {
  slug: string;
  image: string;
  title: string;
  category: string;
  author: string;
  date: string;
  updateDate: string;
  desc: string;
  fullDesc: string;
  size: string;
  downloads: string;
  endorsements: string;
  version: string;
  requirements?: string[];
  tags?: string[];
  changelog?: { version: string; date: string; changes: string[] }[];
  images?: string[];
}

export const categories = [
  'All',
  'Areas',
  'Characters',
  'Gameplay',
  'Visuals',
  'Audio',
  'Utilities',
  'Patches',
];

export const mods: Mod[] = [
  {
    slug: 'grotto-improved',
    image: '/images/back-0.jpg',
    title: 'Grotto Improved',
    category: 'Areas',
    author: 'boredom',
    date: '11.11.2003',
    updateDate: '12.10.2025',
    desc: `Changes the library to have a better maze with more Elves seeking for you. Also makes chest harder than usual.`,
    fullDesc: `This mod completely overhauls the Grotto area, adding a more complex maze structure with improved AI for the Elves that patrol it. The treasure chests have been rebalanced to provide more challenging encounters.

## Features
- Redesigned maze layout with multiple paths
- Enhanced Elf AI with better patrol patterns
- Rebalanced chest difficulty and rewards
- New secret areas to discover
- Compatible with most other area mods

## Installation
1. Extract the archive to your game's mod folder
2. Enable the mod in the mod manager
3. Start a new game or load a save before entering the Grotto`,
    size: '8.1MB',
    downloads: '1,247',
    endorsements: '89',
    version: '2.1.0',
    requirements: ['Base Game v1.2+', 'Mod Loader v0.9+'],
    tags: ['Areas', 'Difficulty', 'Overhaul'],
    changelog: [
      { version: '2.1.0', date: '12.10.2025', changes: ['Fixed pathfinding issues', 'Added 2 new secret rooms'] },
      { version: '2.0.0', date: '01.08.2025', changes: ['Complete maze redesign', 'New Elf AI system'] },
      { version: '1.0.0', date: '11.11.2003', changes: ['Initial release'] },
    ],
    images: ['/images/back-0.jpg', '/images/back-1.jpg', '/images/back-2.jpg'],
  },
  {
    slug: 'smaug-retextured',
    image: '/images/back-1.jpg',
    title: 'Smaug Retextured',
    category: 'Visuals',
    author: 'dragonfire',
    date: '15.03.2020',
    updateDate: '22.09.2025',
    desc: `High-resolution texture overhaul for Smaug with 4K scales and enhanced fire effects.`,
    fullDesc: `Experience Smaug like never before with this comprehensive texture overhaul. Every scale has been meticulously recreated in stunning 4K resolution, bringing the great dragon to life with unprecedented detail.

## Features
- 4K texture resolution for all dragon scales
- Enhanced fire and smoke particle effects
- Improved eye textures with realistic reflections
- Optional gold-tinted belly variant
- Performance-optimized with multiple quality options

## Requirements
- Recommended: 8GB VRAM for 4K textures
- Minimum: 4GB VRAM for 2K textures`,
    size: '256MB',
    downloads: '3,892',
    endorsements: '312',
    version: '1.5.2',
    requirements: ['Base Game v1.2+', 'HD Texture Pack (optional)'],
    tags: ['Visuals', 'HD', 'Dragons'],
    changelog: [
      { version: '1.5.2', date: '22.09.2025', changes: ['Fixed texture seams on wings', 'Optimized memory usage'] },
      { version: '1.5.0', date: '10.06.2025', changes: ['Added 2K texture option', 'New fire particle effects'] },
    ],
    images: ['/images/back-1.jpg', '/images/back-0.jpg'],
  },
  {
    slug: 'mirkwood-enhanced',
    image: '/images/back-2.jpg',
    title: 'Mirkwood Enhanced',
    category: 'Areas',
    author: 'forestwalker',
    date: '08.07.2021',
    updateDate: '15.11.2025',
    desc: `Expands Mirkwood forest with new locations, creatures, and atmospheric improvements.`,
    fullDesc: `Journey deeper into the darkness of Mirkwood with this extensive expansion mod. New paths wind through ancient trees, while dangerous creatures lurk in the shadows.

## Features
- 5 new explorable locations within Mirkwood
- 3 new creature types including Giant Spiders variants
- Dynamic fog and lighting system
- New ambient sounds and music
- Side quests and hidden treasures`,
    size: '45MB',
    downloads: '2,156',
    endorsements: '178',
    version: '3.0.1',
    requirements: ['Base Game v1.3+', 'Mod Loader v1.0+'],
    tags: ['Areas', 'Expansion', 'Creatures'],
    changelog: [
      { version: '3.0.1', date: '15.11.2025', changes: ['Bug fixes for quest markers', 'Performance improvements'] },
      { version: '3.0.0', date: '01.11.2025', changes: ['Added 2 new locations', 'New spider variant'] },
    ],
    images: ['/images/back-2.jpg', '/images/back-3.jpg'],
  },
  {
    slug: 'erebor-treasures',
    image: '/images/back-3.jpg',
    title: 'Erebor Treasures',
    category: 'Gameplay',
    author: 'goldsmith',
    date: '25.12.2022',
    updateDate: '05.10.2025',
    desc: `Adds over 50 unique treasures and artifacts to discover throughout Erebor's halls.`,
    fullDesc: `The Lonely Mountain holds countless treasures, and now you can find them all. This mod adds a wealth of new collectible items, each with unique lore and effects.

## Features
- 50+ unique treasure items with custom models
- Treasure hunting quest line
- Display room for collected items
- Lore entries for each treasure
- Integration with achievement system`,
    size: '12MB',
    downloads: '967',
    endorsements: '64',
    version: '1.2.0',
    requirements: ['Base Game v1.2+'],
    tags: ['Gameplay', 'Items', 'Lore'],
    changelog: [
      { version: '1.2.0', date: '05.10.2025', changes: ['Added 15 new treasures', 'Display room feature'] },
      { version: '1.0.0', date: '25.12.2022', changes: ['Initial release with 35 treasures'] },
    ],
    images: ['/images/back-3.jpg', '/images/back-0.jpg'],
  },
  {
    slug: 'bilbo-voice-overhaul',
    image: '/images/back-0.jpg',
    title: 'Bilbo Voice Overhaul',
    category: 'Audio',
    author: 'soundmaster',
    date: '14.02.2023',
    updateDate: '30.08.2025',
    desc: `Professional voice acting replacement for Bilbo with over 200 new lines.`,
    fullDesc: `Give Bilbo a voice worthy of the adventure! This mod replaces all of Bilbo's dialogue with professionally recorded voice acting.

## Features
- 200+ newly recorded voice lines
- Multiple emotion variants for key scenes
- Lip sync support
- Optional subtitles update`,
    size: '89MB',
    downloads: '1,543',
    endorsements: '201',
    version: '1.1.0',
    requirements: ['Base Game v1.2+', 'Audio Framework v0.5+'],
    tags: ['Audio', 'Voice Acting', 'Immersion'],
    changelog: [
      { version: '1.1.0', date: '30.08.2025', changes: ['Added 50 new lines', 'Improved audio quality'] },
    ],
    images: ['/images/back-0.jpg'],
  },
  {
    slug: 'difficulty-rebalance',
    image: '/images/back-1.jpg',
    title: 'Difficulty Rebalance',
    category: 'Gameplay',
    author: 'challengeseeker',
    date: '03.05.2024',
    updateDate: '20.11.2025',
    desc: `Complete difficulty overhaul with new harder modes and smarter enemy AI.`,
    fullDesc: `For those who find the base game too easy, this mod introduces genuinely challenging gameplay without feeling unfair.

## Features
- 3 new difficulty modes: Hard, Nightmare, Impossible
- Smarter enemy AI with flanking tactics
- Resource scarcity options
- Permadeath mode
- Detailed difficulty customization menu`,
    size: '2.4MB',
    downloads: '4,201',
    endorsements: '456',
    version: '2.0.0',
    requirements: ['Base Game v1.3+'],
    tags: ['Gameplay', 'Difficulty', 'AI'],
    changelog: [
      { version: '2.0.0', date: '20.11.2025', changes: ['Added Impossible mode', 'New AI behaviors', 'Customization menu'] },
      { version: '1.0.0', date: '03.05.2024', changes: ['Initial release'] },
    ],
    images: ['/images/back-1.jpg', '/images/back-2.jpg'],
  },
];

export function getModBySlug(slug: string): Mod | undefined {
  return mods.find((mod) => mod.slug === slug);
}
