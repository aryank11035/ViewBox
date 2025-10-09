
import { ObjectId } from "mongodb";
import { auth } from "@/auth";
import client from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {

    await client.connect()
    const db = client.db('moviedb'); 
    const user = await db.collection("users").findOne({ email }); 
    return user;
  } catch (err) {
    console.error("Error fetching user by email:", err);
    return null;
  }
};


export const getUserById = async (id: string) => {
  try {
    await client.connect();
    const db = client.db("moviedb");

    // Validate ID before converting
    if (!ObjectId.isValid(id)) {
      console.error("Invalid ObjectId:", id);
      return null;
    }

    const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
    return user;
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    return null;
  }
};


export const getSession = async() => {
  const session = await auth()

  if(!session?.user) return null

  return session.user
}
