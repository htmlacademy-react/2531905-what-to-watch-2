import clsx from 'clsx';

import {useAppSelector} from '@/hooks/use-app-selector';
import {getFilms, getSelectedGenre} from '@/store/film/selectors';
import {useAppDispatch} from '@/hooks/use-app-dispatch';
import {changeFilmsLimit, setSelectedGenre} from '@/store/film/film';
import {FilmCountDiff} from '@/constants';

function Genres() {
  const dispatch = useAppDispatch();
  const films = useAppSelector(getFilms);
  const selectedGenre = useAppSelector(getSelectedGenre);
  const availableGenres = Array.from(new Set(films.map((film) => film.genre)));

  const handleGenreClick = (genre: string | null) => {
    dispatch(setSelectedGenre(genre));
    dispatch(changeFilmsLimit(FilmCountDiff.Reset));
  };

  return (
    <ul className="catalog__genres-list">
      <li className={clsx('catalog__genres-item', !selectedGenre && 'catalog__genres-item--active')}>
        <a className="catalog__genres-link" onClick={() => handleGenreClick(null)}>All genres</a>
      </li>
      {
        availableGenres.map((genre) => (
          <li key={genre} className={clsx('catalog__genres-item', selectedGenre === genre && 'catalog__genres-item--active')}>
            <a className="catalog__genres-link" onClick={() => handleGenreClick(genre)}>{genre}</a>
          </li>
        ))
      }
    </ul>
  );
}

export default Genres;
