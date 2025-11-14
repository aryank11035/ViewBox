'use client'

import { useRouter, useSearchParams } from 'next/navigation'


export default function SortOption({ 
    sortBy 
}: { 
    sortBy: string
}) {
    const router = useRouter()
    const searchParams = useSearchParams()
   
    const handleSortChange = (sort: string) => {
     
        const params = new URLSearchParams(searchParams.toString())
        params.set('sortBy', sort)
        const newUrl = params.toString() ? `?${params.toString()}` : ''
        router.push(newUrl || '/favourites', { scroll: false })

    
    }

    return (
        <div className="flex items-center gap-2 justify-between md:justify-center    md:w-fit w-full">
            <label htmlFor="sort-select" className="text-sm font-light  text-white">
                Sort by:
            </label>
            <select 
                id="sort-select"
                value={sortBy} 
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-4 py-2 bg-[#111111] text-white rounded-xs border border-[rgba(255,255,255,0.2)] focus:outline-none focus:border-white/30 disabled:opacity-50 transition-opacity text-[0.6rem]"
            > 
                <option value="title"   >Title </option>
                <option value="year">Year </option>
                <option value="rating">Rating </option>
            </select>
        </div>
    )
}