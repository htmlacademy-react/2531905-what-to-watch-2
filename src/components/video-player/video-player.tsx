import {generatePath, useNavigate} from 'react-router-dom';
import React, {useCallback, useEffect, useRef, useState} from 'react';
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

  const timeLineRef = useRef<HTMLDivElement>(null);
  const [toggleClicked, setToggleClicked] = useState(false);

  const timeLeftPercent = time / duration * 100;
  const leftStyle = `${timeLeftPercent < 100 ? timeLeftPercent : 100}%`;
  const remainTimeDisplay = getDisplayedTime(duration - time);

  const handlePlayBtnClick = useCallback(() => {
    const playerEl = playerRef.current;
    if (time < duration) {
      if (isPlaying) {
        playerEl?.pause();
        setIsPlaying(false);
      } else {
        playerEl?.play();
        setIsPlaying(true);
      }
    } else {
      setTime(0);
      playerEl?.play();
      setIsPlaying(true);
    }
  }, [duration, isPlaying, time]);

  const handlePlayerTimeUpdate = useCallback(() => {
    if (time >= duration) {
      playerRef.current?.pause();
      setIsPlaying(false);
      return;
    }
    if (isPlaying) {
      const curTime = playerRef.current?.currentTime || 0;
      setTime(Math.floor(curTime));
    }
  }, [duration, isPlaying, time]);


  const handleTimeLineClick = useCallback((event: React.MouseEvent) => {
    if (timeLineRef.current && playerRef.current) {
      const offsetLeft = timeLineRef.current.offsetLeft ;
      const width = timeLineRef.current.clientWidth;
      const percent = (event.clientX - offsetLeft) / width;
      const curTime = duration * percent;
      setTime(Math.floor(curTime));
      playerRef.current.currentTime = curTime;
    }
  }, [duration]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (toggleClicked) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      handleTimeLineClick(event);
    }
  }, [handleTimeLineClick, toggleClicked]);

  const handleFullscreenBtnClick = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    (document.activeElement as HTMLElement).blur();
  };

  const handleExitBtnClick = (id: string) => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    const filmUrl = generatePath(AppRoute.FilmPage, {
      id,
    });
    navigate(filmUrl);
  };

  const hangleTogglerMouseDown = () => {
    setToggleClicked(true);
  };

  const hanglePlayerMouseUp = () => {
    setToggleClicked(false);
  };

  const handleDataLoaded = () => {
    const videoDuration = playerRef.current?.duration || 0;
    setDuration(Math.round(videoDuration));
  };

  useEffect(() => {
    const playerEl = playerRef.current;
    playerEl?.addEventListener('timeupdate', handlePlayerTimeUpdate);

    return () => {
      playerEl?.removeEventListener('timeupdate', handlePlayerTimeUpdate);
    };
  }, [handlePlayerTimeUpdate]);

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

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', hanglePlayerMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', hanglePlayerMouseUp);
    };
  }, [handleMouseMove]);

  return (
    <div className="player" data-testid="video-player">
      <video
        ref={playerRef}
        src={film.videoLink}
        className="player__video"
        poster={film.posterImage}
        onLoadedData={handleDataLoaded}
      />

      <button type="button" className="player__exit" onClick={() => handleExitBtnClick(film.id)} data-testid="exitBtn">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <div ref={timeLineRef} className={classes.timeLine} onClick={handleTimeLineClick}/>
            <div className={classes.timeLeft} style={{width: leftStyle}} onClick={handleTimeLineClick}/>
            <div
              className="player__toggler"
              style={{left: leftStyle}}
              onMouseDown={hangleTogglerMouseDown}
              onMouseUp={hanglePlayerMouseUp}
            />
          </div>
          <div className="player__time-value">
            {remainTimeDisplay}
          </div>
        </div>

        <div className="player__controls-row">
          {
            <button type="button" className="player__play" onClick={handlePlayBtnClick}>
              {
                isPlaying
                  ? (
                    <>
                      <svg viewBox="0 0 14 21" width="14" height="21">
                        <use xlinkHref="#pause"></use>
                      </svg>
                      <span>Pause</span>
                    </>
                  )
                  : (
                    <>
                      <svg viewBox="0 0 19 19" width="19" height="19">
                        <use xlinkHref="#play-s"></use>
                      </svg>
                      <span>Play</span>
                    </>
                  )
              }
            </button>
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
