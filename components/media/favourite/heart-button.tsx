'use client'

import { addToFavourites, checkIsFavourite, removeFromFavourites } from "@/app/actions/favourites"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { FaHeart } from "react-icons/fa"
import { check } from "zod"


export function HeartButton({mediaInfo}  : any){


    const [isFavourite,setIsFavourite] = useState(false)


    useEffect(() => {
        const checkFavourite = async () => {
            const result = await checkIsFavourite(mediaInfo.id)
            setIsFavourite(result.isFavourite)
        }
        checkFavourite()
    },[mediaInfo.id])

    const handleFavourites = async() => {
        
        if(isFavourite) {
            await removeFromFavourites(mediaInfo)
            setIsFavourite(false)
        } else{
            setIsFavourite(true)
            await addToFavourites(mediaInfo)
        }
    }




    return (
        <div className="group">
            <motion.button
                style={{ 
                    backgroundColor : isFavourite ? '#FFFFFFE6' : 'transparent',
                    color : isFavourite ? '#E11D48' : '#FFFFFFE6',
                    borderColor : isFavourite ? '#FFFFFF4D': '#F43F5E80' 
                }}
                onClick={handleFavourites}
                className=" p-3.5 flex items-center justify-center rounded-xs border border-rose-500/50 cursor-pointer group-hover:scale-95 duration-200 "
                >
                <FaHeart className="text-2xl  group-hover:scale-120 duration-200"/>
            </motion.button>
        </div>
    )
}