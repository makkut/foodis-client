import { useSelector } from "react-redux";
import { useActions } from "@/hooks/useActions";
import { Badge, Box, IconButton } from "@mui/material";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import styles from "./Navbar.module.scss";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  const { setIsCartOpen } = useActions();
  const cart = useSelector((state: any) => state.cart.cart);

  return (
    <Box className={styles.container}>
      <Box className={styles.wrap}>
        <Box onClick={() => router.push("/")} className={styles.wrap2}>
          <Image src={"/logo.png"} alt="logo" width={90} height={50} />
        </Box>
        <Box className="flex space-x-4 z-[100]">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <PersonOutline />
          </IconButton>
          <Badge badgeContent={cart.length} invisible={cart.length === 0}>
            <IconButton onClick={() => setIsCartOpen()}>
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
          <IconButton>
            <MenuOutlined />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
export default Navbar;
