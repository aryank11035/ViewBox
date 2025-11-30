'use client'
import Link from "next/link";
import { CircleUser } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence , motion } from "motion/react";
import { ListVideo } from 'lucide-react';
import LinkPopUp from "./link-popup";
import HeaderSearchBar from "./search-bar";
import HeaderSideBar from "./side-bar";
import { getMovieThroughSearch } from "@/app/actions/getMovie";
import { Movie } from "@/schema/type";
import Image from "next/image";

import {  signIn } from "next-auth/react"
import { CircularProgress } from "@mui/material";


export  function Header({session} : any){

  // const { data: session, status } = useSession()
  const [showLinkContainers , setShowLinkContainers] = useState<boolean>(false)
  const [loading,setLoading] = useState(false)
  const [searchString,setSearchString] =  useState<string>('')
  const [searchedMedia,setSearchedMedia] = useState<Movie[] | null> (null)

  
  const onSearch = (str : string) => {
    setSearchString(str)
    setShowLinkContainers(false)
  }

  const cancelSearch = () => {
    setSearchString('')
    setSearchedMedia(null)
  }


  useEffect(() => {
    if (!searchString.trim()) {
        setSearchedMedia(null);
        return;
    }

    const timeout = setTimeout( async () => {
      const movies =   await getMovieThroughSearch(searchString);
      setSearchedMedia(movies)
    }, 300); 

    return () => clearTimeout(timeout); 
  }, [searchString]);

  return (
      <header className="w-full h-20  flex  justify-center text-white fixed z-100 border-b border-b-white/10  backdrop-blur-2xl top-0  mx-auto ">
      
        <nav className= "h-full border-l border-r border-white/10 flex justify-between items-center px-6  md:px-14 backdrop-blur-xl z-20 w-full mx-auto  max-w-[1450px] ">
          <Link href='/' >
            <h1 className="text-2xl lg:text-3xl font-bold cursor-pointer tracking-wider">ViewBox</h1>
          </Link>

          {/* large screen navbar */}
          <div className="  gap-5  items-center justify-center hidden 800:flex">
            <Link href='/home'>
              <div className=" gap-2 items-center justify-center hover:text-green-600 duration-200 cursor-pointer flex ">
                <ListVideo strokeWidth={1} size={20} /><p className="mb-0.5">Home</p> 
              </div>
            </Link>
            <SuggestMovieButton />
            <div className="relative hidden 760:flex">
              <div className=" relative w-[300px] items-center flex  h-10 ">
                  <HeaderSearchBar onSearch={onSearch} cancelButton={searchedMedia} cancelSearch={cancelSearch} searchString={searchString}/>
              </div>
              {
                searchedMedia && (
                  <MediaOnSearch medias={searchedMedia} cancelSearch={cancelSearch} disableLink={false} />  
                )
              }
            </div>
              {
                !session?.user && <button className="bg-green-600 hover:bg-white hover:text-green-600 w-25 px-2.5 py-2.5 rounded-xs text-sm cursor-pointer duration-200 hover:scale-98 active:scale-95 " 
                                          onClick={async () => {
                                              setLoading(true)
                                              await signIn('google', { callbackUrl: '/home' })
                                              setLoading(false)
                                            }}
                                           
                                        >
                                         {loading ? (
                                              <CircularProgress size={16} color="inherit" />
                                          ) : (
                                              "sign in"
                                          )}
                                        </button>
              }

               {
                  session?.user && (
                    <div className="flex gap-10 font-bold justify-center items-center relative">
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          setSearchString('')
                          setSearchedMedia(null)
                          setShowLinkContainers(prev => !prev)
                        }}
                      >
                        <UserAvatar userImage={session?.user?.image} userName={session?.user.name} />
                      </div>

                      <AnimatePresence mode="wait" propagate>
                        {showLinkContainers && (
                          <LinkPopUp 
                            setShowLinkContainers={setShowLinkContainers}
                            showLinkContainers={showLinkContainers}
                            username={session.user.name}
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }

          </div>

          <HeaderSideBar onSearch={onSearch}  cancelSearch={cancelSearch} searchString={searchString}  medias={searchedMedia} session={session}/>
        </nav>  
    </header>
  )
}   

interface MediaOnSearchProps {
  medias : Movie[] | null ,
  cancelSearch : () => void ,
  forHeaderWidth ?: boolean , 
  forHeaderAbsolute ?: boolean ,
  onMediaClick ?: ( media : Movie ) => void ,
  disableLink : boolean
}
export const MediaOnSearch = ({medias , cancelSearch , forHeaderWidth = true , forHeaderAbsolute = true ,onMediaClick , disableLink = false } : MediaOnSearchProps) => {

  if(medias === null ) return null


  const onHandleMedia = (media : Movie) => {
    onMediaClick?.(media)
  }

  if(medias.length === 0) {
    return (
       <div className={`${forHeaderAbsolute && 'absolute'} ${forHeaderWidth ? 'w-[300px]' : 'w-full'} border top-16 bg-[#111111]/90 text-sm rounded-xs border-[rgba(255,255,255,0.2)] font-medium z-10 p-1 max-h-59 overflow-y-auto`}>
          <div className="flex  px-1 p-1 w-full gap-2 h-28   items-center justify-center text-base font-bold flex-col" >
              No Movies found
              {
                forHeaderAbsolute && (
                  <SuggestMovieButton/>
                )
              }
          </div>
       </div>
    )
  }



  
  const MediaItem = ({ media }: { media: Movie }) => (
    <div
      className={`flex px-1 p-1 w-full gap-2 h-28 hover:bg-neutral-800 cursor-pointer rounded-xs`}
      onClick={() => {
        cancelSearch()
        onHandleMedia(media)
      }}
    >
      <div className="h-full aspect-[2/3] relative rounded-xs">
        <img
          src={media.poster_path ? `https://image.tmdb.org/t/p/w500${media.poster_path}` : '/placeholder-movie.jpg'}
          alt={media.name ? media.name : media.title  }
          className="absolute inset-0 rounded-xs"
        />
      </div>
      <div className="flex-3 flex flex-col gap-2 p-1 tracking-tight">
        <h1>{media.name ? media.name : media.title }</h1>
        <p className="text-xs text-neutral-400 font-light">{media.release_date ? media.release_date : media.first_air_date}</p>
        <div className="w-full">
          <div className='flex gap-2 items-center'>
            <img  
              src="/logo-imdb.svg"
              alt="IMDb Logo"
              className="w-8 h-auto"
            />
            <h1 className="text-xs font-light">{media.vote_average ? `${media.vote_average.toFixed(1)}/10` : 'NA'}</h1>
          </div>
        </div>
      </div>
    </div>
  )


  return (
      
    <div className={`${forHeaderAbsolute && 'absolute'} ${forHeaderWidth ? 'w-[300px]' : 'w-full'} border top-16 bg-[#111111]/90 text-sm rounded-xs border-[rgba(255,255,255,0.2)] font-medium z-10 p-1 max-h-59 overflow-y-auto`}>
      {medias.map((media: Movie) => (
        disableLink ? (
          <MediaItem key={media.id} media={media} />
        ) : (
          <Link
            href={`/${media.mediaType}/${media.id}/${media.title}`}
            key={media._id}
          >
            <MediaItem media={media} />
          </Link>
        )
      ))}
    </div>
  )
} 


export const SuggestMovieButton = () => {
  return (
    <Link href='/suggestions' className="w-fit bg-green-600 px-2 text-sm font-light flex gap-2 p-2.5 rounded-xs hover:bg-white hover:text-green-600 duration-200 cursor-pointer hover:scale-95 active:scale-90 ">
        <ListVideo strokeWidth={1} size={20} />Suggest 
    </Link>
  )
}

export const UserAvatar = ({userImage , userName} : { userImage : string , userName : string }) => {
  if(!userImage) return null 
  return (
    <div>
        <Image
          src={userImage}
          alt={userName}
          width={40}
          height={40}
          className="rounded-full border-1 border-[rgba(255,255,255,0.3)] p-0.5 hover:border-green-600 duration-500"
        />
      </div>
  )
}