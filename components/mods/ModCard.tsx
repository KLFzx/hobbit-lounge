import React from 'react';
import Link from 'next/link';
import './styles.css';
import { Mod } from '@/components/variables/mods';

interface ModCardProps {
  mod: Mod;
}

function cropString(input: string, length: number) {
  if (input.length <= length) {
    return input;
  }
  return input.slice(0, length) + '...';
}

const ModCard: React.FC<ModCardProps> = ({ mod }) => {
  return (
    <Link href={`/mods/${mod.slug}`} className='block'>
      <div className='w-[280px] h-[420px] cardBackground flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/30 cursor-pointer group'>
        <div>
          <div className='relative overflow-hidden'>
            <img
              src={mod.image}
              alt={mod.title}
              className='w-full h-[140px] object-cover transition-transform duration-300 group-hover:scale-110'
            />
            <div className='absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs'>
              v{mod.version}
            </div>
          </div>
          <div className='flex flex-col items-start justify-start'>
            <h1 className='px-4 mt-4 mb-1 text-lg font-semibold group-hover:text-yellow-300 transition-colors'>
              {cropString(mod.title, 28)}
            </h1>
            <div className='text-sm px-4 mb-3'>
              <p className='mb-2 text-yellow-400 font-medium'>{mod.category}</p>
              <div className='flex font-extralight gap-1 text-gray-300'>
                <p>By </p>
                <p className='text-white hover:text-yellow-300'>{cropString(mod.author, 25)}</p>
              </div>
              <div className='flex font-extralight gap-1 text-gray-400 text-xs mt-1'>
                <p>Updated: </p>
                <p>{mod.updateDate}</p>
              </div>
              <p className='text-sm mt-3 font-light text-gray-300 leading-relaxed'>
                {cropString(mod.desc, 120)}
              </p>
            </div>
          </div>
        </div>
        <div className='w-full h-[40px] footerColor flex font-light text-sm items-center justify-between px-4'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-1'>
              <svg className='w-4 h-4 text-green-400' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z' />
              </svg>
              <span>{mod.downloads}</span>
            </div>
            <div className='flex items-center gap-1'>
              <svg className='w-4 h-4 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
              </svg>
              <span>{mod.endorsements}</span>
            </div>
          </div>
          <div className='text-gray-400 text-xs'>
            {mod.size}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ModCard;
