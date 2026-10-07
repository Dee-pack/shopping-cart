import styles from './ErrorMessage.module.css';

function ErrorMessage({ message = 'Something went wrong.' }) {
  return (
    <div role="alert" className={styles.error}>
      {message}
    </div>
  );
}

export default ErrorMessage;
