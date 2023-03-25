import Layout from "@/components/Layout/Layout";
import Shop from "@/components/Shop/Shop";
import { NextPage } from "next";
import Head from "next/head";

const NotFoundPage: NextPage = (props: any) => {
  return (
    <Layout title="404">
      <h1>404</h1>
    </Layout>
  );
};
export default NotFoundPage;
