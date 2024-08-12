import {generatePath, useNavigate} from 'react-router-dom';

import Header from '@/components/header/header';
import {useAppSelector} from '@/hooks/use-app-selector';
import {getFavorite, getPromoFilm} from '@/store/film/selectors';
import {getIsUserAuthorized} from '@/store/user/selectors';
import {useAppDispatch} from '@/hooks/use-app-dispatch';
import {toggleFavorite} from '@/store/film/api-actions';
import {AppRoute} from '@/constants';

function PromoCard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(getFavorite);
  const promoFilm = useAppSelector(getPromoFilm);
  const isUserAuthorized = useAppSelector(getIsUserAuthorized);
  const inFavorite = favorites.some((film) => promoFilm && film.id === promoFilm.id);

  const handleFavoriteBtnClick = () => {
    if (promoFilm) {
      const filmId = promoFilm.id;
      const status = Number(!inFavorite);
      dispatch(toggleFavorite({filmId, status}));
    }
  };

  const handlePlayBtnClick = () => {
    if (promoFilm) {
      const filmUrl = generatePath(AppRoute.PlayerPage, {
        id: promoFilm.id,
      });
      navigate(filmUrl);
    }
  };

  return promoFilm && (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={promoFilm.backgroundImage} alt="The Grand Budapest Hotel"/>
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <Header className="film-card__head"/>

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={promoFilm.posterImage} alt={`${promoFilm.name} poster`} width="218" height="327"/>
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">
              {promoFilm.name}
            </h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{promoFilm.genre}</span>
              <span className="film-card__year">{promoFilm.released}</span>
            </p>

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
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromoCard;
