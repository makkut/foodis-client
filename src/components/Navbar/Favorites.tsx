import { Box, Divider, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useCart, useFavorites } from "@/state/zustand";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Favorites = () => {
  const {
    favorites,
    isFavoritesOpen,
    setIsFavoritesOpen,
    removeFromFavorites,
  } = useFavorites();
  const router = useRouter();
  const { addToCart } = useCart();

  return (
    <>
      <Drawer
        isOpen={isFavoritesOpen}
        placement="right"
        onClose={() => setIsFavoritesOpen()}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Favorites</DrawerHeader>

          <DrawerBody className="px-3" style={{ padding: "0 9px" }}>
            <Box>
              {favorites.map((item: any) => {
                return (
                  <Box key={`${item.name}-${item.id}`}>
                    <FlexBox p="15px 0">
                      <Box flex="1 1 40%">
                        <Image
                          className="cursor-pointer"
                          alt={item?.name}
                          width={123}
                          height={164}
                          src={item.imageUrl}
                          onClick={() => {
                            setIsFavoritesOpen();
                            router.push(`/items/${item.id}`);
                          }}
                        />
                      </Box>
                      <Box flex="1 1 60%" className="pl-2">
                        <FlexBox mb="5px">
                          <p
                            className="font-bold cursor-pointer"
                            onClick={() => {
                              setIsFavoritesOpen();
                              router.push(`/items/${item.id}`);
                            }}
                          >
                            {item.name}
                          </p>
                          <IconButton
                            onClick={() => removeFromFavorites({ id: item.id })}
                          >
                            <Close />
                          </IconButton>
                        </FlexBox>
                        <p>{`${item.details.slice(0, 80)}...`}</p>
                        <p className="pl-2 pt-2 font-bold">{item.price} $</p>
                        <FlexBox m="15px 0">
                          <button
                            onClick={() => {
                              addToCart({
                                item: { ...item, count: 1 },
                              });
                              toast.success(`${item.name} - 1 added to cart`);
                            }}
                            className="text-white bg-red-600 hover:bg-red-500 px-5 py-2 duration-500 transform rounded-sm"
                          >
                            Add to Cart
                          </button>
                        </FlexBox>
                      </Box>
                    </FlexBox>
                    <Divider />
                  </Box>
                );
              })}
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Favorites;
