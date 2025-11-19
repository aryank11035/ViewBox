import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "./lib/db"
import { getUserById } from "./data/user"

import GoogleProvider from "next-auth/providers/google"

 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client.connect()),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks : {
    async session({session , token}){
      if(token.sub && session.user){
          session.user.id = token.sub
      }
      if(token.role && session.user){
        session.user.role = token.role
      }
      if(session.user){
        session.user.isAdmin = token.isAdmin
      }
      console.log(session.user)
      return session
    },
    async jwt({ token, user }) {
      if (user) token.sub = user.id;  // set it here

      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.name = existingUser.name;
      token.role = existingUser.role ?? "user";
      token.isAdmin = existingUser.isAdmin ?? false;

      return token;
    },
    async signIn({user}) {

          try {
          await client.connect();
          const db = client.db("moviedb");

          const isAdmin = user.email === process.env.ADMIN_EMAIL;

          // First: check if user exists
          const existingUser = await db.collection("users").findOne({
            email: user.email,
          });


          if (existingUser) {
            const updateFields: any = {};

          
            if (existingUser.name !== user.name) {
              updateFields.name = user.name;
            }
        
            if (existingUser.image !== user.image) {
              updateFields.image = user.image;
            }

          
            if (existingUser.isAdmin !== isAdmin) {
              updateFields.isAdmin = isAdmin;
              updateFields.role = isAdmin ? "admin" : "user";
            }

          
            if (Object.keys(updateFields).length > 0) {
              await db.collection("users").updateOne(
                { email: user.email },
                { $set: updateFields }
              );
            }
          }

      
      await db.collection("users").updateOne(
        { email: user.email },
        {
          $setOnInsert: {
            name: isAdmin ? "Admin" : user.name,
            email: user.email,
            image: user.image,
            role: isAdmin ? "admin" : "user",
            isAdmin: isAdmin,
            overrated : [],
            underrated : [],
            suggestions: [],
            favourites: [],
            playlist: [],
          },
        },
        { upsert: true }
      );

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }

    }
  },
  session : { strategy : "jwt" },
  secret : process.env.AUTH_SECRET,
})      


