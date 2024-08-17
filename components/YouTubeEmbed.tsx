// components/YouTubeEmbed.tsx
import React from 'react';
import './styles.css';

interface YouTubeEmbedProps {
  videoId: string;
  width?: number;
  height?: number;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  videoId,
  width = 560,
  height = 315,
}) => {
  return (
    <div className='video-container '>
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${videoId}`}
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        className='sm:w-[7rem] md:w-[15rem] lg:w-[20rem] xl:w-[34rem] 3xl:w-[70rem] 3xl:h-[40rem]'
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
