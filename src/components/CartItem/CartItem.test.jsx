import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider } from '../../context/CartContext';
import { useCart } from '../../context/useCart';
import CartItem from './CartItem';

const shirt = { id: 1, title: 'Shirt', price: 20, image: 'shirt.jpg' };

// Seeds the cart, then renders CartItem for whatever is in it.
function Seed() {
  const { items, addItem } = useCart();
  return (
    <>
      <button onClick={() => addItem(shirt, 2)}>seed</button>
      <ul>
        {items.map((i) => (
          <CartItem key={i.id} item={i} />
        ))}
      </ul>
      <p>count: {items.length}</p>
    </>
  );
}

async function renderSeeded() {
  const user = userEvent.setup();
  render(
    <CartProvider>
      <Seed />
    </CartProvider>
  );
  await user.click(screen.getByRole('button', { name: 'seed' }));
  return user;
}

describe('CartItem', () => {
  it('shows the title, unit price and subtotal', async () => {
    await renderSeeded();

    expect(screen.getByRole('heading', { name: 'Shirt' })).toBeInTheDocument();
    expect(screen.getByText('$20.00 each')).toBeInTheDocument();
    expect(screen.getByText('$40.00')).toBeInTheDocument();
  });

  it('updates the subtotal when quantity increases', async () => {
    const user = await renderSeeded();

    await user.click(screen.getByRole('button', { name: /increase/i }));

    expect(screen.getByText('$60.00')).toBeInTheDocument();
  });

  it('updates the subtotal when quantity decreases', async () => {
    const user = await renderSeeded();

    await user.click(screen.getByRole('button', { name: /decrease/i }));

    expect(screen.getByText('$20.00')).toBeInTheDocument();
  });

  it('removes the item when Remove is clicked', async () => {
    const user = await renderSeeded();

    await user.click(screen.getByRole('button', { name: 'Remove Shirt' }));

    expect(screen.getByText('count: 0')).toBeInTheDocument();
  });
});