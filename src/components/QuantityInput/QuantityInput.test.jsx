import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuantityInput from './QuantityInput';

// QuantityInput is controlled, so typing tests need a parent that holds state.
function Harness({ initial = 1, onChange }) {
  const [value, setValue] = useState(initial);
  return (
    <QuantityInput
      value={value}
      onChange={(v) => {
        setValue(v);
        onChange?.(v);
      }}
    />
  );
}

describe('QuantityInput', () => {
  it('calls onChange with value + 1 when increment is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<QuantityInput value={2} onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: /increase/i }));

    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('calls onChange with value - 1 when decrement is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<QuantityInput value={2} onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: /decrease/i }));

    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('disables decrement at the minimum', () => {
    render(<QuantityInput value={1} onChange={() => {}} />);

    expect(screen.getByRole('button', { name: /decrease/i })).toBeDisabled();
  });

  it('disables increment at the maximum', () => {
    render(<QuantityInput value={99} onChange={() => {}} />);

    expect(screen.getByRole('button', { name: /increase/i })).toBeDisabled();
  });

  it('lets the user type a new quantity', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Harness onChange={onChange} />);
    const input = screen.getByRole('textbox', { name: /quantity/i });

    await user.clear(input);
    await user.type(input, '5');

    expect(input).toHaveValue('5');
    expect(onChange).toHaveBeenLastCalledWith(5);
  });

  it('allows the field to be empty while typing', async () => {
    const user = userEvent.setup();
    render(<Harness initial={3} />);
    const input = screen.getByRole('textbox', { name: /quantity/i });

    await user.clear(input);

    expect(input).toHaveValue('');
  });

  it('restores the last valid value on blur if the field is empty', async () => {
    const user = userEvent.setup();
    render(<Harness initial={3} />);
    const input = screen.getByRole('textbox', { name: /quantity/i });

    await user.clear(input);
    await user.tab();

    expect(input).toHaveValue('3');
  });

  it('ignores non-numeric characters', async () => {
    const user = userEvent.setup();
    render(<Harness initial={1} />);
    const input = screen.getByRole('textbox', { name: /quantity/i });

    await user.type(input, 'abc');

    expect(input).toHaveValue('1');
  });

  it('clamps typed values above the maximum', async () => {
    const user = userEvent.setup();
    render(<Harness initial={1} />);
    const input = screen.getByRole('textbox', { name: /quantity/i });

    await user.clear(input);
    await user.type(input, '150');

    expect(input).toHaveValue('99');
  });
});
