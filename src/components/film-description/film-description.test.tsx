import {makeFakePromoFilm, makeFakeStore} from '@/mocks';
import {withHistory, withStore} from '@/mocks/mock-component';
import {render, screen} from '@testing-library/react';
import FilmDescription from '@/components/film-description/film-description';

describe('Component: FilmDescription', () => {
  it('should render correct', () => {
    const film = makeFakePromoFilm();

    const { withStoreComponent } = withStore(withHistory(<FilmDescription film={film} />), makeFakeStore());
    render(withStoreComponent);
    const container = screen.getByTestId('film-card-buttons');

    expect(container).toBeInTheDocument();
    expect(screen.getByText(film.name)).toBeInTheDocument();
    expect(screen.getByText(film.genre)).toBeInTheDocument();
    expect(screen.getByText(film.released)).toBeInTheDocument();
  });
});
