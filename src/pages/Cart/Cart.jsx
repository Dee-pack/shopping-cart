import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import CartItem from '../../components/CartItem/CartItem';
import styles from './Cart.module.css';

function Cart() {
  const { items, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <section className={styles.empty}>
        <h1>Your cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/shop">Browse the shop</Link>
      </section>
    );
  }

  return (
    <section className={styles.cart}>
      <h1>Your cart</h1>
      <ul className={styles.list}>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <p className={styles.total}>Total: ${totalPrice.toFixed(2)}</p>
    </section>
  );
}

export default Cart;