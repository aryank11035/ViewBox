'use client'

import { Button } from "@/components/ui/button"
import { ListPlus } from "lucide-react"
import { useEffect, useState } from "react"
import { X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { addToPlaylist, createNewPlaylist,  getPlaylists } from "@/app/actions/playlist";
import { FormError } from "@/components/formError";
import { FormSucess } from "@/components/formSucess";
import { strict } from "node:assert";
import PopUpWrapper from "./popup-wrapper";
import { AnimatePresence } from "motion/react";


interface ResponseProps {
    error ?: string,
    message ?: string,
    success ?: boolean
}

export function PlaylistButton({playlistMediaInfo} : any){
    
    const [showMessage,setShowMessage] = useState(false)
    const [response, setResponse] = useState<ResponseProps | undefined>(undefined);
    const [newPlaylist,setNewPlayist] = useState(false)
    const [userPlaylists, setUserPlaylists] = useState<string[]>([]);


    const [checkbox,setCheckBox] = useState(false)
    const [playlistName , setPlaylistName] = useState('')
    const [selectedPlaylist,setSelectedPlaylist] = useState<string >('')

    const handleSubmit = async (e : any) => {
        e.preventDefault()
       
        const playlistType = checkbox ? 'public' : 'private';
        const playlist = {
            playlist_name : playlistName,
            playlist_type : playlistType
        }
        
        const res =  await createNewPlaylist(playlist) 
        const names = await getPlaylists(); 
        setUserPlaylists(names)
        if(res.success){
            setResponse({message : res.message})
            setSelectedPlaylist(res.playlist_name)
            setTimeout(() => {
                setNewPlayist(false)
                setPlaylistName('')
                setResponse(undefined);
            } , 800)
        }else{
            setResponse({error : res.error})
        }

    }


    useEffect(() => {
        const fetchPlaylists = async() => {
            const names = await getPlaylists()
            setUserPlaylists(names)
            if (names.length > 0 || !selectedPlaylist) {
                setSelectedPlaylist(names[0]);
            }
        }
        fetchPlaylists()
    },[])
    
    const handlePlaylist = async (e : any) => {
        e.preventDefault()
         
        const res = await addToPlaylist(selectedPlaylist,playlistMediaInfo)
        if(res.success){
            setResponse({message : res.message})

        }else{
            setResponse({error : res.error})
        }
        setTimeout(() => {
            setResponse(undefined)     
        }, 1500)
    }

    return (
       <>
       <Button     
            onClick={() => setShowMessage(true)} 
            variant='custom_one'   
            size='custom_one'          
            >
            <ListPlus/>add to playlist
        </Button>
        <AnimatePresence mode="wait">
        {
            showMessage && (
                <>
                    <PopUpWrapper items_center={false}>

                        <div className="w-full flex justify-between">
                            <h1 className="text-2xl font-bold">Add to Playlist</h1>
                            <div onClick={() => {
                                setShowMessage(false)
                                setResponse(undefined)
                            }}>
                                <X strokeWidth={1.5} className="hover:text-white/50 cursor-pointer" />
                            </div>
                        </div>
                        <div className="flex gap-2 items-center">
                            <div className="bg-white/30 rounded-xs p-2 h-fit">
                                <ListPlus size={24} strokeWidth={1.2}/>
                            </div>
                            <p className="font-bold text-lg">
                                Movie Name
                                <span className="block text-sm tracking-tighter text-white/30">Select a playlist to add this movie to :</span>
                            </p>

                        </div>

                        {
                            newPlaylist ? (
                                <>
                                    <form 
                                        onSubmit={handleSubmit}
                                        className="flex flex-col gap-2"
                                    >
                                        <h1 className="font-bold">New Playlist Name:</h1>
                                        <Input className="w-full h-12 border border-[rgba(255,255,255,0.2)] rounded-xs" value={playlistName} onChange={(e) => setPlaylistName(e.target.value)}/>
                                        <div className="flex items-center gap-2 text-sm">
                                            <input 
                                                type="checkbox" 
                                                className="size-4 accent-green-600" 
                                                onChange={(e) => setCheckBox(e.target.checked)}/>
                                            make this playlist public
                                        </div>
                                        <FormError error={response?.error} />
                                        <FormSucess message={response?.message} />
                                        <div className="flex justify-between items-center flex-col-reverse gap-6 md:flex-row mt-4">
                                            <button  onClick={() => setNewPlayist(false)}  className="tracking-tighter text-xs cursor-pointer hover:text-green-600">Back to existing playlist</button>
                                            <Button
                                                variant="custom_one_2"
                                                size="custome_one_2"
                                            >
                                                <ListPlus/>Create playlist
                                            </Button>
                                        </div>
                                    </form>
                                </>

                            ) : (
                                <>
                                    <form
                                        onSubmit={handlePlaylist}
                                        className="w-full h-fit flex flex-col gap-4"
                                    >
                                        <select className="w-full h-12 bg-white/30 rounded-xs text-sm px-2" onChange={(e) => setSelectedPlaylist(e.target.value)} value={selectedPlaylist}>
                                            {userPlaylists.map((name, idx) => (
                                                <option key={idx} value={name} className="bg-[#111111] ">
                                                {name}
                                                </option>
                                            ))}
                                        </select>
                                        <FormError error={response?.error} />
                                        <FormSucess message={response?.message} />
                                        <div className="flex justify-between items-center flex-col-reverse gap-6 md:flex-row mt-4">
                                            <button  onClick={() => setNewPlayist(true)}  className="tracking-tighter text-xs cursor-pointer hover:text-green-600">Create new playlist</button>
                                            <Button
                                                variant="custom_one_2"
                                                size="custome_one_2"
                                            >
                                                <ListPlus/>add to playlist
                                            </Button>
                                        </div>
                                    </form>
                                </>

                            )
                        }
                        </PopUpWrapper>
                   
                </>

                )
            } 
            </AnimatePresence>
       
       </>
      
    )
}