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
    const [activeGenre , setActiveGenre ] = useState('All')
  
    const filteredMovies = useMemo( () => 
         getMovieByGenre(activeGenre, shows),
        [activeGenre, shows]
    )

    const onLanguageSelect = useCallback(async (lang: string) => {
        const selectedMovies = await getMoviesByLanguage(lang)
        const selectedGenres = getUniqueGenres(selectedMovies) // No await
        
        setLanguage(lang)
        setShows(selectedMovies)
        setGenres(selectedGenres)
    }, [])

    useEffect(() => {
        if (language !== 'all') {
            onLanguageSelect(language)
        }
    }, [language, onLanguageSelect])

    return (
        <>
            <HomeSilderSection medias={shows} isFavourites={isFavourites}/>
            
                <div className="border-b w-full border-[rgba(255,255,255,0.1)]">

                </div>
                <div className="max-w-[1450px] border-l border-r border-[rgba(255,255,255,0.1)] min-h-screen mx-auto bg-black/30 py-5 space-y-4">
                    <div className=" max-w-[1365px] w-full bg-neutral-900 rounded-xs flex  flex-col mx-auto px-3 py-3 gap-2 ">
                        <LanguageSelect languages={languages} onLanguageSelect={onLanguageSelect} />
                        <div className="w-full flex flex-col text-sm font-light gap-2 md:gap-6.5 md:flex-row ">
                            <p className=" text-nowrap">Select Genres : </p>
                            <div className="p-2 rounded-xs bg-[#111111] border border-[rgba(255,255,255,0.2)] flex gap-2 w-full flex-wrap ">
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

                    <div className="w-fit grid grid-cols-1 420:grid-cols-2 760:grid-cols-3 1020:grid-cols-4 1435:grid-cols-5 justify-items-center gap-4 mx-auto ">
                        {
                            filteredMovies.map((show : Movie) => (
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
                </div> 
        
        </>
    )
}


