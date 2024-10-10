import {render, screen} from '@testing-library/react';
import { withHistory } from '@/mocks/mock-component';
import ErrorBoundary from './error-boundary';

describe('Component: ErrorBoundary', () => {
  it('should render correct', () => {
    render(withHistory(<ErrorBoundary />));

    expect(screen.getByRole('section')).toBeInTheDocument();
    expect(screen.getByText('Go to main page')).toBeInTheDocument();
  });
});
