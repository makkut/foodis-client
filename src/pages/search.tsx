import Layout from "@/components/Layout/Layout";
import Search from "@/components/Search/Search";
import { GoodsServices } from "@/components/services/goods.service";
import { useGoodsSearch } from "@/hooks/useCustomQuery";
import { usePage, useSort } from "@/state/zustand";
import { NextPage } from "next";
import { useRouter } from "next/router";

const SearchPage: NextPage = () => {
  const { query } = useRouter();

  console.log("query", query.query);

  const { currentPage, itemsPerPage, setCurrentPage } = usePage(
    (state: any) => state
  );

  const { sort } = useSort((state: any) => state);

  const { data, isLoading, isError } = useGoodsSearch(
    currentPage,
    itemsPerPage,
    query.query as string,
    sort
  );

  if (isLoading) {
    return <>Loading</>;
  }

  if (isError) {
    return <>Error</>;
  }

  return (
    <Layout title="Search" description="Russian Foodies, Panama">
      <div className="min-h-[78vh]">
        <Search search={query.query} items={data} />
      </div>
    </Layout>
  );
};
export default SearchPage;

// export const getServerSideProps = async ({ query }: any) => {
//   console.log("query", query);
//   const good = await GoodsServices.searchByName(String(query?.query));
//   console.log("good", good);
//   return {
//     props: { good: good.data, query: query?.query },
//   };
// };
