import { useState } from 'react';
import styles from './QuantityInput.module.css';

function QuantityInput({
  value,
  onChange,
  min = 1,
  max = 99,
  label = 'Quantity',
}) {
  // `draft` holds what the user is typing while it's not yet a valid number
  // (e.g. an empty field). When null, we just display the real value.
  const [draft, setDraft] = useState(null);
  const display = draft ?? String(value);

  function handleChange(e) {
    const text = e.target.value;

    if (!/^\d*$/.test(text)) return; // ignore letters, symbols, minus signs

    if (text === '') {
      setDraft('');
      return;
    }

    const number = Number(text);

    if (number < min) {
      setDraft(text);
    } else if (number > max) {
      setDraft(null);
      onChange(max);
    } else {
      setDraft(null);
      onChange(number);
    }
  }

  function step(delta) {
    setDraft(null);
    onChange(value + delta);
  }

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => step(-1)}
        disabled={value <= min}
      >
        −
      </button>
      <input
        type="text"
        inputMode="numeric"
        aria-label={label}
        value={display}
        onChange={handleChange}
        onBlur={() => setDraft(null)}
        className={styles.input}
      />
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => step(1)}
        disabled={value >= max}
      >
        +
      </button>
    </div>
  );
}

export default QuantityInput;
