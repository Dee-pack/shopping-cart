import { renderHook, waitFor } from '@testing-library/react';
import { useProducts } from './useProducts';

const apiResponse = {
  products: [
    { id: 1, title: 'Shirt', price: 20, thumbnail: 'shirt.jpg' },
    { id: 2, title: 'Hat', price: 10, thumbnail: 'hat.jpg' },
  ],
};

const expectedProducts = [
  { id: 1, title: 'Shirt', price: 20, image: 'shirt.jpg' },
  { id: 2, title: 'Hat', price: 10, image: 'hat.jpg' },
];

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('useProducts', () => {
  it('starts in a loading state', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => new Promise(() => {}))
    );

    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);
    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBeNull();
  });
  it('returns normalized products after a successful fetch', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(apiResponse),
      })
    );

    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.products).toEqual(expectedProducts);
    expect(result.current.error).toBeNull();
  });

  it('sets an error when the response is not ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 500 })
    );

    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.products).toEqual([]);
  });

  it('sets an error when the network request fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('Network down'))
    );

    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error.message).toBe('Network down');
  });
});
