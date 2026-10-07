import styles from './ProductCard.module.css';

function ProductCard({ product }) {
  return (
    <article className={styles.card}>
      <img src={product.image} alt={product.title} className={styles.image} />
      <h2 className={styles.title}>{product.title}</h2>
      <p className={styles.price}>${product.price.toFixed(2)}</p>
    </article>
  );
}

export default ProductCard;