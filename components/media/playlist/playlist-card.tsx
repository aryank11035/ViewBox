'use client'

import { Trash2 } from "lucide-react";
import { motion } from "framer-motion"
import { Eye } from 'lucide-react';
export default function PlaylistCard({playlist} : any){
    console.log(playlist)
    const date = new Date(playlist.created_at).toLocaleDateString().split('T')[0]

    return (
        <motion.div 
            
            className="h-65 w-full max-w-[486px]   rounded-xs flex "
            initial = {{opacity : 0 , scale : 0.9 }}
            animate = {{opacity : 1 , scale : 1}}
            transition={{
                duration: 0.3,
                ease: [0, 0.71, 0.2, 1.01],
            }}
        >
            <div className="relative w-full h-full flex justify-between">
                <div className="h-40 w-25 md:w-30 md:h-50  z-10  absolute left-2 ">
                    
                    <img
                        src='https://image.tmdb.org/t/p/w500/yvirUYrva23IudARHn3mMGVxWqM.jpg'
                        
                        className="w-full h-full rounded-xs flex-2 shadow-2xl shadow-black/50 object-cover"
                    />
                </div>  



                <div className=" h-40 w-25 md:w-30 md:h-50  z-30  absolute left-25 hidden 420:block 420:left-15 lg:left-20 760:hidden 1435:block">
                    
                    <img
                        src='https://image.tmdb.org/t/p/w500/bL1mwXDnH5fCxqc4S2n40hoVyoe.jpg'
                        
                        className="w-full h-full rounded-xs flex-2 shadow-2xl shadow-black/50 object-cover"
                    />
                </div>


                <div className="h-40 w-25 z-30 md:w-30 md:h-50  absolute right-45 hidden 370:block 370:right-32 420:right-35 760:right-40 1020:right-30 1435:right-50">
                    
                    <img
                        src='https://image.tmdb.org/t/p/w500/xR0IhVBjbNU34b8erhJCgRbjXo3.jpg    '
                        
                        className="w-full h-full rounded-xs flex-2 shadow-2xl shadow-black/50 object-cover"
                    />
                </div>


                <div className="h-40 w-25 z-30 md:w-30 md:h-50  absolute right-20 370:right-15 420:right-18 760:right-22 1020:right-15 1435:right-25">
                    
                    <img    
                        src='https://image.tmdb.org/t/p/w500/wvWRCDR0wScmrJVAh2iipBSxkZw.jpg'
                        
                        className="w-full h-full rounded-xs flex-2 shadow-2xl shadow-black/50 object-cover"
                    />
                </div>


                <div className="h-40 w-25 z-30 md:w-30 md:h-50  absolute right-2 ">
                    
                    <img
                        src='https://image.tmdb.org/t/p/w500/mBcu8d6x6zB1el3MPNl7cZQEQ31.jpg'
                        
                        className="w-full h-full rounded-xs flex-2 shadow-2xl shadow-black/50 object-cover"
                    />
                </div>

                <div className="absolute w-full bg-white/20 h-15 z-40 bottom-10">

                </div>
                <motion.div 
                    style={{
                        backdropFilter : 'blur(20px)',
                        backgroundColor: "rgba(255,255,255,0.1)"
                    }}
                    className="w-full   z-50 bottom-0 absolute rounded-xs border border-[rgba(255,255,255,0.1)]  p-4 px-4.5 cursor-pointer hover:scale-101 duration-200">
                    <div className="flex w-full justify-between">
                        <h1>{playlist.playlist_name}</h1>
                        <div className="hover:text-red-600 cursor-pointer">
                            <Trash2 strokeWidth={0.9} />
                        </div>
                    </div>
                    <div className="w-full text-sm font-medium text-white/50 flex gap-3">
                        <p className="tracking-tight">{`${playlist.movies.length} movies`}</p> 
                        <p className="text-green-600 flex items-center gap-1"><Eye size={17} /><span className="">{playlist.playlist_type}</span></p>
                    </div>
                    <p className="text-sm font-medium text-white/50 truncate">{playlist.description}</p>
                    <p className="text-xs font-light text-white/30">Created on {date}</p>
                </motion.div>
            </div>
        </motion.div>
    )
}