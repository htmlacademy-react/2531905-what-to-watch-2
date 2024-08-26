import {generatePath, Link} from 'react-router-dom';
import {useEffect, useRef, useState} from 'react';

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
  const filmUrl = generatePath(AppRoute.FilmPage, {
    id: id,
  });

  const handleMouseEnter = () => {
    setShowPreview(true);
  };

  const handleMouseLeave = () => {
    setShowPreview(false);
  };

  useEffect(() => {
    const videoPlayer = videoRef.current;

    const playTimeout = setTimeout(() => {
      if (showPreview && videoPlayer) {
        videoPlayer.play();
      }
    }, 1000);
    return () => {
      videoPlayer?.pause();
      videoPlayer?.load();
      clearTimeout(playTimeout);
    };
  }, [showPreview]);

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="small-film-card__image">
        <video
          ref={videoRef}
          src={previewVideoLink}
          poster={previewImage}
          width="280"
          height="175"
          muted
          loop
          preload="auto"
        >
          Sorry, your browser does not support embedded videos
        </video>
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
