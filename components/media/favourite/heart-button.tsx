'use client'

import { addToFavourites, checkIsFavourite, removeFromFavourites } from "@/app/actions/favourites"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { FaHeart } from "react-icons/fa"
import { handleFavouritesProps } from "./fav-card"



interface HeartButtonProps {
    mediaInfo: any; 
    initialFavourite?: boolean;
    onFavoritesChange ?: (res: handleFavouritesProps) => void; 
}

export function HeartButton({mediaInfo , initialFavourite  = false , onFavoritesChange}  : HeartButtonProps){


    const [isFavourite,setIsFavourite] = useState(initialFavourite)


    useEffect(() => {
        const checkFavourite = async () => {
            const result = await checkIsFavourite(mediaInfo._id)
            setIsFavourite(result.isFavourite)
        }
        checkFavourite()
    },[mediaInfo._id])

    const handleFavourites = async() => {
        
        if(isFavourite) {
            const res = await removeFromFavourites(mediaInfo)
            onFavoritesChange?.(res)
            setIsFavourite(false)
        } else{
            setIsFavourite(true)
            const res = await addToFavourites(mediaInfo)
            onFavoritesChange?.(res)
        }
    }




    return (
        <div className="group">
            <motion.button
                style={{ 
                    backdropFilter : isFavourite ? 'blur(0px)' : 'blur(14px)',
                    backgroundColor : isFavourite ? '#FFFFFFE6' : 'transparent',
                    color : isFavourite ? '#E11D48' : '#FFFFFFE6',
                    borderColor : isFavourite ? '#FFFFFF4D': '' 
                }}
                onClick={handleFavourites}
                className=" p-3.5 flex items-center justify-center rounded-xs border border-white/20 cursor-pointer group-hover:scale-95 duration-200 "
                >
                <FaHeart className="text-2xl  group-hover:scale-120 duration-200"/>
            </motion.button>
        </div>
    )
}