import { FC } from "react";
import Image from "next/image";
import Column from "../ui/grid/Column";
import Link from "next/link";

const HeaderLogo: FC = () => {
  return (
    <>
      {/* <Column size={2} className=""> */}
      <div className="pl-10">
        <Link href="/">
          <Image src="/logo.png" width={100} height={100} alt="logo" />
        </Link>
      </div>
      {/* </Column> */}
    </>
  );
};
export default HeaderLogo;
