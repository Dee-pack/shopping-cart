import { useCart } from '../../context/useCart';
import QuantityInput from '../QuantityInput/QuantityInput';
import styles from './CartItem.module.css';

function CartItem({ item }) {
  const { setQuantity, removeItem } = useCart();

  return (
    <li className={styles.item}>
      <img src={item.image} alt={item.title} className={styles.image} />
      <div className={styles.details}>
        <h2 className={styles.title}>{item.title}</h2>
        <p>${item.price.toFixed(2)} each</p>
      </div>
      <QuantityInput
        value={item.quantity}
        onChange={(q) => setQuantity(item.id, q)}
        label={`Quantity for ${item.title}`}
      />
      <p className={styles.subtotal}>
        ${(item.price * item.quantity).toFixed(2)}
      </p>
      <button
        type="button"
        aria-label={`Remove ${item.title}`}
        onClick={() => removeItem(item.id)}
      >
        Remove
      </button>
    </li>
  );
}

export default CartItem;