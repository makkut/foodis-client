import { FC } from "react";
import SquerButton from "../ui/squer-button/SquerButton";
import { FiUser } from "react-icons/fi";
import Column from "../ui/grid/Column";
import { FiShoppingCart } from "react-icons/fi";
import { useActions } from "@/hooks/useActions";
import { useSelector } from "react-redux";

const HeaderProfile: FC = () => {
  const { setIsCartOpen } = useActions();
  const cart = useSelector((state: any) => state.cart.cart);
  return (
    <div className="flex justify-center items-center">
      {/* <Column size={3} className="flex items-center justify-center"> */}
      <div className="mr-3">
        <SquerButton
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
      {/* </Column> */}
    </div>
  );
};
export default HeaderProfile;
