import {useAppSelector} from '@/hooks/use-app-selector';
import {getIsUserAuthorized} from '@/store/user/selectors';
import {toggleFavorite} from '@/store/film/api-actions';
import {generatePath, useNavigate} from 'react-router-dom';
import {AppRoute} from '@/constants';
import {getFavorite} from '@/store/film/selectors';
import {FilmPromo} from '@/types';
import {useAppDispatch} from '@/hooks/use-app-dispatch';

type FilmCardButtonsProps = {
  film: FilmPromo;
}

function FilmCardButtons({film}: FilmCardButtonsProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(getFavorite);
  const isUserAuthorized = useAppSelector(getIsUserAuthorized);
  const inFavorite = favorites.some((item) => film.id === item.id);

  const handleFavoriteBtnClick = () => {
    const filmId = film.id;
    const status = Number(!inFavorite);
    dispatch(toggleFavorite({filmId, status}));
  };

  const handlePlayBtnClick = () => {
    const filmUrl = generatePath(AppRoute.PlayerPage, {
      id: film.id,
    });
    navigate(filmUrl);
  };

  return (
    <div className="film-card__buttons">
      <button className="btn btn--play film-card__button" type="button" onClick={handlePlayBtnClick}>
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"></use>
        </svg>
        <span>Play</span>
      </button>
      {
        isUserAuthorized && (
          <button className="btn btn--list film-card__button" type="button" onClick={handleFavoriteBtnClick}>
            {
              inFavorite
                ? <svg viewBox="0 0 18 14" width="18" height="14"><use xlinkHref="#in-list"></use></svg>
                : <svg viewBox="0 0 19 20" width="19" height="20"><use xlinkHref="#add"></use></svg>
            }
            <span>My list</span>
            <span className="film-card__count">{favorites.length}</span>
          </button>
        )
      }
    </div>
  );
}

export default FilmCardButtons;
