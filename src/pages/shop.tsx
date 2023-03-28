import Layout from "@/components/Layout/Layout";
import Shop from "@/components/Shop/Shop";
import Head from "next/head";
import { NextPage } from "next";
import dynamic from "next/dynamic";

const DynamicShop = dynamic(() => import("@/components/Shop/Shop"), {
  ssr: false,
});

const ShopPage: NextPage = (props: any) => {
  return (
    <Layout title="Shop" description="Russian Foodies, Panama">
      <DynamicShop />
    </Layout>
  );
};
export default ShopPage;
