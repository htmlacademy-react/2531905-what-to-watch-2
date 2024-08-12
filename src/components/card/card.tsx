import {generatePath, Link} from 'react-router-dom';
import {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';

import {FilmListItem} from '@/types';
import {AppRoute} from '@/constants';


type CardProps = {
  film: FilmListItem;
}

function Card({
  film: {
    id,
    name,
    previewImage,
    previewVideoLink,
  },
}: CardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [canPlay, setCanPlay] = useState<boolean>(false);
  const filmUrl = generatePath(AppRoute.FilmPage, {
    id: id,
  });

  const handleMouseEnter = () => {
    setCanPlay(true);
  };

  const handleMouseLeave = () => {
    setCanPlay(false);
    setShowPreview(false);
  };

  useEffect(() => {
    const playTimeout = setTimeout(() => {
      if (canPlay) {
        videoRef.current?.load();
        setShowPreview(true);
      }
    }, 1000);
    return () => {
      clearTimeout(playTimeout);
      setShowPreview(false);
    };
  }, [canPlay]);

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="small-film-card__image">
        <video
          ref={videoRef}
          className={clsx(!showPreview && 'visually-hidden')}
          src={previewVideoLink}
          width="280"
          height="175"
          autoPlay
          muted
          loop
          preload="auto"
        >
          Sorry, your browser does not support embedded videos
        </video>
        <img className={clsx(showPreview && 'visually-hidden')} src={previewImage} alt={name}/>
      </div>
      <h3 className="small-film-card__title">
        <Link to={filmUrl} className="small-film-card__link">
          {name}
        </Link>
      </h3>
    </article>
  );
}

export default Card;
