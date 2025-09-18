import { getMovieById } from "@/app/ts/getData"
import Link from "next/link"
import { Timer,Star,Languages,Clapperboard } from "lucide-react"
type Params = {
    params : {
        mediaType : 'movie' | 'tv',
        id : number
    }
}

export default async function ShowMedia({params} : Params) {
    const { mediaType,id } = await params

    const mediaData = await getMovieById(id,mediaType)
    
   

    return (
        <section className="max-w-[1800px]  min-h-screen mx-auto  border-l border-r border-white/10 relative     backdrop-blur-3xl pt-20 ">
            <div className = 'w-full relative md:pt-0 pt-10 md:px-0 px-2'>    
                <div className="inset-0 w-full h-[250px] relative hidden md:block ">
                       
                        {mediaData.poster_path ? (
                            <img
                            src={mediaData.backdrop_path ? `https://image.tmdb.org/t/p/w500${mediaData.backdrop_path}` : '/placeholder-movie.jpg'}
                            alt={mediaData.title}
                            className=" inset-0 w-full h-[250px] object-cover "
                            />
                        ) : (

                        
                            <div className="
                            h-[250px]
                            absolute inset-0 
                            bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.3)_0,rgba(255,255,255,0.1)_1px,transparent_0,transparent_50%)]
                            bg-[size:10px_10px] 
                            bg-fixed">
                            </div>
                            
                        )}
                       
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
                        
                    
                </div>   
                <div className="mx-auto w-full relative md:top-0 md:-translate-y-1/7 md:translate-x-0 md:px-10 flex justify-between lg:flex-row flex-col gap-10 ">    

                {/* Image */}
                    <div className=" w-full md:max-w-[400px] max-w-[310px] aspect-[2/3] z-10 rounded-sm mx-auto mb-10 md:mb-20 shrink-0 ">

                        {mediaData.poster_path ? (
                            <a className="cursor-pointer " href={mediaData.homepage} target="_blank">
                                <img
                                    src={mediaData.poster_path ? `https://image.tmdb.org/t/p/w500${mediaData.poster_path}` : '/placeholder-movie.jpg'}
                                    alt={mediaData.title}
                                    className="w-full h-full object-cover rounded-sm flex-2 shadow-2xl shadow-black/50 "
                                />
                                <h1 className="text-white/30 italic text-center mt-2">{`"${mediaData.tagline}"`}</h1>
                            </a>
                        ) :  (
                            <div className="w-full h-full backdrop-blur-3xl bg-[#111111] shadow-2xl shadow-black/50 text-white/10 flex items-center justify-center font-bold text-2xl">
                                <p>No Image {`:(`}</p>
                            </div>
                        )}

                    </div> 
                    <div className="w-full   flex flex-col gap-7  md:mt-0 h-fit     ">
                        <div className="w-full  h-fit flex flex-col md:flex-row lg:justify-end lg:px-0 px-4 md:gap-10 lg:pt-2 lg:flex-wrap md:justify-around " >
                            <div className="text-md xl:text-xl font-light md:font-medium text-white/50 md:text-right flex gap-1 md:flex-col flex-row-reverse  justify-between ">
                            <div className="flex gap-2 items-center text-white xl:text-4xl lg:text-2xl text-xl "> 
                                <Clapperboard  strokeWidth={1.6} className="size-6 lg:size-8"  />
                                <p className="xl:text-4xl lg:text-2xl text-xl text-white">{mediaType === 'movie' ? 'Movie' : 'Tv Series'}</p>
                            </div>
                                <h1>Type</h1>
                            </div>
                            <div className="text-md font-light  md:font-medium text-white/50 md:text-right flex gap-1 md:flex-col flex-row-reverse  justify-between ">

                                <p className="xl:text-4xl lg:text-2xl text-xl text-white">{mediaData.adult ? '+18' : '>18'}</p>
                                <h1>Age</h1>
                            </div>
                            <div className="text-md  xl:text-xl font-light  md:font-medium text-white/50 md:text-right flex gap-1 md:flex-col flex-row-reverse  justify-between ">
                                <div className="flex gap-2 items-center text-white xl:text-4xl lg:text-2xl text-xl "> 
                                    <Languages strokeWidth={1.6} className="size-6 lg:size-8" />
                                    <p className="xl:text-4xl lg:text-2xl text-xl text-white">{mediaData.original_language.toUpperCase()}</p>
                                </div>
                                <h1>Language</h1>
                            </div>
                            <div className="text-md  xl:text-xl font-light  md:font-medium text-white/50 md:text-right flex gap-1 md:flex-col  flex-row-reverse justify-between">
                                <div className="flex gap-2 items-center text-white xl:text-4xl lg:text-2xl text-xl ">
                                    <Star strokeWidth={1.6} className="size-6 lg:size-8" />
                                    <p className="xl:text-4xl lg:text-2xl text-xl text-white">{mediaData.vote_average.toFixed(1)}/10</p>
                                </div>
                                <h1>Rating</h1>
                            </div>
                           {mediaData.runtime ?  <div className="text-md  xl:text-xl font-light md:font-medium text-white/50 md:text-right flex gap-1 md:flex-col  flex-row-reverse justify-between ">
                                <div className="flex gap-2 items-center text-white xl:text-4xl lg:text-2xl text-xl ">
                                    <Timer strokeWidth={1.6} className="size-6 lg:size-8"/>
                                    <p className="">{mediaData.runtime}mins</p>
                                </div>
                                <h1>Runtime</h1>
                            </div> : ''}
                        </div>
                        <div className="w-full  font-bold px-2 ">
                            <h1 className="text-4xl md:text-6xl">{mediaData.title ? mediaData.title : mediaData.original_name}<span className="text-xl ml-2 md:text-2xl text-white/50 text-center ">{`(${mediaData.release_date ? mediaData.release_date.split("-")[0] : mediaData.first_air_date.split('-')[0]})`}</span></h1>
                            <div className="mt-5 flex  gap-4 mb-5">
                                {
                                    mediaData.genres.map((genre : any) => (
                                        <div className="relative w-full md:w-fit h-fit mt-2 flex-wrap" key={genre.id}>
                                                <div className="hidden md:block
                                                    absolute inset-0 
                                                    border border-[rgba(255,255,255,0.2)]
                                                    bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.1)_0,rgba(255,255,255,0.1)_1px,transparent_0,transparent_50%)]
                                                    bg-[size:10px_10px] 
                                                    bg-fixed">
                                                </div>
                                                <div className="cursor-pointer relative transform  md:text-left md:text-sm text-xs font-bold font-sans px-4 py-2 border border-white bg-white text-[#111111] text-center w-full md:w-fit md:translate-x-2 md:-translate-y-2 hover:z-10 transition-all duration-300 hover:translate-x-0 hover:translate-y-0  active:translate-x-0 active:-translate-y-0 active:bg-transparent active:text-white active:border-[rgba(0,0,0,0.2)]">
                                                   {genre.name}
                                                </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="grid grid-cols-[auto_1fr] gap-y-4 gap-x-2 md:text-[1.3rem]">
                               
                                <p className="font-medium max-w-[170px]">Original Title:</p>
                                <p className="text-white/50 font-light self-end">{mediaData.original_title ? mediaData.original_title : mediaData.original_name}</p>

                               
                                <p className="font-medium max-w-[170px]">Release Date:</p>
                                <p className="text-white/50 font-light self-end">{mediaData.release_date ? mediaData.release_date : mediaData.first_air_date}</p>

                               
                                <p className="font-medium max-w-[170px]">Overview:</p>
                                <p className="text-white/50 font-light self-end">{mediaData.overview}</p>

                               
                                <p className="font-medium max-w-[170px]">Production Companies:</p>
                                <p className="text-white/50 font-light self-end">
                                    {mediaData.production_companies.map((company: any, index: number) => (
                                    <span key={company.id}>
                                        {company.name}
                                        {index < mediaData.production_companies.length - 1 && ", "}
                                    </span>
                                    ))}
                                </p>
                            </div>

                           <div className="flex flex-col md:flex-row gap-4 mt-5">
                           
                            
                                <div className="relative w-full lg:w-fit h-fit mt-2 ">
                                    <div className="hidden md:block
                                                    absolute inset-0 
                                                    border border-[rgba(255,255,255,0.2)]
                                                    bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.1)_0,rgba(255,255,255,0.1)_1px,transparent_0,transparent_50%)]
                                                    bg-[size:10px_10px] 
                                                    bg-fixed">
                                    </div>
                                    <div className=" cursor-pointer relative transform  md:text-left md:text-xl text-xl font-bold font-sans px-6 py-2 border border-green-500 bg-green-500 text-green-900 text-center w-full lg:w-fit md:translate-x-2 md:-translate-y-2 hover:z-10 transition-all duration-300 hover:translate-x-0 hover:translate-y-0  active:translate-x-0 active:-translate-y-0 active:bg-transparent active:text-white active:border-[rgba(0,0,0,0.2)]">
                                           <p className="text-center">
                                           Add to Watchlist
                                            </p>       
                                    </div>
                                </div>

                                <div className="relative w-full lg:w-fit h-fit mt-2 ">
                                    <div className="hidden md:block
                                                    absolute inset-0 
                                                    border border-[rgba(255,255,255,0.2)]
                                                    bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.1)_0,rgba(255,255,255,0.1)_1px,transparent_0,transparent_50%)]
                                                    bg-[size:10px_10px] 
                                                    bg-fixed">
                                    </div>
                                    <div className="cursor-pointer relative transform  md:text-left md:text-xl text-xl font-bold font-sans px-6 py-2 border border-red-500 bg-red-500 text-red-900 text-center w-full lg:w-fit md:translate-x-2 md:-translate-y-2 hover:z-10 transition-all duration-300 hover:translate-x-0 hover:translate-y-0  active:translate-x-0 active:-translate-y-0 active:bg-transparent active:text-white active:border-[rgba(0,0,0,0.2)]">
                                        <p className="text-center">
                                            Remove 
                                        </p>
                                    </div>
                                </div>
                            </div>          
                        </div>
                    </div>
                </div>         
            </div>  
        </section>
    )
}

                                   