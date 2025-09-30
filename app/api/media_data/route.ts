import { watch } from "fs"
import { NextResponse } from "next/server"
import {Movie} from "@/app/db/database"

export async function POST(req : Request){
    try {
        const body = await req.json()
        
        const existingMovie = await Movie.findOne({ id: body.id });
        if (existingMovie) {
            return NextResponse.json(
                { success: false, error: "Media already exists" },
            );
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


export async function DELETE(req : Request){
    try {
        const body = await req.json()
        const mediaId = body.id

        await Movie.deleteOne({id : mediaId})
        if(!mediaId){
            return NextResponse.json(
                {sucess : false , error : 'Media Not Found'},
                {status : 404}
            )
        }

        return NextResponse.json({sucess : true})

    } catch (error) {
        
    }
}