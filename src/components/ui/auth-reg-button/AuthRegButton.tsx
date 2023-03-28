import { FC } from "react";

interface IAuthRegButton {
  onClick?: () => void;
  type?: string;
  children: string;
}
const AuthRegButton: FC<IAuthRegButton> = ({ onClick, type, children }) => {
  return (
    <button
      typeof={type}
      onClick={onClick}
      className="text-white bg-red-600 hover:bg-red-500 px-[70px] py-[9px] mt-3 duration-500 transform rounded-[5px] font-bold text-base"
    >
      {children}
    </button>
  );
};
export default AuthRegButton;
