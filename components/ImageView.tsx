import React from 'react';
import { CSSProperties } from 'react';
import Image from 'next/image';
const outline: CSSProperties = {
  outline: '1px solid rgba(211, 211, 211, 0.2)',

  outlineOffset: '-10px',
};

const ImageView: React.FC<{
  image1: string;
  image2: string;
  image3: string;
  onClose: () => void;
}> = ({ image1, image2, image3, onClose }) => {
  return (
    <div
      className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 '
      style={outline}
    >
      <div
        className='flex justify-start items-end h-screen w-screen'
        style={{
          backgroundImage: `url(${image1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Image
          src={'/icons/Cross.svg'}
          width={30}
          height={30}
          className='absolute right-10 top-10 cursor-pointer'
          onClick={onClose}
        ></Image>
        <div className='ml-[3rem] mb-[3rem]'>
          <div className='bg-black mb-[3rem] bg-opacity-50 p-4 max-w-[45rem]'>
            <h1 className=' text-3xl mb-4'>Lake Town</h1>
            <p className='text-sm font-thin'>
              Beautiful city situated on the lake. People are fishing and
              transporting supplies to variety of places. The most interesting
              things are net runners who are constantly checking their tents.
              Nestled beside the serene expanse of a glistening lake, this
              beautiful city captures the essence industriousness in perfect
              harmony. The picturesque setting is not just a visual treat. It's
              a vibrant hub of activity, with its residents engaging in a myriad
              of tasks that bring life to the landscape. Every day, the lake's
              surface ripples with the excitement of avid fishermen, patiently
              waiting for their catch, their hopeful eyes reflecting the dancing
              sunlight to very corner flourishes with vitality.
            </p>
          </div>
          <div className='flex gap-8'>
            <Image
              src={image1}
              height={140}
              width={240}
              alt={''}
              style={outline}
              className='cursor-pointer'
            ></Image>
            <Image
              src={image2}
              height={140}
              width={240}
              alt={''}
              style={outline}
              className='cursor-pointer'
            ></Image>
            <Image
              src={image3}
              height={140}
              width={240}
              alt={''}
              style={outline}
              className='cursor-pointer'
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageView;
