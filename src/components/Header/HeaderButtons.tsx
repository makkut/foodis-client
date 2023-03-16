import { FC } from "react";
import SquerButton from "../ui/squer-button/SquerButton";
import { FiSearch, FiBell, FiShoppingCart } from "react-icons/fi";
import Column from "../ui/grid/Column";
import { useSelector } from "react-redux";
import { useActions } from "@/hooks/useActions";

const HeaderButtons: FC = () => {
  const { setIsCartOpen } = useActions();
  const cart = useSelector((state: any) => state.cart.cart);
  return (
    <div className="flex justify-between items-center w-[180px]">
      {/* <Column size={2} className="gap-5 flex justify-center items-center"> */}
      <SquerButton Icon={FiSearch} onClick={() => {}} />
      <SquerButton Icon={FiBell} onClick={() => {}} />
      <SquerButton
        Icon={FiShoppingCart}
        onClick={() => {
          setIsCartOpen();
        }}
        number={cart.length}
      />
      {/* </Column> */}
    </div>
  );
};
export default HeaderButtons;
