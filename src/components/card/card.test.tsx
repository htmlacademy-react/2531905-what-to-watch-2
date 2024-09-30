import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {makeFakeFilm} from '@/mocks';
import { withHistory } from '@/mocks/mock-component';
import Card from '@/components/card/card';

describe('Component: Card', () => {
  beforeAll(() => {
    HTMLMediaElement.prototype.pause = vi.fn();
    HTMLMediaElement.prototype.load = vi.fn();
  });

  it('should render correct', () => {
    const film = makeFakeFilm();

    render(withHistory(<Card film={film} />));
    const cardContainer = screen.getByRole('article');
    const videoEl = screen.getByTestId('video');

    expect(cardContainer).toBeInTheDocument();
    expect(videoEl).toBeInTheDocument();
  });

  it('should play video when mouse hover', async () => {
    const film = makeFakeFilm();

    render(withHistory(<Card film={film} />));
    const videoEl = screen.getByTestId<HTMLVideoElement>('video');
    fireEvent(screen.getByRole('article'), new Event('mouseover'));

    await waitFor(() => expect(videoEl).toHaveClass('is_playing'));
  });
});
