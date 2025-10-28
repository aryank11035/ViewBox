'use client'
import { Button } from "@/components/ui/button"

 

export default function NoPlaylistComp({handleMessage} : any){
    return (
        <div className="w-full p-2 bg-white/10 rounded-xs flex flex-col gap-6 justify-center items-center py-10">
            <h1 className="text-2xl text-center">You haven't created any playlists yet</h1>
            <p className="text-base text-white/50 font-medium text-center">
                Create your first playlist to start organizing your favorite movies!
            </p>
            <Button onClick ={() => handleMessage(true)} className="p-4 py-6 md:text-xl bg-green-600 rounded-xs hover:scale-98 duration-300 hover:bg-green-600 cursor-pointer">
                Create new Playlist
            </Button>
        </div>
    )
}