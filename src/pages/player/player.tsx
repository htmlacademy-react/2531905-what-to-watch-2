import {Await, generatePath, useLoaderData, useNavigate} from 'react-router-dom';
import {Suspense, useRef, useState} from 'react';

import {FilmFull} from '@/types';
import Loader from '@/components/loader/loader';
import {AppRoute} from '@/constants';

type LoadedData = {
  film: FilmFull;
}

function Player() {
  const data = useLoaderData() as LoadedData;
  const navigate = useNavigate();
  const playerRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayBtnClick = () => {
    if (isPlaying) {
      playerRef.current?.pause();
      setIsPlaying(false);
    } else {
      playerRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleExitBtnClick = (id: string) => {
    const filmUrl = generatePath(AppRoute.FilmPage, {
      id,
    });
    navigate(filmUrl);
  };

  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={data.film}>
        {(film: FilmFull) => (
          <div className="player">
            <video ref={playerRef} src={film.videoLink} className="player__video" poster={film.posterImage}></video>

            <button type="button" className="player__exit" onClick={() => handleExitBtnClick(film.id)}>Exit</button>

            <div className="player__controls">
              <div className="player__controls-row">
                <div className="player__time">
                  <progress className="player__progress" value="30" max="100"></progress>
                  <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
                </div>
                <div className="player__time-value">1:30:29</div>
              </div>

              <div className="player__controls-row">
                {
                  isPlaying
                    ? (
                      <button type="button" className="player__play" onClick={handlePlayBtnClick}>
                        <svg viewBox="0 0 14 21" width="14" height="21">
                          <use xlinkHref="#pause"></use>
                        </svg>
                        <span>Pause</span>
                      </button>
                    )
                    : (
                      <button type="button" className="player__play" onClick={handlePlayBtnClick}>
                        <svg viewBox="0 0 19 19" width="19" height="19">
                          <use xlinkHref="#play-s"></use>
                        </svg>
                        <span>Play</span>
                      </button>
                    )
                }
                <div className="player__name">
                  {film.name}
                </div>

                <button type="button" className="player__full-screen">
                  <svg viewBox="0 0 27 27" width="27" height="27">
                    <use xlinkHref="#full-screen"></use>
                  </svg>
                  <span>Full screen</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </Await>
    </Suspense>

  );
}

export default Player;
