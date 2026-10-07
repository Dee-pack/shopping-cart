import styles from './Loader.module.css';

function Loader() {
  return (
    <div role="status" className={styles.loader}>
      Loading products...
    </div>
  );
}

export default Loader;