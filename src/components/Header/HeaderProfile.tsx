import { FC } from "react";
import SquerButton from "../ui/squer-button/SquerButton";
import { FiUser } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { useActions } from "@/hooks/useActions";
import { MdFavoriteBorder } from "react-icons/md";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const DynamicSquerButton = dynamic(
  () => import("../ui/squer-button/SquerButton"),
  {
    ssr: false,
  }
);

const HeaderProfile: FC = () => {
  const { setIsCartOpen, setIsFavoritesOpen } = useActions();
  const cart = useSelector((state: any) => state.cart.cart);
  const favorites = useSelector((state: any) => state.favorites.favorites);
  const { data: session }: any = useSession();
  console.log("session", session);
  return (
    <div className="flex justify-center items-center mr-3">
      <div className="mr-3">
        <DynamicSquerButton
          Icon={MdFavoriteBorder}
          onClick={() => {
            setIsFavoritesOpen();
          }}
          number={favorites.length}
        />
      </div>
      <div className="mr-3">
        <DynamicSquerButton
          Icon={FiShoppingCart}
          onClick={() => {
            setIsCartOpen();
          }}
          number={cart.length}
        />
      </div>
      <Link href={session ? "/profile" : "/auth"}>
        <SquerButton Icon={FiUser} onClick={() => {}} />
      </Link>
      {session && (
        <div className="ml-2 mr-3 hidden md:block">
          <div className="text-sm text-gray-600">{session.username}</div>
          <button
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
export default HeaderProfile;
