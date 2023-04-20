import { Box, Divider, IconButton, Typography } from "@mui/material";
import styled from "@emotion/styled";
import Image from "next/image";
import router from "next/router";
import { toast } from "react-toastify";
import { useActions } from "@/hooks/useActions";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Search = ({ items, search }: any) => {
  const API_URL = process.env.API_URL;
  const { addToCart } = useActions();
  console.log("items", items);
  return (
    <Box width="80%" margin="50px auto">
      <Typography variant="h3" textAlign="center">
        Search &quot;{search}&quot;
      </Typography>
      <Box
        margin="0 auto"
        className="mt-5"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        alignItems="center"
        rowGap="20px"
        columnGap="1.33%"
      >
        {items.length !== 0 ? (
          items.map((item: any) => (
            <div key={`${item.attributes.name}-${item.id}`} className="flex">
              <FlexBox p="15px 0">
                <Box flex="1 1 40%">
                  <Image
                    className="cursor-pointer"
                    alt={item?.attributes.name}
                    width={123}
                    height={164}
                    src={
                      API_URL +
                      item?.attributes?.image?.data?.attributes?.formats?.medium
                        ?.url
                    }
                    onClick={() => {
                      router.push(`/items/${item.id}`);
                    }}
                  />
                </Box>
                <Box flex="1 1 60%" className="pl-2">
                  <FlexBox mb="5px">
                    <p
                      className="font-bold cursor-pointer"
                      onClick={() => {
                        router.push(`/items/${item.id}`);
                      }}
                    >
                      {item.attributes.name}
                    </p>
                  </FlexBox>
                  <p>{`${item.attributes.shortDescription.slice(0, 80)}...`}</p>
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
            </div>
          ))
        ) : (
          <span>not found</span>
        )}
      </Box>
    </Box>
  );
};
export default Search;
