'use client'

import { ListMusic, ListVideo, LogOut, Menu, ThumbsUp, X } from "lucide-react"
import { useState } from "react"
import { AnimatePresence , motion  } from "motion/react"
import HeaderSearchBar from "./search-bar"
import { FaHeart } from "react-icons/fa"
import { Movie } from "@/schema/type"
import Link from "next/link"


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

interface HeaderSideBarProps {
    onSearch : (str : string) => void ,
    cancelSearch : () => void  , 
    medias : Movie[] | null ,
    searchString : string
}
export default function HeaderSideBar({onSearch  , cancelSearch , medias , searchString} : HeaderSideBarProps){

    const [isOpen,setIsOpen] = useState<boolean>(false)

    const closeSidebar= () => {
        cancelSearch()
        setIsOpen(false)
    }

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
                                        <HeaderSearchBar onSearch={onSearch} cancelButton={medias} searchString={searchString} cancelSearch={cancelSearch}/>
                                    </div>
                                </div>

                                {
                                    medias && (
                                        <div className="w-full px-6.5">
                                            <MediaOnSearchSiderbar cancelSearch={closeSidebar} medias={medias}/>
                                        </div>
                                    )
                                }
                            


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


interface MediaOnSearchProps {
  medias : Movie[] | null ,
  cancelSearch : () => void 
}
export const MediaOnSearchSiderbar = ({medias , cancelSearch} : MediaOnSearchProps) => {

  if(medias === null ) return null

  if(medias.length === 0) {
    return (
       <div className=" w-full border top-16 bg-[#111111]/90 text-sm rounded-xs border-[rgba(255,255,255,0.2)]  font-medium  z-10   p-1 max-h-59 overflow-y-auto ">
          <div className="flex  px-1 p-1 w-full gap-2 h-28   items-center justify-center text-base font-bold flex-col" >
              No Movies found
            <button className="w-fit bg-green-600 px-2 text-sm font-light flex gap-2 p-3 rounded-xs hover:bg-white hover:text-green-600 duration-200 cursor-pointer">
              <ListVideo strokeWidth={1} size={20} />Suggest Movie
            </button>
          </div>
       </div>
    )
  }
  return (
      <div className="w-full border top-16 bg-[#111111]/90 text-sm rounded-xs border-[rgba(255,255,255,0.2)]  font-medium  z-10  gap-2 p-1 max-h-59 overflow-y-auto ">

          {
            medias.map((media : Movie) => (
            
                <Link className="flex  px-1 p-1 w-full gap-2 h-40 hover:bg-neutral-800 cursor-pointer rounded-xs border-b border-[rgba(255,255,255,0.1)]"  href={`/${media.mediaType}/${media.id}`} key={media._id} onClick={cancelSearch}>


                  
                    <div className=" h-full flex-1 aspect-[2/3] relative rounded-xs">
                      <img
                          src={media.poster_path ? `https://image.tmdb.org/t/p/w500${media.poster_path}`: '/placeholder-movie.jpg'}
                          alt={media.title}
                          className="absolute inset-0 rounded-xs"
                      />
                    </div>
                    <div className="flex-3  flex flex-col gap-2 p-1 tracking-tight">
                        <h1 className="text-base  font-bold">{media.title}</h1>
                        <p className="text-xs text-neutral-400 font-light">{media.release_date}</p>
                        <div className=" w-full">
                            <div className='flex gap-2  items-center'>
                                <img 
                                    src="/logo-imdb.svg" 
                                    alt="IMDb Logo" 
                                    className="w-10  h-auto" 
                                />
                                <h1 className="text-xs font-light">{media.vote_average ? `${media.vote_average.toFixed(1)}/10`  : 'NA'}</h1>
                            </div>
                        </div>
                    </div>

        
                </Link>
  
            ))
          }
      </div>
  )
} 