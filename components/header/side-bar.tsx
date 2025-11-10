'use client'

import { ListMusic, ListVideo, LogOut, Menu, ThumbsUp, X } from "lucide-react"
import { useState } from "react"
import { AnimatePresence , motion  } from "motion/react"
import HeaderSearchBar from "./search-bar"
import { FaHeart } from "react-icons/fa"


const containerVariants = {
    hidden : {
        x : '100%',
       transition: {
            duration: 0.3,
            staggerChildren : 0.08,
            ease: [0.4, 0, 0.2, 1] ,
            when : 'afterChildren'
        }
    }, 
    visible : {
        x : 0,
       transition: {
            duration: 0.3,
            staggerChildren: 0.1,
            when: "beforeChildren",
            delayChildren : 0.1,
            ease: [0.4, 0, 0.2, 1] 
        }
    }
} as any

const childContainerVariants = {
    hidden : { 
      x : '100%' ,  
      transition: {
          duration: 0.1,
          ease: [0, 0.71, 0.2, 1.01],
      },
    },
    visible : {
        x : 0,
        transition : {
            duration : 0.1,
            ease: [0, 0.71, 0.2, 1.01],
        }
    } 
} as any


const closeButtonVariant = {
    hidden : {
        rotate : 90 , 
        transition : {
            duration : 0.2,
        }
    },
    visible : {
        rotate : 0 , 
        transition : {
            duration : 0.2,
            delay: 0.5
        }
    }
}


export default function HeaderSideBar(){

    const [isOpen,setIsOpen] = useState<boolean>(false)

    return (
        <>
            <div className="md:hidden flex">
              <button onClick={() => setIsOpen(true)}>
                  <Menu strokeWidth={1} size={25} />
              </button>
            </div>

            <AnimatePresence >
                {
                    isOpen && (
                        <motion.div 
                            variants={containerVariants}
                            initial='hidden'
                            animate='visible'
                            exit='hidden'
                            className="fixed inset-0 bg-black/90  w-full min-h-screen md:hidden flex flex-col z-50"
                        >
                                <div className="w-full h-20 flex justify-between px-6.5 ">
                                    <button>
                                        <h1 className="text-2xl font-bold cursor-pointer ">ViewBox</h1>
                                    </button>
                                    <motion.button 
                                        variants={closeButtonVariant}
                                        initial='hidden'
                                        animate='visible'
                                        exit='hidden'
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <X strokeWidth={1.5} size={25}/>
                                    </motion.button>
                                </div>
                                <div className="w-full h-20 flex items-center px-6.5 ">
                                    <div className="w-full h-10 relative flex items-center">
                                        <HeaderSearchBar />
                                    </div>
                                </div>
                                <motion.div 
                                    variants={childContainerVariants}
                                    className="w-full h-20 px-6.5 flex gap-4 text-xl items-center ">
                                    <ListVideo strokeWidth={1} size={25} /><p className="mb-0.5">Home</p> 
                                </motion.div>
                                <motion.div 
                                    variants={childContainerVariants}
                                    className="w-full h-20 px-6.5 flex gap-4 text-xl items-center ">
                                    <ListVideo strokeWidth={1} size={25} /><p className="mb-0.5">Suggest Movie or Show</p> 
                                </motion.div>
                                <motion.div 
                                    variants={childContainerVariants}
                                    className="w-full h-20 px-6.5 flex gap-4 text-xl items-center ">
                                    <FaHeart className="text-xl"/> Favourites
                                </motion.div>
                                <motion.div 
                                    variants={childContainerVariants}
                                    className="w-full h-20 px-6.5 flex gap-4 text-xl items-center ">
                                    <ThumbsUp size={25}/>My Votes
                                </motion.div>
                                <motion.div 
                                    variants={childContainerVariants}

                                    className="w-full h-20 px-6.5 flex gap-4 text-xl items-center ">
                                    <ListMusic size={25}/> My Playlists
                                </motion.div>
                                <motion.div 
                                    variants={childContainerVariants}                         
                                    className="w-full h-20 px-6.5 flex gap-4 text-xl items-center">
                                     <ListVideo strokeWidth={1} size={25} /><p className="mb-0.5">My Suggestions</p> 
                                </motion.div>
                                <motion.div 
                                    variants={childContainerVariants}
                                    className="w-full h-20 px-2 flex gap-4 text-xl items-center  font-bold">
                                     <button className="bg-green-600 rounded-xs flex gap-3 px-4.5 py-3 w-full">
                                         <LogOut size={25}/>Log Out 
                                     </button>
                                </motion.div>
                        </motion.div>
                    )
                }
                
            </AnimatePresence>

        </>
    )
}