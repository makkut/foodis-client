// pages/api/sanity/signUp.ts
import { signUpHandler } from "next-auth-sanity";
import { client } from "../../../../utils/sanity.client";

export default signUpHandler(client);
