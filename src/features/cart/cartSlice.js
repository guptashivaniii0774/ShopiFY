import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    add: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cart.find(item => item.id === newItem.id);

      if (existingItem) {
        const updatedCart = state.cart.map(item =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );

        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        return {
          ...state,
          cart: [{ ...newItem, quantity: 1 }, ...state.cart],
        };
      }
    },

    remove: (state, action) => {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    },
    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const updatedCart = state.cart.map((item) => {
        if (item.id === productId) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      return {
        ...state,
        cart: updatedCart,
      };
    },

    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const updatedCart = state.cart.map((item) => {
        if (item.id === productId) {
          return {
            ...item,
            quantity: item.quantity > 1 ? item.quantity - 1 : 1,
          };
        }
        return item;
      });
      return {
        ...state,
        cart: updatedCart,
      };
    },

  },
  extraReducers: (builder) => { },
});


export const isInCart = (state, productId) => {
  return state.cart.some((item) => item.id === productId);
};

export const { add, remove, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
