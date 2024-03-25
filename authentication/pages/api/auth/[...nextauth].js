import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { connect } from "../../../config/db";
import { verifyPassword } from "../../../config/auth";

export const authOptions = {
  secret: "secret",
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connect();

        const usersCollection = await client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        if (!user) {
          await client.close();
          throw new Error("No user found!");
        }
        const isValid = await verifyPassword(
          credentials.password,
          user.password,
        );
        if (!isValid) {
          await client.close();
          throw new Error("Could not log you in!");
        }
        await client.close();
        return { email: user.email };
      },
    }),
  ],
};

export default NextAuth(authOptions);
