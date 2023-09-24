import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useSort } from "@/state/zustand";
import { Select } from "chakra-react-select";
import Item from "../Item";
import SelectUI from "../ui/SelectUI";

const Search = ({ search, items }: any) => {
  console.log("search", search);
  console.log("items", items);

  return (
    <Box width="80%" margin="50px auto">
      <Typography variant="h3" textAlign="center">
        Search &quot;{search}&quot;, Result: {items.length}
      </Typography>
      <div className="flex justify-center items-center">
        <SelectUI />
      </div>
      <Box
        margin="0 auto"
        className="mt-5 pt-5"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {items.map((el: any) => (
          <Item item={el} key={el.id} isCategory={false} />
        ))}
      </Box>
    </Box>
  );
};
export default Search;
