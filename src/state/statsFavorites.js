import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFavoritesOpen: false,
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toogleFavorites: (state, action) => {
      const itemInFavorites = state.favorites.find(
        (item) => item.id === action.payload.item.id
      );

      if (itemInFavorites) {
        const index = state.favorites.findIndex(
          (i) => i.id === action.payload.item.id
        );
        if (index !== -1) {
          state.favorites.splice(index, 1);
        }
      } else {
        state.favorites.push(action.payload.item);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload.id
      );
    },
    setIsFavoritesOpen: (state) => {
      state.isFavoritesOpen = !state.isFavoritesOpen;
    },
  },
});

export const { toogleFavorites, setIsFavoritesOpen } = favoritesSlice.actions;

export default favoritesSlice.reducer;
