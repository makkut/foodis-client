import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const usePage = create(
  persist(
    (set, get) => ({
      currentPage: 1,
      itemsPerPage: 100,

      setCurrentPage: (page) => {
        set({ currentPage: page });
      },

      setItemsPerPage: (pages) => {
        set({ itemsPerPage: pages });
      },
    }),
    {
      name: "page-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useCart = create(
  persist(
    (set, get) => ({
      isCartOpen: false,
      cart: [],
      addToCart: (item) => {
        const itemInCart = get().cart.find(
          (cartItem) => cartItem.id === item.item.id
        );
        if (itemInCart) {
          set({
            cart: get().cart.map((el) =>
              el.id === item.item.id
                ? { ...el, count: itemInCart.count + item.item.count }
                : el
            ),
          });
        } else {
          set({ cart: [...get().cart, item.item] });
        }
      },
      removeFromCart: ({ id }) => {
        set({
          cart: get().cart.filter((el) => el.id !== id),
        });
      },
      increaseCount: ({ id }) => {
        set({
          cart: get().cart.map((el) =>
            el.id === id ? { ...el, count: el.count + 1 } : el
          ),
        });
      },

      decreaseCount: ({ id }) => {
        set({
          cart: get().cart.map((el) =>
            el.id === id && el.count > 1 ? { ...el, count: el.count - 1 } : el
          ),
        });
      },

      setIsCartOpen: () => {
        set({ isCartOpen: !get().isCartOpen });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useFavorites = create(
  persist(
    (set, get) => ({
      isFavoritesOpen: false,
      favorites: [],
      toggleFavorites: (item) => {
        const itemInFavorites = get().favorites.find(
          (el) => el.id === item.item.id
        );
        if (itemInFavorites) {
          const index = get().favorites.findIndex((i) => i.id === item.item.id);
          if (index !== -1) {
            const newFavorites = get().favorites.slice(); // Создаем копию массива
            newFavorites.splice(index, 1);
            set({
              favorites: newFavorites,
            });
          }
        } else {
          set({ favorites: [...get().favorites, item.item] });
        }
      },
      removeFromFavorites: ({ id }) => {
        set({ favorites: get().favorites.filter((item) => item.id !== id) });
      },
      setIsFavoritesOpen: () => {
        set({ isFavoritesOpen: !get().isFavoritesOpen });
      },
    }),
    {
      name: "favorites-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useFilter = create(
  persist(
    (set) => ({
      filter: "all",
      setFilter: (value) => set({ filter: value }),
    }),
    {
      name: "filter-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useSearch = create(
  //   persist(
  (set) => ({
    search: "",
    setSearch: (value) => set({ search: value }),
  })
  //   {
  //     name: "search-storage",
  //     storage: createJSONStorage(() => sessionStorage),
  //   }
  //   )
);

export const useSort = create(
  //   persist(
  (set) => ({
    sort: "default",
    setSort: (value) => set({ sort: value }),
  })
  //     {
  //       name: "sort-storage",
  //       storage: createJSONStorage(() => sessionStorage),
  //     }
  //   )
);
