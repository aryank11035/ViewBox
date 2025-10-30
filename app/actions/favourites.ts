'use server'

import { auth } from "@/auth"
import { Users } from "@/lib/models"
import { connectToMongoose } from "@/lib/mongoose"
import { NextResponse } from "next/server"


export async function addToFavourites(mediaInfo : any){

    const session = await auth()
    const userId  = session?.user?.id
    try{
        await connectToMongoose()
        await Users.findByIdAndUpdate(
            userId,
            {$addToSet : { favourites : mediaInfo}},
            {new : true}
        )
        return {sucess : true}
    }catch(error){
        console.error(error);
        return { success: false, error: "Failed to add favourite" }
    }
}

export async function removeFromFavourites(mediaInfo : any){
        const session = await auth()
        const userId  = session?.user?.id
        try{
            await connectToMongoose()
            await Users.findByIdAndUpdate(
                userId,
                {$pull : { favourites : {id : mediaInfo.id}}},
                {new : true}
            )
            return {success : true}
        }catch(error){
            console.error(error);
            return { success: false, error: "Failed to add favourite" }
        }

    
}

export async function checkIsFavourite(id : string){
    const session = await auth()
    const userId  = session?.user?.id
    try{
        await connectToMongoose()
        const user = await Users.findById(userId)
        
        if(!user) return {isFavourite : false}

        const isFavourite = user.favourites.some((fav  : any) => fav.id === id)
        return { isFavourite }
    }catch(error){
        console.error(error);
        return { success: false, error: "Failed to add favourite" }
    }
}

interface UserFavourites {
    favourites: Array<{
        id: string;
        type: string;
        name: string;
        img: string;
        votes: number;
        genres: any[];
        _id: any;
    }>;
}

export async function getFavourites(){
    const session =  await auth()
    const userId = session?.user?.id
    try{
        await connectToMongoose()
        const userFavourites = await Users.findById(userId , { favourites : 1 , _id : 0 }).lean() as any | null

         if (!userFavourites?.favourites) {
            return []
        }
        const serailizedFavourites = userFavourites.favourites.map((movie : any) => ({
            id : movie.id,
            mediaType : movie.type,
            title : movie.name,
            vote_average : movie.votes,
            poster_path : movie.img
        }))
        // console.log(userFavourites)
        return JSON.parse(JSON.stringify(serailizedFavourites))
    }catch(error){
        return []
    }
}