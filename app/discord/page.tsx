import React from 'react';
import Section from '@/components/Section';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

const Page: React.FC = () => {
  return (
    <div>
      <Navbar id={2}></Navbar>
      <Section id={'discord'} background={'/images/back-2.jpg'}>
        <div className='h-[30rem] w-[40rem] bg-black bg-opacity-60 flex flex-col items-center p-10'>
          <div className='flex justify-between items-center w-full'>
            <Image
              src='/discord/discord.png'
              alt='Discord Logo'
              width={150}
              height={150}
              className='ml-16'
            />
            <h1 className='text-4xl font-bold text-white'>X</h1>
            <Image
              src='/discord/logo.png'
              alt='Discord Logo'
              width={150}
              height={150}
              className='mr-16'
            />
          </div>

          <h1 className='text-4xl font-bold text-white mt-7'>
            Technical Hobbit Chat
          </h1>
          <h2 className='text-2xl font-thin text-white mt-1'>
            The Best Modding Community
          </h2>
          <h3 className='text-l text-center text-white mt-7'>
            Join our modding community! Discuss the game, cut content you crazy
            ideas and just spend time with your fellow Hobbits!
          </h3>
          <a
            href='https://discord.gg/xbFAwgstNd'
            className='text-2xl text-white mt-7 rounded-lg p-1 px-3'
            style={{
              backgroundColor: '#5765F2',
              cursor: 'pointer',
              zIndex: 100,
            }}
          >
            Join
          </a>
        </div>
      </Section>
    </div>
  );
};

export default Page;
