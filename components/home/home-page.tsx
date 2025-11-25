'use client'

import { Movie } from "@/schema/type"
import { useCallback, useEffect, useMemo, useState } from "react"
import { HomeSilderSection } from "./homeSliderSection"
import LanguageSelect from "./language-option"
import {  getMoviesByLanguage } from "@/app/actions/home"
import FavCard from "../media/favourite/fav-card"

interface HomePageProps {
    initialShows : Movie[],
    languages : any ,
    initialGenres : any ,
    isFavourites : Set<string> ,
    underratedVotes : Set<string> ,
    overratedVotes : Set<string>
}


function getUniqueGenres(movies : Movie[]) {
    const all = movies.flatMap((movie : Movie) => movie.genres.map(g => g.name));
    const allGenresSet = new Set([
        'All',
        ...all
    ])

    return Array.from(allGenresSet)
}

function getMovieByGenre(genre: string, movies: Movie[]): Movie[] {
    if (genre === 'All') return movies
    return movies.filter(movie => 
        movie.genres.some(g => g.name === genre)
    )
}

export default function HomePageClient({initialShows , languages , initialGenres , isFavourites , underratedVotes ,overratedVotes} : HomePageProps){

    const [shows,setShows] = useState(initialShows)
    const [genres,setGenres] = useState(initialGenres)
    const [language,setLanguage] = useState('all')
  
    const [displayCount,setDisplayCount] = useState(9)
    const [activeGenre , setActiveGenre ] = useState('All')

    const filteredMovies = useMemo( () => 
        getMovieByGenre(activeGenre, shows),
        [activeGenre, shows]
    )
  
    useEffect(() => {
        setDisplayCount(Math.min(10, filteredMovies.length))
    }, [activeGenre, filteredMovies.length])
    

    const onLanguageSelect = useCallback(async (lang: string) => {
        const selectedMovies = await getMoviesByLanguage(lang)
        const selectedGenres = getUniqueGenres(selectedMovies) 
        
        setLanguage(lang)
        setShows(selectedMovies)
        setGenres(selectedGenres)
        setActiveGenre('All')
    }, [])
    
    useEffect(() => {
        if (language !== 'all') {
            onLanguageSelect(language)
        }
        setDisplayCount(shows.length < 10 ? shows.length : 10)
    }, [language, onLanguageSelect])

    const visibleMovies = filteredMovies.slice(0, displayCount)

    return (
        <>
            <HomeSilderSection medias={shows.slice(0,5)} isFavourites={isFavourites}/>
            
                <div className="border-b w-full border-[rgba(255,255,255,0.1)]">

                </div>
                <div className="max-w-[1450px]  border-l border-r border-[rgba(255,255,255,0.1)]  mx-auto bg-black/30 py-5 space-y-4 px-1">
                
                    <div className="w-full px-2">
                        <div className="1435:max-w-[1341px] w-full 1020:max-w-[53rem] 760:max-w-[39.5rem] bg-neutral-900 rounded-xs flex  flex-col mx-auto px-3 py-3 gap-2 ">
                            <LanguageSelect languages={languages} onLanguageSelect={onLanguageSelect} />
                            <div className="w-full flex flex-col text-sm font-light gap-2 md:gap-6.5 md:flex-row ">
                                <p className=" text-nowrap">Select Genres : </p>
                                <div className="p-2 rounded-xs bg-[#111111] border border-[rgba(255,255,255,0.2)] flex gap-2 w-fit flex-wrap items-center justify-center md:justify-start">
                                    {
                                        genres.map((genre : string , index : number) =>(
                                            <button onClick={() => setActiveGenre(genre)} className={`p-2 bg-neutral-700 rounded-xs cursor-pointer ${activeGenre === genre ? 'bg-white text-neutral-700' :  'hover:bg-white hover:text-neutral-700 duration-200'} `} key={index}>
                                                {genre}
                                            </button>
                                        ))
                                    }
                                </div>  
                            </div>
                        </div> 
                    </div>
                                <p className="mx-auto text-neutral-600 text-center w-fit" >{visibleMovies.length} of {filteredMovies.length} Shows & Movies</p>

                    <div className="w-fit grid grid-cols-2 420:grid-cols-2 760:grid-cols-3 1020:grid-cols-4 1435:grid-cols-5 justify-items-center gap-4 mx-auto ">
                        {
                            visibleMovies.map((show : Movie) => (
                                <FavCard 
                                    media={show}
                                    key={show._id}
                                    isFavourite={isFavourites.has(show._id)}
                                    isOverrated={overratedVotes.has(show._id)}
                                    isUnderrated={underratedVotes.has(show._id)}
                                />
                            ))
                        }
                    </div>
                   
                        <LoadButton showsLength={filteredMovies.length}  visibleMoviesLength={visibleMovies.length} displayCount={displayCount} setDisplayCount={setDisplayCount} />
                        <div className="w-full mb-[35px]">

                        </div>
                </div> 
        
        </>
    )
}

interface LoadButtonProps {
    showsLength : number ,
    displayCount : number ,
    visibleMoviesLength : number ,
    setDisplayCount : React.Dispatch<React.SetStateAction<number>>
}

const LoadButton = ({showsLength , displayCount , setDisplayCount , visibleMoviesLength } : LoadButtonProps) =>  {

    if(displayCount >= showsLength ) return null 


    return  (
        <>
            <p className="text-sm text-center text-neutral-600 mx-auto">{`(${visibleMoviesLength} of ${showsLength})`}</p>
            <div className="w-fit flex items-center justify-center space-x-3 mx-auto">
                <button className="bg-green-600 p-2 rounded-xs cursor-pointer active:scale-95 duration-200" onClick={() =>setDisplayCount((count : number) => count+5)}>
                    Load More
                </button>
                <button className="p-2 rounded-xs cursor-pointer border border-[rgba(255,255,255,0.2)]  active:scale-95 duration-200" onClick={() => setDisplayCount(showsLength)}>
                    Load All
                </button>
            </div>
        
        </>
    )
}


