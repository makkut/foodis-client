import { useGetGoodsFilterQuery, useGetGoodsQuery } from "@/state/goodsApi";
import { Box, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { FC, useState } from "react";
import Item from "../Item";
import { PaginationButtonBlock } from "../ui/pagination/PaginationButtonBlock";
import { SkeletonBlock } from "../ui/skeleton/SkeletonBlock";

const DynamicTabMenu = dynamic(() => import("../ui/tab-menu/TabMenu"), {
  ssr: false,
});

const Shop: FC = () => {
  const [page, setPage] = useState(1);
  const [pageFilter, setPageFilter] = useState(1);
  const data = useGetGoodsQuery({
    page: page,
    pageSize: 25,
  });
  const [value, setValue] = useState<any>("all");
  const dataFilter = useGetGoodsFilterQuery({
    page: pageFilter,
    pageSize: 25,
    category: value,
  });

  const pageCount1 = data?.data?.meta?.pagination?.pageCount;
  const pageCount2 = dataFilter?.data?.meta?.pagination?.pageCount;

  const openTab = (e: any) => {
    setValue(e.target.dataset.el);
    setPage(1);
    setPageFilter(1);
  };

  if (data.isLoading || dataFilter.isLoading) {
    return (
      <Box width="80%" margin="80px auto">
        <Typography variant="h3" textAlign="center">
          Shop
        </Typography>
        <DynamicTabMenu openTab={openTab} value={value} />
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
          <SkeletonBlock />
          <SkeletonBlock />
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
      <DynamicTabMenu openTab={openTab} value={value} />
      <Box
        margin="0 auto"
        className="mt-5"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "all"
          ? data.data.data.map((item: any) => (
              <Item item={item} key={`${item.name}-${item.id}`} />
            ))
          : dataFilter.data.data.map((item: any) => (
              <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
      </Box>
      {value === "all" ? (
        <>
          {pageCount1 > 1 ? (
            <PaginationButtonBlock
              disabledNext={page === pageCount1}
              onClickNext={() => setPage((prevState: any) => prevState + 1)}
              disabledPrev={page === 1}
              onClickPrev={() => setPage((prevState: any) => prevState - 1)}
              numPages={`${page} / ${pageCount1}`}
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          {pageCount2 > 1 ? (
            <PaginationButtonBlock
              disabledNext={pageFilter === pageCount2}
              onClickNext={() =>
                setPageFilter((prevState: any) => prevState + 1)
              }
              disabledPrev={pageFilter === 1}
              onClickPrev={() =>
                setPageFilter((prevState: any) => prevState - 1)
              }
              numPages={`${pageFilter} / ${pageCount2}`}
            />
          ) : (
            <></>
          )}
        </>
      )}
    </Box>
  );
};
export default Shop;
