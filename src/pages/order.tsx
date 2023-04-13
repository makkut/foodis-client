import AuthLogin from "@/components/Auth/Authentification";
import { FC } from "react";
const API_URL = process.env.API_URL;

export async function getServerSideProps() {
  const loginInfo = {
    identifier: "test",
    password: "A9093762082aA!",
  };

  const login = await fetch(`${API_URL}/api/auth/local`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(loginInfo),
  });
  const loginResponse = await login.json();
  const response = await fetch(`${API_URL}/api/testorders`, {
    headers: {
      Authorization: `Bearer ${loginResponse.jwt}`,
    },
  });

  const data = await response.json();
  console.log(data);
  return {
    props: { data: data, auth: loginResponse },
  };
}

const Auth: FC = ({ data, auth }: any) => {
  console.log("auth", auth);
  console.log("data", data);
  return (
    <div>
      <h1>Test order</h1>
      {data.data.map((el: any) => (
        <p key={el.attributes.name}>{el.attributes.name}</p>
      ))}
      <AuthLogin />
    </div>
  );
};
export default Auth;
