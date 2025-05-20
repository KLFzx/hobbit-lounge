import React from 'react';
import Section from '@/components/Section';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import './styles.css';
import ModCard from '@/components/mods/ModCard';

import { mods } from '@/components/variables/mods';

const Page: React.FC = () => {
  return (
    <div>
      <Navbar id={3}></Navbar>
      <Section id={'mods'} background={'/images/back-2.jpg'}>
        <div className='flex flex-col h-[100%] w-[100%] justify-end items-center'>
          <div className='transparentBackground h-[100%] w-[75%] bg-white bg-opacity-60 flex flex-col items-center justify-end'>
            <div className='w-[95%] flex justify-between items-stretch mb-2'>
              <h1 className='text-5xl'>MODS</h1>
              <h1></h1>
            </div>
            <div className='grayBackground h-[70%] w-[95%] bg-opacity-100 flex items-center px-10 gap-6'>
              {mods.map(
                (
                  mod: {
                    image: string;
                    title: string;
                    category: string;
                    author: string;
                    date: string;
                    updateDate: string;
                    desc: string;
                    size: string;
                    downloads: string;
                  },
                  index: number
                ) => (
                  <ModCard key={index} mod={mod} />
                )
              )}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Page;
