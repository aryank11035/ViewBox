'use client'

import { useCallback, useState } from "react"
import { SearchPanel } from "./searchPanel"
import { getSearchMedia } from "@/lib/helpers"
import { ResultDisplay } from "./resultDisplay"

export function SearchWrapper({getMediaInfo} : {getMediaInfo : any}){
    
    const [results , setResults] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState(null)
    
    const [mediaId,setMediaId] = useState<number>()
    const [mediaType,setMediaType] = useState<'movie' | 'tv'>()

    const handleSearch = useCallback( async (query : string ,media : 'movie' | 'tv') => {
        setIsLoading(true)
        setError(null)

        const data = await getSearchMedia(query,media)
        if(!data || data.message){
            setError(data?.message || 'An error occurred')
            setResults([])
        }else{
            setResults(data)
        }
        
        setIsLoading(false)
    },[])
    
    console.log(results)
    

    return (
        <>

            <div className="flex-1 bg-white/10 w-full  p-2  h-fit text-sm  mx-auto rounded-xs gap-2 flex flex-col">

                <SearchPanel 
                    onSearch={handleSearch}
                    
                />
                <div className="w-full  bg-black/20 p-2 rounded-xs flex flex-col h-100 overflow-y-auto gap-2">
                    
                    <ResultDisplay 
                        getMediaInfo={getMediaInfo}
                        results={results}
                        loading={isLoading}
                    />
                </div>
            </div>
        </>
    )
}   