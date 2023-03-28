import { FC } from "react";
import styles from "./AuthRegTextButton.module.scss";

interface IAuthRegButton {
  onClick: () => void;
  children: string;
}
const AuthRegTextButton: FC<IAuthRegButton> = ({ onClick, children }) => {
  return (
    <div className="mt-3 text-base">
      <button onClick={onClick} className={styles.button}>
        {children}
      </button>
    </div>
  );
};
export default AuthRegTextButton;
