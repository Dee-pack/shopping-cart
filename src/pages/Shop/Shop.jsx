import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../components/ProductCard/ProductCard';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import styles from './Shop.module.css';

function Shop() {
  const { products, loading, error } = useProducts();

  if (loading) return <Loader />;
  if (error)
    return (
      <ErrorMessage message="Could not load products. Please try again." />
    );

  return (
    <section>
      <h1>Shop</h1>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default Shop;
