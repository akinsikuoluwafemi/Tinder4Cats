import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';
import Wrapper from '@/test-setup';

jest.mock('next/router', () => require('next-router-mock'));

describe('Home', () => {
  it('it renders home page', () => {
    render(<Home />, { wrapper: Wrapper });

    const homePage = screen.getByRole('link', { name: 'Tinder for Cats' });
    expect(homePage).toBeInTheDocument();
  });
});
