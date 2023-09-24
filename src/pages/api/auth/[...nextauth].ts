import NextAuth from "next-auth/next";
import { authConfig } from "../../../../configs/auth";

export default NextAuth(authConfig);

// export { handler as GET, handler as POST };
