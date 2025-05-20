import React from 'react';
import Section from '@/components/Section';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

const Page: React.FC = () => {
  return (
    <div>
      <Navbar id={1}></Navbar>
      <Section id={'beta'} background={'/images/lightcaves.png'}>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='mb-8'>Beta Gallery</h1>
          <div className='flex justify-center gap-12'>
            <img
              src={'/images/scetch goblin.jpg'}
              alt=''
              width={'300rem'}
              className='sm:w-[7rem] md:w-[15rem] lg:w-[20rem] xl:w-[18rem] 2xl:w-[28rem] max-w-full h-auto cursor-pointer border-1 border-black transform transition-transform duration-300 hover:scale-105 hover:z-20'
            ></img>
            <img
              src={'/images/scetch bard.jpg'}
              alt=''
              width={'300rem'}
              className='sm:w-[7rem] md:w-[15rem] lg:w-[20rem] xl:w-[18rem] 2xl:w-[28rem] max-w-full h-auto cursor-pointer border-1 border-black transform transition-transform duration-300 hover:scale-105 hover:z-20'
            ></img>
            <img
              src={'/images/scetch tom.jpg'}
              alt=''
              width={'300rem'}
              className='sm:w-[7rem] md:w-[15rem] lg:w-[20rem] xl:w-[18rem] 2xl:w-[28rem] max-w-full h-auto cursor-pointer border-1 border-black transform transition-transform duration-300 hover:scale-105 hover:z-20'
            ></img>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Page;
