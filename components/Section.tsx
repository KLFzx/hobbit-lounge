import React from 'react';
import { CSSProperties } from 'react';

import './stylesNavbar.css';

const Section: React.FC<{ id: string; background: string; children: any }> = ({
  id,
  background,
  children,
}) => {
  const sectionStyle: CSSProperties = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'opacity 0.5s ease-in-out', // Adding transition property
    outline: '1px solid rgba(211, 211, 211, 0.2)',

    outlineOffset: '-10px',
  };

  return (
    <section
      id={id}
      className='h-screen flex items-center justify-center'
      style={sectionStyle}
    >
      <div className='gradient-overlay'></div>
      <div
        className='absolute'
        style={{ backgroundImage: '/aroundLine.svg' }}
      ></div>
      {children}
    </section>
  );
};

export default Section;
