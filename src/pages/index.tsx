import Head from "next/head";
import { Inter } from "next/font/google";
import CartMenu from "@/components/Navbar/CartMenu";
import Header from "@/components/Header/Header";
import Slider from "@/components/Slider";
import Shop from "@/components/Shop/Shop";
import HeaderMobileMenu from "@/components/Header/HeaderMobileMenu";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Home || Russian Foodies</title>
        <meta name="description" content="Russian Foodis Panama" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Slider />
        <Shop />
        <CartMenu />
        <HeaderMobileMenu />
      </main>
    </>
  );
}
