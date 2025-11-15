'use client'

import { Search, X } from "lucide-react";
import { Input } from "../ui/input";
import { Movie } from "@/schema/type";
import { useEffect, useRef } from "react";


interface HeaderSearchBarProps {
    onSearch : (str : string) => void ,
    cancelButton ?: Movie[] | null , 
    cancelSearch : () => void 
    searchString : string
}

function shortCutSearch(key : string  , callback : () =>  void  ) {
    useEffect(() => {
        const handler = (e : KeyboardEvent) => {
            if(e.ctrlKey && e.key.toLowerCase() === 'k') {
                e.preventDefault()
                callback()
            }
        }

        window.addEventListener('keydown' , handler)
        return () => window.removeEventListener('keydown' , handler)
    },[key , callback])
}

export default function HeaderSearchBar({onSearch , cancelButton , searchString , cancelSearch} : HeaderSearchBarProps){


    const inputRef = useRef<HTMLInputElement | null>(null)
    shortCutSearch('key' , () => inputRef.current?.focus())
    const handleSearch = (str : string) => {
        onSearch(str)
    }

    return (
        <>
            <div className="px-2 w-fit ">
                  <Search strokeWidth={0.7} size={24}/>
            </div>      
            <Input className="absolute inset-0 h-full border border-[rgba(255,255,255,0.2)] rounded-xs outline-0 pl-10" placeholder="Search Movies...(Ctrl+k)" onChange={(e) =>handleSearch(e.target.value)} value={searchString} ref={inputRef}/>
            {
                cancelButton && (
                    <div className="px-2 w-fit -right-1 top-2 absolute cursor-pointer" onClick={cancelSearch}> 
                        <X strokeWidth={0.7} size={24}/>
                    </div>
                )
            }
        </>
    )
}