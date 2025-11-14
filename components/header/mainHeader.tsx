'use client'
import Link from "next/link";
import { Search,CircleUser } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence , motion } from "motion/react";
import { ListVideo } from 'lucide-react';
import { useRouter } from "next/navigation";
import LinkPopUp from "./link-popup";
import HeaderSearchBar from "./search-bar";
import HeaderSideBar from "./side-bar";
import { getMovieThroughSearch } from "@/app/actions/getMovie";
import { Movie } from "@/schema/type";


export  function Header({session} : {session : any | null}){

    const [showLinkContainers , setShowLinkContainers] = useState<boolean>(false)

    const [headerName,setHeaderName] = useState<string | undefined>(session?.user?.name)
    const [searchString,setSearchString] =  useState<string>('')
    const [searchedMedia,setSearchedMedia] = useState<Movie[] | null> (null)
  
    
    useEffect(() => {
      setHeaderName(session?.user?.name)
    },[headerName])
    
    
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
        <header className="w-full h-20  flex  justify-center text-white fixed z-20 border-b border-b-white/10  backdrop-blur-xl top-0  mx-auto">
        
          <nav className= "h-full border-l border-r border-white/10 flex justify-between items-center px-6  md:px-10 backdrop-blur-xl z-20 w-full mx-auto  max-w-[1450px] ">
            <Link href='/' prefetch={true}>
              <h1 className="text-2xl lg:text-3xl font-bold cursor-pointer tracking-wider">ViewBox</h1>
            </Link>

            {/* large screen navbar */}
            <div className="  gap-5  items-center justify-center hidden 760:flex">
              <Link href='/home'>
                <div className=" gap-2 items-center justify-center hover:text-green-600 duration-200 cursor-pointer flex ">
                  <ListVideo strokeWidth={1} size={20} /><p className="mb-0.5">Home</p> 
                </div>
              </Link>
              <div className="relative hidden 760:flex">
                <div className=" relative w-[300px] items-center flex  h-10 ">
                    <HeaderSearchBar onSearch={onSearch} cancelButton={searchedMedia} cancelSearch={cancelSearch} searchString={searchString}/>
                </div>
                {
                  searchedMedia && (
                    <MediaOnSearch medias={searchedMedia} cancelSearch={cancelSearch} />  
                  )
                }
              </div>
              <div className="flex gap-10 font-bold justify-center items-center relative">
                  
                  
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          setSearchString('')
                          setSearchedMedia(null)
                          setShowLinkContainers(prev => !prev)
                        }
                        }
                      
                      >
                        <CircleUser strokeWidth={1} size={24}/>
                      </div>
                  <AnimatePresence mode="wait" propagate> 
                      {
                        showLinkContainers && (
                          <LinkPopUp setShowLinkContainers={setShowLinkContainers} />
                        )
                      }
                  </AnimatePresence>
              </div>
            </div>

            <HeaderSideBar onSearch={onSearch}  cancelSearch={cancelSearch} searchString={searchString}  medias={searchedMedia}/>
          </nav>  
      </header>
    )
}   

interface MediaOnSearchProps {
  medias : Movie[] | null ,
  cancelSearch : () => void 
}
export const MediaOnSearch = ({medias , cancelSearch} : MediaOnSearchProps) => {

  if(medias === null ) return null

  if(medias.length === 0) {
    return (
       <div className="absolute w-[300px] border top-16 bg-[#111111]/90 text-sm rounded-xs border-[rgba(255,255,255,0.2)]  font-medium  z-10   p-1 max-h-59 overflow-y-auto ">
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
      <div className="absolute w-[300px] border top-16 bg-[#111111]/90 text-sm rounded-xs border-[rgba(255,255,255,0.2)]  font-medium  z-10   p-1 max-h-59 overflow-y-auto ">

          {
            medias.map((media : Movie) => (
            
                <Link className="flex  px-1 p-1 w-full gap-2 h-28 hover:bg-neutral-800 cursor-pointer"  href={`/${media.mediaType}/${media.id}`} key={media._id} onClick={cancelSearch}>


                  
                    <div className="bg-neutral-700 h-full flex-1 aspect-[2/3] relative">
                      <img
                          src={media.poster_path ? `https://image.tmdb.org/t/p/w500${media.poster_path}`: '/placeholder-movie.jpg'}
                          alt={media.title}
                          className="absolute inset-0"
                      />
                    </div>
                    <div className="flex-3  flex flex-col gap-2 p-1 tracking-tight">
                        <h1>{media.title}</h1>
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