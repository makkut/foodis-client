import Header from "@/components/Header/Header";
import HeaderMobileMenu from "@/components/Header/HeaderMobileMenu";
import CartMenu from "@/components/Navbar/CartMenu";
import Shop from "@/components/Shop/Shop";
import Head from "next/head";

const ShopPage = (props: any) => {
  return (
    <>
      <Head>
        <title>Shop || Russian Foodis</title>
        <meta name="description" content="Russian Foodis Panama, Shop" />
      </Head>
      <Header />
      <Shop />
      <CartMenu />
      <HeaderMobileMenu />
    </>
  );
};
export default ShopPage;
