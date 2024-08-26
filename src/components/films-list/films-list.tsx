import Card from '@/components/card/card';

import {useAppSelector} from '@/hooks/use-app-selector';
import {useAppDispatch} from '@/hooks/use-app-dispatch';
import {changeFilmsLimit} from '@/store/film/film';
import {getFilms, getFilmsLimit, getSelectedGenre} from '@/store/film/selectors';
import {FilmCountDiff} from '@/constants';

function FilmsList() {
  const dispatch = useAppDispatch();
  const allFilms = useAppSelector(getFilms);
  const genre = useAppSelector(getSelectedGenre);
  const limit = useAppSelector(getFilmsLimit);
  const films = genre ? allFilms.filter((film) => film.genre === genre) : allFilms;
  const showMoreBtn = films.length > limit;

  const handleShowMoreBtnClick = () => {
    dispatch(changeFilmsLimit(FilmCountDiff.Increase));
  };

  return (
    <>
      <div className="catalog__films-list">
        {
          films.slice(0, limit).map((film) => <Card key={film.id} film={film}/>)
        }
      </div>
      <div className="catalog__more">
        {
          showMoreBtn && <button className="catalog__button" type="button" onClick={handleShowMoreBtnClick}>Show more</button>
        }
      </div>
    </>
  );
}

export default FilmsList;
