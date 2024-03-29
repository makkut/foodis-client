import { useCart, useFavorites } from "@/state/zustand";
import { Add, Remove } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { toast } from "react-toastify";

export default function ProductDetails({ item }: any) {
  console.log("good", item);
  const [count, setCount] = useState(1);
  const { name, imageUrl, details, price, category } = item;
  const { toggleFavorites, favorites } = useFavorites();
  const { addToCart } = useCart();
  //   const { addToCart, toogleFavorites } = useActions();
  //   const isFavorites = useSelector((state: any) => state.favorites.favorites);
  //   const { name, image, longDescription, category, price } = item.attributes;
  //   const API_URL = process.env.API_URL;
  //   console.log("isFavorites", isFavorites);

  return (
    <div className="flex justify-center items-center pt-5 mb-10">
      <Box position="relative">
        <Image
          className=""
          alt={name}
          width={300}
          height={534}
          src={imageUrl}
        />
        <Box className="absolute top-[5%] left-[77%] px-[5%] py-0">
          {favorites.find((i: any) => i.id === item.id) ? (
            <button onClick={() => toggleFavorites({ item: { ...item } })}>
              <MdFavorite color="white" size={32} />
            </button>
          ) : (
            <button onClick={() => toggleFavorites({ item: { ...item } })}>
              <MdFavoriteBorder color="white" size={32} />
            </button>
          )}
        </Box>
      </Box>
      <div className="w-[50%] pl-6">
        <h3 className="font-bold text-lg">{name}</h3>

        <Box className="mt-[3px]">
          <Typography variant="subtitle2">
            {category
              .replace(/([A-Z])/g, " $1")
              .replace(/^ ./, (str: any) => str.toUpperCase())}
          </Typography>
          <p className="font-bold text-base pt-4">{price} $</p>
        </Box>
        <Box
          className="flex items-center 
            rounded-[3px] bg-white"
        >
          <div className="flex items-center border-[1px] border-black rounded-[5px]">
            <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
              <Remove />
            </IconButton>
            <Typography className="w-[25px] text-center">{count}</Typography>
            <IconButton onClick={() => setCount(count + 1)}>
              <Add />
            </IconButton>
          </div>
          <button
            onClick={() => {
              addToCart({ item: { ...item, count } });
              toast.success(`${name} - ${count} added to cart`);
            }}
            className="text-white bg-red-600 hover:bg-red-500 px-[70px] py-[9px] duration-500 transform rounded-[5px] ml-5"
          >
            Add to Cart
          </button>
        </Box>
        <Box>
          <p className="pt-4">{details}</p>
        </Box>
      </div>
    </div>
  );
}
