import { render, screen } from '@testing-library/react';
import Shop from './Shop';
import { CartProvider } from '../../context/CartContext';

function renderShop() {
  return render(
    <CartProvider>
      <Shop />
    </CartProvider>
  );
}

const apiResponse = {
  products: [
    { id: 1, title: 'Shirt', price: 20, thumbnail: 'shirt.jpg' },
    { id: 2, title: 'Hat', price: 10.5, thumbnail: 'hat.jpg' },
  ],
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('Shop', () => {
  it('shows a loader while fetching', () => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})));

    renderShop();

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders a card for each product once loaded', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(apiResponse),
      })
    );

    renderShop();

    expect(await screen.findByRole('heading', { name: 'Shirt' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Hat' })).toBeInTheDocument();
    expect(screen.getByText('$10.50')).toBeInTheDocument();
  });

  it('shows an error message when the fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network down')));

    renderShop();

    expect(await screen.findByRole('alert')).toBeInTheDocument();
  });
});