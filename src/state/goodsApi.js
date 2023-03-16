import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const goodsApi = createApi({
  reducerPatch: "goodsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1337/api/" }),
  endpoints: (build) => ({
    getGoods: build.query({
      query: (arg) => {
        const { page, pageSize } = arg;
        return `items?populate=image&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
      },
    }),
    getGoodsFilter: build.query({
      query: (arg) => {
        const { page, pageSize, category } = arg;
        return `items?populate=image&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[category][$eq]=${category}`;
      },
    }),
    getGood: build.query({
      query: (arg) => {
        const { id } = arg;
        return `items?populate=image&filters[id][$eq]=${id}`;
      },
    }),
  }),
});

export const { useGetGoodQuery, useGetGoodsQuery, useGetGoodsFilterQuery } =
  goodsApi;
