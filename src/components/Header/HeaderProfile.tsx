import { FC, useState } from "react";
import SquerButton from "../ui/squer-button/SquerButton";
import { FiUser } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { MdFavoriteBorder, MdSearch } from "react-icons/md";
import dynamic from "next/dynamic";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import router from "next/router";
import { useCart, useFavorites, useSearch } from "@/state/zustand";

const DynamicSquerButton = dynamic(
  () => import("../ui/squer-button/SquerButton"),
  {
    ssr: false,
  }
);

const HeaderProfile: FC = () => {
  const { cart, setIsCartOpen } = useCart();
  const { setIsFavoritesOpen, favorites } = useFavorites();
  const { data: session }: any = useSession();
  const [value, setValue] = useState("");
  const handleChange = (event: any) => setValue(event.target.value);
  const { setSearch } = useSearch();

  console.log("value", value);

  const searchGoods = () => {
    router.push(`/search?query=${value}`);
    setSearch(value);
    setValue("");
  };

  return (
    <div className="flex justify-center items-center mr-3">
      <div className="mr-3">
        <InputGroup size="lg">
          <Input
            value={value}
            onChange={handleChange}
            pr="5.5rem"
            type="text"
            placeholder="Search"
            focusBorderColor="#B91C1C"
          />
          <InputRightElement width="4.5rem">
            <DynamicSquerButton
              Icon={MdSearch}
              onClick={() => searchGoods()}
              clName="right-[-12px]"
            />
          </InputRightElement>
        </InputGroup>
      </div>
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
      <Link href={session ? "/profile" : "/signin"}>
        <SquerButton Icon={FiUser} onClick={() => {}} />
      </Link>
      {session && (
        <div className="ml-2 mr-3 hidden md:block">
          <div className="text-sm text-gray-600">{session.user.name}</div>
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
