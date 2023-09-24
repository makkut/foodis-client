import { useCategories } from "@/hooks/useCustomQuery";
import { Box, Typography } from "@mui/material";
import { FC } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import Item from "../Item";

const Categories: FC = () => {
  const { data, isLoading, isError } = useCategories();
  console.log("Categories", data);
  if (isLoading) {
    return (
      <div className="h-[614px] flex justify-center items-center">
        <MoonLoader color="#EF4444" />
      </div>
    );
  }
  return (
    <>
      <Box width="80%" margin="50px auto">
        <Typography variant="h3" textAlign="center">
          Categories
        </Typography>
        <Box
          margin="0 auto"
          className="mt-5"
          display="grid"
          gridTemplateColumns="repeat(auto-fill, 300px)"
          justifyContent="space-around"
          rowGap="20px"
          columnGap="1.33%"
        >
          {data.map((item: any) => (
            <Item item={item} key={item.id} isCategory={true} />
            //   <Item item={el} key={el.id} />
          ))}
        </Box>
      </Box>
    </>
  );
};
export default Categories;
