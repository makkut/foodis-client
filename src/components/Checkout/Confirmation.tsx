import { useActions } from "@/hooks/useActions";
import { Alert, AlertTitle, Box } from "@mui/material";
import { useSelector } from "react-redux";

const Confirmation = () => {
  const { removeFromCart } = useActions();
  const cart = useSelector((state: any) => state.cart.cart);
  cart.map((el) => removeFromCart({ id: el.id }));
  return (
    <Box m="90px auto" width="80%" height="50vh">
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        You have successfully made an Order —{" "}
        <strong>Congrats on Making your Purchase</strong>
      </Alert>
    </Box>
  );
};

export default Confirmation;
