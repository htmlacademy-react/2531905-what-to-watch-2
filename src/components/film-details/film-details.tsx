import {formatRunTime} from '@/utils';
import {FilmFull} from '@/types';
import {Fragment} from 'react';

type FilmDetailsProps = {
  film: FilmFull;
}

function FilmDetails({film}: FilmDetailsProps) {
  return (
    <div className="film-card__text film-card__row" data-testid="film-card">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{film.director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {
              film.starring.map((item, index) => (
                (index < film.starring.length - 1) ? (<Fragment key={item}>{item}, <br/></Fragment>) : item
              ))
            }
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{formatRunTime(film.runTime)}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{film.genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{film.released}</span>
        </p>
      </div>
    </div>
  );
}

export default FilmDetails;
