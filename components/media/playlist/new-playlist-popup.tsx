'use client'

import { createNewPlaylist } from "@/app/actions/playlist";
import { FormError } from "@/components/formError";
import { FormSucess } from "@/components/formSucess";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useState } from "react";
import { motion , AnimatePresence} from "framer-motion"
import PopUpWrapper from "./popup-wrapper";

interface ResponseProps {
    error ?: string,
    message ?: string,
    success ?: boolean
}


export default function NewPlaylistPopup({handleMessage , showPlaylist} : any){

    const [response, setResponse] = useState<ResponseProps | undefined>(undefined);

    const [playlistName , setPlaylistName] = useState('')
    const [playlistDescription,setPlaylistDescription] = useState('')
    const [checkbox,setCheckBox] = useState(false)


    const handleSubmit = async (e : any) => {
        e.preventDefault()

        const playlist = {
            playlist_name : playlistName,
            description : playlistDescription,
            playlist_type : checkbox ? 'public' : 'private'
        }

        const res = await createNewPlaylist(playlist)

        if(!res.success){
            setResponse({error : res.error})
            return 
        }
        
        setPlaylistName('')
        setPlaylistDescription('')
        setCheckBox(false)
        setResponse({message : res.message})
        
        setTimeout(() => {
            setResponse(undefined)
            showPlaylist()
        },1500)
        
    }
    


    return(
            <PopUpWrapper items_center={false}>
                    <div className="flex justify-between">
                        <h1 className="text-base text-warp">Create new Playlist</h1>
                        <div onClick={() => handleMessage(false)}>
                            <X strokeWidth={1.5} className="hover:text-white/50 cursor-pointer" />
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                        <div className="w-full text-base font-medium ">
                            <Label htmlFor="playlist_name">Playlist Name:</Label>
                            <Input id="playlist_name" type="text" className="border border-[rgba(255,255,255,0.2)] rounded-xs w-full h-12 mt-1" placeholder="Your playlist's name" value={playlistName} onChange={(e) => setPlaylistName(e.target.value)}/>
                        </div>
                        <div className="w-full text-base font-medium ">
                            <Label htmlFor="description">Description<span className="text-sm text-white/50 font-light">{`(optional):`}</span></Label>
                            <Textarea id="description"  className="border border-[rgba(255,255,255,0.2)] rounded-xs w-full h-25 mt-1" placeholder="Whats this playlist all about" value={playlistDescription} onChange={(e) => setPlaylistDescription(e.target.value)}/>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex gap-2 text-sm mt-0.5">
                                <input 
                                        type="checkbox" 
                                        className="size-4 accent-green-600" 
                                        onChange={(e) => setCheckBox(e.target.checked)}
                                    />
                            </div>
                            <div className="flex flex-col text-sm mb-2">
                                <p>Make this playlist public</p>
                                <span className=" text-sm text-white/50 tracking-tighter font-light">Public playlists can be viewed by anyone with the link</span>
                            </div>
                        </div>
                            <FormError error={response?.error}/>
                            <FormSucess message={response?.message} />
                        <div className="flex md:justify-end justify-center mt-2">
                            <Button variant='custom_one_2' size='custome_one_2'>
                                Create new Playlist
                            </Button>
                        </div>
                    </form>
            </PopUpWrapper>
               
    )
}