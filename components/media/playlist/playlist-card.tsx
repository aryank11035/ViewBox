'use client'

import { Check, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion"
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import { useState } from "react";
import DeletePlaylist from "./delete-playlist-popup";
import { Button } from "@/components/ui/button";
export default function PlaylistCard({playlist , handleDeletePlaylist } : any){
    
    const date = new Date(playlist.created_at).toLocaleDateString().split('T')[0]
    const playlistMovies = playlist.movies.slice(0,5)
    const remainingMovies = playlist.movies.slice(5)
    const [deletePlaylistMssg , setDeletePlaylistMssg] = useState<boolean>(false)

    const handleDeleteMessage = (bool : boolean) => {
        setDeletePlaylistMssg(bool)
    }

    const deletePlaylist = () => {
        handleDeletePlaylist(playlist._id)
        // console.log('playlist deleted')
    }


    const containerVariants = {
        hidden : { opacity : 0 , scale : 0.9 },
        visible : {
            opacity : 1 ,
            scale : 1 , 
            transition : {
                duration: 0.3,
                ease: [0, 0.71, 0.2, 1.01],
                staggerChildren : 0.3,
                delayChildren: 0.1
            }
        }
    } as any

    const childContainerVariants = {
        hidden : { opacity : 1 , y : 30 },
        visible : {
            opacity : 1,
            y : 0,
            transition : {
                type : "spring",
                            stiffness : 600,
                            damping : 20
            }
        }
    } as any

    return (
        <>

        <motion.div 
            
            className="h-65 w-full max-w-[486px]   rounded-xs flex "
            variants={containerVariants}
            initial = 'hidden'
            animate = 'visible'
        >

            {/* the images card section */}
            <motion.div className="relative w-full h-full flex justify-between">
                    {
                        playlistMovies[0] && (
                            <motion.div 
                                variants={childContainerVariants} 
   
                                className="h-40 w-25 
                                md:w-30 md:h-50 z-10  absolute left-2  rounded-xs bg-[#111111] translate-y-6 1435:translate-y-8"
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${playlistMovies[0].img}.jpg`}
                                    
                                    className="w-full h-full rounded-xs flex-2 shadow-2xl shadow-black/50 object-cover"
                                    />
                            </motion.div>  
                        )
                    }



                    {
                        playlistMovies[1] && (
                            <motion.div 
                                variants={childContainerVariants} 

                                className=" h-40 w-25 md:w-30 md:h-50  z-30  absolute left-20 1435:left-18 rounded-xs bg-[#111111] translate-y-4 1435:translate-6">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${playlistMovies[1].img}.jpg`}
                                    
                                    className="w-full h-full rounded-xs flex-2 shadow-2xl shadow-black/50 object-cover"
                                    />
                            </motion.div>
                        )
                    }


                    {
                        playlistMovies[2] && (
                            <motion.div 
                                variants={childContainerVariants} 

                                className="h-40 w-25 z-30 md:w-30 md:h-50  absolute right-2  370:right-20 370:translate-y-2 420:right-25 760:right-20 1020:right-15 1435:left-42 1435:translate-4 rounded-xs bg-[#111111]">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${playlistMovies[2].img}.jpg`}
                                    
                                    className="w-full h-full rounded-xs flex-2 shadow-2xl shadow-black/50 object-cover"
                                />
                            </motion.div>
                        )
                    }


                    {
                        playlistMovies[3] && (
                            <motion.div 
                                variants={childContainerVariants} 

                                className="h-40 w-25 z-30 md:w-30 md:h-50  absolute hidden 370:block right-2 1435:right-27 1435:translate-2 rounded-xs bg-[#111111]">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${playlistMovies[3].img}.jpg`}
                                
                                className="w-full h-full rounded-xs flex-2 shadow-2xl shadow-black/50 object-cover"
                                />
                            </motion.div>
                        )
                    }


                    {
                        playlistMovies[4] && (
                            <motion.div 
                                variants={childContainerVariants} 

                                className="h-40 w-25 z-30 md:w-30 md:h-50  absolute hidden 1435:block right-2 rounded-xs bg-[#111111]  ">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${playlistMovies[4].img}.jpg`}
                                    
                                    className="w-full h-full rounded-xs flex-2 shadow-2xl shadow-black/50 object-cover"
                                />
                            </motion.div>      
                        )
                    }
                    {
                        remainingMovies.length > 0 && (
                            

                                remainingMovies.map((movies : any,index : any) => (
                                    <motion.div 
                                        variants={childContainerVariants} 

                                        className="h-40 w-25  md:w-30 md:h-50  absolute hidden " key={index}>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${movies.img}.jpg`}
                                            
                                            className="w-full h-full rounded-xs flex-2 shadow-2xl shadow-black/50 object-cover"
                                        />
                                    </motion.div>  
                                ))
                            
                        )
                        
                    }

        
                <motion.div     
                    style={{
                       backdropFilter : 'blur(40px)'
                    }}
                    className="w-full h-fit z-50 bottom-0 absolute rounded-xs border border-[rgba(255,255,255,0.1)]  p-4 px-4.5 cursor-pointer hover:scale-101 duration-200 ">
                    <div className="flex w-full justify-between">
                        <h1>{playlist.playlist_name}</h1>
                        <div className="hover:text-red-600 cursor-pointer" onClick={() => handleDeleteMessage(true)}>
                            <Trash2 strokeWidth={0.9} />
                        </div>
                    </div>
                    <div className="w-full h-full  ">
                        <AnimatePresence mode="wait" propagate>
                        {
                            deletePlaylistMssg ? (
                                <DeletePlaylist playlist_name={playlist.playlist_name} handleDeleteMessage={handleDeleteMessage} deletePlaylist={deletePlaylist}/>
                                
                            ) : (
                                <>
                                    <motion.div 
                                        initial={{opacity : 0 , translateY : -5}}
                                        animate = {{opacity : 1, translateY : 0}}
                                        exit={{opacity : 0 , translateY : 5}}
                                        transition={{
                                            duration: 0.4,
                                            ease: 'easeInOut'
                                        }}
                                    >
                                        <div className="w-full text-sm font-medium text-white/50 flex gap-3 ">
                                            <p className="tracking-tight">{`${playlist.movies.length} movies`}</p> 
                                            {
                                                playlist.playlist_type === 'public' ? (
                                                    <p className="text-green-600 flex items-center gap-1"><Eye size={17} /><span className="">Public</span></p>
                                                ) : (
                                                    <p className="text-rose-500 flex items-center gap-1"><EyeOff size={17} /><span className="">Private</span></p>
                                                )
                                            }
                                            
                                        </div>
                                        <p className="text-sm font-medium text-white/50 truncate">{playlist.description ? playlist.description : 'no description'}</p>
                                        <p className="text-xs font-light text-white/30">Created on {date}</p>
                                    </motion.div>
                                </>
                            )
                        }
                        </AnimatePresence>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
        </>
    )
}