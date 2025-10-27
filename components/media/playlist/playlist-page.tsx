'use client'

import { Button } from "@/components/ui/button"
import { useState } from "react"
import NoPlaylistComp from "./no-playlist-comp"
import { Label } from "@radix-ui/react-label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"
import NewPlaylistPopup from "./new-playlist-popup"

export default function PlaylistComp(){

    const [showMessage,setShowMessage] = useState(false)
    
    const handleMessage = () =>{
        setShowMessage(prev => !prev)
    }

    return(
        <section className="max-w-full pt-20 mx-auto bg-[#111111] backdrop-blur-2xl text-xl font-bold  min-h-screen   ">
            <div className="max-w-[1700px] min-h-screen  p-4 mx-auto border-l border-r border-white/10 bg-black/30 px-6 relative ">
                <div className="max-w-[1500px] mx-auto flex flex-col gap-6">
                    <div className="flex justify-between p-2 ">
                        <h1 className="md:text-3xl">My Show Playlist</h1>
                        <button onClick={handleMessage} className="text-wrap text-sm p-2 font-medium bg-green-600 rounded-xs hover:scale-98 duration-300 hover:bg-green-600 cursor-pointer">Create new Playlist</button>
                    </div>
                    <NoPlaylistComp handleMessage={handleMessage}/>
                    {
                        showMessage && (
                            <NewPlaylistPopup handleMessage={handleMessage}/>
                        )
                    }
                </div>
            </div>
        </section>
    )
} 