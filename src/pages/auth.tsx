import Authentification from "@/components/Auth/Authentification";
import Registration from "@/components/Auth/Registration";
import Layout from "@/components/Layout/Layout";
import AuthRegButton from "@/components/ui/auth-reg-button/AuthRegTextButton";
import { NextPage } from "next";
import { useState } from "react";

const AuthPage: NextPage = () => {
  const [isReg, setIsReg] = useState(false);
  return (
    <Layout title="Auth" description="Russian Foodies, Panama">
      <div className="flex justify-center items-center mt-10">
        <div className="w-[300px] ">
          {isReg ? (
            <>
              <Registration />
              <AuthRegButton onClick={() => setIsReg(!isReg)}>
                Authentification
              </AuthRegButton>
            </>
          ) : (
            <>
              <Authentification />
              <AuthRegButton onClick={() => setIsReg(!isReg)}>
                Registration
              </AuthRegButton>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};
export default AuthPage;

// export const getServerSideProps = async (context) => {
//   const session = await getSession(context);
//   if (session == null) {
//     return {
//       redirect: {
//         destination: "/auth",
//         permanent: true,
//       },
//     };
//   }
//   return {
//     props: {},
//   };
// };
