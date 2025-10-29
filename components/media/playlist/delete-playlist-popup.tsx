'use client'

import { X , Check } from "lucide-react"
import PopUpWrapper from "./popup-wrapper"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
export default function DeletePlaylist({handleDeleteMessage , playlist_name , deletePlaylist} : any){


    return (
       <motion.div 
            initial={{opacity : 0 , translateY : 5}}
            animate = {{opacity : 1, translateY : 0}}
            exit={{opacity : 0 , translateY : 0}}
            transition={{
                duration: 0.4,
                ease: 'easeInOut'
            }}
            className="flex flex-col self-end ">
            <h1 className="text-base text-wrap tracking-tight font-light text-white/80">Do you want to delete `{playlist_name}`?</h1>
            <div className="flex flex-row gap-2 ">
                {
                    
                }
                <Button className="w-full p-1 bg-green-600 rounded-xs hover:scale-99 duration-300 hover:bg-white hover:text-green-600 cursor-pointer flex-1"  onClick={deletePlaylist}><Check/>Yes</Button>
                <Button className="w-full p-1 bg-red-600  rounded-xs hover:scale-99 duration-300 hover:bg-white hover:text-red-600 cursor-pointer flex-1"  onClick={() => handleDeleteMessage(false)}><X/>No</Button>
            </div>
        </motion.div>
    )
}