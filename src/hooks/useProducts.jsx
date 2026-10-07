import { useState, useEffect } from 'react';

const API_URL = 'https://dummyjson.com/products?limit=20';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch(API_URL, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setProducts(
          data.products.map((p) => ({
            id: p.id,
            title: p.title,
            price: p.price,
            image: p.thumbnail,
          }))
        );
        setError(null);
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, []);

  return { products, loading, error };
}