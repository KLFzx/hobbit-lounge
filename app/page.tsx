'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { CSSProperties } from 'react';
import ImageView from '@/components/ImageView';
import { throttle } from 'lodash';

import Section from '@/components/Section';
import Navbar from '@/components/Navbar';
import { sectionsArray } from '@/components/variables/sectionsArray';
import './AnimatedText.css';
import { title } from 'process';
import './globals.css';
import YouTubeEmbed from '@/components/YouTubeEmbed';

const IndexPage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<string>('main');
  const [lastTime, setLastTime] = useState(Date.now());

  const snapToSection = (
    nextSectionId: string,
    callback: (param: string) => void,
    instant: boolean
  ) => {
    const nextSection = document.getElementById(nextSectionId);
    const currentTime = Date.now();

    if (instant || currentTime - lastTime > 1200) {
      if (!instant) setLastTime(currentTime);
      if (nextSection) {
        const scrollPos = nextSection.offsetTop;
        window.scrollTo({ top: scrollPos, behavior: 'smooth' });
        callback(nextSectionId);
      }
    }
  };

  useEffect(() => {
    const handleMouseWheel = (event: WheelEvent) => {
      event.preventDefault();

      const delta = Math.sign(event.deltaY);
      const currentSectionIndex = sections.findIndex(
        (section) => section.id === currentSection
      );
      const nextSectionIndex = Math.max(
        0,
        Math.min(sections.length - 1, currentSectionIndex + delta)
      );
      const nextSectionId = sections[nextSectionIndex].id;
      snapToSection(nextSectionId, setCurrentSection, false);
    };

    const sections = Array.from(document.querySelectorAll('section'));

    //document.addEventListener('scroll', handleScroll, { passive: false });
    //handleScroll();

    document.addEventListener('wheel', handleMouseWheel);

    return () => {
      //document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('wheel', handleMouseWheel);
    };
  }, [currentSection]);

  const outline: CSSProperties = {
    outline: '1px solid rgba(211, 211, 211, 0.2)',

    outlineOffset: '-10px',
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [imageArrayModal, setImageArrayModal] = useState({
    image1: '/images/back-0.jpg',
    image2: '/images/back-0.jpg',
    image3: '/images/back-0.jpg',
    title: 'sos',
    desc: 'ss',
  });

  const toggleModal = (imageArray: {
    image1: string;
    image2: string;
    image3: string;
    title: string;
    desc: string;
  }) => {
    setImageArrayModal({
      image1: imageArray.image1,
      image2: imageArray.image2,
      image3: imageArray.image3,
      title: imageArray.title,
      desc: imageArray.desc,
    });

    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    // Function to animate text on component mount
    const animateText = () => {
      const textElement = document
        .querySelector('#' + currentSection)
        ?.querySelector('p');

      const headerElement = document
        .querySelector('#' + currentSection)
        ?.querySelector('h1');

      textElement?.classList.add('slide-from-right');
      headerElement?.classList.add('slide-from-right-header');

      setTimeout(() => textElement?.classList.remove('slide-from-right'), 1000);
      setTimeout(
        () => headerElement?.classList.remove('slide-from-right-header'),
        1700
      );
    };
    // Call the animation function when component mounts
    animateText();

    // Cleanup function to remove event listener
    return () => {
      // Remove event listener or cleanup if needed
    };
  }, [currentSection]); // Empty dep

  const sectionStyle: CSSProperties = {
    backgroundImage: `url(${'/images/lightcaves.png'})`,
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    transition: 'opacity 0.5s ease-in-out', // Adding transition property
    outline: '1px solid rgba(211, 211, 211, 0.2)',

    outlineOffset: '-10px',
  };

  return (
    <div style={sectionStyle}>
      <Head>
        <title>Scrolling Sections</title>
        {/* Add any other necessary meta tags */}
      </Head>

      <Navbar id={5}></Navbar>

      <nav className='fixed top-0 left-0 h-full z-50 flex flex-col justify-center pl-10'>
        <ul className='flex flex-col items-start space-y-4'>
          {sectionsArray.map((section, index) => (
            <li
              key={index}
              className={
                currentSection === section.id ? 'font-bold' : 'font-light'
              }
            >
              <button
                onClick={() =>
                  snapToSection(section.id, setCurrentSection, true)
                }
              >
                <Image
                  src={
                    currentSection === section.id
                      ? 'icons/RectIn.svg'
                      : 'icons/RectOut.svg'
                  }
                  alt='*'
                  width={45}
                  height={12}
                  priority
                />
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {modalOpen && (
        <ImageView
          image1={imageArrayModal.image1}
          image2={imageArrayModal.image2}
          image3={imageArrayModal.image3}
          title={imageArrayModal.title}
          desc={imageArrayModal.desc}
          onClose={() => setModalOpen(!modalOpen)}
        />
      )}

      {sectionsArray.map((section, index) =>
        section.id === 'main' ? (
          <Section key={index} id={section.id} background={section.background}>
            <div className='flex h-screen w-screen justify-center items-end flex-col'>
              <div className='flex flex-col items-center mr-[8rem]'>
                <Image
                  src={'/images/logo.png'}
                  height={340}
                  width={440}
                  alt={''}
                ></Image>
                <p className='text-white-400 text-xl'>
                  A project, driven by community
                </p>
                <div className='flex items-center justify-center gap-8 mt-[3rem]'>
                  <Image
                    src={'/icons/PlayNow.svg'}
                    height={140}
                    width={150}
                    alt={'Play Now'}
                    className='cursor-pointer transform transition-transform duration-300 hover:scale-105 z-10 '
                    onClick={() => {
                      snapToSection('playnow', setCurrentSection);
                    }}
                  ></Image>
                  <h1 className='z-10 '>Watch trailer</h1>
                </div>
              </div>
            </div>
            <p className='font-thin absolute bottom-10 text-yellow-400'>
              scroll down
            </p>
            <Image
              src={'/icons/LineDown.svg'}
              height={60}
              width={0.5}
              alt={''}
              className='absolute bottom-0'
            ></Image>
          </Section>
        ) : section.id === 'description' ? (
          <Section key={index} id={section.id} background={''}>
            <div className='flex text-black gap-8  items-center'>
              <div className='flex flex-col justify-center'>
                <h2 className='text-3xl mb-4'>
                  The Hobbit 2003 - Extended Edition
                </h2>

                <h3 className='mb-2'>
                  It's been almost 2 years since the work on <br />
                  the Extended Editon of The Hobbit 2003 has been started.
                  <br />
                  The cut content that was never seen before is restored
                  <br />
                  and now finally ready for you to try.
                  <br />
                  We've worked very hard to complete everything that we could
                  <br />
                  and now we can finally reveal it to the Middle-Earth.
                  <br />
                  <br />
                  You will find:
                </h3>
                <h3>• The Secret Grotto in the Elven Kingdom</h3>
                <h3>• Unseen Quests</h3>
                <h3>• Troll Hole dialogs and Bats creatures </h3>
                <h3>• Lake Town Obstacle Room </h3>
                <h3>• Extended Troll Dialogue in Roast Mutton </h3>
                <h3>• Over Hill and Under Hill slopes and Troll Boss </h3>
                <h3>• Lot's of Bug fixes & Game improvements </h3>
                <h3>• And much much more </h3>
              </div>
              <img
                src={'/images/ext.jpg'}
                alt='*'
                className='w-[480px] 4xl:w-[960px] border-black border-4  '
              />
            </div>
          </Section>
        ) : section.id === 'multiplayer' ? (
          <Section key={index} id={section.id} background={''}>
            <div className='flex text-black gap-8  items-center'>
              <YouTubeEmbed videoId='MzeVkYa0fpU'></YouTubeEmbed>
              <div className='flex flex-col justify-center text-right'>
                <h2 className='text-3xl mb-4'>Multiplayer</h2>

                <h3 className='mb-2'>
                  Now you can explore the world of The Hobbit with your friends!
                  <br />
                  Despite the fact that everyone is still located inside their
                  world,
                  <br />
                  you are still able to walk around locations with you Hobbit
                  homies <br />
                  and discover new levels together!
                </h3>
              </div>
            </div>
          </Section>
        ) : section.id === 'wannamod' ? (
          <Section key={index} id={section.id} background={''}>
            <div className='flex text-black gap-8  items-center'>
              <div className='flex flex-col justify-center text-center'>
                <h1 className='text-3xl mb-3'>Wanna MOD as a GOD?</h1>
                <p className='mb-8'>
                  Want to discuss, play or just enjoy mods?
                  <br />
                  Get the Modding Tools or see the Latest News?
                  <br />
                  Our Discord welcomes you!
                </p>
                <div className='flex justify-center gap-12'>
                  <img
                    src={'/images/1news.jpg'}
                    alt=''
                    width={'200rem'}
                    className='sm:w-[7rem] md:w-[15rem] lg:w-[20rem] xl:w-[18rem] 2xl:w-[28rem] max-w-full h-auto cursor-pointer border-4 border-black transform transition-transform duration-300 hover:scale-105 hover:z-20'
                    onClick={() =>
                      window.open(
                        'https://www.youtube.com/playlist?list=PLj8GsuOY67FBFLeoOAfaYP-K_4hMgmt65',
                        '_blank'
                      )
                    }
                  ></img>
                  <img
                    src={'/images/1tools.jpg'}
                    alt=''
                    width={'200rem'}
                    className='sm:w-[7rem] md:w-[15rem] lg:w-[20rem] xl:w-[18rem] 2xl:w-[28rem] max-w-full h-auto cursor-pointer border-4 border-black transform transition-transform duration-300 hover:scale-105 hover:z-20'
                    onClick={() =>
                      window.open('https://github.com/hobbit-kingdom', '_blank')
                    }
                  ></img>
                  <img
                    src={'/images/1com.jpg'}
                    alt=''
                    width={'400rem'}
                    className='sm:w-[7rem] md:w-[15rem] lg:w-[20rem] xl:w-[18rem] 2xl:w-[28rem] max-w-full h-auto cursor-pointer border-4 border-black transform transition-transform duration-300 hover:scale-105 hover:z-20'
                    onClick={() =>
                      window.open('https://discord.gg/xbFAwgstNd', '_blank')
                    }
                  ></img>
                </div>
              </div>
            </div>
          </Section>
        ) : section.id === 'playnow' ? (
          <Section key={index} id={section.id} background={''}>
            <div className='h-screen w-screen pt-[10rem] flex flex-col items-center justify-start text-black'>
              <h1 className='text-2xl mb-[2rem]'>BECOME THE TRUE HOBBIT</h1>
              <h1 className='text-2xl mb-[2rem]'>RELEASE DATE: TBA</h1>
              <div className='flex mx-[8rem] md:mx-16 lg:mx-32 xl:mx-64'>
                <div className='flex justify-center font-size'>
                  <img
                    src={'/images/unp.jpg'}
                    alt='*'
                    width={'400rem'}
                    className='w-64 md:w-96 lg:w-[40rem] xl:w-[50rem] max-w-full h-auto cursor-pointer border-4 border-black transform transition-transform duration-300 hover:scale-105 hover:z-20'
                    onClick={() =>
                      window.open(
                        'https://github.com/hobbit-kingdom/hobbit-versions/releases/tag/Unpacked',
                        '_blank'
                      )
                    }
                  />
                </div>
                <div className='flex justify-center'>
                  <img
                    src={'/images/ext.jpg'}
                    alt='*'
                    width={'400rem'}
                    className='w-64 md:w-96 lg:w-[40rem] xl:w-[50rem] max-w-full h-auto cursor-pointer border-4 border-black transform transition-transform duration-300 hover:scale-105 hover:z-20'
                    onClick={() =>
                      window.open(
                        'https://github.com/hobbit-kingdom/hobbit-versions',
                        '_blank'
                      )
                    }
                  />
                </div>
                <div className='flex justify-center'>
                  <img
                    src={'/images/cln.jpg'}
                    alt='*'
                    width={'400rem'}
                    className='w-64 md:w-96 lg:w-[40rem] xl:w-[50rem] max-w-full h-auto cursor-pointer border-4 border-black transform transition-transform duration-300 hover:scale-105 hover:z-20'
                    onClick={() =>
                      window.open(
                        'https://github.com/hobbit-kingdom/hobbit-versions/releases/tag/Clean',
                        '_blank'
                      )
                    }
                  />
                </div>
              </div>
              <p className='text-xl mt-[2rem]'>
                Explore the world of The Hobbit via various platfroms
              </p>
              <p className='text-sm '>
                (Extended Edition is currently only available for PC)
              </p>
              <div className='flex gap-20 justify-center items-center mt-[5rem]'>
                <Image
                  src={'/icons/ps2.png'}
                  alt='*'
                  width={200}
                  height={140}
                  priority
                  className='cursor-pointer transform transition-transform duration-300 hover:scale-105 '
                  onClick={() =>
                    window.open(
                      'https://github.com/hobbit-kingdom/hobbit-versions/releases/tag/PS2',
                      '_blank'
                    )
                  }
                />
                <Image
                  src={'/icons/gamecube.png'}
                  alt='*'
                  width={200}
                  height={140}
                  priority
                  className='cursor-pointer transform transition-transform duration-300 hover:scale-105 '
                  onClick={() =>
                    window.open(
                      'https://github.com/hobbit-kingdom/hobbit-versions/releases/tag/Gamecube',
                      '_blank'
                    )
                  }
                />
                <Image
                  src={'/icons/xbox.png'}
                  alt='*'
                  width={200}
                  height={140}
                  priority
                  className='cursor-pointer transform transition-transform duration-300 hover:scale-105 '
                  onClick={() =>
                    window.open(
                      'https://github.com/hobbit-kingdom/hobbit-versions/releases/tag/Xbox',
                      '_blank'
                    )
                  }
                />
              </div>
            </div>
          </Section>
        ) : (
          <Section key={index} id={section.id} background={section.background}>
            <div className='relative left-[3em] top-[-20em] 2xl:top-[-25em] 3xl:top-[-28em] 3xl:left-[4em] 4xl:top-[-40em] 4xl:left-[4em]'>
              <Image
                src={'/images/logo.png'}
                height={340}
                width={200}
                alt={''}
                className='w-3 md:w-[8rem] 2xl:w-[15rem] 3xl:w-[15rem] 4xl:w-[30rem]'
              ></Image>
            </div>
            <div className='h-screen w-screen flex flex-col items-end text-right justify-end  font-thin text-white   mr-[3rem] mb-[10rem] 2xl:mb-[30rem]  3xl:mb-[20rem] 4xl:mb-[40rem]'>
              <h1 className=' text-4xl mt-[3rem]'>{section.title}</h1>
              <p className='text-1xl max-w-[25rem] mt-[1rem] animate-text'>
                {section.description}
              </p>
              <div className='grid grid-cols-2 grid-rows-2 gap-8 mt-[4rem] '>
                <div>
                  <Image
                    style={outline}
                    src={section.imageArr.image1.image1}
                    alt='*'
                    width={270}
                    height={140}
                    priority
                    className='cursor-pointer w-16 sm:w-18 md:w-24 lg:w-[10rem] xl:w-[18rem] 2xl:w-[20rem] 3xl:w-[30rem] 4xl:w-[40rem] transform transition-transform duration-300 hover:scale-105 '
                    onClick={() => toggleModal(section.imageArr.image1)}
                  />
                  <p className='flex justify-center'>
                    {section.imageArr.image1.title}
                  </p>
                </div>
                <div>
                  <Image
                    style={outline}
                    src={section.imageArr.image2.image1}
                    alt='*'
                    width={270}
                    height={140}
                    priority
                    className='cursor-pointer w-16 sm:w-18 md:w-24 lg:w-[10rem] xl:w-[18rem] 2xl:w-[20rem] 3xl:w-[30rem] 4xl:w-[40rem] transform transition-transform duration-300 hover:scale-105 '
                    onClick={() => toggleModal(section.imageArr.image2)}
                  />
                  <p className='flex justify-center'>
                    {section.imageArr.image2.title}
                  </p>
                </div>
                <div>
                  <Image
                    style={outline}
                    src={section.imageArr.image3.image1}
                    alt='*'
                    width={270}
                    height={140}
                    priority
                    className='cursor-pointer w-16 sm:w-18 md:w-24 lg:w-[10rem] xl:w-[18rem] 2xl:w-[20rem] 3xl:w-[30rem] 4xl:w-[40rem] transform transition-transform duration-300 hover:scale-105 '
                    onClick={() => toggleModal(section.imageArr.image3)}
                  />
                  <p className='flex justify-center'>
                    {section.imageArr.image3.title}
                  </p>
                </div>
                <div>
                  <Image
                    style={outline}
                    src={section.imageArr.image4.image1}
                    alt='*'
                    width={270}
                    height={140}
                    priority
                    className='cursor-pointer w-16 sm:w-18 md:w-24 lg:w-[10rem] xl:w-[18rem] 2xl:w-[20rem] 3xl:w-[30rem] 4xl:w-[40rem] transform transition-transform duration-300 hover:scale-105 '
                    onClick={() => toggleModal(section.imageArr.image4)}
                  ></Image>
                  <p className='flex justify-center'>
                    {section.imageArr.image4.title}
                  </p>
                </div>
              </div>
            </div>
          </Section>
        )
      )}
    </div>
  );
};

export default IndexPage;
