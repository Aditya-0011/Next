import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim === "" ||
      !message ||
      message.trim === ""
    ) {
      return res.status(422).json({ message: "Invalid input" });
    }

    const newMessage = { email, name, message };

    let client;

    try {
      client = await MongoClient.connect(process.env.MONGODB_URI);
    } catch (err) {
      return res.status(500).json({ message: "Could not connect to database" });
    }

    const db = client.db();

    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (err) {
      await client.close();
      return res.status(500).json({ message: "Storing message failed!" });
    }

    await client.close();

    return res.status(201).json({ message: "Successfully stored message!" });
  }
}
