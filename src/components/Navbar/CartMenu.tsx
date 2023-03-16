import { Box, Divider, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { Close, Add, Remove } from "@mui/icons-material";
import { useActions } from "./../../hooks/useActions";
import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Drawer,
  Button,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
  const router = useRouter();
  const { setIsCartOpen, increaseCount, decreaseCount, removeFromCart } =
    useActions();
  const cart = useSelector((state: any) => state.cart.cart);
  const isCartOpen = useSelector((state: any) => state.cart.isCartOpen);

  var map = cart.reduce((acc: any, cur: any) => {
    acc[cur.id] = acc[cur.id] || {
      id: cur.id,
      attributes: cur.attributes,
      count: [],
    };
    acc[cur.id].count.push(cur.count);
    return acc;
  }, {});

  var result = Object.values(map);

  result.forEach((element: any) => {
    const initialValue = 0;
    const sumWithInitial = element.count.reduce(
      (accumulator: any, currentValue: any) => accumulator + currentValue,
      initialValue
    );
    element.count = sumWithInitial;
  });

  const totalPrice = cart.reduce(
    (total: number, item: { count: number; attributes: { price: number } }) => {
      return total + item.count * item.attributes.price;
    },
    0
  );

  return (
    <>
      <Drawer
        isOpen={isCartOpen}
        placement="right"
        onClose={() => setIsCartOpen()}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>SHOPPING BAG</DrawerHeader>

          <DrawerBody className="px-3" style={{ padding: "0 9px" }}>
            <Box>
              {cart.map((item: any) => {
                const myLoader = () => {
                  return `http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`;
                };

                return (
                  <Box key={`${item.attributes.name}-${item.id}`}>
                    <FlexBox p="15px 0">
                      <Box flex="1 1 40%">
                        <Image
                          alt={item?.attributes.name}
                          width={123}
                          height={164}
                          loader={myLoader}
                          src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                        />
                      </Box>
                      <Box flex="1 1 60%" className="pl-2">
                        <FlexBox mb="5px">
                          <p className="font-bold">{item.attributes.name}</p>
                          <IconButton
                            onClick={() => removeFromCart({ id: item.id })}
                          >
                            <Close />
                          </IconButton>
                        </FlexBox>
                        <p>{item.attributes.shortDescription}</p>
                        <p className="pl-2 pt-2 font-bold">
                          {item.attributes.price} $
                        </p>
                        <FlexBox m="15px 0">
                          <Box className="flex items-center border-spacing-[1.5px]">
                            <IconButton
                              onClick={() => decreaseCount({ id: item.id })}
                            >
                              <Remove />
                            </IconButton>
                            <p>{item.count}</p>
                            <IconButton
                              onClick={() => increaseCount({ id: item.id })}
                            >
                              <Add />
                            </IconButton>
                          </Box>
                        </FlexBox>
                      </Box>
                    </FlexBox>
                    <Divider />
                  </Box>
                );
              })}
            </Box>
          </DrawerBody>

          <DrawerFooter className="mx-auto">
            <Box className="w-[100%]">
              <FlexBox>
                <p className="font-bold">SUBTOTAL</p>
                <p className="font-bold">{totalPrice} $</p>
              </FlexBox>
              <button
                className="px-[40px] py-[15px] min-w-[100%] my-[20px] bg-red-500 text-white font-bold hover:bg-red-800 duration-500
              transform rounded-md"
                onClick={() => {
                  router.push("/checkout");
                  setIsCartOpen();
                }}
              >
                CHECKOUT
              </button>
            </Box>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartMenu;