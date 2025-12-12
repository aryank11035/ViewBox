'use client'

import { addToFavourites, removeFromFavourites } from "@/app/actions/favourites"
import { motion } from "framer-motion"
import { FaHeart } from "react-icons/fa"
import { UsePopUp, SignInPopUp } from "@/components/custom-hooks/hooks"
import { Movie } from "@/schema/type"
import { useCallback } from "react"



interface HeartButtonProps {
    mediaInfo : Movie; 
    initialFavourite?: boolean;
    onFavoritesChange ?: (res: any , favourite : boolean) => void; 
    session : any 
}




export function HeartButton({mediaInfo , initialFavourite , onFavoritesChange , session }  : HeartButtonProps){

    

    const { openPopup } = UsePopUp()
    const handleFavourites = useCallback(async() => {

        if(!session) return openPopup('Sign in to add movies to your favourites')
            
        if(initialFavourite) {
            const res = await removeFromFavourites(mediaInfo)
            onFavoritesChange?.(res ,false)
      
        } else{
  
            const res = await addToFavourites(mediaInfo)
            onFavoritesChange?.(res ,true)
    
        }
    },[mediaInfo , initialFavourite , onFavoritesChange , session])

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

