import { useState } from 'react';
import { useCart } from '../../context/useCart';
import QuantityInput from '../QuantityInput/QuantityInput';
import styles from './ProductCard.module.css';

function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  function handleAdd() {
    addItem(product, quantity);
    setQuantity(1);
  }

  return (
    <article className={styles.card}>
      <img src={product.image} alt={product.title} className={styles.image} />
      <h2 className={styles.title}>{product.title}</h2>
      <p className={styles.price}>${product.price.toFixed(2)}</p>
      <QuantityInput
        value={quantity}
        onChange={setQuantity}
        label={`Quantity for ${product.title}`}
      />
      <button type="button" onClick={handleAdd}>
        Add To Cart
      </button>
    </article>
  );
}

export default ProductCard;
