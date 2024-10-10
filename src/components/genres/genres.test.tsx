import {render, screen} from '@testing-library/react';
import {withStore} from '@/mocks/mock-component';
import Genres from '@/components/genres/genres';
import {initFilmState, makeFakeFilm, makeFakeStore} from '@/mocks';

describe('Component: Genres', () => {
  it('should render correct', () => {
    const {withStoreComponent} = withStore(<Genres/>, makeFakeStore());
    render(withStoreComponent);

    expect(screen.getByText('All genres')).toBeInTheDocument();
  });

  it('should have correct genres length', () => {
    const films = [makeFakeFilm(), makeFakeFilm(), makeFakeFilm(), makeFakeFilm(), makeFakeFilm()];
    const initialState = initFilmState({
      films,
    });
    const genres = Array.from(new Set(films.map((film) => film.genre))).slice(0, 9);

    const {withStoreComponent} = withStore(<Genres/>, makeFakeStore({
      FILM: initialState
    }));
    render(withStoreComponent);

    expect(screen.getAllByTestId('genre-item').length).toBe(genres.length);
  });
});
