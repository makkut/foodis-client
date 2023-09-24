import { client } from "../../utils/sanity.client";
import { groq } from "next-sanity";

export const lengthGoodsAsync = async (category: string) => {
  if (category && category != "all") {
    let query = `length(*[_type == 'goods' && category->slug.current == "${category}"]) `;
    return await client.fetch(groq`${query}`);
  } else {
    let query = `length(*[_type == 'goods'])`;
    return await client.fetch(groq`${query}`);
  }
};

export const getGoodsAsync = async (
  page = 1,
  itemsPerPage = 100,
  category: string,
  query: string,
  sort: string
) => {
  const skip = (page - 1) * itemsPerPage;
  let gQuery = '*[_type == "goods"';
  if (category !== "all") {
    gQuery += ` && category->slug.current match "${category}" `;
  }
  if (query !== "all") {
    gQuery += ` && name match "${query}" `;
  }
  //   if (price !== "all") {
  //     const minPrice = Number(price.split("-")[0]);
  //     const maxPrice = Number(price.split("-")[1]);
  //     gQuery += ` && price >= ${minPrice} && price <= ${maxPrice}`;
  //   }
  //   if (rating !== "all") {
  //     gQuery += ` && rating >= ${Number(rating)} `;
  //   }
  let order = "";
  if (sort !== "default") {
    if (sort === "lowest") order = "| order(price asc)";
    if (sort === "highest") order = "| order(price desc)";
    if (sort === "toprated") order = "| order(rating desc)";
  }

  gQuery += `] ${order} {
         "id": _id,
         name,
         "category": category->slug.current,
         details,
         price,
         "imageUrl": image[0].asset->url
       } [${skip}...${skip + itemsPerPage}]`;

  return await client.fetch(gQuery);
  //   if (category && category != "all") {
  //     if (order === "") {
  //       let query = `*[_type == 'goods' && category->slug.current == "${category}"] {
  //       "id": _id,
  //       name,
  //       "category": category->slug.current,
  //       details,
  //       price,
  //       "imageUrl": image[0].asset->url
  //     }`;
  //       return await client.fetch(
  //         groq`${query}[${skip}...${skip + itemsPerPage}]`
  //       );
  //     } else {
  //       let query = `*[_type == 'goods' && category->slug.current == "${category}"] | order(${order}) {
  //       "id": _id,
  //       name,
  //       "category": category->slug.current,
  //       details,
  //       price,
  //       "imageUrl": image[0].asset->url
  //     }`;
  //       return await client.fetch(
  //         groq`${query}[${skip}...${skip + itemsPerPage}]`
  //       );
  //     }
  //   } else {
  //     if (order === "") {
  //       let query = `*[_type == 'goods'] {
  //     "id": _id,
  //     name,
  //     "category": category->slug.current,
  //     details,
  //     price,
  //     "imageUrl": image[0].asset->url
  //   }`;
  //       return await client.fetch(
  //         groq`${query}[${skip}...${skip + itemsPerPage}]`
  //       );
  //     } else {
  //       let query = `*[_type == 'goods'] | order(${order}){
  //     "id": _id,
  //     name,
  //     "category": category->slug.current,
  //     details,
  //     price,
  //     "imageUrl": image[0].asset->url
  //   }`;
  //       return await client.fetch(
  //         groq`${query}[${skip}...${skip + itemsPerPage}]`
  //       );
  //     }
  //   }
};

export const getGoodsSearchAsync = async (
  page = 1,
  itemsPerPage = 100,
  search: string,
  order: string
) => {
  const skip = (page - 1) * itemsPerPage;
  let query = `*[_type == 'goods' && name match "${search}*" ] | order(${order}) {
    "id": _id,
    name,
    "category": category->slug.current,
    details,
    price,
    "imageUrl": image[0].asset->url
  }`;
  return await client.fetch(groq`${query}[${skip}...${skip + itemsPerPage}]`);
};

export const getGoodAsync = async (id: string) => {
  let query = `*[_type == 'goods' && _id == "${id}"] {
      "id": _id,
      name,
      "category": category->slug.current,
      details,
      price,
      "imageUrl": image[0].asset->url
    }`;
  return await client.fetch(groq`${query}`);
};

export const getCategoriesAsync = async () => {
  return await client.fetch(groq`*[_type == 'category']{
"id": _id,
"category": slug.current,
  name,
  "imageUrl": image.asset->url
}`);
};
