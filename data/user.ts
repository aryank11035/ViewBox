import client from "@/lib/db";
import { User } from "next-auth";

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
    const db = client.db('moviedb');
    const { ObjectId } = await import("mongodb"); 
    const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
    return user;
  } catch (err) {
    console.error("Error fetching user by id:", err);
    return null;
  }
};

