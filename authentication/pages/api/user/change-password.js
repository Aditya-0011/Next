import { getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]";
import { connect } from "../../../config/db";
import { hashPassword, verifyPassword } from "../../../config/auth";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: "Not authenticated!" });
    }

    const email = session.user.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    const client = await connect();

    const userCollection = await client.db().collection("users");

    const user = await userCollection.findOne({ email: email });
    if (!user) {
      await client.close();
      return res.status(404).json({ message: "User not found!" });
    }

    const isValid = await verifyPassword(oldPassword, user.password);
    if (!isValid) {
      await client.close();
      return res.status(403).json({ message: "Invalid password!" });
    }

    const result = await userCollection.updateOne(
      { email: email },
      { $set: { password: await hashPassword(newPassword) } },
    );

    await client.close();
    return res.status(200).json({ message: "Password updated!" });
  }
}
