import Confirmation from "@/components/Checkout/Confirmation";
import Layout from "@/components/Layout/Layout";
import { NextPage } from "next";

const ConfirmationPage: NextPage = () => {
  return (
    <Layout title="Confirmation" description="Russian Foodies, Panama">
      <Confirmation />
    </Layout>
  );
};

export default ConfirmationPage;
