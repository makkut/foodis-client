import Slider from "@/components/Slider";
import Layout from "@/components/Layout/Layout";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();
  console.log("session", session);
  useEffect(() => {
    if (session == null) return;
    console.log("session.jwt", session);
  }, [session]);
  return (
    <Layout title="Home" description="Russian Foodies, Panama">
      <main>
        <Slider />
        <h1>{session ? "Authenticated" : "Not Authenticated"}</h1>
        {session && (
          <div style={{ marginBottom: 10 }}>
            <h3>Session Data</h3>
            <div>Email: {session?.user?.email}</div>
            <div>JWT from Strapi: Check console</div>
          </div>
        )}
        {session ? (
          <button onClick={() => signOut()}>Sign out</button>
        ) : (
          <Link href="/auth/sign-in">
            <button>Sign In</button>
          </Link>
        )}
        <Link href="/protected">
          <button
            style={{
              marginTop: 10,
            }}
          >
            Protected Page
          </button>
        </Link>
      </main>
    </Layout>
  );
}
