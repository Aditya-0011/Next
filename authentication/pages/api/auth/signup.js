import { connect } from "../../../config/db";
import { hashPassword } from "../../../config/auth";

export default async function handler(req, res) {
  const client = await connect();
  const db = client.db();

  if (req.method === "POST") {
    const { email, password } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      await client.close();
      return res.status(422).json({ message: "Invalid input" });
    }

    const existingUser = await db.collection("users").findOne({ email: email });

    if (existingUser) {
      await client.close();
      return res.status(422).json({ message: "User exists already!" });
    }

    await db
      .collection("users")
      .insertOne({ email: email, password: await hashPassword(password) });

    await client.close();
    return res.status(200).json({ message: "User created!" });
  }
}
