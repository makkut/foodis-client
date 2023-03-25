import { FC } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

// export async function getSetverSideProps() {
//   return {
//     props: {},
//   };
// }

const AuthLogin: FC = () => {
  return (
    <div>
      <h1>LOGin</h1>
      <FormControl>
        <FormLabel>Your login</FormLabel>
        <Input type="email" />
        <FormHelperText>email.</FormHelperText>
        <FormLabel>Your password</FormLabel>
        <Input type="password" />
        <FormHelperText>password</FormHelperText>
      </FormControl>
    </div>
  );
};
export default AuthLogin;
