import axios from "axios";

const strapiUrl = process.env.API_URL;

export async function signIn({ email, password }) {
  debugger;
  const res = await axios.post(`${strapiUrl}/api/auth/local`, {
    identifier: email,
    password,
  });
  console.log(res.data);
  return res.data;
}
