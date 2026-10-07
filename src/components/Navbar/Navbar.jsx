import { NavLink } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import styles from './Navbar.module.css';

function Navbar() {
  const { totalQuantity } = useCart();

  const cartLabel =
    totalQuantity > 0
      ? `Cart, ${totalQuantity} ${totalQuantity === 1 ? 'item' : 'items'}`
      : 'Cart';

  return (
    <nav className={styles.nav}>
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/shop">Shop</NavLink>
      <NavLink to="/cart" aria-label={cartLabel} className={styles.cartLink}>
        Cart
        {totalQuantity > 0 && (
          <span className={styles.badge} aria-hidden="true">
            {totalQuantity}
          </span>
        )}
      </NavLink>
    </nav>
  );
}

export default Navbar;
