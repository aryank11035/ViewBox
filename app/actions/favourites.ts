'use server'

import { auth } from "@/auth"
import { Movies, Users } from "@/lib/models"
import { connectToMongoose } from "@/lib/mongoose"
import { User } from "lucide-react"
import { NextResponse } from "next/server"


export async function addToFavourites(mediaInfo : any){

    const session = await auth()
    const userId  = session?.user?.id
    try{
        await connectToMongoose()
        const media = await Movies.findOne({
            id :  mediaInfo.id
        })
        const isAdded = await Users.findByIdAndUpdate(
            userId,
            {$addToSet : { favourites : media._id }},
            {new : true}
        )
        return console.log(isAdded)

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


export async function getFavourites(){
    const session =  await auth()
    const userId = session?.user?.id
    try{
        await connectToMongoose()

        const userFavourites = await Users.findById(
            userId ,
            { favourites : 1 , _id : 0 } 
        )
        if(!userFavourites.favourites) return []

        const favouriteIds = userFavourites.favourites
        const userFavouriteMovies = await Movies.find(  
            { _id : { $in : favouriteIds }}  
        ).lean()

        const serializedMovies =  userFavouriteMovies.map((movie) => ({
            ...movie
        }))

        return JSON.parse(JSON.stringify(serializedMovies))
         
    }catch(error){
        return []
    }
}