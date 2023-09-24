import Layout from "@/components/Layout/Layout";
import { NextPage } from "next";
import { getSession } from "next-auth/react";

const ProfilePage: NextPage = ({ user }: any) => {
  console.log("user", user);
  return (
    <Layout title="Profile page" description="Russian Foodies, Panama">
      <h3>{user.name}</h3>
    </Layout>
  );
};

export default ProfilePage;

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);
  if (session == null) {
    return {
      redirect: {
        destination: "/signined",
        permanent: true,
      },
    };
  }
  return {
    props: session,
  };
};
