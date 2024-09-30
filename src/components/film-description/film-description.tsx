import {FilmPromo} from '@/types';
import FilmCardButtons from '@/components/film-card-buttons/film-card-buttons';

type FilmCardButtonsProps = {
  film: FilmPromo;
}

function FilmDescription({film}: FilmCardButtonsProps) {
  return (
    <div className="film-card__desc">
      <h2 className="film-card__title">
        {film.name}
      </h2>
      <p className="film-card__meta">
        <span className="film-card__genre">
          {film.genre}
        </span>
        <span className="film-card__year">
          {film.released}
        </span>
      </p>
      <FilmCardButtons film={film} showReview />
    </div>
  );
}

export default FilmDescription;
