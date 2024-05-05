import React from 'react';

interface OverlayBoxProps {
  children: React.ReactNode;
}

const OverlayBox: React.FC<OverlayBoxProps> = ({ children }) => {
  return (
    <div className='absolute p-4 mt-2 shadow-md rounded-md border border-gray-200 hidden group-hover:block'>
      {children}
    </div>
  );
};

export default OverlayBox;
