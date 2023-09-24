import Layout from "@/components/Layout/Layout";
import { ToastContainer } from "react-toastify";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useGood } from "@/hooks/useCustomQuery";
import MoonLoader from "react-spinners/MoonLoader";
import _ from "lodash";

const DynamicProductDetails = dynamic(
  () => import("@/components/ProductDetails/ProductDetails"),
  {
    ssr: false,
  }
);

const ItemPage = () => {
  const router = useRouter();
  const id = String(router.query.id);
  console.log("router", router.query.id);

  const { data, isLoading, isError } = useGood(id);
  console.log("data", data);
  if (isError) {
    return <>Error!!!</>;
  }

  if (isLoading) {
    return (
      <Layout title="Loading..." description="">
        <div className="h-[614px] flex justify-center items-center">
          <MoonLoader color="#EF4444" />
        </div>
      </Layout>
    );
  }

  return (
    !_.isEmpty(data) && (
      <Layout title={data[0].name} description={data[0].details}>
        <ToastContainer position="bottom-right" />
        <div className="min-h-[70vh]">
          <DynamicProductDetails item={data[0]} />
        </div>
      </Layout>
    )
  );
};
export default ItemPage;
