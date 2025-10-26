'use server'

import { auth } from "@/auth"
import { Playlists, Users } from "@/lib/models"
import { connectToMongoose } from "@/lib/mongoose"

export async function createNewPlaylist(playlist : any){

    const session = await auth()
    const userId = session?.user?.id
    const username = session?.user?.name
  
    try {
        await connectToMongoose()
        
        const existing = await Playlists.findOne({
            playlist_name : playlist.playlist_name,
            created_by : userId
        })
        
        if (existing) {
            return {
                success: false,
                error: "Playlist already exists"
            };
        }

        const createdPlaylist = await Playlists.create({
            playlist_name : playlist.playlist_name,
            playlist_type : playlist.playlist_type,
            created_by : userId,
            created_by_name : username
        })
        await Users.findByIdAndUpdate(userId, {
            $push: { playlists: createdPlaylist._id }
        });
        return {
            success: true,
            message: "Playlist created successfully",
        };
    } catch (error) {
        console.error("Error creating playlist:", error);
        return {
            success: false,
            error: "Failed to create playlist",
        };
    }
}

export async function getPlaylistNames(){
    const session = await auth()
    const userId = session?.user?.id

    try {
        await connectToMongoose()
        const playlists = await Playlists.find({created_by : userId}).sort({created_at : -1})
        const playlist_names = playlists.map(p => p.playlist_name)
        return playlist_names
    } catch (error) {
        return []
    }
}