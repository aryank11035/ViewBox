'use client'
import { useEffect, useState } from "react";
import { getShowData } from "../ts/getData";
import { useRouter } from "next/navigation";
import { useDebounce } from 'use-debounce'

export default  function Search ( ){
    const router = useRouter()
    const [text,setText] = useState('')
    const [query] = useDebounce(text,300)
    useEffect(() => {
        if(!query){
            router.push('/search')
        }else{
            router.push(`/search?search=${query}`)
        }
        console.log(text)
    },[query,router])


    return(
        <>
           
                <div className='max-w-[800px]  flex items-center justify-center mx-auto flex-col gap-4 md:mt-60  mt-30'>
                    <h1 className="xl:text-5xl  text-3xl text-center">Discover Your next Favourtie</h1>
                    <p className="max-w-[500px] text-center font-light text-white/50 xl:text-2xl text-xl">Search through thousands for movies and tv Shows.</p>
                    <div className="w-[80%] h-fit  backdrop-blur-2xl flex md:flex-row flex-col border-white/10 border p-2 gap-2 rounded-xs">
                        <div className="text-sm font-light flex-1 text-center flex items-center justify-center border-white/10 border rounded-xs py-3">
                            <select>
                                <option>
                                    Movies & TV shows  
                                </option>
                                <option>Movie</option>
                            </select>    
                        </div>
                        <div  className="flex flex-2 border-white/10 border font-light text-[0.9rem] outline-white/20 rounded-xs">
                            <input className=" w-full flex-4 px-3 py-2 outline-0"  placeholder="Search " value={text} onChange={(e) => setText(e.target.value)}/>
                            <button type="submit" className="bg-white/10 h-full w-full flex-1 text-xl py-2 px-2">O</button>
                        </div>
                    </div>
                </div>
            
        </>
    )
}
