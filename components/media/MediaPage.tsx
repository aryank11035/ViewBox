'use client'

import { Movie, Session } from "@/schema/type"
import { Timer,Star,Languages,Clapperboard } from "lucide-react"
import { useState } from "react"
import { addMovie } from "../../app/actions/addMovie"
import { deleteMovie } from "../../app/actions/deleteMovie"
import { Libre_Franklin } from "next/font/google"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { ListPlus } from 'lucide-react';
import { Frown } from 'lucide-react';
import { ListMinus } from 'lucide-react';
import { Button } from "../ui/button"
import YouTube from "react-youtube"
import { Toaster } from "../ui/sonner"
import { AnimatePresence, motion } from "framer-motion"
const font = Libre_Franklin({
    subsets : ['latin'],
    weight : ['800']
})



export default function MediaPage({mediaData ,id , mediaType , session , isInWatchList , videoKey } : {mediaData : Movie ,id : number,mediaType : 'movie' | 'tv', session : Session | null , isInWatchList : boolean , videoKey : string}){


    const [addedToWatchlist , SetAddedToWatchlist] = useState(isInWatchList)
    const [loading,setLoading] = useState(false)
    const [message , setMessage] = useState(false)
    const router = useRouter()

  
    
    async function postMovie() {
        if(!session){
            toast('User Must be Logged In', {
                action: {
                  label: 'Log In',
                  onClick: () => router.push('/auth/login')
                },
              })
            SetAddedToWatchlist(false)
            return
        }

        if(addedToWatchlist) return 

        try {
            setLoading(true)
            await addMovie(mediaData)
            SetAddedToWatchlist(true)
        } catch (error) {
            console.error('Error adding to watchlist',error)   
        }finally{
            setLoading(false)
        }
    }

    async function removeMovie(){
        try { 
            const data = await deleteMovie(mediaData.id) 
            

            if(data?.success){
                SetAddedToWatchlist(false)
                console.log('Movie removed Sucessfully')
            }else{
                console.log('Failed to delete movie')
            }

            
        }catch(error){  
            console.error('Failed to remove the movie',error)
        }
    }

    return (
        <section className="h-fit mx-auto relative  backdrop-blur-3xl pt-20 max-w-[1700px] border-l border-r border-white/10 min-h-screen px-6 flex ">
            <Toaster 
                    offset={{ bottom :"100px", right: "16px", left: "16px" }} 
                    mobileOffset={{ bottom: '100px' }} 
                    position="bottom-center" 
                    expand={true} 
                    toastOptions={{
                        classNames : {
                            toast : '!bg-[#242323] !backdrop-blur-xl !rounded-none !shadow-2xl !border-none !text-white/50      ',
                            actionButton : '!bg-green-600 !rounded-none'
                        }
                    }}
            />
            <div className="flex flex-col-reverse lg:flex-row-reverse max-w-[1500px] mx-auto lg:gap-15 gap-5 my-10">
                
                <motion.div 
                    className="space-y-3 flex-2"
                    initial={{ opacity : 0 , translateX : 5}}
                    animate={{ opacity: 1, translateX : 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.5,
                        ease: [0, 0.71, 0.2, 1.01],
                    }}
                >
                    <div className="hidden lg:block space-y-3   ">
                        <h1 className="text-4xl md:text-5xl font-bold text-wrap">{mediaData.title ? mediaData.title : mediaData.original_name}</h1>
                        <p className="text-white/40 text-sm md:text-base leading-snug">{mediaData.overview}</p>
                    </div>

                    <div className=" space-x-3  flex h-fi mb-8">
                        <div>
                            <Button  
                                onClick={(e) => {
                                            postMovie()
                                            e.preventDefault()
                                            }} 
                                variant={addedToWatchlist ? 'custom_one_2': 'custom_one'} size='custom_one'
                            >
                                <ListPlus/>{loading? 'Adding..' :  addedToWatchlist ? 'Added' : ' Add to Watchlist'}
                                                                
                            </Button>
                        
                        </div>
                        {   
                            addedToWatchlist &&  (
                                <motion.div
                                    initial={{opacity : 0 , translateX : -6}}
                                    animate={{ opacity: 1, translateX : 0 }}
                                    transition={{   
                                        duration: 0.8,
                                        delay: 0.5,
                                        ease: [0, 0.71, 0.2, 1.01],
                                    }}
                                >
                                    <Button     
                                        onClick={(e) =>{
                                            e.preventDefault()
                                            removeMovie()
                                            }} 
                                        size="custom_one" variant="custom_two"
                                    >
                                                        
                                        <ListMinus />Remove            
                                    </Button>

                                </motion.div>
                            )
                        }   
                       
                    </div>

                    <div className="w-full aspect-video  bg-black/3 0 rounded-xs ">
                        {videoKey ? (
                            <YouTube 
                                videoId={videoKey} 
                                className="w-full h-full"
                                opts={{
                                    width: "100%",
                                    height: "100%",
    
                                    playerVars: {
                                      autoplay: 0,
                                    },
                                  }}

                            />
                        ) : (
                            <div className="w-full h-full flex justify-center items-center relative">
                              
                                {
                                    mediaData.backdrop_path && (
                                        <div className="relative w-full h-full">
                                            <img
                                            src={`https://image.tmdb.org/t/p/w500${mediaData.backdrop_path}`}
                                            alt={mediaData.title}
                                            className="w-full h-full object-cover rounded-xs shadow-2xl shadow-black/50 absolute inset-0"
                                            />
                                            <div className="absolute inset-0 bg-black/30 z-10 backdrop-blur-xs flex justify-center items-center">
                                                <p className="flex flex-row gap-3 text-white/70"><Frown />Not Videos Found</p>
                                            </div>
                                        </div>
                                    )
                                }  
                                                                
                            </div>
                        )}
                    </div>
                </motion.div>

                <motion.div 
                    className="flex flex-col gap-3 flex-1"
                    initial={{ opacity : 0 , translateX : -5}}
                    animate={{ opacity: 1, translateX : 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.5,
                        ease: [0, 0.71, 0.2, 1.01],
                    }}
                >
                    <div className="lg:hidden flex gap-3 flex-col mb-2">
                        <h1 className="text-4xl md:text-5xl font-bold text-wrap">{mediaData.title ? mediaData.title : mediaData.original_name}</h1>
                        <p className="text-white/40 text-sm md:text-base leading-snug">{mediaData.overview}</p>
                    </div>
                    <div className="w-full aspect-2/3 bg-white/10 rounded-xs">
                        {mediaData.poster_path ? (
                                <a className="cursor-pointer " href={mediaData.homepage} target="_blank">
                                    <img
                                        src={mediaData.poster_path ? `https://image.tmdb.org/t/p/w500${mediaData.poster_path}` : '/placeholder-movie.jpg'}
                                        alt={mediaData.title}
                                        className="w-full h-full object-cover rounded-xs flex-2 shadow-2xl shadow-black/50 "
                                    />
                                </a>
                            ) :  (
                                <div className="w-full h-full backdrop-blur-3xl bg-[#111111] shadow-2xl shadow-black/50 text-white/10 flex items-center justify-center font-bold text-2xl">
                                    <p>No Image {`:(`}</p>
                                </div>
                        )}
                    </div>
                    <div className="w-full p-3 bg-white/10 rounded-xs">
                        <div className="flex w-full ">
                            <div className="bg-white/30 rounded-xs text-xs flex-wrap flex-2 p-3 font-bold space-y-1.5">
                            {
                                mediaData.genres.map((genre : any,index : number) => (         
                                    <span key={genre.id}>
                                        {genre.name}
                                        {index < mediaData.genres.length - 1 && ', '}
                                    </span>           
                                ))
                            }
                            </div>
                            <div className="flex-1 justify-center  items-end flex-col flex">
                                <div className="w-fit">
                                    <img 
                                        src="/logo-imdb.svg" 
                                        alt="IMDb Logo" 
                                        className="w-full  h-auto" 
                                    />
                                    <p className="text-xs">{mediaData.vote_average.toFixed(1)}/10</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="text-white/30 font-light self-end text-sm mt-2">{mediaData.release_date ? mediaData.release_date : mediaData.first_air_date}</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}   
