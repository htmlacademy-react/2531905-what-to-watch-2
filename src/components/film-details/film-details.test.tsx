import {makeFakeFilmFull} from '@/mocks';
import FilmDetails from '@/components/film-details/film-details';
import {render, screen} from '@testing-library/react';

describe('Component: FilmDetails', () => {
  it('should render correct', () => {
    const film = makeFakeFilmFull();

    render(<FilmDetails film={film} />);
    const container = screen.getByTestId('film-card');

    expect(container).toBeInTheDocument();
    expect(screen.getByText('Director')).toBeInTheDocument();
    expect(screen.getByText('Starring')).toBeInTheDocument();
    expect(screen.getByText(film.genre)).toBeInTheDocument();
    expect(screen.getByText(film.released)).toBeInTheDocument();
  });
});
