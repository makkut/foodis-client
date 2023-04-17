import { useState } from "react";
import { useActions } from "./../hooks/useActions";
import { IconButton, Box, Typography, Button } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useRouter } from "next/router";
import Image from "next/image";
import { toast } from "react-toastify";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useSelector } from "react-redux";

const Item = ({ item, width }: any) => {
  const API_URL = process.env.API_URL;
  const router = useRouter();
  const { addToCart, toogleFavorites } = useActions();
  const isFavorites = useSelector((state: any) => state.favorites.favorites);
  const [count, setCount] = useState(1);
  console.log("isFavorites", isFavorites);

  const [isHovered, setIsHovered] = useState(false);
  const { category, price, name, image } = item.attributes;
  return (
    <Box width={width}>
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <Image
          className="cursor-pointer"
          alt={name}
          width={300}
          height={534}
          src={API_URL + image.data.attributes.formats.small.url}
          onClick={() => router.push(`/items/${item.id}`)}
        />

        <Box className="absolute top-[5%] left-[77%] px-[5%] py-0">
          {isFavorites.find((i: any) => i.id === item.id) ? (
            <button onClick={() => toogleFavorites({ item: { ...item } })}>
              <MdFavorite color="white" size={32} />
            </button>
          ) : (
            <button onClick={() => toogleFavorites({ item: { ...item } })}>
              <MdFavoriteBorder color="white" size={32} />
            </button>
          )}
        </Box>
        <Box
          display={isHovered ? "block" : "none"}
          className="absolute bottom-[10%] left-0 w-[100%] px-[5%] py-0"
        >
          <Box className="flex justify-between">
            <Box
              className="flex items-center 
            rounded-[3px] bg-white"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <Remove />
              </IconButton>
              <Typography className="text-red-600">{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <Add />
              </IconButton>
            </Box>

            <button
              onClick={() => {
                addToCart({ item: { ...item, count } });
                toast.success(`${name} - ${count} added to cart`);
              }}
              className="text-white bg-red-600 hover:bg-red-500 px-5 duration-500 transform rounded-sm"
            >
              Add to Cart
            </button>
          </Box>
        </Box>
      </Box>

      <Box className="mt-[3px]">
        <Typography variant="subtitle2">
          {category
            .replace(/([A-Z])/g, " $1")
            .replace(/^ ./, (str: any) => str.toUpperCase())}
        </Typography>
        <Typography>{name}</Typography>
        <Typography fontWeight="bold">{price}</Typography>
      </Box>
    </Box>
  );
};

export default Item;
