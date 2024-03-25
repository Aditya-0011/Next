import { MongoClient } from "mongodb";

export async function connect() {
  return await MongoClient.connect(
    "mongodb+srv://aditya-0011:UaKTgAjKESgT0pMk@cluster0.gdrorud.mongodb.net/next-auth",
  );
}
