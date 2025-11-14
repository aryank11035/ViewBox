'use client'

import {  updateOverrated, updateUnderrated } from "@/app/actions/votes"
import {  useState } from "react"
import { IoMdThumbsUp , IoMdThumbsDown } from "react-icons/io";

interface VotesCompProps {
    id : string ,
    overrated : number , 
    underrated : number ,
    overratedVoted ?: boolean , 
    underratedVoted ?: boolean ,  
}


export default function VotesComp({votes , onOverrateVoteChange , onUnderrateVoteChange , icon} : { votes : VotesCompProps , onOverrateVoteChange ?: ( vote : boolean) => void ,onUnderrateVoteChange ?: ( vote : boolean) => void  , icon : boolean}){

    const [overrateNumber,setOverratedNumber] = useState<number>(votes.overrated)
    const [underrateNumber,setUnderratedNumber] = useState<number>(votes.underrated)

    const handleOverrated = async () =>  {
        if(votes.underratedVoted) {
            const res = await updateUnderrated(votes.id)
            if(res?.voted === false) {
                onUnderrateVoteChange?.(res.voted)
                setUnderratedNumber(res.count)
            }
        }

        const result = await updateOverrated(votes.id)
        if(result !== undefined) {
            onOverrateVoteChange?.(result.voted)
            setOverratedNumber(result.count)  
        }
    }

     const handleUnderrated = async () =>  {
        if(votes.overratedVoted) {
            const res = await updateOverrated(votes.id)
            if(res?.voted === false) {
                onOverrateVoteChange?.(res.voted)
                setOverratedNumber(res.count)
            }
        }

        const result = await updateUnderrated(votes.id)
        if(result !== undefined) {
            onUnderrateVoteChange?.(result.voted)
            setUnderratedNumber(result.count)  
        }
    }



    return (

        
            icon ? (
                <div
                    className=" size-10 self-end flex flex-col h-fit items-center  w-full backdrop-blur-3xl border border-[rgba(255,255,255,0.1)] gap-1 bg-black/30 px-1"
                >
                    <button 
                        onClick={handleUnderrated}
                        className={`text-xs flex gap-1 font-light ${votes.underratedVoted ? 'text-green-400' : 'text-white' } rounded-xs hover:bg-black/20 duration-200  p-1 mt-1 cursor-pointer flex items-center justify-center  w-full`}
                    >
                        {underrateNumber}
                        <span className="text-base mb-0.5">
                            <IoMdThumbsUp />
                        </span>
                    </button>

                    <div className="w-full px-1">
                            <div className="w-full border-t border-[rgba(255,255,255,0.1)] rounded-xs">

                            </div>
                    </div>

                    <button 
                        onClick={handleOverrated}
                        className={`text-xs flex gap-1 font-light  ${votes.overratedVoted ? 'text-[#E11D48]' : 'text-white'}  rounded-xs hover:bg-black/20 duration-200 w-full p-1 mb-1 cursor-pointer flex items-center justify-center   `}
                    >
                            {overrateNumber} 
                            <span className="text-base mt-0.5">
                                <IoMdThumbsDown />
                            </span>
                    </button>
                </div>
            ) : (
                <div className="space-x-3 flex h-fill mb-8 text-sm flex-col gap-2 md:flex-row md:gap-0">
                    <button 
                        style={{
                            backgroundColor : votes.underratedVoted ? '#16A34A' : '',
                            borderColor : votes.underratedVoted ? '#16A34A' : '#FFFFFF33'
                        }}  
                        onClick={handleUnderrated}
                        className=" rounded-xs px-4 py-1.5 border border-[rgba(255,255,255,0.2)] hover:border-green-60 duration-100 cursor-pointer  hover:scale-98 flex gap-2 items-center w-full md:w-fit">
                        <span className=" text-center flex items-center text-base ">
                            <IoMdThumbsUp />
                        </span>
                        Underrated 
                        <span>{underrateNumber}</span>
                    </button>
                    <button 
                        style={{
                            backgroundColor : votes.overratedVoted ? '#E11D48' : '',
                            borderColor : votes.overratedVoted ? '#E11D48   ' : '#FFFFFF33'
                        }}
                        onClick={handleOverrated} 
                        className=" rounded-xs px-4 py-1.5 border border-[rgba(255,255,255,0.2)] hover:border-green-60 duration-100 cursor-pointer hover:scale-98 flex gap-2 items-center w-full md:w-fit">
                        <span className=" text-center flex items-center text-base mt-1">
                            <IoMdThumbsDown />
                        </span>
                        Overrated 
                        <span>{overrateNumber}</span>
                    </button>
                </div>
            )
        )
}