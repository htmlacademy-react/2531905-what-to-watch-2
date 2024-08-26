import Header from '@/components/header/header';
import {useAppSelector} from '@/hooks/use-app-selector';
import {getPromoFilm} from '@/store/film/selectors';
import FilmDescription from '@/components/film-description/film-description';

type PromoCardProps = {
  showReview?: boolean;
}

function PromoCard({showReview = false}: PromoCardProps) {
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

          <FilmDescription film={promoFilm} showReview={showReview}/>
        </div>
      </div>
    </section>
  );
}

export default PromoCard;
