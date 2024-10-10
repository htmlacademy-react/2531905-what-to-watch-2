import {render, screen, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilmCardButtons from '@/components/film-card-buttons/film-card-buttons';
import {initFilmState, initUserState, makeFakePromoFilm, makeFakeStore} from '@/mocks';
import {expect} from 'vitest';
import {withHistory, withStore} from '@/mocks/mock-component';
import {AuthorizationStatus} from '@/constants';

describe('Component: FilmCardButtons', () => {
  it('should render correct', () => {
    const film = makeFakePromoFilm();

    const { withStoreComponent } = withStore(withHistory(<FilmCardButtons film={film} />), makeFakeStore());
    render(withStoreComponent);
    const container = screen.getByTestId('film-card-buttons');

    expect(container).toBeInTheDocument();
  });

  it('should not show buttons for not authenticated user', () => {
    const film = makeFakePromoFilm();

    const { withStoreComponent } = withStore(withHistory(<FilmCardButtons film={film} />), makeFakeStore());
    render(withStoreComponent);
    const inListIcon = screen.queryByTestId('in-list-icon');
    const addIcon = screen.queryByTestId('add-icon');

    expect(addIcon).not.toBeInTheDocument();
    expect(inListIcon).not.toBeInTheDocument();
  });

  it('should show favorite icon when film in favorites', () => {
    const film = makeFakePromoFilm();
    const favorite = [{
      id: film.id,
      name: film.name,
      previewImage: film.posterImage,
      previewVideoLink: film.videoLink,
      genre: film.genre,
    }];
    const fakeFilmsSlice = initFilmState({favorite});
    const fakeUserState = initUserState({
      authorizationStatus: AuthorizationStatus.Auth,
      user: {
        token: 'usertoken'
      },
    });

    const { withStoreComponent } = withStore(withHistory(<FilmCardButtons film={film} />), makeFakeStore({
      FILM: fakeFilmsSlice,
      USER: fakeUserState,
    }));
    render(withStoreComponent);
    const inListIcon = screen.getByTestId('in-list-icon');
    const addIcon = screen.queryByTestId('add-icon');

    expect(inListIcon).toBeInTheDocument();
    expect(addIcon).not.toBeInTheDocument();
  });

  it('should show add icon when film is not in favorites', () => {
    const film = makeFakePromoFilm();
    const fakeFilmsSlice = initFilmState();
    const fakeUserState = initUserState({
      authorizationStatus: AuthorizationStatus.Auth,
      user: {
        token: 'usertoken'
      },
    });

    const { withStoreComponent } = withStore(withHistory(<FilmCardButtons film={film} />), makeFakeStore({
      FILM: fakeFilmsSlice,
      USER: fakeUserState,
    }));
    render(withStoreComponent);
    const inListIcon = screen.queryByTestId('in-list-icon');
    const addIcon = screen.getByTestId('add-icon');

    expect(addIcon).toBeInTheDocument();
    expect(inListIcon).not.toBeInTheDocument();
  });

  it('should redirect to player page when play button clicked', async () => {
    const film = makeFakePromoFilm();

    const { withStoreComponent } = withStore(withHistory(<FilmCardButtons film={film} />), makeFakeStore());
    render(withStoreComponent);
    await act(async () => await userEvent.click(screen.getByRole('button')));

    expect(screen.getByRole('video')).toBeInTheDocument();
  });

  it('should change icon when add button clicked', async () => {
    const film = makeFakePromoFilm();
    const fakeFilmsSlice = initFilmState();
    const fakeUserState = initUserState({
      authorizationStatus: AuthorizationStatus.Auth,
      user: {
        token: 'usertoken'
      },
    });

    const { withStoreComponent } = withStore(withHistory(<FilmCardButtons film={film} />), makeFakeStore({
      FILM: fakeFilmsSlice,
      USER: fakeUserState,
    }));
    render(withStoreComponent);
    const favoriteBtn = screen.getByTestId('toggle-fav-btn');
    const inListIcon = screen.queryByTestId('in-list-icon');
    const addIcon = screen.getByTestId('add-icon');

    expect(favoriteBtn).toBeInTheDocument();
    expect(addIcon).toBeInTheDocument();
    expect(inListIcon).not.toBeInTheDocument();

    await act(async () => await userEvent.click(favoriteBtn));

    expect(screen.queryByTestId('in-list-icon')).toBeInTheDocument();
  });
});
