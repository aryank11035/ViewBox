'use client'

import { useSearchParams , useRouter } from "next/navigation"


export default function VoteOption({
    voted 
} : {
    voted ?: string
}){

    const router = useRouter()
        const searchParams = useSearchParams()
       
        const handleVoteChange = (vote: string) => {
         
            const params = new URLSearchParams(searchParams.toString())
            params.set('voted', vote)
            const newUrl = params.toString() ? `?${params.toString()}` : ''
            router.push(newUrl || '/favourites', { scroll: false })
    
        
        }
    
    return (
        <div className="flex items-center gap-2 justify-between md:justify-center  md:w-fit w-full">
            <label htmlFor="sort-select" className="text-sm font-light  text-white">
                Votes by:
            </label>
            <select 
                id="sort-select"
                value={voted} 
                onChange={(e) => handleVoteChange(e.target.value)}
                className="px-4 py-2 bg-[#111111] text-white rounded-xs border border-[rgba(255,255,255,0.2)] focus:outline-none focus:border-white/30 disabled:opacity-50 transition-opacity text-[0.6rem]"
            > 
                <option value="both">both </option>
                <option value="underrated">underrated</option>
                <option value="overrated">overrated</option>
            </select>
        </div>
    )
}