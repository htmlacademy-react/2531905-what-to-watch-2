import {useEffect} from 'react';

import {getReviews} from '@/store/review/api-actions';
import {useAppDispatch} from '@/hooks/use-app-dispatch';
import {useAppSelector} from '@/hooks/use-app-selector';
import {getReviewsList} from '@/store/review/selectors';
import {formatDate} from '@/utils';

type FilmReviewsProps = {
  filmId: string;
}

function FilmReviews({filmId}: FilmReviewsProps) {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(getReviewsList);
  const half = Math.floor(reviews.length / 2);

  const splitReviews = [
    {
      id: 'first',
      items: [...reviews.slice(half)],
    },
    {
      id: 'second',
      items: [...reviews.slice(0, half)],
    }
  ];

  useEffect(() => {
    dispatch(getReviews(filmId));
  }, [dispatch, filmId]);

  return (
    <div className="film-card__reviews film-card__row">
      {
        reviews.length === 0 && (
          <div className="film-card__reviews-col">
            <span className="film-card__details-value">No reviews yet.</span>
          </div>
        )
      }
      {
        splitReviews.map((list) => (
          <div key={list.id} className="film-card__reviews-col">
            {
              list.items.map((review) => {
                const date = formatDate(review.date);

                return (
                  <div key={review.id} className="review">
                    <blockquote className="review__quote">
                      <p className="review__text">
                        {review.comment}
                      </p>

                      <footer className="review__details">
                        <cite className="review__author">{review.user}</cite>
                        <time className="review__date" dateTime={date.dateTime}>
                          {date.dateText}
                        </time>
                      </footer>
                    </blockquote>

                    <div className="review__rating">{review.rating}</div>
                  </div>
                );
              })
            }
          </div>
        ))
      }
    </div>
  );
}

export default FilmReviews;
