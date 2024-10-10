import {render, screen} from '@testing-library/react';
import {datatype} from 'faker';
import FilmReviews from '@/components/film-reviews/film-reviews';
import {withStore} from '@/mocks/mock-component';
import {initReviewState, makeFakeReview, makeFakeStore} from '@/mocks';
import {RequestStatus} from '@/constants';

describe('Component: FilmOverview', () => {
  it('should render correct', () => {
    const filmId = datatype.uuid();

    const { withStoreComponent } = withStore(<FilmReviews filmId={filmId} />, makeFakeStore());
    render(withStoreComponent);

    expect(screen.getByTestId('reviews-container')).toBeInTheDocument();
  });

  it('should show loading message while loading reviews', () => {
    const filmId = datatype.uuid();
    const initialState = initReviewState({
      reviewsListStatus: RequestStatus.Pending,
    });

    const { withStoreComponent } = withStore(<FilmReviews filmId={filmId} />, makeFakeStore({
      REVIEW: initialState,
    }));
    render(withStoreComponent);

    expect(screen.getByText('Loading reviews...')).toBeInTheDocument();
  });

  it('should message when there are no reviews', () => {
    const filmId = datatype.uuid();

    const { withStoreComponent } = withStore(<FilmReviews filmId={filmId} />, makeFakeStore());
    render(withStoreComponent);

    expect(screen.getByText('No reviews yet.')).toBeInTheDocument();
  });

  it('should show reviews in two columns and have length as set', () => {
    const filmId = datatype.uuid();
    const initialState = initReviewState({
      reviews: [makeFakeReview(), makeFakeReview(), makeFakeReview()],
    });

    const { withStoreComponent } = withStore(<FilmReviews filmId={filmId} />, makeFakeStore({
      REVIEW: initialState,
    }));
    render(withStoreComponent);

    expect(screen.getAllByTestId('reviews-col').length).toEqual(2);
    expect(screen.getAllByTestId('reviews-item').length).toEqual(3);
  });
});
