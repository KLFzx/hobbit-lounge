import React from 'react';

const baseIconClasses = 'h-4 w-4 inline-block align-middle';

export const ReplyIcon: React.FC = () => (
  <svg
    className={baseIconClasses}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'
      stroke='currentColor'
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export const RepostIcon: React.FC = () => (
  <svg
    className={baseIconClasses}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M7 7H17L14 4'
      stroke='currentColor'
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M17 17H7L10 20'
      stroke='currentColor'
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export const LikeIcon: React.FC = () => (
  <svg
    className={baseIconClasses}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M12.1 19.1L12 19L11.9 19.1C7.14 14.77 4 11.92 4 8.75C4 6.5 5.5 5 7.75 5C9.04 5 10.29 5.63 11 6.58C11.71 5.63 12.96 5 14.25 5C16.5 5 18 6.5 18 8.75C18 11.92 14.86 14.77 12.1 19.1Z'
      stroke='currentColor'
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
