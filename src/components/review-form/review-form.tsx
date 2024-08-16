import {ChangeEvent, FormEvent, Fragment, useEffect, useState} from 'react';
import {toast} from 'react-toastify';

import {useAppSelector} from '@/hooks/use-app-selector';
import {getReviewRequestStatus} from '@/store/review/selectors';
import {MAX_REVIEW_LENGTH, MIN_REVIEW_LENGTH, RATING_STARS_COUNT, RequestStatus} from '@/constants';
import {useAppDispatch} from '@/hooks/use-app-dispatch';
import {sendReview} from '@/store/review/api-actions';

type ReviewFormProps = {
  filmId: string;
}

function ReviewForm({filmId}: ReviewFormProps) {
  const dispatch = useAppDispatch();
  const requestStatus = useAppSelector(getReviewRequestStatus);
  const [state, setState] = useState({
    comment: '',
    rating: '',
  });

  const handleStateChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const data = {
      formData: {
        rating: parseInt(state.rating, 10),
        comment: state.comment,
      },
      filmId,
    };

    dispatch(sendReview(data));
  };

  const isPending = requestStatus === RequestStatus.Pending;
  const isError = requestStatus === RequestStatus.Failed;
  const isBtnDisabled = isPending || state.comment.length < MIN_REVIEW_LENGTH || state.comment.length > MAX_REVIEW_LENGTH || state.rating.length === 0;

  useEffect(() => {
    if (isError) {
      toast.error('Error occurred while sending review. Try again later');
    }
  }, [isError]);

  return (
    <form className="add-review__form" onSubmit={handleSubmit}>
      <div className="rating">
        <div className="rating__stars">
          {
            [...Array(RATING_STARS_COUNT).keys()].reverse().map((number) => (
              <Fragment key={number}>
                <input
                  className="rating__input"
                  id={`star-${number + 1}`}
                  type="radio" name="rating"
                  value={number + 1}
                  disabled={isPending}
                  onChange={handleStateChange}
                />
                <label className="rating__label" htmlFor={`star-${number + 1}`}>
                  Rating {number + 1}
                </label>
              </Fragment>
            ))
          }
        </div>
      </div>

      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="comment"
          id="review-text"
          placeholder="Review text"
          disabled={isPending}
          onChange={handleStateChange}
        />
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={isBtnDisabled}>Post</button>
        </div>
      </div>
      <p className="film-card__details-value">
        To submit review please make sure to set <span className="reviews__star">rating</span> and
        write your comment with at least <b>{MIN_REVIEW_LENGTH}</b> characters and
        at most <b>{MAX_REVIEW_LENGTH}</b> characters.
      </p>
    </form>
  );
}

export default ReviewForm;
