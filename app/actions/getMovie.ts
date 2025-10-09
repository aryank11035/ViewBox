'use server'

import client from "@/lib/db"
import { Movie } from "@/schema/type"
import { ObjectId } from "mongodb"




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
            
        })) as Movie[]

    }catch(err){
        console.error('Error fecthing User Data')
        return []
    }

    
}