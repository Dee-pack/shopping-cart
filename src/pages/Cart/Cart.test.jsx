import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../../context/CartContext';
import { useCart } from '../../context/useCart';
import Cart from './Cart';

const shirt = { id: 1, title: 'Shirt', price: 20, image: 'shirt.jpg' };
const hat = { id: 2, title: 'Hat', price: 10, image: 'hat.jpg' };

function Seed() {
  const { addItem } = useCart();
  return (
    <>
      <button onClick={() => addItem(shirt, 2)}>add shirts</button>
      <button onClick={() => addItem(hat, 1)}>add hat</button>
    </>
  );
}

function renderCart() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <Seed />
        <Cart />
      </CartProvider>
    </MemoryRouter>
  );
}

describe('Cart page', () => {
  it('shows an empty message when there are no items', () => {
    renderCart();

    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /browse the shop/i })).toBeInTheDocument();
  });

  it('lists items and shows the total', async () => {
    const user = userEvent.setup();
    renderCart();

    await user.click(screen.getByRole('button', { name: 'add shirts' }));
    await user.click(screen.getByRole('button', { name: 'add hat' }));

    expect(screen.getByRole('heading', { name: 'Shirt' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Hat' })).toBeInTheDocument();
    expect(screen.getByText('Total: $50.00')).toBeInTheDocument();
  });

  it('updates the total when a quantity changes', async () => {
    const user = userEvent.setup();
    renderCart();

    await user.click(screen.getByRole('button', { name: 'add hat' }));
    await user.click(screen.getByRole('button', { name: /increase/i }));

    expect(screen.getByText('Total: $20.00')).toBeInTheDocument();
  });

  it('returns to the empty state after removing the last item', async () => {
    const user = userEvent.setup();
    renderCart();

    await user.click(screen.getByRole('button', { name: 'add hat' }));
    await user.click(screen.getByRole('button', { name: 'Remove Hat' }));

    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  });
});