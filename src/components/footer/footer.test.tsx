import {render, screen} from '@testing-library/react';
import Footer from '@/components/footer/footer';
import {withHistory} from '@/mocks/mock-component';

describe('Component: FilmsList', () => {
  it('should render correct', () => {
    render(withHistory(<Footer/>));

    expect(screen.getByText(/What to watch Ltd/)).toBeInTheDocument();
  });
});
