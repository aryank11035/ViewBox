import PlaylistComp from "@/components/media/playlist/playlist-page";
import { PopUpStatesProvider } from "@/components/custom-hooks/hooks";
import { auth } from "@/auth";



export default async function PlaylistPage(){
    
    const session = await auth()

    return (
        <PopUpStatesProvider>
            <PlaylistComp session={session}/>
        </PopUpStatesProvider>
    )
}