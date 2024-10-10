import {makeFakeFilmFull} from '@/mocks';
import {render, screen} from '@testing-library/react';
import FilmOverview from '@/components/film-overview/film-overview';

describe('Component: FilmOverview', () => {
  it('should render correct', () => {
    const film = makeFakeFilmFull();

    render(<FilmOverview film={film} />);

    expect(screen.getByTestId('film-rating')).toBeInTheDocument();
    expect(screen.getByTestId('film-text')).toBeInTheDocument();
    expect(screen.getByText(film.description)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(film.director, 'i'))).toBeInTheDocument();
  });
});
