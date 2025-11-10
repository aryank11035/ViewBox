'use client'
import Link from "next/link";

import { AnimatePresence , motion } from "motion/react";

import { FaHeart } from "react-icons/fa"
import { ThumbsUp } from 'lucide-react';
import { ListMusic } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { User } from 'lucide-react';


const containerVariants = {
 hidden : { 
   opacity : 0 ,
   y : -20 ,
   transition: {
     y: {
         duration: 0.2,
         ease: [0, 0.71, 0.2, 1.01],
     },
     opacity: {
         duration: 0.2,
         ease: [0, 0.71, 0.2, 1.01],
         delay: 0.07
     },
     when : 'beforeChildren'
 }
 },
 visible : {
     opacity : 1 ,
     y : 0,
     transition : {
         duration: 0.2,
         ease: [0, 0.71, 0.2, 1.01],
          when : 'afterChildren'
     }
 }
} as any
const staggerContainerVariants = {
  hidden: { 
    opacity: 1,
    transition: {
        staggerChildren: 0.08,
        staggerDirection: -1 ,
        when : 'beforeChildren'
    }
},
  visible : {
    opacity : 1 ,
    translateY : 0 ,
    transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
        when : 'afterChildren'
    }
  }
}

const childContainerVariants = {
    hidden : { 
      opacity : 0 , 
      height : 0 , 
      y : -20   ,  
      transition: {
          duration: 0.1,
          ease: [0, 0.71, 0.2, 1.01],
      },
      paddingTop: "0rem",     
      paddingBottom: "0rem",  
      paddingLeft: "0rem",  
      paddingRight: "0rem",
    },
    visible : {
        opacity : 1,
        height : 'auto',
        y : 0,
        paddingTop: "1rem",     
      paddingBottom: "1rem",  
      paddingLeft: "0.5rem",  
      paddingRight: "0.5rem",
        transition : {
            duration : 0.1,
            ease: [0, 0.71, 0.2, 1.01],
        }
    } 
} as any

const staticItemVariants = {
  hidden: {
      opacity: 0,
      transition: {
          duration: 0.2,
          delay: 0.3 // Exit after children
      }
  },
      visible: {
          opacity: 1,
          transition: {
              duration: 0.2
          }
      }
  } as any


  
export default function LinkPopUp({setShowLinkContainers} :any){



    return (
        <motion.div 
            className="absolute w-[250px] right-0 top-16 bg-[#111111]/90 text-sm rounded-xs border-[rgba(255,255,255,0.2)] border h-fit font-medium  z-10 "
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit='hidden'
            >
            {/* User Menu */}
            <motion.div 
                variants={staticItemVariants}
                className="p-2 border-b border-[rgba(255,255,255,0.2)] py-4 text-white/30 flex flex-row items-center gap-2"  >
                <User size={17}/>
                user menu
            </motion.div>
            {/* Stagges menu items */}
            <motion.div
                variants={staggerContainerVariants}
                initial="hidden"
                animate="visible"
                exit='hidden'
            >
                <Link href='/favourites'>
                <motion.div variants={childContainerVariants} className=" overflow-hidden hover:bg-white hover:text-green-600 duration-100 flex flex-row items-center gap-2"  onClick={() => setShowLinkContainers((prev : boolean ) => !prev)} >
                    <FaHeart className="text-sm"/> Favourites
                </motion.div>
                </Link>
                <Link href='/'>
                <motion.div 
                    onClick={() => setShowLinkContainers((prev : boolean ) => !prev)}
                    variants={childContainerVariants}
                    className=" overflow-hidden hover:bg-white hover:text-green-600 duration-100 flex flex-row items-center gap-2">
                    <ThumbsUp size={17}/>
                    My Votes
                </motion.div>
                </Link>
                <Link href='/playlists'>
                <motion.div 
                    onClick={() => setShowLinkContainers((prev : boolean ) => !prev)}
                    variants={childContainerVariants}
                    className=" overflow-hidden hover:bg-white hover:text-green-600 duration-100 flex flex-row items-center gap-2">
                    <ListMusic size={17}/>
                    My Playlists
                </motion.div>
                </Link>
            </motion.div>

            {/* Appaers with the menu  */}
            <Link href='/'>
                <motion.div 
                variants={staticItemVariants}
                className="p-2 border-t border-[rgba(255,255,255,0.2)] py-4 hover:bg-white hover:text-green-600 duration-100 flex flex-row items-center gap-2">
                <LogOut size={17}/>
                log out 
                </motion.div>
            </Link>
        </motion.div>
    )
}