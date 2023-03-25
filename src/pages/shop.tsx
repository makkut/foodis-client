import Layout from "@/components/Layout/Layout";
import Shop from "@/components/Shop/Shop";
import Head from "next/head";
import { NextPage } from "next";

const ShopPage: NextPage = (props: any) => {
  return (
    <Layout title="Shop" description="Russian Foodies, Panama">
      <Shop />
    </Layout>
  );
};
export default ShopPage;
