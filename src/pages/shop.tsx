import Layout from "@/components/Layout/Layout";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";

const DynamicShop = dynamic(() => import("@/components/Shop/Shop"), {
  ssr: false,
});

export default function ShopPage() {
  return (
    <Layout title="Shop" description="Russian Foodies, Panama">
      <ToastContainer position="bottom-right" />
      <div className="min-h-[78vh]">
        <DynamicShop />
      </div>
    </Layout>
  );
}
