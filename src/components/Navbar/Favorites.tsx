import { Box, Divider, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { Close } from "@mui/icons-material";
import { useActions } from "../../hooks/useActions";
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

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Favorites = () => {
  const API_URL = process.env.API_URL;
  const router = useRouter();
  const { setIsFavoritesOpen, addToCart, removeFromFavorites } = useActions();
  const favorites = useSelector((state: any) => state.favorites.favorites);
  const isFavoritesOpen = useSelector(
    (state: any) => state.favorites.isFavoritesOpen
  );

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
                  <Box key={`${item.attributes.name}-${item.id}`}>
                    <FlexBox p="15px 0">
                      <Box flex="1 1 40%">
                        <Image
                          className="cursor-pointer"
                          alt={item?.attributes.name}
                          width={123}
                          height={164}
                          src={
                            API_URL +
                            item?.attributes?.image?.data?.attributes?.formats
                              ?.medium?.url
                          }
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
                            {item.attributes.name}
                          </p>
                          <IconButton
                            onClick={() => removeFromFavorites({ id: item.id })}
                          >
                            <Close />
                          </IconButton>
                        </FlexBox>
                        <p>{`${item.attributes.shortDescription.slice(
                          0,
                          80
                        )}...`}</p>
                        <p className="pl-2 pt-2 font-bold">
                          {item.attributes.price} $
                        </p>
                        <FlexBox m="15px 0">
                          <button
                            onClick={() => {
                              addToCart({
                                item: { ...item, count: 1 },
                              });
                              toast.success(
                                `${item.attributes.name} - 1 added to cart`
                              );
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
