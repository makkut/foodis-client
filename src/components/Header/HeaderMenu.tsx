import Link from "next/link";
import { FC } from "react";
import Column from "../ui/grid/Column";
import styles from "./HeaderMenu.module.scss";

const HeaderMenu: FC = () => {
  return (
    <>
      {/* <Column size={5}> */}
      <div className={styles.menu}>
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/shop">Shop</Link>
            </li>
            <li>
              <Link href="/">Categories</Link>
            </li>
            <li>
              <Link href="/">About</Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* </Column> */}
    </>
  );
};
export default HeaderMenu;
