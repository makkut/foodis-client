import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartOpen: false,
  cart: [],
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addToCart: (state, action) => {
      debugger;
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.item.id
      );

      if (itemInCart) {
        itemInCart.count = itemInCart.count + action.payload.item.count;
      } else {
        state.cart.push({
          ...action.payload.item,
          count: action.payload.item.count,
        });
      }

      //   state.cart = [...state.cart, action.payload.item];
    },
    removeFromCart: (state, action) => {
      //   const removeItem = state.cart.filter(
      //     (item) => item.id !== action.payload.id
      //   );
      //   state.cart = removeItem;

      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    increaseCount: (state, action) => {
      //   const item = state.cart.find((item) => item.id === action.payload.id);
      //   item.count++;
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          item.count++;
        }
        return item;
      });
    },
    decreaseCount: (state, action) => {
      //   const item = state.cart.find((item) => item.id === action.payload.id);
      //   if (item.count === 1) {
      //     item.count = 1;
      //   } else {
      //     item.count--;
      //   }
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.count > 1) {
          item.count--;
        }
        return item;
      });
    },
    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const {
  setItems,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;
