import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {withHistory, withStore} from '@/mocks/mock-component';
import {initFilmState, makeFakeFilm, makeFakeStore} from '@/mocks';
import FilmsList from '@/components/films-list/films-list';

describe('Component: FilmsList', () => {
  it('should render correct', () => {
    const {withStoreComponent} = withStore(<FilmsList/>, makeFakeStore());
    render(withStoreComponent);

    expect(screen.getByTestId('films-list')).toBeInTheDocument();
  });

  it('should render films cards correctly', () => {
    HTMLMediaElement.prototype.pause = vi.fn();
    HTMLMediaElement.prototype.load = vi.fn();
    const initialState = initFilmState({
      films: [makeFakeFilm(), makeFakeFilm(), makeFakeFilm(), makeFakeFilm()]
    });

    const {withStoreComponent} = withStore(<FilmsList/>, makeFakeStore({
      FILM: initialState,
    }));
    render(withHistory(withStoreComponent));

    expect(screen.getAllByRole('article').length).toBe(4);
  });

  it('should render filtered films by genre', () => {
    HTMLMediaElement.prototype.pause = vi.fn();
    HTMLMediaElement.prototype.load = vi.fn();
    const films = [makeFakeFilm(), makeFakeFilm(), makeFakeFilm(), makeFakeFilm()];
    const selectedGenre = films[0].genre;
    const initialState = initFilmState({
      films,
      selectedGenre,
    });
    const filtered = films.filter((film) => film.genre === selectedGenre);

    const {withStoreComponent} = withStore(<FilmsList/>, makeFakeStore({
      FILM: initialState,
    }));
    render(withHistory(withStoreComponent));

    expect(screen.getAllByRole('article').length).toBe(filtered.length);
  });

  it('should show more button when films are greater than limit', () => {
    HTMLMediaElement.prototype.pause = vi.fn();
    HTMLMediaElement.prototype.load = vi.fn();
    const initialState = initFilmState({
      films: [makeFakeFilm(), makeFakeFilm(), makeFakeFilm(), makeFakeFilm(), makeFakeFilm(), makeFakeFilm(), makeFakeFilm(), makeFakeFilm(), makeFakeFilm()]
    });

    const {withStoreComponent} = withStore(<FilmsList/>, makeFakeStore({
      FILM: initialState,
    }));
    render(withHistory(withStoreComponent));

    expect(screen.getByText('Show more')).toBeInTheDocument();
  });

  it('should show increase limit by button click', async () => {
    HTMLMediaElement.prototype.pause = vi.fn();
    HTMLMediaElement.prototype.load = vi.fn();
    const films = [makeFakeFilm(), makeFakeFilm(), makeFakeFilm(), makeFakeFilm(), makeFakeFilm(), makeFakeFilm(), makeFakeFilm(), makeFakeFilm(), makeFakeFilm()];
    const initialState = initFilmState({
      films,
    });

    const {withStoreComponent} = withStore(<FilmsList/>, makeFakeStore({
      FILM: initialState,
    }));
    const component = withHistory(withStoreComponent);
    const {rerender} = render(component);

    expect(screen.getByText('Show more')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Show more'));
    rerender(component);
    await waitFor(() => expect(screen.getAllByRole('article').length).toBe(films.length));
  });

});
