import { watch } from "fs"
import { NextResponse } from "next/server"
import Movie from "@/app/db/database"
const watchlist : any []= []
export async function POST(req : Request){
    try {
        const body = await req.json()
        const mediaId = await Movie.findOne({id : body.id})
        if(watchlist.includes(mediaId)) {
            return NextResponse.json({sucess :false , error : 'Media already exist'}, {status  : 400})
        } 
    
        const newMovie =  new Movie(body)
        await newMovie.save()
        return NextResponse.json({sucess : true , media : newMovie})
        
    } catch (error) {
        return NextResponse.json({sucess : false, error : 'Failed to add to media'}, {status : 500})
    }
}

export async function GET(req : Request) {
    try {
        const movies = await Movie.find({});
        return NextResponse.json(movies)
    }catch(error){
        console.error(error)
        return NextResponse.json({sucess : false , error : 'Failed to fetch media'}, {status: 500})
    }
   
}