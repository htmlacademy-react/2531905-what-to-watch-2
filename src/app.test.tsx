import {createMemoryHistory, MemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {datatype} from 'faker';
import {makeFakeStore} from '@/mocks';
import {AppRoute} from '@/constants';
import {withStore} from '@/mocks/mock-component';
import App from '@/app';
import {generatePath} from 'react-router-dom';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render Main Page when user navigate to "/"', () => {
    const { withStoreComponent } = withStore(<App />, makeFakeStore());
    mockHistory.push(AppRoute.MainPage);

    render(withStoreComponent);

    expect(screen.getByText('Catalog')).toBeInTheDocument();
  });

  it('should render Film Page when user navigate to "/film/:id"', () => {
    const { withStoreComponent } = withStore(<App />, makeFakeStore());
    const filmUrl = generatePath(AppRoute.FilmPage, {
      id: datatype.uuid(),
    });
    mockHistory.push(filmUrl);

    render(withStoreComponent);

    expect(screen.getByTestId('film-page-container')).toBeInTheDocument();
  });

  it('should render Login Page when user navigate to "/"', () => {
    const { withStoreComponent } = withStore(<App />, makeFakeStore());
    mockHistory.push(AppRoute.LoginPage);

    render(withStoreComponent);

    expect(screen.getByText('Catalog')).toBeInTheDocument();
  });
});
