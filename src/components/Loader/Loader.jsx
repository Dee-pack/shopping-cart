import styles from './Loader.module.css';

function Loader() {
  return (
    <div role="status" className={styles.loader}>
      <div className={styles.box} aria-hidden="true" />
      <span className={styles.srOnly}>Loading products...</span>
    </div>
  );
}

export default Loader;
