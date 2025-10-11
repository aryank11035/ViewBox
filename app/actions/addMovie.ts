'use server'
import { auth } from "@/auth"
import client from "@/lib/db"
import { Movie } from "@/schema/type"
import { ObjectId } from "mongodb"

export async function addMovie(mediaData : any){
    try {
        const body = mediaData
        const session = await auth()

        await client.connect()
        const db = client.db('moviedb')
        const movies = db.collection('movies')
         

        let existingMovie = await movies.findOne({id : body.id})
        if (!existingMovie) {
            const insertMovie = await movies.insertOne(body)
            existingMovie = {...body,_id : insertMovie.insertedId}
        }

        if(!existingMovie?._id){
            throw new Error ("Movie id is missing")
        }
    
        await db.collection('users').updateOne(
            {_id : new ObjectId(session?.user?.id)},
            {$addToSet : {movies : { _id : existingMovie._id , id : existingMovie.id }} }
        )
        const userID = await db.collection('users').findOne({ _id:new ObjectId(session?.user?.id) })
        return ({success : true , media : body})
        
    } catch (error) {
        return  ({sucess : false, error : 'Failed to add to media'} )
    }
}
