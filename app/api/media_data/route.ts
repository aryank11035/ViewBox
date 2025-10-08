import { watch } from "fs"
import { NextResponse } from "next/server"
import {Movie} from "@/app/db/database"
import client from "@/lib/db"
import { ObjectId } from "mongodb"
import { auth } from "@/auth"



// export async function GET(req : Request) {
//     try {
//         const session = await auth()

//         await client.connect()
//         const db = client.db('moviedb')
//         const movies = db.collection('movies')
//         const user = await db.collection('users').findOne(
//             {_id : new ObjectId(session?.user?.id)},
//             {projection : {movies : 1}}
//         )

//         const movieIds = Array.isArray(user?.movies) ? user.movies : [];

//             if (movieIds.length === 0) {
//             return NextResponse.json([]);
//             }

      
//         const userMovies = await movies.find({ _id: { $in: movieIds } }).toArray();
//         console.log("User document from DB:", user);
//         console.log("User movies array:", user?.movies);
//         return NextResponse.json(user)
//     }catch(error){
//         console.error(error)
//         return NextResponse.json({sucess : false , error : 'Failed to fetch media'}, {status: 500})
//     }
   
// }


// export async function DELETE(req : Request){
//     try {
//         const body = await req.json()
//         const mediaId = body.id

//         await client.connect()
//         const db = client.db('moviedb')
//         await db.collection('movies').deleteOne({id : mediaId})
//         if(!mediaId){
//             return NextResponse.json(
//                 {sucess : false , error : 'Media Not Found'},
//                 {status : 404}
//             )
//         }

//         return NextResponse.json({sucess : true})

//     } catch (error) {
        
//     }
// }