import Layout from "@/components/Layout/Layout";
import { NextPage } from "next";
import { getSession } from "next-auth/react";

const ProfilePage: NextPage = () => {
  return (
    <Layout title="Profile page" description="Russian Foodies, Panama"></Layout>
  );
};

export default ProfilePage;

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);
  if (session == null) {
    return {
      redirect: {
        destination: "/auth",
        permanent: true,
      },
    };
  }
  return {
    props: {},
  };
};
