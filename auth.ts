import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "./lib/db"
import {  getUserByEmail, getUserById, returnUserAdmin } from "./data/user"
import authConfig from "./auth.config"


 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client.connect()),
  ...authConfig,
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
     
      return session
    },
    async jwt({ token , user}) {
        if(!token.sub || !token.email) return token
        
        const existingUser = await getUserById(token.sub)
  
        if(!existingUser) return token

        token.name = existingUser.isAdmin ? 'Admin' : existingUser.name
        token.role = existingUser.isAdmin ? 'admin' : existingUser.role
        token.isAdmin = existingUser.isAdmin 
        
        return token
    },
    async signIn({user}) {
      await client.connect()
      const db = client.db('moviedb')
      
      await db.collection('users').updateOne(
        {email : user.email},
        {$setOnInsert : {name : user.name , role : 'user',isAdmin : false}},
        {upsert : true}
      )
      return true
    }
  },
  session : { strategy : "jwt" },
  secret : process.env.AUTH_SECRET,
})      