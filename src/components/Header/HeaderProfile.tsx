import { FC } from "react";
import SquerButton from "../ui/squer-button/SquerButton";
import { FiUser } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { useActions } from "@/hooks/useActions";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";

const DynamicSquerButton = dynamic(
  () => import("../ui/squer-button/SquerButton"),
  {
    ssr: false,
  }
);

const HeaderProfile: FC = () => {
  const { setIsCartOpen } = useActions();
  const cart = useSelector((state: any) => state.cart.cart);
  return (
    <div className="flex justify-center items-center">
      <div className="mr-3">
        <DynamicSquerButton
          Icon={FiShoppingCart}
          onClick={() => {
            setIsCartOpen();
          }}
          number={cart.length}
        />
      </div>
      <SquerButton Icon={FiUser} onClick={() => {}} />
      <div className="ml-2 mr-3 hidden md:block">
        <div className="text-sm text-gray-600">Alexander Lyashenk</div>
      </div>
    </div>
  );
};
export default HeaderProfile;
