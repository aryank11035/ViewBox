'use client'

import { Check, Trash2, X  } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion"
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import { useEffect, useState } from "react";
import DeletePlaylist from "./delete-playlist-popup";
import PopupWrapper from "@/components/popup-wrapper"
import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur";
import { Pen } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { closeButtonVariant, containerVariants, extraButtonsSectionMobileVariants, extraButtonsSectionVariants, mediaSectionVariants, YesAndNoButtonMobileVaraiants, YesAndNoButtonVaraiants } from "./playlist-card/animation-variants";
import { editPlaylist } from "@/app/actions/playlist";
import Link from "next/link";

interface PlaylistCardProps {
    playlist : any 
    handleDeletePlaylist: (playlistId : string  ) => void 
    handleUpdatedPlaylist : (updatedPlaylist : any) =>  void 
}





export default function PlaylistCard({playlist , handleDeletePlaylist , handleUpdatedPlaylist} : PlaylistCardProps){
    
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
                                    alt={`https://image.tmdb.org/t/p/w50`}    
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
                                    alt={`https://image.tmdb.org/t/p/w50`}
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
                                    alt={`https://image.tmdb.org/t/p/w50`}
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
                                alt={`https://image.tmdb.org/t/p/w50`}
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
                                    alt={`https://image.tmdb.org/t/p/w50`}
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
                                            alt={`https://image.tmdb.org/t/p/w50`}
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
                   
        <PlayListPopUp setCurrent={setCurrent} current={current} handleUpdatedPlaylist={handleUpdatedPlaylist} handleDeletePlaylist={handleDeletePlaylist}/>
        </>
    )
}






interface PlayListPopUpProps {
    current: any | null;
    setCurrent: (value: any | null) => void;
    handleUpdatedPlaylist : (updatedPlaylist : any) => void    
    handleDeletePlaylist: (playlistId : string  ) => void 
}

