import React from 'react';
import './stylesNavbar.css';
import OverlayBox from './OverlayBox';

import { CSSProperties } from 'react';

const Navbar: React.FC<{ id: string; background?: string }> = ({
  id,
  background,
  children,
}) => {
  const sectionStyle: CSSProperties = {
    backgroundImage: background ? `url(${background})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'opacity 0.5s ease-in-out', // Adding transition property
  };

  return (
    <nav className='fixed top-0 right-0  shadow-lg z-50 flex flex-row justify-between pr-10 pt-10 space-x-8 text-1xl font-regular'>
      <div className='group'>
        <a className='hover group-hover'>The Story</a>
        <OverlayBox>
          <p>Coming soon...</p>
        </OverlayBox>
      </div>
      <a className='hover' href='/discord'>
        Discord
      </a>
      <div className='group'>
        <a className='hover group-hover'>Mods</a>
        <OverlayBox>
          <p>Coming soon...</p>
        </OverlayBox>
      </div>
      <div className='group'>
        <a className='hover group-hover'>Wiki</a>
        <OverlayBox>
          <p>Coming soon...</p>
        </OverlayBox>
      </div>
      <a className='hover'>Play now</a>
    </nav>
  );
};

export default Navbar;
