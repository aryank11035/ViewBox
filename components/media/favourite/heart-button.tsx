'use client'

import { addToFavourites, checkIsFavourite, getFavouritesIds, removeFromFavourites } from "@/app/actions/favourites"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { FaHeart } from "react-icons/fa"
import { handleFavouritesProps } from "./fav-card"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"



interface HeartButtonProps {
    mediaInfo : any; 
    initialFavourite?: boolean;
    onFavoritesChange ?: (res: any , favourite : boolean) => void; 
}


export const Loading  =() => (
    <SkeletonTheme baseColor='#111111' highlightColor='#191919'>
        <div className="w-14 aspect-square bg-[#111111] rounded-xs flex">
            <Skeleton  containerClassName='block leading-[1px] flex-1' height='100%' borderRadius='0.125rem'/>
        </div>
    </SkeletonTheme>
)

export function HeartButton({mediaInfo , initialFavourite , onFavoritesChange}  : HeartButtonProps){


    // const [isFavourite,setIsFavourite] = useState(initialFavourite)

    // useEffect(() => {
    //     console.log('state value after changed' , isFavourite)
    // },[isFavourite])

//     useEffect(() => {
//   console.log("❤️ [HeartButton] isFavourite changed:", isFavourite)
// }, [isFavourite])

    const handleFavourites = async() => {

        if(initialFavourite) {
            // console.log('state before removed ' , isFavourite)
            // setIsFavourite(false)
            const res = await removeFromFavourites(mediaInfo)
            onFavoritesChange?.(res ,false)
      
        } else{
            //   console.log('state before added ' , isFavourite)
            // setIsFavourite(true)
            const res = await addToFavourites(mediaInfo)
            onFavoritesChange?.(res ,true)
    
        }
    }

    return (
        <div className="group">
            <motion.button
                style={{ 
                    backdropFilter : initialFavourite ? 'blur(0px)' : 'blur(14px)',
                    backgroundColor : initialFavourite ? '#FFFFFFE6' : 'transparent',
                    color : initialFavourite ? '#E11D48' : '#FFFFFFE6',
                    borderColor : initialFavourite ? '#FFFFFF4D': '' 
                }}
                onClick={handleFavourites}
                className=" p-3.5 flex items-center justify-center rounded-xs border border-white/20 cursor-pointer group-hover:scale-95 duration-200 "
                >
                <FaHeart className="text-2xl  group-hover:scale-120 duration-200"/>
            </motion.button>
        </div>
    )
}