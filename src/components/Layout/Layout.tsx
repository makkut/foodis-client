import Header from "../Header/Header";
import HeaderMobileMenu from "../Header/HeaderMobileMenu";
import CartMenu from "../Navbar/CartMenu";
import Meta from "../seo/Meta";

export default function Layout({ children, title, description }: any) {
  return (
    <Meta title={title} description={description}>
      <Header />
      <CartMenu />
      <HeaderMobileMenu />
      {children}
    </Meta>
  );
}
