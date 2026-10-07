import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../../context/CartContext';
import { useCart } from '../../context/useCart';
import Navbar from './Navbar';

const shirt = { id: 1, title: 'Shirt', price: 20, image: 'shirt.jpg' };
const hat = { id: 2, title: 'Hat', price: 10, image: 'hat.jpg' };

// Test-only controls that change the cart from outside the Navbar.
function CartControls() {
  const { addItem, removeItem } = useCart();
  return (
    <>
      <button onClick={() => addItem(shirt, 2)}>add shirts</button>
      <button onClick={() => addItem(hat, 1)}>add hat</button>
      <button onClick={() => removeItem(shirt.id)}>remove shirts</button>
    </>
  );
}

function renderNavbar() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <Navbar />
        <CartControls />
      </CartProvider>
    </MemoryRouter>
  );
}

describe('Navbar', () => {
  it('renders links to all three pages', () => {
    renderNavbar();

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Shop' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^cart/i })).toBeInTheDocument();
  });

  it('shows no badge when the cart is empty', () => {
    renderNavbar();

    expect(screen.getByRole('link', { name: 'Cart' })).toHaveTextContent(
      /^Cart$/
    );
  });

  it('shows the total quantity once items are added', async () => {
    const user = userEvent.setup();
    renderNavbar();

    await user.click(screen.getByRole('button', { name: 'add shirts' }));

    const cartLink = screen.getByRole('link', { name: 'Cart, 2 items' });
    expect(cartLink).toHaveTextContent('2');
  });

  it('updates as more items are added and removed', async () => {
    const user = userEvent.setup();
    renderNavbar();

    await user.click(screen.getByRole('button', { name: 'add shirts' }));
    await user.click(screen.getByRole('button', { name: 'add hat' }));
    expect(
      screen.getByRole('link', { name: 'Cart, 3 items' })
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'remove shirts' }));
    expect(
      screen.getByRole('link', { name: 'Cart, 1 item' })
    ).toBeInTheDocument();
  });
});
