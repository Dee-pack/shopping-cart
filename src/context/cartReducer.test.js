import {
  cartReducer,
  initialState,
  ADD_ITEM,
  SET_QUANTITY,
  REMOVE_ITEM,
} from './cartReducer';

const shirt = { id: 1, title: 'Shirt', price: 20, image: 'shirt.jpg' };
const hat = { id: 2, title: 'Hat', price: 10, image: 'hat.jpg' };

describe('cartReducer', () => {
  describe('ADD_ITEM', () => {
    it('adds a new product with the given quantity', () => {
      const state = cartReducer(initialState, {
        type: ADD_ITEM,
        payload: { product: shirt, quantity: 2 },
      });

      expect(state).toEqual([{ ...shirt, quantity: 2 }]);
    });

    it('increases quantity when the product is already in the cart', () => {
      const start = [{ ...shirt, quantity: 2 }];
      const state = cartReducer(start, {
        type: ADD_ITEM,
        payload: { product: shirt, quantity: 3 },
      });

      expect(state).toHaveLength(1);
      expect(state[0].quantity).toBe(5);
    });

    it('does not mutate the previous state', () => {
      const start = [{ ...shirt, quantity: 1 }];
      cartReducer(start, {
        type: ADD_ITEM,
        payload: { product: shirt, quantity: 1 },
      });

      expect(start[0].quantity).toBe(1);
    });
  });

  describe('SET_QUANTITY', () => {
    const start = [
      { ...shirt, quantity: 2 },
      { ...hat, quantity: 1 },
    ];

    it('updates the quantity of the matching item only', () => {
      const state = cartReducer(start, {
        type: SET_QUANTITY,
        payload: { id: 1, quantity: 7 },
      });

      expect(state.find((i) => i.id === 1).quantity).toBe(7);
      expect(state.find((i) => i.id === 2).quantity).toBe(1);
    });

    it('removes the item when quantity is below 1', () => {
      const state = cartReducer(start, {
        type: SET_QUANTITY,
        payload: { id: 1, quantity: 0 },
      });

      expect(state).toEqual([{ ...hat, quantity: 1 }]);
    });
  });

  describe('REMOVE_ITEM', () => {
    it('removes the matching item', () => {
      const start = [
        { ...shirt, quantity: 2 },
        { ...hat, quantity: 1 },
      ];
      const state = cartReducer(start, {
        type: REMOVE_ITEM,
        payload: { id: 2 },
      });

      expect(state).toEqual([{ ...shirt, quantity: 2 }]);
    });

    it('leaves the cart unchanged if the id is not found', () => {
      const start = [{ ...shirt, quantity: 2 }];
      const state = cartReducer(start, {
        type: REMOVE_ITEM,
        payload: { id: 99 },
      });

      expect(state).toEqual(start);
    });
  });

  it('returns the current state for unknown actions', () => {
    const start = [{ ...shirt, quantity: 1 }];
    expect(cartReducer(start, { type: 'NOPE' })).toBe(start);
  });
});
