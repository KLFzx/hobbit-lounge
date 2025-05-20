import React from 'react';
import './styles.css';

interface ModCardProps {
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
  };
}

function cropString(input: string, length: number) {
  if (input.length <= length) {
    return input; // Return the string as is if it's 90 characters or fewer
  }
  return input.slice(0, length) + '...'; // Crop and add ellipsis
}

const ModCard: React.FC<ModCardProps> = ({ mod }) => {
  return (
    <div className='w-[250px] h-[400px] cardBackground flex flex-col justify-between'>
      <div>
        <img
          src={mod.image}
          alt='*'
          className='w-64 md:w-96 lg:w-[40rem] xl:w-[50rem] max-w-full h-auto cursor-pointer'
        />
        <div className='flex flex-col items-start justify-start'>
          <h1 className='px-4 mt-4 mb-1'>{cropString(mod.title, 28)}</h1>
          <div className='text-sm px-4 mb-3'>
            <p className='mb-1 text-yellow-300'>{mod.category}</p>
            <div className='flex font-extralight gap-1'>
              <p>Author: </p>
              <p>{cropString(mod.author, 25)}</p>
            </div>
            <div className='flex font-extralight gap-1'>
              <p>Released: </p>
              <p>{mod.date}</p>
            </div>
            <div className='flex font-extralight gap-1'>
              <p>Last update: </p>
              <p>{mod.updateDate}</p>
            </div>
            <h2 className='text-sm mt-4 font-light'>
              {cropString(mod.desc, 140)}
            </h2>
          </div>
        </div>
      </div>
      <div className='w-[100%] h-[30px] footerColor flex font-extralight text-sm items-center gap-6 pl-4'>
        <div className='flex items-center gap-2'>
          <img src={'/icons/size.svg'} width={'22px'} alt='*' className='' />
          <h4>{mod.size}</h4>
        </div>
        <div className='flex items-center gap-1'>
          <img
            src={'/icons/download.svg'}
            width={'16px'}
            alt='*'
            className=''
          />
          <h4>{mod.downloads}</h4>
        </div>
      </div>
    </div>
  );
};

export default ModCard;
