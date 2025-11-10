'use client'

import { Search } from "lucide-react";
import { Input } from "../ui/input";

export default function HeaderSearchBar(){
    return (
        <>
            <div className="px-2 w-fit ">
                  <Search strokeWidth={0.7} size={24}/>
            </div>      
            <Input className="absolute inset-0 h-full border border-[rgba(255,255,255,0.2)] rounded-xs outline-0 pl-10" placeholder="Search Movies...(Ctrl+k)"/>
        </>
    )
}