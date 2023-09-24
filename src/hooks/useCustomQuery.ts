import {
  getGoodsAsync,
  getGoodAsync,
  getCategoriesAsync,
  lengthGoodsAsync,
  getGoodsSearchAsync,
} from "../services/handlers";
import { useQuery } from "@tanstack/react-query";

const useGoods = (
  currentPage: number,
  itemsPerPage: number,
  category: string,
  query: string,
  sort: string
) => {
  return useQuery({
    queryKey: ["goods", currentPage, itemsPerPage, category, query, sort],
    queryFn: () =>
      getGoodsAsync(currentPage, itemsPerPage, category, query, sort),
    staleTime: 5 * 60 * 1000,
  });
};

const useGood = (id: string) => {
  return useQuery({
    queryKey: ["good", id],
    queryFn: () => getGoodAsync(id),
    staleTime: 5 * 60 * 1000,
  });
};

const useGoodsLength = (category: string) => {
  return useQuery({
    queryKey: ["goodsLength", category],
    queryFn: () => lengthGoodsAsync(category),
    staleTime: 5 * 60 * 1000,
  });
};

const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategoriesAsync(),
    staleTime: 5 * 60 * 1000,
  });
};

const useGoodsSearch = (
  currentPage: number,
  itemsPerPage: number,
  search: string,
  sort: string
) => {
  return useQuery({
    queryKey: ["search", currentPage, itemsPerPage, search, sort],
    queryFn: () => getGoodsSearchAsync(currentPage, itemsPerPage, search, sort),
    staleTime: 5 * 60 * 1000,
  });
};

export { useGoods, useGood, useGoodsLength, useCategories, useGoodsSearch };
