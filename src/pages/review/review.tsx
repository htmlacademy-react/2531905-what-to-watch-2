import Header from '@/components/header/header';
import ReviewForm from '@/components/review-form/review-form';
import {useLoaderData} from 'react-router-dom';
import {FilmFull} from '@/types';

function Review() {
  const film = useLoaderData() as FilmFull;

  return (
    <section className="film-card film-card--full" style={{backgroundColor: film.backgroundColor}}>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327"/>
        </div>
      </div>

      <div className="add-review">
        <ReviewForm filmId={film.id} />
      </div>

    </section>
  );
}

export default Review;