export const PlayListPopUp = ({ current , setCurrent , handleUpdatedPlaylist , handleDeletePlaylist}: PlayListPopUpProps) => {
   

    const date = new Date(current?.created_at).toLocaleDateString().split('T')[0]

    const [onHover,setOnHover] = useState<any|null>(null)
    const [clicked,setClicked] = useState<any|null>(null)
    const [clickedButton,setClickedButton] = useState<string>('')

    const [selectedCards,setSelectedCards] = useState<Set<string>>(new Set())
    const [currentDescription,setCurrentDescription] = useState("no description");
    const [currentName , setCurrentName] = useState('')
    const [currentType,setCurrentType] = useState('')

    useEffect(() => {
        if (current?.description) {
            setCurrentDescription(current.description);
        }
        if(current?.playlist_name){
            setCurrentName(current.playlist_name)
        }
        if(current?.playlist_type) {{
            setCurrentType(current.playlist_type)
        }}
    }, [current]);

    const handleSelectedcards = (id : string) => {
        setSelectedCards(
            prev => {
                const updated = new Set(prev)
                if(updated.has(id)) {
                    updated.delete(id)
                } else{
                    updated.add(id)
                }
                return updated
            }
        ) 
    } 


    const updatePlaylist = async (id : string) => {
        const playlist  = {
            playlist_name : currentName ,
            playlist_type : currentType ,
            description : currentDescription
        }
        const cards = Array.from(selectedCards)
        const res = await editPlaylist(id , playlist ,cards)
        if(res.success) {
            setCurrent(res.updated)
            setClickedButton('')
            defaultCurrent()

            if(handleUpdatedPlaylist) {
                handleUpdatedPlaylist(res.updated)
            } 
        }

        return playlist 
    } 

    const defaultCurrent = () => {
        setSelectedCards(new Set())
        setCurrentName(current?.playlist_name || '');
        setCurrentDescription(current?.description || 'no description');
        setCurrentType(current?.playlist_type || 'private');
    }

    const handleClick = (str : string) => {
        if (clickedButton === str) {
            setClickedButton('')
            setClicked(null)
            defaultCurrent()
        } else {
            setClickedButton(str)
        }
    }

    const cancelSelected = () => {
        setClickedButton('')
        defaultCurrent()
    }


    const closePopUp = () => {
        setCurrent(null)
        setClicked(null )
        setClickedButton('')
        setSelectedCards(new Set())
        
    }

    return (
        <PopupWrapper isOpen={!!current} onClose={() => closePopUp()}>

            {/* <div className="flex 800:hidden bg-blue-100 h-170 w-[290px] 370:w-[350px] 420:w-[400px] 760:w-2xl rounded-xs flex-col">
                <div className="w-full flex-1 bg-blue-200 rounded-xs">

                </div>
                <div className="w-full  bg-blue-300 h-full p-2 flex-1">
                    <div className="w-full h-full bg-blue-400">

                    </div>
                </div>
            </div> */}

            <div className="w-[290px] 370:w-[350px] 420:w-[400px] 760:w-2xl flex-col flex relative">


                {/* OTUSIDE BORDER OF THIS BOX */}
                <motion.div 
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                    variants={containerVariants}
                    className="w-full h-fit flex flex-row gap-2 bg-[#111111] p-4 border border-[rgba(255,255,255,0.1)]  rounded-xs z-300 " 
                >
                    <div className=" rounded-xs w-full h-72 flex flex-col   z-100">
                        <div className="flex gap-2 justify-between">
                           
                            <NameComp currentName={currentName} setCurrentName={setCurrentName} clickedButton={clickedButton}/>

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
                       
                        <DescriptionComp clickedButton={clickedButton} setCurrentDescription={setCurrentDescription} currentDescription={currentDescription} />
                     
                        <div className="flex flex-col h-fit w-fit gap-2  mt-2">
                            <div className="w-fit text-sm font-medium text-white/50 flex gap-3 ">
                                <p className="tracking-tight">{`${current?.movies?.length} movies`}</p> 
                              
                                <TypeComp clickedButton={clickedButton} currentType={currentType} setCurrentType={setCurrentType} />
                            </div>
                            <p className="text-xs font-light text-white/30">Created on {date}</p>
                        </div>
                    </div>

                    {/* this box  */}
                </motion.div>

                            <YesAndButtons clickedButton={clickedButton} cancelSelected={cancelSelected} updatePlaylist={updatePlaylist} id={current?._id} handleDeletePlaylist={handleDeletePlaylist} closePopUp={closePopUp}/>
                                {/* this is extra button section  */}
                             <motion.div 
                                onMouseEnter={() => setOnHover(current)}
                                onMouseLeave={() => setOnHover(null)}
                                initial='hidden'
                                animate='visible'
                                exit='hidden'
                                variants={extraButtonsSectionMobileVariants}
                                className=" rounded-xs flex 800:hidden flex-row   absolute  -top-8 right-4 bg-black/40 backdrop-blur-3xl  border-t border-r border-l border-[rgba(255,255,255,0.1)] rounded-r-xs  text-left text-neutral-500 " 
                            >
                                <button 
                                    className="px-3 text-sm py-2  text-center flex gap-2 items-center cursor-pointer justify-between hover:text-green-600 duration-200" 
                                    onClick={() => {
                                        setClicked(current)
                                        handleClick('edit')
                                        defaultCurrent()
                                    }} 
                                    style = {{color : clickedButton === 'edit' ?'#16A34A' : '#737373'}}>
                              <Pen strokeWidth={1.1} size={16} className=""/>
                                </button>
                                
                                <div className="border-l w-full border-[rgba(255,255,255,0.1)]"></div>
                                <button 
                                    className="px-3 text-sm py-2 text-center  flex gap-2 items-center justify-between cursor-pointer hover:text-rose-600 duration-200"  
                                    onClick={() =>{ 
                                        setClicked(current)
                                        handleClick('delete')
                                        setCurrentDescription('Do you want to delete the playlist ')
                                    }}
                                     style = {{color : clickedButton === 'delete' ?'#E11D48' : '#737373'}}
                                >
                                    <Trash2 strokeWidth={1.1} size={16} className="" />
                                </button>
                            </motion.div> 


                            <motion.div 
                                onMouseEnter={() => setOnHover(current)}
                                onMouseLeave={() => setOnHover(null)}
                                //when it outside this any div it shoold set setHOver(false)
                                initial='hidden'
                                animate={onHover || clicked  ? 'hovered' : 'visible'}
                                exit='hidden'
                                variants={extraButtonsSectionVariants}
                                className=" rounded-xs hidden 800:flex flex-col   absolute  bottom-1/2 -right-24 bg-black/40 backdrop-blur-3xl  border-t border-r border-b border-[rgba(255,255,255,0.1)] rounded-r-xs  text-left text-neutral-500 " 
                            >
                                <button 
                                    className="px-2 text-sm py-2  text-center flex gap-2 items-center cursor-pointer justify-between hover:text-green-600 duration-200" 
                                    onClick={() => {
                                        setClicked(current)
                                        handleClick('edit')
                                        defaultCurrent()
                                    }} 
                                    style = {{color : clickedButton === 'edit' ?'#16A34A' : '#737373'}}>
                                Edit  <Pen strokeWidth={1.1} size={16} className=""/>
                                </button>
                                {/* <div className="border-t w-full border-[rgba(255,255,255,0.1)]"></div>
                                <button 
                                    className="px-2 text-sm py-2 text-center  flex gap-2 items-center cursor-pointer justify-between hover:text-indigo-600 duration-200"  
                                    onClick={() => {
                                        setClicked(current)
                                        handleClick('share')
                                        defaultCurrent()
                                    }}
                                     style = {{color : clickedButton === 'share' ?'#9333EA' : '#737373'}}    
                                >

                                    Share <Share2 strokeWidth={1.1} size={16} className="" />
                                </button> */}
                                <div className="border-t w-full border-[rgba(255,255,255,0.1)]"></div>
                                <button 
                                    className="px-2 text-sm py-2 text-center  flex gap-2 items-center justify-between cursor-pointer hover:text-rose-600 duration-200"  
                                    onClick={() =>{ 
                                        setClicked(current)
                                        handleClick('delete')
                                        setCurrentDescription('Do you want to delete the playlist?')
                                    }}
                                     style = {{color : clickedButton === 'delete' ?'#E11D48' : '#737373'}}
                                >
                                    Delete <Trash2 strokeWidth={1.1} size={16} className="" />
                                </button>
                            </motion.div> 
                <div className="w-full mx-auto z-10 px-2 760:px-0">

                       
                    {/* this media cards section */}
                    <motion.div 
                        initial='hidden'
                        animate='visible'
                        exit='hidden'
                        variants={mediaSectionVariants}
                        className=" w-full h-full 760:w-xl 760:h-72 bg-black/40 backdrop-blur-3xl   mx-auto  border-l border-r border-b border-[rgba(255,255,255,0.1)] relative "
                    >
                        {
                            current?.movies.length === 0 ? 
                                (
                                    <div className="w-full h-full flex items-center justify-center flex-col gap-2 text-center p-2">
                                        <h1>This Playlist is empty</h1>
                                        <p className="text-sm text-neutral-700">Add Movies or Shows to playlist by clicking {`${ `&apos;`}Add to Playlist${ `&apos;`}`} </p>
                                        <Link href='/home' className="text-sm bg-green-600 hover:bg-white hover:text-green-600 duration-200 active:scale-98 p-2 rounded-xs cursor-pointer">
                                            Browse Movies or Shows
                                        </Link>
                                    </div>
                                ) 
                                    : 
                                (
                                    <div className="w-full h-72 760:h-full overflow-y-auto rounded-b-xs grid grid-cols-2 760:grid-cols-3 p-2 gap-2">
                                        {
                                             current?.movies.map((movie :  any) => (
                                                <div className="w-full aspect-auto roudned-xs relative" key={movie.id}>
                                                    
                                                    <DeleteCard isSelected={selectedCards.has(movie._id)} handleSelectedcards={handleSelectedcards} media_id={movie._id} clickedButton={clickedButton}/>
                                                
                                                    <img 
                                                        src={ `https://image.tmdb.org/t/p/w500${movie.img}`} className="w-full h-full rounded-xs cursor-pointer" alt={`https://image.tmdb.org/t/p/w50`}
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
                                    </div>
                                )
                        }

                    </motion.div> 
                    
                </div>
            </div>
        </PopupWrapper>
    );
};


interface YesAndNoButtonsProps  {
    clickedButton : string ,
    cancelSelected : () => void ,
    updatePlaylist : (id : string) =>  void ,
    id :string 
    handleDeletePlaylist: (playlistId : string  ) => void 
    closePopUp : () => void 
}

const YesAndButtons = ({clickedButton , cancelSelected , updatePlaylist , id ,handleDeletePlaylist ,closePopUp} : YesAndNoButtonsProps) => {
    const [onHover , setOnHover] = useState<boolean>(false)


    const handleAction = () => {
        if(clickedButton === 'edit'){
            updatePlaylist(id) 
        } else if(clickedButton === 'delete') {
            handleDeletePlaylist(id) 
            closePopUp() 
        }
        setOnHover(false)
    }

    return (
        <>
        <motion.div
            initial='hidden'
            animate={
                (clickedButton === 'edit' || clickedButton === 'delete') ? 'visible' : 'hidden'
            }
            onMouseEnter={() => setOnHover(true)}
            onMouseLeave={() => setOnHover(false)}
            exit='hidden'
            variants={YesAndNoButtonMobileVaraiants}
            className="absolute left-4 -top-8  bg-black/40 backdrop-blur-3xl p-1.5 mb-2 border-t border-l border-r border-[rgba(255,255,255,0.1)] rounded-l-xs flex 800:hidden flex-row gap-1.5 text-sm "
        >
            <button className="bg-green-600 text-white rounded-xs p-1 flex gap-1 items-center active:scale-98 hover:bg-green-700 duration-100 cursor-pointer " 
                onClick={() =>{
                    handleAction()
                    setOnHover(false)
                }}
            >
                <Check strokeWidth={1.1} size={16} /> {clickedButton !== 'delete' ? 'Save' : 'Yes'}
            </button>
            <button className="bg-red-600 text-white rounded-xs p-1 gap-1 flex items-center active:scale-98 hover:bg-red-700 duration-100 cursor-pointer"
                 onClick={() =>{ 
                    cancelSelected()
                    setOnHover(false)
                }}>
                <X strokeWidth={1.1} size={16}/> {clickedButton !== 'delete' ? 'Cancel' : 'No'}
            </button>
        </motion.div>
        
        <motion.div
            initial='hidden'
            animate={
                onHover ? 
                    clickedButton === 'edit' ? 'editHovered' : 'deleteHovered'  
                    :
               (clickedButton === 'edit' || clickedButton === 'delete') ? 'visible' : 'hidden'
            }
            onMouseEnter={() => setOnHover(true)}
            onMouseLeave={() => setOnHover(false)}
            exit='hidden'
            variants={YesAndNoButtonVaraiants}
            className="absolute -left-8 bottom-1/2 bg-black/40 backdrop-blur-3xl p-2 border-t border-l border-b border-[rgba(255,255,255,0.1)] rounded-l-xs hidden 800:flex flex-col gap-2 text-sm "
        >
            <button className="bg-green-600 text-white rounded-xs p-1 flex gap-1 items-center active:scale-98 hover:bg-green-700 duration-100 cursor-pointer" 
                onClick={() =>{
                    handleAction()
                    setOnHover(false)
                }}
            >
                <Check strokeWidth={1.1} size={16} /> {clickedButton !== 'delete' ? 'Save' : 'Yes'}
            </button>
            <button className="bg-red-600 text-white rounded-xs p-1 gap-1 flex items-center active:scale-98 hover:bg-red-700 duration-100 cursor-pointer"
                 onClick={() =>{ 
                    cancelSelected()
                    setOnHover(false)
                }}>
                <X strokeWidth={1.1} size={16}/> {clickedButton !== 'delete' ? 'Cancel' : 'No'}
            </button>
        </motion.div>
        </>
    )
}

interface DeleteCardProps{
    isSelected : boolean ,
    handleSelectedcards : ( id : string ) => void 
    media_id : string 
    clickedButton : string 
}

const DeleteCard = ({isSelected , handleSelectedcards , media_id , clickedButton} : DeleteCardProps) => {

    if(clickedButton !== 'edit') return null
    
    return (
        <motion.div 
            onClick={() => handleSelectedcards(media_id)}
            className="inset-0 absolute bg-black/30 p-1 cursor-pointer"
        >
            <motion.div
                animate={{
                    backgroundColor: isSelected ? "#dc2626" : "rgba(0,0,0,0.2)", 
                    color: isSelected ? "#fff" : "#e5e5e5",
                }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
                className="w-fit h-fit p-1 rounded-xs backdrop-blur-2xl"
            >
                <X strokeWidth={1.1} size={28}/>
            </motion.div>
        </motion.div>
    )
}


interface DescriptionCompProps {
    clickedButton  : string ,
    currentDescription : string ,
    setCurrentDescription : React.Dispatch<React.SetStateAction<string>>
}

const DescriptionComp = ({clickedButton ,  currentDescription , setCurrentDescription} : DescriptionCompProps) => {
    return clickedButton === 'edit' ? (
                 <textarea name="" id="" className="w-full rounded-xs overflow-hidden h-full text-neutral-500 bg-black/70 px-1 z-50 text-ellipsis mt-2" value={currentDescription} onChange={(e) => setCurrentDescription(e.target.value)}></textarea>
            ) : (
                <p className="overflow-hidden text-ellipsis text-base text-neutral-500 h-full  overflow-y-auto bg-black/40 px-1 rounded-xs z-50 mt-2">
                            {currentDescription}
                </p>
            )
    
}

interface NameCompProps {
    clickedButton  : string ,
    currentName : string ,
    setCurrentName : React.Dispatch<React.SetStateAction<string>>
}

const NameComp = ({clickedButton ,  currentName , setCurrentName} : NameCompProps) => {
    return clickedButton === 'edit' ? (
        <Input className='w-full h-10 rounded-xs border border-[rgba(255,255,255,0.1)] ' value={currentName} onChange={(e) => setCurrentName(e.target.value)}/> 
    ) : (
        <h1 className="min-w-0 break-words text-3xl font-bold">
            {currentName}
        </h1>
    )
}


interface TypeCompProps {
    clickedButton : string ,
    currentType : string ,
    setCurrentType : React.Dispatch<React.SetStateAction<string>>
}

const TypeComp = ({clickedButton , currentType ,setCurrentType} : TypeCompProps) => {
    return clickedButton === 'edit' ? (
        <>
             <label className="flex items-center gap-2 cursor-pointer text-neutral-300">
            <input
                type="checkbox"
                checked={currentType === "public"}
                onChange={() =>
                    setCurrentType(currentType === "public" ? "private" : "public")
                }
                className="cursor-pointer"
            />
            <span>Make this Playlist public</span>
        </label>
        </>
    ) : (
          
        currentType === 'public' ? (
            <p className="text-green-600 flex items-center gap-1"><Eye size={17} /><span className="">Public</span></p>
        ) : (
            <p className="text-rose-500 flex items-center gap-1"><EyeOff size={17} /><span className="">Private</span></p>
        )
    
    )
}