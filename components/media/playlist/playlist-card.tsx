'use client'

import { Check, ChevronLeft, ChevronRight, Delete, Share2, Trash2, X } from "lucide-react";
import { AnimatePresence, hover, motion } from "framer-motion"
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import { useState } from "react";
import DeletePlaylist from "./delete-playlist-popup";
import PopupWrapper from "@/components/popup-wrapper"
import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur";
import { Pen } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface PlaylistCardProps {
    playlist : any 
    handleDeletePlaylist: (playlistId : string  ) => void 
}





export default function PlaylistCard({playlist , handleDeletePlaylist } : PlaylistCardProps){
    
    const date = new Date(playlist.created_at).toLocaleDateString().split('T')[0]
    const playlistMovies = playlist.movies.slice(0,5)
    const remainingMovies = playlist.movies.slice(5)
    const [deletePlaylistMssg , setDeletePlaylistMssg] = useState<boolean>(false)
    
    const [current,setCurrent] = useState<any  | null>(null)

    const handleDeleteMessage = (bool : boolean) => {
        setDeletePlaylistMssg(bool)
    }

    const deletePlaylist = () => {
        handleDeletePlaylist(playlist._id)
        setCurrent(null)
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

                                className="h-40 w-25 z-30 md:w-30 md:h-50  absolute right-2  370:right-20 370:translate-y-2 420:right-25 760:right-20 1020:right-15 1435:left-36 1435:translate-4 rounded-xs bg-[#111111]">
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

        
                                <div className="absolute inset-0 z-40 cursor-pointer" onClick={() => setCurrent(playlist)}>
            
                                </div>
                <motion.div     
                    style={{
                       backdropFilter : 'blur(40px)'
                    }}
                    className="w-full h-fit z-50 bottom-0 absolute rounded-xs border border-[rgba(255,255,255,0.1)]  p-4 px-4.5 cursor-pointer hover:scale-101 duration-200 ">
                    <div className="flex w-full justify-between ">
                        <h1 className="overflow-hidden text-ellipsis ">{playlist.playlist_name}</h1>
                        <div className="hover:text-red-600 cursor-pointer " onClick={() => handleDeleteMessage(true)}>
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
                   
        <PlayListPopUp setCurrent={setCurrent} current={current}/>
        </>
    )
}




const containerVariants = {
    hidden : {
        
        transition: {
            duration: 0.3,
            staggerChildren : 0.08,
            ease: [0.4, 0, 0.2, 1] ,
            when : 'afterChildren'
        }
    }, 
    visible : {
        opacity : 1 ,
        transition: {
            duration: 0.3,
            staggerChildren: 0.08,
            when: "beforeChildren",
            ease: [0.4, 0, 0.2, 1] 
        }
    }
} as any

//for mediasection 
const mediaSectionVariants = {
    hidden : {
        y : '-100%' ,
        opacity: 0,
        transition : {
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1] 
        }
    } ,
    visible : {
        y : 0 ,
        opacity: 1,
        transition : {
            duration: 0.4,
            delay: 0.5, // Appears after container
            ease: [0.4, 0, 0.2, 1] 
        }
    }
} as any

//for extra buttons in x translate
const extraButtonsSectionVariants = {
    hidden : {
        x : '-100%' ,
        transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1] 
        },
    } ,
    visible : {
        x : -62 ,
        transition: {
            duration: 0.5,
            delay: 0.5, // Appears after container
            ease: [0.4, 0, 0.2, 1] 
        },
    },
    hovered : {
        x : 0 ,
        transition: {
            duration: 0.2,
            ease: [0.4, 0, 0.2, 1] 
        },
    }
} as any

const YesAndNoButtonVaraiants = {
    hidden : {
        x : '100%' ,
        transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1] 
        },
    } ,
    visible : {
        x : 0 ,
        transition: {
            duration: 0.5,
            delay: 0.5, // Appears after container
            ease: [0.4, 0, 0.2, 1] 
        },
    },
    hovered : {
        x : 0 ,
        transition: {
            duration: 0.2,
            ease: [0.4, 0, 0.2, 1] 
        },
    }
} as any


