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
            {$pull : { favourites : mediaInfo}},
            {new : true}
        )
        return {sucess : true}
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

