'use server'

import client from "@/lib/db";

export async function deleteMovie(movieId : number){
    try{
        await client.connect()
        const db = client.db('moviedb')
        const users = db.collection('users')
        const movies = db.collection('movies')

        const result =  await movies.deleteOne({id : movieId})

        if (result.deletedCount === 0) {
            throw new Error('Movie not found')
        }

        await users.updateMany(
            {'movies.id' : movieId},
            {$pull : { movies : { id : movieId}}} as any
        )

        return {success : true }
    }catch(err : any){
        return {error : err.message ||  ' something went wrong'}
    }

}