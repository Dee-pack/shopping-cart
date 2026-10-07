import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const highlights = [
  {
    title: 'Wide selection',
    text: 'Browse products across many categories, all in one place.',
  },
  {
    title: 'Simple cart',
    text: 'Pick your quantity, add to cart, and adjust it any time.',
  },
  {
    title: 'Live updates',
    text: 'Your cart count updates instantly as you shop.',
  },
];

function Home() {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <h1 className={styles.heading}>Welcome to Dee Store</h1>
        <p className={styles.tagline}>
          Great products, a smooth checkout-free experience, and zero stress.
        </p>
        <Link to="/shop" className={styles.cta}>
          Start shopping
        </Link>
      </section>

      <section className={styles.highlights} aria-label="Why shop with us">
        {highlights.map((item) => (
          <article key={item.title} className={styles.highlight}>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export default Home;