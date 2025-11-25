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
        const parsedMovies = JSON.parse(JSON.stringify(movies))
        
      
        return parsedMovies.sort((a : any, b : any) => 
            a.title.localeCompare(b.title)
        )
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


export async function getMovieThroughSearch(str : string ){
    try{

        if (!str || str.trim() === "") return null;
        await connectToMongoose()
        const movie = await Movies.find(
            { title: { $regex: str, $options: "i" } }
        ).lean()
        
        return JSON.parse(JSON.stringify(movie))
    }catch(error){
        return null
    }
}