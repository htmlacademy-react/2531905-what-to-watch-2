import {makeFakeFilmFull} from '@/mocks';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VideoPlayer from '@/components/video-player/video-player';
import {withHistory} from '@/mocks/mock-component';

describe('Component: VideoPlayer', () => {
  beforeAll(() => {
    HTMLMediaElement.prototype.pause = vi.fn();
    HTMLMediaElement.prototype.load = vi.fn();
  });

  it('should render correct', () => {
    const film = makeFakeFilmFull();

    render(withHistory(<VideoPlayer film={film} />));
    const container = screen.getByTestId('video-player');
    const exitBtn = screen.getByText('Exit');
    const fullscreenBtn = screen.getByText('Full screen');

    expect(container).toBeInTheDocument();
    expect(exitBtn).toBeInTheDocument();
    expect(fullscreenBtn).toBeInTheDocument();
  });

  it('should call exit button click', async () => {
    const film = makeFakeFilmFull();
    const handleExitBtnClick = vi.fn();

    render(withHistory(<VideoPlayer film={film} />));
    const exitBtn = screen.getByTestId('exitBtn');
    userEvent.click(exitBtn);

    await waitFor(() => expect(handleExitBtnClick).toHaveBeenCalledTimes(1));
  });
});
