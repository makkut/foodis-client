import Layout from "@/components/Layout/Layout";
import { GoodsServices } from "@/components/services/goods.service";
import { ToastContainer } from "react-toastify";
import dynamic from "next/dynamic";

const DynamicProductDetails = dynamic(
  () => import("@/components/ProductDetails/ProductDetails"),
  {
    ssr: false,
  }
);

export const getServerSideProps = async ({ params }: any) => {
  const good = await GoodsServices.getByID(String(params?.id));

  return {
    props: { good: good.data },
  };
};

const ItemPage = (props: any) => {
  return (
    <Layout
      title={props.good[0].attributes.name}
      description={props.good[0].attributes.shortDescription}
    >
      <ToastContainer position="bottom-right" />
      <DynamicProductDetails item={props.good[0]} />
    </Layout>
  );
};
export default ItemPage;
