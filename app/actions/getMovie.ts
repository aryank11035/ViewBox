'use server'

import { auth } from "@/auth"
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



export async function getMovieWithId(movieId : number) {
    
    try {
        await connectToMongoose()
        const movie = await Movies.findOne({ id :  Number(movieId)}).lean()
        // console.log(movie)
        return JSON.parse(JSON.stringify(movie))
    }catch(error){
        console.log(error)
    }
}