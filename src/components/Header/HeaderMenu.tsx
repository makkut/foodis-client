import Link from "next/link";
import { FC } from "react";
import styles from "./HeaderMenu.module.scss";

const HeaderMenu: FC = () => {
  return (
    <>
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
              <Link href="/profile">Categories</Link>
            </li>
            <li>
              <Link href="/order">About</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
export default HeaderMenu;
