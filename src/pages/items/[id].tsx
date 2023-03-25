import Header from "@/components/Header/Header";
import Item from "@/components/Item";
import Layout from "@/components/Layout/Layout";
import CartMenu from "@/components/Navbar/CartMenu";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import { GoodsServices } from "@/components/services/goods.service";
import { useGetGoodQuery } from "@/state/goodsApi";
import Head from "next/head";
import { useRouter } from "next/router";

// export const getStaticPaths = async () => {
//   const goods = await GoodsServices.getAll();
//   console.log("goods", goods);
//   return {
//     paths: goods.data.map((good: any) => ({
//       params: {
//         id: good.id.toString(),
//       },
//     })),
//     fallback: true,
//   };
// };

// export const getStaticProps = async ({ params }: any) => {
//   const good = await GoodsServices.getByID(String(params?.id));

//   return {
//     props: { good: good.data },
//     revalidate: 5,
//   };
// };

export const getServerSideProps = async ({ params }: any) => {
  const good = await GoodsServices.getByID(String(params?.id));

  return {
    props: { good: good.data },
    // revalidate: 5,
  };
};

const ItemPage = (props: any) => {
  console.log("props", props);
  //   console.log("props", props);
  //   const router = useRouter();
  //   const { id } = router.query;
  //   console.log("id", id);
  //   const { data } = useGetGoodQuery({
  //     id: id,
  //   });
  //   console.log("data", data);
  return (
    // <></>
    <Layout
      title={props.good[0].attributes.name}
      description={props.good[0].attributes.shortDescription}
    >
      {/* <Item item={props.good[0]} /> */}
      <ProductDetails item={props.good[0]} />
    </Layout>
    // <>
    //   {!data ? (
    //     <Layout
    //       title={data.data[0].attributes.name}
    //       description={data.data[0].attributes.shortDescription}
    //     >
    //       <Item item={data.data[0]} />
    //     </Layout>
    //   ) : (
    //     <Layout>
    //       <>new</>
    //     </Layout>
    //   )}
    // </>
  );
};
export default ItemPage;
