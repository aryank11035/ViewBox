'use client'

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { Select } from "../Select";


export function SearchPanel({onSearch} : {onSearch : any }){

    const [search,setSearch] = useState<string>('')
    const [mediaType,setMediaType] = useState<'movie' | 'tv' >('movie')

    console.log(mediaType)
    useEffect(() => {
        if(!search.trim()){
            return
        }

        const debounceTimer = setTimeout(() => {
            onSearch(search,mediaType )
        },500)

        return () =>clearTimeout(debounceTimer)
    },[search,mediaType,onSearch])
  


  
    return (
        
            <div className="w-full  bg-black/20 p-2 rounded-xs flex flex-col gap-2 ">
                <div className="relative h-12">
                    <Search className="absolute bottom-3 left-3 text-white/50" strokeWidth={1}/>
                    <Input type="text" className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12 absolute ins  et-0 pl-12" placeholder="Search movies" value={search} onChange={(e) => setSearch(e.target.value)}/>
                </div>
                <div className="w-full relative h-12">
                <Select onSelectChange={(value : any) =>setMediaType(value)}/>  

                </div>
            </div>
            
      
    )
}   