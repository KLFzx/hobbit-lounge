'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

const betaImages = [
  { src: '/images/beta/Hobbit_characters_small.png', title: 'Hobbit Characters' },
  { src: '/images/beta/Hobbit_The_PS2_-_Trading_Card_-_Bilbo_Baggins.jpg', title: 'Trading Card - Bilbo Baggins' },
  { src: '/images/beta/Hobbit_The_PS2_-_Trading_Card_-_Bilbo_Baggins_back.jpg', title: 'Trading Card - Bilbo Baggins (Back)' },
  { src: '/images/beta/Hobbit_The_PS2_-_Trading_Card_-_Gandalf_the_Wizard.jpg', title: 'Trading Card - Gandalf' },
  { src: '/images/beta/Hobbit_The_PS2_-_Trading_Card_-_Gandalf_the_Wizard_back.jpg', title: 'Trading Card - Gandalf (Back)' },
  { src: '/images/beta/Hobbit_The_PS2_-_Trading_Card_-_Gollum.jpg', title: 'Trading Card - Gollum' },
  { src: '/images/beta/Hobbit_The_PS2_-_Trading_Card_-_Gollum_back.jpg', title: 'Trading Card - Gollum (Back)' },
  { src: '/images/beta/Hobbit_The_PS2_-_Trading_Card_-_Smaug_the_Dragon.jpg', title: 'Trading Card - Smaug' },
  { src: '/images/beta/Hobbit_The_PS2_-_Trading_Card_-_Smaug_the_Dragon_back.jpg', title: 'Trading Card - Smaug (Back)' },
  { src: '/images/beta/bilbo house01.jpg', title: 'Bilbo House' },
  { src: '/images/beta/new hobbit hole day.jpg', title: 'Hobbit Hole - Day' },
  { src: '/images/beta/new hobbit hole.jpg', title: 'Hobbit Hole' },
  { src: '/images/beta/new hobbit hole01.jpg', title: 'Hobbit Hole 01' },
  { src: '/images/beta/hobbit holes.jpg', title: 'Hobbit Holes' },
  { src: '/images/beta/blackdeathhobbiton.jpg', title: 'Black Death Hobbiton' },
  { src: '/images/beta/Roast mutton 01.jpg', title: 'Roast Mutton 01' },
  { src: '/images/beta/Roast mutton 02.jpg', title: 'Roast Mutton 02' },
  { src: '/images/beta/Roast mutton 03.jpg', title: 'Roast Mutton 03' },
  { src: '/images/beta/roast mutton01.jpg', title: 'Roast Mutton' },
  { src: '/images/beta/rivendale fire hall 01.jpg', title: 'Rivendell Fire Hall 01' },
  { src: '/images/beta/rivendale fire hall 02.jpg', title: 'Rivendell Fire Hall 02' },
  { src: '/images/beta/rivendell fire hall 01.jpg', title: 'Rivendell Fire Hall' },
  { src: '/images/beta/rivendell fire hall 02.jpg', title: 'Rivendell Fire Hall' },
  { src: '/images/beta/rivendell_Blacksmith_Day.JPG', title: 'Rivendell Blacksmith' },
  { src: '/images/beta/rivendell_jewl shop.jpg', title: 'Rivendell Jewel Shop' },
  { src: '/images/beta/rivendell_mill buildingA01.jpg', title: 'Rivendell Mill Building' },
  { src: '/images/beta/rivendell_mill front.jpg', title: 'Rivendell Mill Front' },
  { src: '/images/beta/rivendell_mill_area_night.jpg', title: 'Rivendell Mill Area - Night' },
  { src: '/images/beta/rivendell_shop facades.jpg', title: 'Rivendell Shop Facades' },
  { src: '/images/beta/rivendell_stoneshop_area_night.jpg', title: 'Rivendell Stone Shop - Night' },
  { src: '/images/beta/rivendell_tavern door.jpg', title: 'Rivendell Tavern Door' },
  { src: '/images/beta/rivendell_tavern_areanight.jpg', title: 'Rivendell Tavern - Night' },
  { src: '/images/beta/rivendell_tent01.jpg', title: 'Rivendell Tent 01' },
  { src: '/images/beta/rivendell_tent02.jpg', title: 'Rivendell Tent 02' },
  { src: '/images/beta/rivendell_tent03.jpg', title: 'Rivendell Tent 03' },
  { src: '/images/beta/rivendell_tent04.jpg', title: 'Rivendell Tent 04' },
  { src: '/images/beta/rivendell_tower 01.jpg', title: 'Rivendell Tower' },
  { src: '/images/beta/rivendell_treehouse.JPG', title: 'Rivendell Treehouse' },
  { src: '/images/beta/rivendell_treehouse02.JPG', title: 'Rivendell Treehouse 02' },
  { src: '/images/beta/rivendell_ztavern area.jpg', title: 'Rivendell Tavern Area' },
  { src: '/images/beta/stores.jpg', title: 'Stores' },
  { src: '/images/beta/stores 02.jpg', title: 'Stores 02' },
  { src: '/images/beta/when_dwarves_attack_copy.jpg', title: 'When Dwarves Attack' },
  { src: '/images/beta/wood elf cave enterance01.jpg', title: 'Wood Elf Cave Entrance 01' },
  { src: '/images/beta/wood elf cave enterance02.jpg', title: 'Wood Elf Cave Entrance 02' },
  { src: '/images/beta/wood elf cave enterance03.jpg', title: 'Wood Elf Cave Entrance 03' },
  { src: '/images/beta/woodelf01.jpg', title: 'Wood Elf 01' },
  { src: '/images/beta/woodelf02.jpg', title: 'Wood Elf 02' },
  { src: '/images/beta/aup09-transformed.png', title: 'AUP09 Transformed' },
];

const Page: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);

  return (
    <div
      className='min-h-screen'
      style={{
        backgroundImage: `url('/images/lightcaves.png')`,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Navbar id={6}></Navbar>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className='fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4'
          onClick={() => setSelectedImage(null)}
        >
          <button
            className='absolute top-4 right-4 text-white text-4xl hover:text-yellow-400 transition-colors'
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <div className='max-w-[90vw] max-h-[90vh] flex flex-col items-center'>
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className='max-w-full max-h-[80vh] object-contain'
              onClick={(e) => e.stopPropagation()}
            />
            <p className='text-white text-xl mt-4 text-center'>{selectedImage.title}</p>
          </div>
        </div>
      )}

      {/* Gallery Content */}
      <div className='pt-24 pb-12 px-4 md:px-8 lg:px-16'>
        <h1 className='text-4xl md:text-5xl text-center mb-4 text-white'>Beta Gallery</h1>
        <p className='text-center text-gray-300 mb-8'>
          Explore concept art, trading cards, and beta screenshots from The Hobbit 2003
        </p>

        {/* Image Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
          {betaImages.map((image, index) => (
            <div
              key={index}
              className='relative group cursor-pointer overflow-hidden rounded-lg border-2 border-white/20 hover:border-yellow-400/60 transition-all duration-300'
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.title}
                className='w-full h-32 md:h-40 lg:h-48 object-cover transform group-hover:scale-110 transition-transform duration-300'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <p className='absolute bottom-2 left-2 right-2 text-white text-xs md:text-sm truncate'>
                  {image.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
