export const ADD_ITEM = 'ADD_ITEM';
export const SET_QUANTITY = 'SET_QUANTITY';
export const REMOVE_ITEM = 'REMOVE_ITEM';

export const initialState = [];

export function cartReducer(state, action) {
  switch (action.type) {
    case ADD_ITEM: {
      const { product, quantity } = action.payload;
      const existing = state.find((item) => item.id === product.id);

      if (existing) {
        return state.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...state,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity,
        },
      ];
    }

    case SET_QUANTITY: {
      const { id, quantity } = action.payload;

      if (quantity < 1) {
        return state.filter((item) => item.id !== id);
      }

      return state.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
    }

    case REMOVE_ITEM:
      return state.filter((item) => item.id !== action.payload.id);

    default:
      return state;
  }
}
