import Layout from "@/components/Layout/Layout";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";

const DynamicShop = dynamic(() => import("@/components/Shop/Shop"), {
  ssr: false,
});

const ShopPage: NextPage = (props: any) => {
  return (
    <Layout title="Shop" description="Russian Foodies, Panama">
      <ToastContainer position="bottom-right" />
      <DynamicShop />
    </Layout>
  );
};
export default ShopPage;
