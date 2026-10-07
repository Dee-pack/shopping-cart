import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
}

describe('Home', () => {
  it('renders the main heading', () => {
    renderHome();

    expect(
      screen.getByRole('heading', { level: 1, name: /welcome/i })
    ).toBeInTheDocument();
  });

  it('has a call-to-action link to the shop', () => {
    renderHome();

    expect(screen.getByRole('link', { name: /start shopping/i })).toHaveAttribute(
      'href',
      '/shop'
    );
  });

  it('renders the highlight sections', () => {
    renderHome();

    expect(screen.getByRole('heading', { name: 'Wide selection' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Simple cart' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Live updates' })).toBeInTheDocument();
  });
});