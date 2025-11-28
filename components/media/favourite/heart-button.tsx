'use client'

import { addToFavourites, checkIsFavourite, getFavouritesIds, removeFromFavourites } from "@/app/actions/favourites"
import { motion } from "framer-motion"
import { FaHeart } from "react-icons/fa"
import { useSession } from "next-auth/react"
import { containerVariants, UsePopUp, SignInPopUp } from "@/components/custom-hooks/hooks"
import PopUpWrapper from "../../popup-wrapper"
import { useState } from "react"
import { Clapperboard, X } from "lucide-react"
import { closeButtonVariant, mediaSectionVariants } from "../playlist/playlist-card/animation-variants"



interface HeartButtonProps {
    mediaInfo : any; 
    initialFavourite?: boolean;
    onFavoritesChange ?: (res: any , favourite : boolean) => void; 
}




export function HeartButton({mediaInfo , initialFavourite , onFavoritesChange}  : HeartButtonProps){

    const {data : session  , status} = useSession()
  
    const [current,setCurrent] = useState(false)
    const { openPopup } = UsePopUp()
    const handleFavourites = async() => {

        if(!session) return openPopup('Sign in to add movies to your favourites')
            
        if(initialFavourite) {
            const res = await removeFromFavourites(mediaInfo)
            onFavoritesChange?.(res ,false)
      
        } else{
  
            const res = await addToFavourites(mediaInfo)
            onFavoritesChange?.(res ,true)
    
        }
    }

    return (
        <>

            {/* this should be a component */}
            <SignInPopUp />
                
          

            {/* when this is clicked */}
            <div className="group" >
                <motion.button
                    style={{ 
                        backdropFilter : initialFavourite ? 'blur(0px)' : 'blur(14px)',
                        backgroundColor : initialFavourite ? '#FFFFFFE6' : 'transparent',
                        color : initialFavourite ? '#E11D48' : '#FFFFFFE6',
                        borderColor : initialFavourite ? '#FFFFFF4D': '' 
                    }}
                    onClick={handleFavourites}
                    className=" p-3 md:p-3.5 flex items-center justify-center rounded-xs border border-white/20 cursor-pointer group-hover:scale-95 duration-200 "
                    >
                    <FaHeart className="text-xl md:text-2xl group-hover:scale-120 duration-200"/>
                </motion.button>
            </div>
        
        </>
    )
}

