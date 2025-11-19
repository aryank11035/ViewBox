'use client'


import { useEffect, useState } from "react"
import NoPlaylistComp from "./no-playlist-comp"
import NewPlaylistPopup from "./new-playlist-popup"
import { deletePlaylist, getAllPlaylists, getPlaylists } from "@/app/actions/playlist"
import LoadingPlaylist from "./loading-playlist"
import PlaylistCard from "./playlist-card"
import {  AnimatePresence} from "framer-motion"

export default function PlaylistComp(){

    const [showMessage,setShowMessage] = useState(false)
    const [playlistNames , setPlaylistNames] = useState<string[]>([])
    const [allPlaylists,setAllPlaylists] = useState<any []>([])
    const [isLoading,setIsLoading] = useState(true)
    
    const handleMessage = (bool : boolean) =>{
        setShowMessage(bool)
    }
    
    const handleDeletePlaylist = async(playlist: any) => {
        try {
            setIsLoading(true)
            const [response] = await Promise.all([
                deletePlaylist(playlist),
                new Promise(resolve => setTimeout(resolve , 500)),
                showPlaylist()
            ])
            return response
        }finally{
            setIsLoading(false)
        }
    }
    
    const showPlaylist = async () => {

        try{
            setIsLoading(true)
            const [playlists] = await Promise.all([
                getAllPlaylists(),
                new Promise(resolve => setTimeout(resolve , 800))
            ])
            setAllPlaylists(playlists)
        }catch(error){
            console.error('Failed to load playlists:', error)
        }finally{
            setIsLoading(false)
        }
        
    }
    console.log(allPlaylists)
    useEffect(() => {
        showPlaylist()
    },[])   
    return(
        <section className="max-w-full pt-20 mx-auto bg-[#111111] backdrop-blur-2xl text-xl font-bold  min-h-screen   ">
            <div className="max-w-[1450px] min-h-screen  py-15 mx-auto border-l border-r border-white/10 bg-black/30 px-8 relative ">
                <div className="max-w-[1500px] mx-auto flex flex-col gap-6">
                    <div className="flex justify-between px-1 ">
                        <h1 className="md:text-3xl">Your Playlists</h1>
                        <button onClick={() => handleMessage(true)} className="text-wrap text-sm p-2 font-medium bg-green-600 rounded-xs hover:scale-98 duration-300 hover:bg-green-600 cursor-pointer">Create new Playlist</button>
                    </div>
                    {
                        isLoading ? (
                            
                            <LoadingPlaylist/>

                        ) : allPlaylists.length === 0 ? (
                            
                                <NoPlaylistComp handleMessage={handleMessage}/>

                            ) : (
                                <div className=" p-1 grid  md:grid-cols-2 lg:grid-cols-3 gap-4">

                                    {
                                        allPlaylists.map((playlist,index) =>(
                                            <PlaylistCard key={index} playlist={playlist} handleDeletePlaylist={handleDeletePlaylist} />
                                        ))  
                                    }

                                </div>

                            )
                    }

                    {

                    }

                    <AnimatePresence mode="wait">
                        {
                            showMessage && (
                                <NewPlaylistPopup handleMessage={handleMessage} showPlaylist={showPlaylist}/>
                            ) 
                        }
                        
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
} 