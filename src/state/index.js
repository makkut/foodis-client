import { configureStore, combineReducers } from "@reduxjs/toolkit";
import statsCart from "./statsCart";
import statsMenu from "./statsMenu";
import statsFavorites from "./statsFavorites";
import { goodsApi } from "./goodsApi";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createWrapper } from "next-redux-wrapper";

const rootReducers = combineReducers({
  favorites: statsFavorites,
  cart: statsCart,
  menu: statsMenu,
  [goodsApi.reducerPath]: goodsApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(goodsApi.middleware),
});
export const persistor = persistStore(store);
export default store;

// export type AppStore = ReturnType<typeof store>;
// export type RootState = ReturnType<AppStore["getState"]>;
// export type AppDispatch = AppStore["dispatch"];
export const wrapper = createWrapper(store, { debug: true });

// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./statsCart";
// import { goodsApi } from "./goodsApi";

// const store = configureStore({
//   reducer: { cart: cartReducer, [goodsApi.reducerPath]: goodsApi.reducer },

//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({}).concat(goodsApi.middleware),
// });
// export default store;
