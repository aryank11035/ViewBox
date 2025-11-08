'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"


interface genreOptionProps {
    allGenres : string []
    selectedGenre : string
}

export default function GenreOption({allGenres , selectedGenre} : genreOptionProps){

    const router = useRouter()
    const searchParams = useSearchParams()
    const [isPending , startTransistion] = useTransition()

    const handleChange = (genre : string) => {
        const params = new URLSearchParams(searchParams.toString())

         if (genre === 'All Genres') {
            params.delete('genre')
        } else {
            params.set('genre', genre)
        }
    
        const newUrl = params.toString() ? `?${params.toString()}` : ''
            router.push(newUrl || '/favourites', { scroll: false })

    }




    return (
        <>


            <div className="flex items-center gap-2 justify-between ">
                <label htmlFor="genre-select" className="text-sm font-light  text-white">
                    Select genre:
                </label>
                <select value={selectedGenre} onChange={(e) => handleChange(e.target.value)} id="genre-select" className="px-4 py-2  bg-[#111111] text-white rounded-xs border border-[rgba(255,255,255,0.2)] focus:outline-none focus:border-white/30 disabled:opacity-50 transition-opacity text-[0.6rem]"> 
                    {
                        allGenres.map((genre : string , index : number) => (
                            <option value={genre} key={index}>
                                {genre}
                            </option>
                        ))
                    }
                </select>
            </div>


        </>
    )
}