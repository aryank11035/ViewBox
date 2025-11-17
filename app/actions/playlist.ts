'use server'

import { auth } from "@/auth"
import { Playlists, Users } from "@/lib/models"
import { connectToMongoose } from "@/lib/mongoose"
import { error } from "node:console"
import { success } from "zod"

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

        if(!playlist.description) {
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
                playlist_name : createdPlaylist.playlist_name
            }; 
        }


        const createPlaylist = await Playlists.create({
            playlist_name : playlist.playlist_name,
            description : playlist.description,
            playlist_type : playlist.playlist_type,
            created_by : userId,
            created_by_name : username
        })

        await Users.findByIdAndUpdate(userId , {
            $push : { playlists : createPlaylist._id}
        })
        return {
            success: true,
            message: "Playlist created successfully",
            playlist_name : createPlaylist.playlist_name
        };
    } catch (error) {
        console.error("Error creating playlist:", error);
        return {
            success: false,
            error: "Failed to create playlist",
        };
    }
}

export async function getPlaylists(){
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
export async function getAllPlaylists() {
     const session = await auth()
    const userId = session?.user?.id

    try {
        await connectToMongoose()
        const playlists = await Playlists.find({created_by : userId}).sort({ created_at: -1 }).lean()
        return JSON.parse(JSON.stringify(playlists))
    } catch (error) {
        console.error("Error fetching all playlists:", error)
        return []
    }
}


export async function addToPlaylist(selectedPlaylist  : string , selectedMedia : any){
    console.log('selected playlist : ' , selectedPlaylist)
    console.log('selected media : ' , selectedMedia)

    try {

        if(selectedPlaylist === '') return {success : false , error : 'select a Playlist'}

        await connectToMongoose()
        const playlist = await Playlists.findOne({
            playlist_name : selectedPlaylist
        })
        if(!playlist) return {success : false , error : 'Playlist not found'}
        const alreadyAdded = playlist.movies.some((movie : any) => movie.id === selectedMedia.id)
        if(alreadyAdded)  return {success : false , error : 'Media already in playlist'}
        
        playlist.movies.push({
            media_ref : selectedMedia._id ,
            id: selectedMedia.id,
            type: selectedMedia.type,
            img: selectedMedia.img,
            genres : selectedMedia.genres,
            name : selectedMedia.name,
            added_on: new Date()
        });

        await playlist.save();

        return { success: true, message: `Media added to playlist ${selectedPlaylist}` };

    } catch (error) {
        return { success: false, error: "Failed to add media" };
    }
}

export async function deletePlaylist(id : any) {
    const session = await auth()
    const userId =  session?.user?.id

    console.log(id)
    try{
        await connectToMongoose()
        const playlistDeletedFromUser = await Users.findByIdAndUpdate(
            userId,
            {$pull : { playlists : id }},
            {new : true}
        )
        const playlistDeleted = await Playlists.findByIdAndDelete(id)
        if(playlistDeletedFromUser && playlistDeleted ) return {success :true , message : 'Playlist deleted sucessfully'}

        
        return { success : false , error : 'playlist wasn`t  deleted' }
    }catch(error){
        return {success : false , error : 'something happened'}
    }
}   