'use server'
import { auth } from "@/auth"
import client from "@/lib/db"
import { Movies } from "@/lib/models"
import { connectToMongoose } from "@/lib/mongoose"

import { ObjectId } from "mongodb"
import mongoose from "mongoose"

export async function addMovie(mediaData : any){

    const session = await auth()
    const username = session?.user?.name
    
    try {
        await connectToMongoose();  
        mediaData.overrated = mediaData.overrated ?? 0;
        mediaData.underrated = mediaData.underrated ?? 0;
        mediaData.added_by = username
       
        const existingMovie = await Movies.findOne({id : mediaData.id})
        if(!existingMovie){
            
            const movie = await Movies.create(mediaData);
            return ({success : true , media : mediaData})
        }
            
        return ({success : false , media : mediaData})
        
    } catch (error) {
         console.error("❌ Insert failed:", error);
        return  ({success : false, error : 'Failed to add to media'} )
    }
}

