'use client'
import { useEffect, useState } from "react";    
import { getShowData } from "../../lib/helpers";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from 'use-debounce'
import { Search } from 'lucide-react'
export default  function SearchBar ( ){

    const searchParams = useSearchParams()
    const router = useRouter()

    const initialQuery = searchParams.get('search') || ''
    const initialType = (searchParams.get('mediatype') as 'movie' | 'tv') || 'movie'
    const [text,setText] = useState(initialQuery)
    const [mediatype,setMediaType] = useState<'movie' | 'tv' >(initialType)
    const [query] = useDebounce(text,300)
    useEffect(() => {
        
        if(!query){
            router.push('/search')
        }else{
            router.push(`/search?mediatype=${mediatype}&search=${query}`)
        }
        console.log(text)
    },[query,mediatype  ,router])


    return(
        <>
           
                <div className='max-w-[800px]  flex items-center justify-center mx-auto flex-col gap-4 md:mt-60  mt-30 '>
                    <h1 className="xl:text-5xl  text-3xl text-center">Discover Your next Favourtie</h1>
                    <p className="max-w-[500px] text-center font-light text-white/50 xl:text-2xl text-xl">Search through thousands for movies and tv Shows.</p>
                    <div className="w-[80%] h-fit  backdrop-blur-2xl flex md:flex-row flex-col border-white/10 border p-2 gap-2 rounded-xs">
                        <div className=" font-light flex-1 text-center flex items-center justify-center border-white/10 border rounded-xs py-2 cursor-pointer">
                            <select name="mediaType" id="mediaType" value={mediatype} onChange={(e) => setMediaType(e.target.value as "movie" | "tv" )} className=" w-full h-full text-center cursor-pointer outline-0 bg-[#111111]">
                                <option value='movie' className=" text-white cursor-pointer">Movie</option>
                                <option value='tv' className="cursor-pointer">Tv Shows</option>
                            </select>    
                        </div>
                        <div  className="flex flex-3 border-white/10 border font-light text-[0.9rem] outline-white/20 rounded-xs">
                            <div  className=" h-full max-w-[50px] w-full text-xl py-2 text-center  flex items-center justify-center"><Search strokeWidth={1}/></div>
                            <input className=" w-full  px-3 py-2 outline-0 "  placeholder="Search " value={text} onChange={(e) => setText(e.target.value)}/>
                        </div>
                    </div>
                </div>
            
        </>
    )
}
