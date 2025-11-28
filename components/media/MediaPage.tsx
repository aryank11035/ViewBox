'use client'



import { useEffect, useState } from "react"
import { addMovie } from "../../app/actions/addMovie"
import { deleteMovie } from "../../app/actions/deleteMovie"
import { Libre_Franklin } from "next/font/google"
import { Sparkles } from 'lucide-react';
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Frown, Plus } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import YouTube from "react-youtube"
import { Toaster } from "../ui/sonner"
import { motion } from "framer-motion"
import { WhereToWatch } from "./whereToWatch"
import { RelatedMedia } from "./relatedMediaCard"
import { HeartButton } from "./favourite/heart-button";
import { PlaylistButton } from "./playlist/playlist-button";
import Link from "next/link"
import { Button } from "../ui/button"
import VotesComp from "./votes/votes-comp"
import { Movie } from "@/schema/type"
import AIGenerateInsightsComp from "../ai-insights-comp"
import MediaCard from "../mediaCard"


export default function MediaPage({allMediaData, mediaData  , mediaType , session  , videoKey , whereToWatch , relatedMovies , trendingData , isAdmin , isOverrated  = false, isUnderrated = false, isFavourite = false} : {allMediaData : Movie , mediaData : any  ,mediaType : 'movie' | 'tv', session : any | null ,  videoKey : string , whereToWatch : any, relatedMovies : any , trendingData : any , isAdmin : boolean , isOverrated : boolean ,isUnderrated : boolean ,isFavourite :boolean}){


  
    const router = useRouter()


    //animation states
    const [infoMessage , setInfoMessage] = useState(false)
    const [isMobile, setIsMobile] = useState(false);
    const [isHover,setIsHover] = useState(false)


    //ui render states
    const [favourite,setFavourite] = useState(isFavourite)
    const [overratedVote,setOverratedVote] = useState(isOverrated)
    const [underratedVote,setUnderratedVote] = useState(isUnderrated)
    const [overratedNumber,setOverratedNumber] = useState(allMediaData.overrated)
    const [underratedNumber,setUnderratedNumber] = useState(allMediaData.underrated)
    //this goes the Playlist collection 
    const playlistMedia = {
        _id : allMediaData._id , 
        id : mediaData.id , 
        type : mediaType,
        name : mediaData.title ? mediaData.title : mediaData.original_name,
        genres : mediaData.genres,
        img : mediaData.poster_path  
    }
    
    const mediaName = mediaData.title ? mediaData.title : mediaData.original_name as string
    
    

    const onFavouriteChange = ( res : boolean , favourite : boolean) => {
        setFavourite(favourite)
    }

    const onOverrateVoteChange = ( vote : boolean , number : number) => {
        setOverratedVote(vote)
        setOverratedNumber(number)
    }

    const onUnderateVoteChange  = ( vote : boolean ,  number : number) => {
        setUnderratedVote(vote)
        setUnderratedNumber(number)
    }


    useEffect(() => {

        const handleResize = () => setIsMobile(window.innerWidth < 640);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    

    


    async function postMovie() {
        if(!session){
            toast('User Must be Logged In', {
                action: {
                  label: 'Log In',
                  onClick: () => router.push('/auth/login')
                },
              })
            return
        }
        try {
          
            await addMovie(allMediaData)
            
        } catch (error) {
            console.error('Error adding to watchlist',error)   
        }
    }

    async function removeMovie(){
        try { 
            const data = await deleteMovie(mediaData.id) 
            

            if(data?.success){
                console.log('Movie removed Sucessfully')
            }else{
                console.log('Failed to delete movie')
            }

            
        }catch(error){  
            console.error('Failed to remove the movie',error)
        }
    }

    return (
        <>  


        <section className="pt-20 mx-auto">
            <div className="h-fit  relative  backdrop-blur-3xl  max-w-[1450px] border-l border-r border-white/10 min-h-screen   py-13 bg-black/30 mx-auto px-2">
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
                <div className="max-w-[1340px] mx-auto h-fit  mb-6 ">
                    <Link className=' bg-white/10 flex w-fit gap-2 hover:text-black/80 hover:bg-white duration-300 rounded-xs ' href='/'>
                        <motion.div
                            className="flex w-full h-full gap-2 p-3 rounded-xs items-center"
                            onMouseEnter = {() => setIsHover(true)}
                            onMouseLeave = {() => setIsHover(false)}
                        >   
                            <motion.div
                                className="size-4"
                                initial = {{ opacity : 1  , rotate : 225 }}
                                animate = { isHover ? 'hovered' : 'normal' }
                                variants={{
                                    normal : { opacity : 1 ,  translateX : 0 ,  rotate : 225  },
                                    hovered : { opacity : 1 ,  translateX : -6  ,  rotate : 225  },   
                                }}
                                transition={{                                        
                                    duration : 0.7,
                                    ease: [0, 0.71, 0.2, 1.01],
                                }}
                            >
                               <svg width="100&" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 18L18 6M18 6H10M18 6V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </motion.div>
                                Go back to movies

                        </motion.div>
                    </Link>
                </div>
                <div className="flex flex-col-reverse lg:flex-row-reverse max-w-[1340px] mx-auto lg:gap-8 gap-5 ">

                    <motion.div 
                        className="space-y-3 flex-2 relative"
                        initial={{ opacity : 0 , translateX : 5}}
                        animate={{ opacity: 1, translateX : 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.5,
                            ease: [0, 0.71, 0.2, 1.01],
                        }}
                    >

                      
                        <div className="hidden lg:block space-y-3   ">
                            <h1 className="text-4xl md:text-5xl font-bold text-wrap">{mediaData.title ? mediaData.title : mediaData.original_name} 
                                <span className="text-white/40 text-xl ml-2 font-medium block md:inline-block">
                                    {`[ ${mediaData.mediaType === 'tv' ? 'Series' : 'Movie'} ]`}
                                </span>
                            </h1>
                            <p className="text-white/40 text-sm md:text-base leading-snug">{mediaData.overview}</p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-2  ">
                            <div className=" space-x-3  flex h-fill ">
                                <HeartButton mediaInfo = {allMediaData} initialFavourite={favourite} onFavoritesChange={onFavouriteChange}/>
                                <PlaylistButton playlistMediaInfo={playlistMedia}/> 
                            </div>
                            {
                                isAdmin && (
                            
                                        <Button variant='custom_one' size='custom_one' onClick={postMovie}><Plus/> add Movie</Button>
                                        
                                )
                            }
                        </div>
                        {
                            allMediaData.underrated !== undefined && (
                                <VotesComp votes={{
                                    id : allMediaData._id ,
                                    overrated : overratedNumber,
                                    underrated : underratedNumber, 
                                    overratedVoted : overratedVote ,
                                    underratedVoted : underratedVote 
                                   }} 
                                    icon={false}
                                    onOverrateVoteChange={onOverrateVoteChange}
                                    onUnderrateVoteChange={onUnderateVoteChange}
                                   />
                            )
                        }


                        <div className="w-full aspect-video  bg-black/30 rounded-xs relative mb-7 ">
                            <div className="w-ful aspect-video   flex justify-center items-center text-2xl absolute inset-0">
                                <p className="text-white/30 flex items-center gap-3"><Frown />No Videos</p>
                            </div>
                            {videoKey && (
                                <div className="absolute inset-0">
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

                                </div>
                            ) 
                            }
                        </div>
                        <AIGenerateInsightsComp allMediaData={allMediaData}/>
                        <div  className="flex flex-col gap-3">
                            <div className="text-4xl font-bold text-wrap flex gap-3 items-end  w-fit relative">
                                <h1 className="">
                                    Where to Watch
                                </h1>
                                <div className=" flex items-end w-fit h-fit ">
                                    <motion.span
                                        className=" text-xs rounded-full bg-white/20 h-fit w-fit p-1 px-2 mb-1.5 cursor-pointer hover:bg-green-600 duration-300"
                                        onMouseEnter={() => setInfoMessage(true)}
                                        onMouseLeave={() => setInfoMessage(false)}
                                    >
                                    i
                                    </motion.span>
                                    <motion.div 
                                        className="bg-white/10 backdrop-blur-2xl absolute p-2 right-0 top-0 text-xs rounded-xs "
                                        initial = {{ opacity : 0 }}
                                        animate={infoMessage ? 'hovered' : 'normal'}
                                        variants={{
                                            normal: {
                                                opacity: 0,
                                                translateX: isMobile ? 0 : -20,
                                                translateY: isMobile ? -40 : -70,
                                            },
                                            hovered: {
                                                opacity: 1,
                                                translateX: isMobile ? 0 : -20,
                                                translateY: isMobile ? -44 : -74,
                                            },
                                        }}
                                        transition={{
                                            delay : 0.5,
                                            duration : 0.3,
                                            ease: [0, 0.71, 0.2, 1.01],
                                        }}
                                    >
                                        <p>
                                            Currently showing streaming information for India region. Click any provider to search for movie directly on their platfrom
                                        </p>
                                    </motion.div>
                                </div>
                            </div>
                            <p className="text-xs text-white/40">
                                {`Click any provider to search for "${mediaData.title ? mediaData.title  : mediaData.original_name}" on their platfrom`}
                            </p>
                            
                                <WhereToWatch whereToWatch={whereToWatch} mediaName={mediaName}/>
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
                            <h1 className="text-4xl md:text-5xl font-bold text-wrap flex flex-wrap">{mediaData.title ? mediaData.title : mediaData.original_name}
                                <span className="text-white/30 text-xl ml-2 font-medium ">
                                        {`[${mediaData.mediaType === 'tv' ? 'Series' : 'Movie'}]`}
                                </span>
                            </h1>
                            <p className="text-white/40 text-sm md:text-base leading-snug">{mediaData.overview}</p>
                        </div>
                        <div className="w-full aspect-2/3 bg-white/10 rounded-xs">
                            {mediaData.poster_path ? (
                                    <a className="cursor-pointer "  target="_blank">
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
                
                <div className="max-w-[1340px] mx-auto lg:mt-15 mt-5 flex flex-col gap-2">
                    <h1 className="text-xl md:text-4xl  font-bold text-wrap flex flex-wrap tracking-tight">You can also Watchlist</h1>
                    <div className="w-full h-fit grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 grid mx-auto">
                        
                        {
                            relatedMovies.length > 0 ? 
                                    relatedMovies.map((mediaData : any , index : number) => (
                                        <motion.div
                                            initial={{ opacity : 0 , translateY      : 10}}
                                            animate={{ opacity: 1, translateY : 0 }}
                                            transition={{
                                                duration: 0.8,
                                                delay: 0.5,
                                                ease: [0, 0.71, 0.2, 1.01],
                                            }}
                                            key={index}
                                        >
                                                <MediaCard mediaData={mediaData} />
                                        </motion.div>
                                    )) 
                                :
                                    trendingData.map((mediaData : any , index : number) => (
                                        <motion.div
                                            initial={{ opacity : 0 , translateY      : 10}}
                                            animate={{ opacity: 1, translateY : 0 }}
                                            transition={{
                                                duration: 0.8,
                                                delay: 0.5,
                                                ease: [0, 0.71, 0.2, 1.01],
                                            }}
                                            key={index}
                                        >
                                                <RelatedMedia mediaData={mediaData} key={index}/>
                                        </motion.div>
                                    ))
                        }
                        
                    </div> 
                </div>



            </div>

        </section>
        
        </>
    )
}   
