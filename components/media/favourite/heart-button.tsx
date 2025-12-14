'use client'

import { addToFavourites, removeFromFavourites } from "@/app/actions/favourites"
import { motion } from "framer-motion"
import { FaHeart } from "react-icons/fa"
import { UsePopUp, SignInPopUp } from "@/components/custom-hooks/hooks"
import { Movie } from "@/schema/type"
import { useCallback, useState, useTransition } from "react"
import { handleFavouritesProps } from "./fav-card"



interface HeartButtonProps {
    mediaInfo : Movie; 
    initialFavourite?: boolean;
    onFavoritesChange ?: (res: any , favourite : boolean) => void; 
    session : any 
}




export function HeartButton({mediaInfo , initialFavourite , onFavoritesChange , session }  : HeartButtonProps){

    const { openPopup } = UsePopUp()
    const [isPending, startTransition] = useTransition()
    const [isOptimistic, setIsOptimistic] = useState(false)


    const handleFavourites = useCallback(async () => {
        if (!session) {
            openPopup('Sign in to add movies to your favourites')
            return
        }

        //update the ui instantly
        const newFavState = !initialFavourite
        setIsOptimistic(true)
        
        onFavoritesChange?.(
            {
                success: true,
                [newFavState ? 'added' : 'removed']: mediaInfo.title || mediaInfo.name
        
            },
            newFavState
        )

        // Then sync with server in the background
        startTransition(async () => {
            try {
                let res: handleFavouritesProps
                
                if (initialFavourite) {
                    res = await removeFromFavourites(mediaInfo)
                    // Only update if server response differs from optimistic update
                    if (!res.success) {
                        // Rollback on server error
                        onFavoritesChange?.(res, true)
                    }
                } else {
                    res = await addToFavourites(mediaInfo)
                    // Only update if server response differs from optimistic update
                    if (!res.success) {
                        // Rollback on server error
                        onFavoritesChange?.(res, false)
                    }
                }
            } catch (error) {
                // Rollback on error
                console.error('Failed to update favourites:', error)
                onFavoritesChange?.(
                    {
                        success: false,
                        error: 'Failed to update. Please try again.'
                    },
                    !!initialFavourite // Revert to initial state
                )
            } finally {
                setIsOptimistic(false)
            }
        })
    }, [session, initialFavourite, mediaInfo, onFavoritesChange, openPopup])

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

