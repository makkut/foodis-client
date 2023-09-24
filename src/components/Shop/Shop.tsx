import { useFilter, usePage, useSort } from "@/state/zustand";
import { Box, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { FC, useEffect } from "react";
import Item from "../Item";
import { SkeletonBlock } from "../ui/skeleton/SkeletonBlock";
import { PaginationButtonBlock } from "../ui/pagination/PaginationButtonBlock";
import { useGoodsLength, useGoods } from "@/hooks/useCustomQuery";
import SelectUI from "../ui/SelectUI";

const DynamicTabMenu = dynamic(() => import("../ui/tab-menu/TabMenu"), {
  ssr: false,
});

const Shop: FC = () => {
  const { currentPage, itemsPerPage, setCurrentPage } = usePage(
    (state: any) => state
  );
  const { filter } = useFilter((state) => state);
  const { setSort, sort } = useSort((state: any) => state);
  //   setSort("price desc");
  const { data, isLoading, isError } = useGoods(
    currentPage,
    itemsPerPage,
    filter,
    "all",
    sort
  );
  console.log("itemsPerPage", itemsPerPage);
  const length = useGoodsLength(filter);
  const paginationPage = Math.round(length.data / itemsPerPage);

  if (isError) {
    return <>Error!!!</>;
  }

  if (isLoading) {
    return (
      <Box width="80%" margin="50px auto">
        <Typography variant="h3" textAlign="center">
          Shop
        </Typography>
        <DynamicTabMenu />
        <Box
          margin="0 auto"
          className="mt-5"
          display="grid"
          gridTemplateColumns="repeat(auto-fill, 300px)"
          justifyContent="space-around"
          rowGap="20px"
          columnGap="1.33%"
        >
          <SkeletonBlock />
          <SkeletonBlock />
          <SkeletonBlock />
        </Box>
      </Box>
    );
  }
  return (
    <Box width="80%" margin="50px auto">
      <Typography variant="h3" textAlign="center">
        Shop
      </Typography>
      <DynamicTabMenu />
      <SelectUI />
      <Box
        margin="0 auto"
        className="mt-5"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {data.map((el: any) => (
          <Item item={el} key={el.id} isCategory={false} />
        ))}
      </Box>
      {paginationPage > 1 ? (
        <PaginationButtonBlock
          disabledNext={currentPage === paginationPage}
          onClickNext={() => setCurrentPage(currentPage + 1)}
          disabledPrev={currentPage === 1}
          onClickPrev={() => setCurrentPage(currentPage - 1)}
          numPages={`${currentPage} / ${paginationPage}`}
        />
      ) : (
        <></>
      )}
    </Box>
  );
};
export default Shop;
