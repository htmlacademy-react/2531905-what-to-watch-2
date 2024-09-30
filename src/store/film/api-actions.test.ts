import {withExtraArgument} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action} from '@reduxjs/toolkit';
import {datatype} from 'faker';

import {getFilms, getFavorite, getPromo, toggleFavorite} from './api-actions';
import {extractActionsTypes, makeFakeFilm, makeFakeFilmFull, makeFakePromoFilm} from '@/mocks';
import {createAPI} from '@/services/api';
import {ApiUrl} from '@/constants';
import {State} from '@/types/state';
import {AppThunkDispatch} from '@/types/test';

describe('Film slice async actions', () => {
  const api = createAPI();
  const mockAxiosAdapter = new MockAdapter(api);
  const middleware = [withExtraArgument({api})];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ DATA: { films: [] }});
  });

  describe('getFilms Action test', () => {
    it('should dispatch "getFilms.pending", "getFilms.fulfilled", when server response 200', async() => {
      const mockFilms = [makeFakeFilm(), makeFakeFilm()];
      mockAxiosAdapter.onGet(ApiUrl.Films).reply(200, mockFilms);

      await store.dispatch(getFilms());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const getFilmsActionFulfilled = emittedActions.at(1) as ReturnType<typeof getFilms.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        getFilms.pending.type,
        getFilms.fulfilled.type,
      ]);

      expect(getFilmsActionFulfilled.payload).toEqual(mockFilms);
    });

    it('should dispatch "getFilms.pending", "getFilms.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiUrl.Films).reply(400, []);

      await store.dispatch(getFilms());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getFilms.pending.type,
        getFilms.rejected.type,
      ]);
    });
  });

  describe('getFavorite Action test', () => {
    it('should dispatch "getFavorite.pending", "getFavorite.fulfilled", when server response 200', async() => {
      const mockFilms = [makeFakeFilm(), makeFakeFilm()];
      mockAxiosAdapter.onGet(ApiUrl.Favorite).reply(200, mockFilms);

      await store.dispatch(getFavorite());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const getFavoriteActionFulfilled = emittedActions.at(1) as ReturnType<typeof getFavorite.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        getFavorite.pending.type,
        getFavorite.fulfilled.type,
      ]);

      expect(getFavoriteActionFulfilled.payload).toEqual(mockFilms);
    });

    it('should dispatch "getFavorite.pending", "getFavorite.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiUrl.Favorite).reply(400, []);

      await store.dispatch(getFavorite());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getFavorite.pending.type,
        getFavorite.rejected.type,
      ]);
    });
  });

  describe('getPromo Action test', () => {
    it('should dispatch "getPromo.pending", "getPromo.fulfilled", when server response 200', async() => {
      const mockPromoFilm = makeFakePromoFilm();
      mockAxiosAdapter.onGet(ApiUrl.Promo).reply(200, mockPromoFilm);

      await store.dispatch(getPromo());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const getPromoActionFulfilled = emittedActions.at(1) as ReturnType<typeof getPromo.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        getPromo.pending.type,
        getPromo.fulfilled.type,
      ]);

      expect(getPromoActionFulfilled.payload).toEqual(mockPromoFilm);
    });

    it('should dispatch "getPromo.pending", "getPromo.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiUrl.Promo).reply(400, []);

      await store.dispatch(getPromo());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getPromo.pending.type,
        getPromo.rejected.type,
      ]);
    });
  });

  describe('toggleFavorite Action test', () => {
    it('should dispatch "toggleFavorite.pending", "toggleFavorite.fulfilled", when server response 200', async() => {
      const mockFilmFull = makeFakeFilmFull();
      const payload = {
        filmId: datatype.uuid(),
        status: datatype.number({ min: 0, max: 1 }),
      };
      mockAxiosAdapter.onPost(`${ApiUrl.Favorite}/${payload.filmId}/${payload.status}`).reply(200, mockFilmFull);

      await store.dispatch(toggleFavorite(payload));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const getPromoActionFulfilled = emittedActions.at(1) as ReturnType<typeof toggleFavorite.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        toggleFavorite.pending.type,
        toggleFavorite.fulfilled.type,
      ]);

      expect(getPromoActionFulfilled.payload).toEqual(mockFilmFull);
    });

    it('should dispatch "toggleFavorite.pending", "toggleFavorite.rejected" when server response 404', async () => {
      const payload = {
        filmId: datatype.uuid(),
        status: datatype.number({ min: 0, max: 1 }),
      };
      mockAxiosAdapter.onPost(`${ApiUrl.Favorite}/${payload.filmId}/${payload.status}`).reply(404, []);

      await store.dispatch(toggleFavorite(payload));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        toggleFavorite.pending.type,
        toggleFavorite.rejected.type,
      ]);
    });
  });
});
