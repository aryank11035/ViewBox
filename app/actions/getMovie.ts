'use server'

import client from "@/lib/db"
import { Movies } from "@/lib/models"

import { connectToMongoose } from "@/lib/mongoose"
import { Movie } from "@/schema/type"



export async function getMovie(){
    try {
        
        await connectToMongoose()
        const movies = await Movies.find({} ).lean()

       return JSON.parse(JSON.stringify(movies))
    }catch(err){
        console.error('Error fecthing User Data')
        return []
    }
    
}



