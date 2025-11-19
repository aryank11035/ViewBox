'use client'

import { Movie } from "@/schema/type"
import { useEffect, useState } from "react"
import HeaderSearchBar from "../header/search-bar"
import { getMovieThroughSearch } from "@/app/actions/getMovie"
import { MediaOnSearch } from "../header/mainHeader"
import { getSearchData } from "@/lib/helpers"
import { addToSugestions } from "@/app/actions/suggestions"
import { MdWarning } from "react-icons/md"
import { BsCheckCircle, BsExclamationTriangle } from "react-icons/bs"


interface ResponseProps {
    sucess ?:boolean 
    error ?:string ,
    exists ?: string ,
    message ?: string 
}

export function SuggestFrom(){

    const [searchString,setSearchString] = useState('')
    const [searchedMedia,setSearchedMedia] = useState<Movie [] | null>(null)
    const [clickedMedia , setClickedMedia] = useState<Movie | null> (null)
    const [reason, setReason] = useState('');
    const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie');
    const [response , setResponse] = useState<ResponseProps | null> (null)

    const onSearch = (str : string) => {
        setSearchString(str)
        setClickedMedia(null)
        setResponse(null)
        setReason('')
    }

    const cancelSearch = () => {
        setSearchString('')
        setSearchedMedia(null)
        setResponse(null)
        setReason('')
    }

    const onMediaClick = (media : Movie) => {
        setClickedMedia(media)
    }
    
    useEffect(() => {
        if (!searchString.trim()) {
            setSearchedMedia(null);
            return;
        }

        const timeout = setTimeout( async () => {
        const movies = await getSearchData(searchString ,mediaType)
        setSearchedMedia(movies)
        }, 300); 

        return () => clearTimeout(timeout); 
    }, [searchString,mediaType]);

    
    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault()
        const suggestedMedia = {
            id : clickedMedia?.id ,
            name : clickedMedia?.original_name || clickedMedia?.title ,
            type : clickedMedia?.mediaType ,
            reason
        }

        const result = await addToSugestions(suggestedMedia)
        setResponse(result)
    
    }

    return (
        <div className="rounded-xs p-2 md:p-4 bg-neutral-800  mx-auto  max-w-xl  border border-[rgba(255,255,255,0.1)]">
                    <h1 className="text-2xl font-bold tracking-tight mb-6">
                        Suggest us some underrated Movie or Shows
                    </h1>
            <form className="bg-neutral-900 p-2 rounded-xs flex h-fit flex-col gap-2" onSubmit={handleSubmit}>
                <div className="text-neutral-400 space-y-1">
                    <p>Search for an Movie or a Show</p>
                    <div className="w-full flex gap-2 flex-col md:flex-row">
                        <div className="relative w-full h-fit p-1 py-2">
                            <HeaderSearchBar onSearch={onSearch} cancelSearch={cancelSearch} cancelButton={searchedMedia} searchString={searchString}/>
                        </div>
                        <div>
                           <select 
                                value={mediaType}
                                onChange={(e) => setMediaType(e.target.value as 'movie' | 'tv')}
                                className="h-full bg-[#111111] text-neutral-100 rounded-xs px-3 py-2 border border-[rgba(255,255,255,0.1)] focus:border-[rgba(255,255,255,0.2)] focus:outline-none cursor-pointer text-sm w-full md:w-fit"
                            >
                                <option value="movie">Movie</option>
                                <option value="tv">TV Show</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="w-full  relative">
                    <div className="flex flex-col gap-2">
                        {
                            clickedMedia ? (
                                <div className="w-full bg-[#111111]/90 text-sm rounded-xs p-2 h-28 flex gap-2 border border-[rgba(255,255,255,0.1)]">
                                    <div className="h-full aspect-[2/3] relative rounded-xs">
                                        <img
                                        src={clickedMedia.poster_path ? `https://image.tmdb.org/t/p/w500${clickedMedia.poster_path}` : '/placeholder-movie.jpg'}
                                        alt={clickedMedia.name ? clickedMedia.name : clickedMedia.title }
                                        className="absolute inset-0 rounded-xs" 
                                        />
                                    </div>
                                    <div className="flex-3 flex flex-col gap-1 p-1 tracking-tight">
                                        <h1>{clickedMedia.name ? clickedMedia.name : clickedMedia.title }</h1>
                                        <p className="text-xs text-neutral-400 font-light">{clickedMedia.release_date}</p>
                                        <div className="w-full">
                                            <div className='flex gap-2 items-center'>
                                                <img
                                                src="/logo-imdb.svg"
                                                alt="IMDb Logo"
                                                className="w-8 h-auto"
                                                />
                                                <h1 className="text-xs font-light">{clickedMedia.vote_average ? `${clickedMedia.vote_average.toFixed(1)}/10` : 'NA'}</h1>
                                            </div>
                                        </div>
                                        <button className="w-fit text-rose-500 cursor-pointer" onClick={() =>setClickedMedia(null)}>remove</button>
                                    </div>
                                </div>
                            ) : (
                                <MediaOnSearch medias={searchedMedia} cancelSearch={cancelSearch} forHeaderAbsolute={false} forHeaderWidth={false} onMediaClick={onMediaClick} disableLink={true}/>
                            )
                        }
                    </div>
                </div>
                <div className="text-neutral-400 space-y-1">
                    <p>Why this is underrated</p>   
                     <textarea 
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-full bg-[#111111] text-neutral-100 rounded-xs p-3 border border-[rgba(255,255,255,0.1)] focus:border-[rgba(255,255,255,0.2)] focus:outline-none resize-none transition-colors text-xs"
                        rows={8}
                        placeholder="Share your thoughts on why this movie or show deserves more attention..."
                    />
                </div>
                <SuggestionExists exists={response?.exists}/>
                <SuggestionError error={response?.error}/>
                <SuggestionMessage message={response?.message}/>
                <button 
                    type="submit"
                    disabled={!clickedMedia || !reason.trim()}
                    className="w-full bg-green-600 hover:bg-white cursor-pointer hover:text-green-600 text-white font-medium py-2.5 rounded-xs transition-colors disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed"
                >
                    Submit Suggestion
                </button>
            </form>
        </div>
    )
}




const SuggestionExists = ({exists} : {exists ?: string }) => {
    if(!exists) return null
    return (
        <div className="w-full py-2.5 bg-yellow-500/15 text-sm text-yellow-500 border border-yellow-500/50 rounded-xs px-2 flex text-center justify-center gap-2  flex-wrap">
            <MdWarning size={18}/>
            <div className="border-l h-5 w-fit border-yellow-500/50"></div>
            {exists}
        </div>
    )
}

const SuggestionError = ({error}: {error ?:string } ) => {

    if(!error) return null

    return (
        <div className="w-full py-2.5 bg-destructive/50 text-sm text-destructive border border-destructive/50 rounded-xs px-2 flex text-center justify-center gap-2  flex-wrap">
            <BsExclamationTriangle size={18}/>
            <div className="border-l h-5 w-fit border-destructive/50"></div>
            {error}
        </div>
    )
}

const SuggestionMessage = ({message}: {message ?:string } ) => {

    if(!message) return null

    return (
        <div className="w-full py-2.5 bg-emerald-500/15 text-sm text-emerald-500 border border-emerald-500/50 rounded-xs px-2 flex text-center justify-center gap-2  flex-wrap">
            <BsCheckCircle size={18}/>
            <div className="border-l h-5 w-fit border-emerald-500/50"></div>
            {message}
        </div>
    )
}