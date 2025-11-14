'use client'

import { Search, X } from "lucide-react";
import { Input } from "../ui/input";
import { Movie } from "@/schema/type";


interface HeaderSearchBarProps {
    onSearch : (str : string) => void ,
    cancelButton ?: Movie[] | null , 
    cancelSearch : () => void 
    searchString : string
}

export default function HeaderSearchBar({onSearch , cancelButton , searchString , cancelSearch} : HeaderSearchBarProps){


    const handleSearch = (str : string) => {
        onSearch(str)
    }

    return (
        <>
            <div className="px-2 w-fit ">
                  <Search strokeWidth={0.7} size={24}/>
            </div>      
            <Input className="absolute inset-0 h-full border border-[rgba(255,255,255,0.2)] rounded-xs outline-0 pl-10" placeholder="Search Movies...(Ctrl+k)" onChange={(e) =>handleSearch(e.target.value)} value={searchString}/>
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