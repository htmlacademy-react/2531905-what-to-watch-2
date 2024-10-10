import { MemoryHistory, createMemoryHistory } from 'history';
import HistoryRouter from './history-route';
import { HelmetProvider } from 'react-helmet-async';
import {createAPI} from '@/services/api';
import MockAdapter from 'axios-mock-adapter';
import {withExtraArgument} from 'redux-thunk';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import {State} from '@/types/state';
import {Action} from '@reduxjs/toolkit';
import {AppThunkDispatch} from '@/types/test';
import {Provider} from 'react-redux';

export function withHistory(component: JSX.Element, history?: MemoryHistory) {
  const memoryHistory = history ?? createMemoryHistory();

  return (
    <HistoryRouter history={memoryHistory}>
      <HelmetProvider>
        {component}
      </HelmetProvider>
    </HistoryRouter>
  );
}

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
}

export function withStore(
  component: JSX.Element,
  initialState: Partial<State> = {},
): ComponentWithMockStore {
  const api = createAPI();
  const mockAxiosAdapter = new MockAdapter(api);
  const middleware = [withExtraArgument({api})];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return ({
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  });
}
