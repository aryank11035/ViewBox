import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "./lib/db"
import {  getUserById } from "./data/user"
import authConfig from "./auth.config"


 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client.connect()),
  ...authConfig,
  callbacks : {
    async session({session , token}){
      if(token.sub && session.user){
          session.user.id = token.sub
      }
      if(token.movies && session.user){
          
        session.user.movies = token.movies
      }
      return session
    },
    async jwt({ token , user}) {
        if(!token.sub) return token
        
        const existingUser = await getUserById(token.sub)

        if(!existingUser) return token
    
        
        token.name = existingUser.name
        token.movies = existingUser.movies || []
        
        return token
    },
    async signIn({user}) {
      await client.connect()
      const db = client.db('moviedb')
      
      await db.collection('users').updateOne(
        {email : user.email},
        {$setOnInsert : {movies : []}},
        {upsert : true}
      )
      return true
    }
  },
  session : { strategy : "jwt" },
  secret : process.env.AUTH_SECRET,
})      