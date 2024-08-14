import Header from '@/components/header/header';
import {useAppSelector} from '@/hooks/use-app-selector';
import {getPromoFilm} from '@/store/film/selectors';
import FilmCardButtons from '@/components/film-card-buttons/film-card-buttons';

function PromoCard() {
  const promoFilm = useAppSelector(getPromoFilm);

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
            <FilmCardButtons film={promoFilm} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromoCard;
