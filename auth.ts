import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "./lib/db"
import {  getUserById } from "./data/user"
import authConfig from "./auth.config"


 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client.connect()),
  ...authConfig,
  callbacks : {
    async jwt({token}){
      if(!token.sub) return token
      const existingUser = await getUserById(token.sub)
      return token
    },
    async session ({session}){
      
      return session
    }
  },
  session : { strategy : "jwt" },
  secret : process.env.AUTH_SECRET,
})    