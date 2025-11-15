'use server'

import { Movies } from "@/lib/models"
import { connectToMongoose } from "@/lib/mongoose"


export async function getGenres(){
    await connectToMongoose()

    const movieGenres = await Movies.find({},{genres : 1 , _id : 0 }).lean()
    const allgenres = [
        'All',
        ...new Set(
            movieGenres.flatMap(movie => movie.genres.map((g : {name : string}) => g.name))
        )
    ]
    const genreArray = Array.from(allgenres)
   
    return JSON.parse(JSON.stringify(genreArray))
}