const closeButtonVariant = {
    hidden : {
        rotate : 180 , 
        transition : {
            duration : 0.2,
        }
    },
    visible : {
        rotate : 0 , 
        transition : {
            duration : 0.2,
            delay: 0.4
        }
    }
}



interface PlayListPopUpProps {
  current: any | null;
  setCurrent: (value: any | null) => void;
}

export const PlayListPopUp = ({ current , setCurrent }: PlayListPopUpProps) => {
   

    const date = new Date(current?.created_at).toLocaleDateString().split('T')[0]

    const [onHover,setOnHover] = useState<any|null>(null)
    const [clicked,setClicked] = useState<any|null>(null)
    const [clickedButton,setClickedButton] = useState<string>('')


    const [nextStage,setNextStage] = useState<string | null>(null)

    const handleClick = (str : string) => {
        if (clickedButton === str) {
            setClickedButton('')
            setClicked(null)
        } else {
            setClickedButton(str)
        }
    }


    const closePopUp = () => {
        setCurrent(null)
        setClicked(null )
        setClickedButton('')
    }

    return (
        <PopupWrapper isOpen={!!current} onClose={() => closePopUp()}>
            <div className="w-2xl  flex flex-col ">


                {/* OTUSIDE BORDER OF THIS BOX */}
                <motion.div 
                    initial='hidden'
                    animate='visible'
                    exit='hidden'
                    variants={containerVariants}
                    className="w-full h-fit flex flex-row gap-2 bg-[#111111] p-4 border border-[rgba(255,255,255,0.1)]  rounded-xs z-300 " 
                >
                    <div className=" rounded-xs w-full h-72 flex flex-col gap-2  z-100">
                        <div className="flex gap-2 justify-between">
                            <h1 className="min-w-0 break-words text-3xl font-bold">
                                {current?.playlist_name}
                              
                            </h1>
                            {/* <Input className='w-full h-10 rounded-xs border border-[rgba(255,255,255,0.1)]'/> */}
                            <div className="flex gap-2 ">
                                <div className=" w-fit h-fit rounded-xs text-white/50 bg-neutral-800 cursor-pointer" onClick={() => closePopUp()}>
                                    <motion.div 
                                        initial='hidden'
                                        animate='visible'
                                        exit='hidden'
                                        variants={closeButtonVariant}
                                        className="w-fit h-fit">
                                        <X strokeWidth={1.1} size={28} />
                                    </motion.div>
                                </div>
                                
                            </div>
                        </div>
                        <p className="overflow-hidden text-ellipsis text-base text-neutral-500 h-full  overflow-y-auto bg-black/40 px-1 rounded-xs z-50">
                            {current?.description ? current.description : 'no description'}
                        </p>
                        <div className="flex flex-col h-fit w-fit gap-2     ">
                            <div className="w-fit text-sm font-medium text-white/50 flex gap-3 ">
                                <p className="tracking-tight">{`${current?.movies?.length} movies`}</p> 
                                {
                                    current?.playlist_type === 'public' ? (
                                        <p className="text-green-600 flex items-center gap-1"><Eye size={17} /><span className="">Public</span></p>
                                    ) : (
                                        <p className="text-rose-500 flex items-center gap-1"><EyeOff size={17} /><span className="">Private</span></p>
                                    )
                                }
                                
                            </div>
                            <p className="text-xs font-light text-white/30">Created on {date}</p>
                        </div>
                    </div>

                    {/* this box  */}
                </motion.div>

                            <motion.div
                                initial='hidden'
                                animate={clickedButton === 'edit' || clickedButton === 'delete' ? 'visible' : ' '}
                                exit='hidden'
                                variants={YesAndNoButtonVaraiants}
                                className="absolute -left-8 bottom-1/2 bg-black/40 backdrop-blur-3xl p-2 border-t border-l border-b border-[rgba(255,255,255,0.1)] rounded-l-xs flex flex-col gap-2 text-sm"
                            >
                                <button className="bg-green-600 text-white rounded-xs p-1 flex gap-1 items-center">
                                    <Check strokeWidth={1.1} size={16} /> Save
                                </button>
                                <button className="bg-red-600 text-white rounded-xs p-1 gap-1 flex items-center">
                                    <X strokeWidth={1.1} size={16}/> Cancel
                                </button>
                            </motion.div>

                                {/* this is extra button section  */}
                            <motion.div 
                                onMouseEnter={() => setOnHover(current)}
                                onMouseLeave={() => setOnHover(null)}
                                //when it outside this any div it shoold set setHOver(false)
                                initial='hidden'
                                animate={onHover || clicked  ? 'hovered' : 'visible'}
                                exit='hidden'
                                variants={extraButtonsSectionVariants}
                                className=" rounded-xs  flex flex-col   absolute  bottom-1/2 -right-24 bg-black/40 backdrop-blur-3xl  border-t border-r border-b border-[rgba(255,255,255,0.1)] rounded-r-xs  text-left text-neutral-500" 
                            >
                                <button 
                                    className="px-2 text-sm py-2  text-center flex gap-2 items-center cursor-pointer justify-between hover:text-green-600 duration-200" 
                                    onClick={() => {
                                        setClicked(current)
                                        handleClick('edit')
                                    }} 
                                    style = {{color : clickedButton === 'edit' ?'#16A34A' : '#737373'}}>
                                Edit  <Pen strokeWidth={1.1} size={16} className=""/>
                                </button>
                                <div className="border-t w-full border-[rgba(255,255,255,0.1)]"></div>
                                <button 
                                    className="px-2 text-sm py-2 text-center  flex gap-2 items-center cursor-pointer justify-between hover:text-indigo-600 duration-200"  
                                    onClick={() => {
                                        setClicked(current)
                                        handleClick('share')
                                    }}
                                     style = {{color : clickedButton === 'share' ?'#9333EA' : '#737373'}}    
                                >

                                    Share <Share2 strokeWidth={1.1} size={16} className="" />
                                </button>
                                <div className="border-t w-full border-[rgba(255,255,255,0.1)]"></div>
                                <button 
                                    className="px-2 text-sm py-2 text-center  flex gap-2 items-center justify-between cursor-pointer hover:text-rose-600 duration-200"  
                                    onClick={() =>{ 
                                        setClicked(current)
                                        handleClick('delete')
                                    }}
                                     style = {{color : clickedButton === 'delete' ?'#E11D48' : '#737373'}}
                                >
                                    Delete <Trash2 strokeWidth={1.1} size={16} className="" />
                                </button>
                            </motion.div> 
                <div className="w-full mx-auto z-10 ">

                    {/* this media cards section */}
                    <motion.div 
                        initial='hidden'
                        animate='visible'
                        exit='hidden'
                        variants={mediaSectionVariants}
                        className="w-xl h-72 bg-black/40 backdrop-blur-3xl overflow-y-auto rounded-b-xs grid grid-cols-3 p-2 gap-2  mx-auto  border-l border-r border-b border-[rgba(255,255,255,0.1)] relative "
                    >
                        {
                            current?.movies.map((movie :  any) => (
                                <div className="w-full aspect-auto roudned-xs relative" key={movie.id}>
                                
                                    <img 
                                        src={ `https://image.tmdb.org/t/p/w500${movie.img}`} className="w-full h-full rounded-xs cursor-pointer"
                                    />
                                    <ProgressiveBlur 
                                        className="pointer-events-none absolute bottom-0 left-0 h-[40%] w-full rounded-xs z-30"
                                        blurIntensity={3}
                                    />
                                    <div className="w-full absolute bottom-0 z-40 px-2 py-1">
                                        <h1  
                                            className=" 760:text-sm 1020:text-base text-xs font-bold text-left">
                                                {movie.name}
                                        </h1>
                                    </div>
                                </div>
                            ))
                        }
                    </motion.div> 
                    
                </div>
            </div>
        </PopupWrapper>
    );
};