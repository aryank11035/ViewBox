import PlaylistComp from "@/components/media/playlist/playlist-page";
import { getAllPlaylists } from "../actions/playlist";
import { PopUpStatesProvider } from "@/components/custom-hooks/hooks";



export default async function PlaylistPage(){
    
    return (
        <PopUpStatesProvider>
            <PlaylistComp />
        </PopUpStatesProvider>
    )
}