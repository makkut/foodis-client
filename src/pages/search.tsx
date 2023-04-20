import Layout from "@/components/Layout/Layout";
import Search from "@/components/Search/Search";
import { GoodsServices } from "@/components/services/goods.service";
import { NextPage } from "next";

const SearchPage: NextPage = ({ good, query }: any) => {
  console.log("good", good);
  return (
    <Layout title="Search" description="Russian Foodies, Panama">
      <Search items={good} search={query} />
    </Layout>
  );
};
export default SearchPage;

export const getServerSideProps = async ({ query }: any) => {
  console.log("query", query);
  const good = await GoodsServices.searchByName(String(query?.query));
  console.log("good", good);
  return {
    props: { good: good.data, query: query?.query },
  };
};
