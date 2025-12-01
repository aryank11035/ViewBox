'use client'

import { addToFavourites, removeFromFavourites } from "@/app/actions/favourites"
import { motion } from "framer-motion"
import { FaHeart } from "react-icons/fa"
import { UsePopUp, SignInPopUp } from "@/components/custom-hooks/hooks"
import { Movie } from "@/schema/type"



interface HeartButtonProps {
    mediaInfo : Movie; 
    initialFavourite?: boolean;
    onFavoritesChange ?: (res: any , favourite : boolean) => void; 
    session : any 
}



import { useState } from "react"

export function HeartButton({ mediaInfo, initialFavourite = false, onFavoritesChange, session }: HeartButtonProps) {
    const [favourite, setFavourite] = useState(initialFavourite)
    const { openPopup } = UsePopUp()

    const handleFavourites = async () => {
        if (!session) return openPopup('Sign in to add movies to your favourites')

     
        setFavourite(prev => !prev)
        onFavoritesChange?.(null, !favourite) 

        try {
            if (favourite) {
                await removeFromFavourites(mediaInfo)
            } else {
                await addToFavourites(mediaInfo)
            }
        } catch (err) {
           
            console.error(err)
            setFavourite(prev => !prev)
            onFavoritesChange?.(null, favourite)
        }
    }

    return (
        <>
            <SignInPopUp/>
            <div className="group">
                <motion.button
                    style={{
                        backdropFilter: favourite ? 'blur(0px)' : 'blur(14px)',
                        backgroundColor: favourite ? '#FFFFFFE6' : 'transparent',
                        color: favourite ? '#E11D48' : '#FFFFFFE6',
                        borderColor: favourite ? '#FFFFFF4D' : ''
                    }}
                    onClick={handleFavourites}
                    className="p-3 md:p-3.5 flex items-center justify-center rounded-xs border border-white/20 cursor-pointer group-hover:scale-95 duration-200"
                >
                    <FaHeart className="text-xl md:text-2xl group-hover:scale-120 duration-200" />
                </motion.button>
            </div>
        
        </>
    )
}

