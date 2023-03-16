import Header from "../Header/Header";
import HeaderMobileMenu from "../Header/HeaderMobileMenu";
import CartMenu from "../Navbar/CartMenu";
import Shop from "../Shop/Shop";

export default function Layouts({ children }: any) {
  return (
    <>
      <Header />
      <Shop />
      <CartMenu />
      <HeaderMobileMenu />
    </>
  );
}
