import { MongoClient } from "mongodb";

export async function connect() {
  return await MongoClient.connect(
    "",
  );
}
