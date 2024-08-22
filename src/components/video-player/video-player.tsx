import {generatePath, useNavigate} from 'react-router-dom';
import {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react';
import {FilmFull} from '@/types';
import {getDisplayedTime} from '@/utils';
import {AppRoute, SPACE_CODE} from '@/constants';

import classes from './video-player.module.css';

type VideoPlayerProps = {
  film: FilmFull;
}

function VideoPlayer({film}: VideoPlayerProps) {
  const navigate = useNavigate();
  const playerRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);

  const timeLeftPercent = time / duration * 100;
  const remainTimeDisplay = getDisplayedTime(duration - time);

  const handlePlayBtnClick = useCallback(() => {
    if (time < duration) {
      if (isPlaying) {
        playerRef.current?.pause();
        setIsPlaying(false);
      } else {
        playerRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      setTime(0);
      playerRef.current?.play();
      setIsPlaying(true);
    }
  }, [duration, isPlaying, time]);

  const handleFullscreenBtnClick = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  const handleExitBtnClick = (id: string) => {
    const filmUrl = generatePath(AppRoute.FilmPage, {
      id,
    });
    navigate(filmUrl);
  };

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (playerRef.current) {
      const value = parseInt(event.target.value, 10);
      playerRef.current.currentTime = value;
      setTime(value);
    }
  };

  const handleDataLoaded = () => {
    const videoDuration = playerRef.current?.duration || 0;
    setDuration(Math.round(videoDuration));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (time > duration) {
        playerRef.current?.pause();
        setIsPlaying(false);
        clearInterval(interval);
        return;
      }
      if (isPlaying) {
        setTime((prevTime) => prevTime + 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [duration, isPlaying, time]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === SPACE_CODE) {
        handlePlayBtnClick();
      }
    };
    document.addEventListener('keyup', handleKeyPress);

    return () => {
      document.removeEventListener('keyup', handleKeyPress);
    };
  }, [handlePlayBtnClick]);

  return (
    <div className="player">
      <video
        ref={playerRef}
        src={film.videoLink}
        className="player__video"
        poster={film.posterImage}
        onLoadedData={handleDataLoaded}
        onClick={handlePlayBtnClick}
      />

      <button type="button" className="player__exit" onClick={() => handleExitBtnClick(film.id)}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <input
              type="range"
              min="0"
              max={duration}
              value={time}
              className={`${classes.playerRange} player__progress`}
              onChange={handleTimeChange}
            />
            <div className="player__toggler" style={{left: `${timeLeftPercent < 100 ? timeLeftPercent : 100}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">
            {remainTimeDisplay}
          </div>
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

          <button type="button" className="player__full-screen" onClick={handleFullscreenBtnClick}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
