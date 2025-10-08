'use server'

import { auth } from "@/auth"
import client from "@/lib/db"
import { ObjectId } from "mongodb"
import { Movie } from "../db/database"


export async function getMovie(session : any ){

    try {
        await client.connect()
        const db = client.db('moviedb')
        const users = db.collection('users')
        const movies = db.collection('movies')
        const userData = await users.findOne(
            {_id : new ObjectId(session?.user?.id)},
            {projection : {movies : 1 , _id: 0}}
        )

        const movieIds = Array.isArray(userData?.movies) ? userData.movies.map(m => m._id) : [];
        
        if (movieIds.length === 0) {
            return []
        }
        
        const userMovies = await movies.find({ _id: { $in: movieIds } }).toArray()

        return userMovies.map((movie) =>({
                ...movie,
                _id : movie._id.toString()
            
        }));

    }catch(err){
        console.error('Error fecthing User Data')
    }

    
}