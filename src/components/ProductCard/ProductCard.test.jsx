import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider } from '../../context/CartContext';
import { useCart } from '../../context/useCart';
import ProductCard from './ProductCard';

const product = { id: 1, title: 'Shirt', price: 20, image: 'shirt.jpg' };

// Tiny helper that displays what's in the cart so we can assert on it.
function CartProbe() {
  const { totalQuantity } = useCart();
  return <p>Items in cart: {totalQuantity}</p>;
}

function renderCard() {
  return render(
    <CartProvider>
      <ProductCard product={product} />
      <CartProbe />
    </CartProvider>
  );
}

describe('ProductCard', () => {
  it('renders the title and price', () => {
    renderCard();

    expect(screen.getByRole('heading', { name: 'Shirt' })).toBeInTheDocument();
    expect(screen.getByText('$20.00')).toBeInTheDocument();
  });

  it('adds the selected quantity to the cart', async () => {
    const user = userEvent.setup();
    renderCard();

    await user.click(screen.getByRole('button', { name: /increase/i }));
    await user.click(screen.getByRole('button', { name: /increase/i }));
    await user.click(screen.getByRole('button', { name: /add to cart/i }));

    expect(screen.getByText('Items in cart: 3')).toBeInTheDocument();
  });

  it('resets the quantity to 1 after adding', async () => {
    const user = userEvent.setup();
    renderCard();

    await user.click(screen.getByRole('button', { name: /increase/i }));
    await user.click(screen.getByRole('button', { name: /add to cart/i }));

    expect(
      screen.getByRole('textbox', { name: /quantity for shirt/i })
    ).toHaveValue('1');
  });
});
