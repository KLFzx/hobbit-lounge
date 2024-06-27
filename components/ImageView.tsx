import React, { useState } from 'react';
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
  title: string;
  desc: string;
  onClose: () => void;
}> = ({ image1, image2, image3, title, desc, onClose }) => {
  const [background, setBackground] = useState(image1);

  const changeBackground = (image: string) => {
    setBackground(image);
  };

  return (
    <div
      className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 '
      style={outline}
    >
      <div
        className='flex justify-start items-end h-screen w-screen'
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 0.5s ease',
        }}
      >
        <Image
          src={'/icons/Cross.svg'}
          width={30}
          height={30}
          alt={'X'}
          className='absolute right-10 top-10 cursor-pointer'
          onClick={onClose}
        ></Image>
        <div className='ml-[3rem] mb-[3rem]'>
          <div className='bg-black mb-[3rem] bg-opacity-50 p-4 max-w-[45rem]'>
            <h1 className=' text-3xl mb-4'>{title}</h1>
            <p className='text-sm font-thin'>{desc}</p>
          </div>
          <div className='flex gap-8'>
            <Image
              src={image1}
              height={140}
              width={240}
              alt={''}
              style={outline}
              className='cursor-pointer'
              onClick={() => changeBackground(image1)}
            ></Image>
            <Image
              src={image2}
              height={140}
              width={240}
              alt={''}
              style={outline}
              className='cursor-pointer'
              onClick={() => changeBackground(image2)}
            ></Image>
            <Image
              src={image3}
              height={140}
              width={240}
              alt={''}
              style={outline}
              className='cursor-pointer'
              onClick={() => changeBackground(image3)}
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageView;
