'use client'

import {  updateOverrated, updateUnderrated } from "@/app/actions/votes"
import { IoMdThumbsUp , IoMdThumbsDown } from "react-icons/io";
import { SignInPopUp, UsePopUp } from "@/components/custom-hooks/hooks";
import { useCallback, useTransition } from "react";

interface VotesCompProps {
    id : string ,
    overrated : number , 
    underrated : number ,
    overratedVoted ?: boolean , 
    underratedVoted ?: boolean , 
}


export default function VotesComp({votes , onOverrateVoteChange , onUnderrateVoteChange , icon , page = true , session } : { page ?: boolean , votes : VotesCompProps , onOverrateVoteChange ?: ( vote : boolean , number : number) => void ,onUnderrateVoteChange ?: ( vote : boolean , number : number) => void  , icon : boolean , session : any }){

    
    const { openPopup } = UsePopUp()

    
    const [isPendingOverrated , startTransitionOverrated] = useTransition()
    const [isPendingUnderrated , startTransitionUnderrated] = useTransition()

    const handleOverrated = useCallback(async () =>  {

        if(!session) return openPopup('please sign in to vote')

        const newOverrateState = !votes.overratedVoted
        const overratedCount = newOverrateState ? votes.overrated + 1 : votes.overrated - 1

        if(votes.underratedVoted){
            onUnderrateVoteChange?.(false , votes.underrated -1 )
        }

        onOverrateVoteChange?.(newOverrateState , overratedCount)


        startTransitionOverrated( async () => {
            try {
                if(votes.underratedVoted) {
                    const res = await updateUnderrated(votes.id)
                    if(res?.voted === false) {
                        onUnderrateVoteChange?.(res.voted , res.count)
                    }
                }
        
                const result = await updateOverrated(votes.id)
                if(result !== undefined) {
                    onOverrateVoteChange?.(result.voted , result.count) 
                }
            } catch (error) {
                console.error('Failed to update overrated vote:', error)
                onOverrateVoteChange?.(votes.overratedVoted || false, votes.overrated)
                if (votes.underratedVoted) {
                    onUnderrateVoteChange?.(true, votes.underrated)
                }
            }
        })

    },[session,onOverrateVoteChange,onUnderrateVoteChange,votes,openPopup])

    const handleUnderrated = useCallback(async () =>  {
      
        if(!session) return openPopup('please sign in to vote')

        const newUnderratedState = !votes.underratedVoted
        const underratedCount = newUnderratedState ? votes.underrated + 1 : votes.underrated - 1

        if(votes.overratedVoted){
            onOverrateVoteChange?.(false , votes.overrated - 1)
        }

        onUnderrateVoteChange?.(newUnderratedState,underratedCount)

        startTransitionUnderrated(async () => {
            try{
                if(votes.overratedVoted) {
                    const res = await updateOverrated(votes.id)
                    if(res?.voted === false) {
                        onOverrateVoteChange?.(res.voted , res.count)
                    }
                }
        
                const result = await updateUnderrated(votes.id)
                if(result !== undefined) {
                    onUnderrateVoteChange?.(result.voted ,result.count)  
                }
            }catch(error){
                console.error('failed to update underrated vote' , error)
                onUnderrateVoteChange?.(votes.underratedVoted || false , votes.underrated)
                if(votes.overratedVoted){
                    onOverrateVoteChange?.(true,votes.overrated)
                }
            }
        })

    },[session,votes,openPopup,onOverrateVoteChange,onUnderrateVoteChange])



    return (

        <>
        
            <SignInPopUp/>
            
            {

                icon ? (
                    <div
                        className=" size-10 self-end flex flex-col h-fit items-center  w-full backdrop-blur-3xl border border-[rgba(255,255,255,0.2)] gap-1 bg-black/30 px-1"
                    >
                        <button 
                            onClick={handleUnderrated}
                            className={`text-xs flex gap-1 font-light ${votes.underratedVoted ? 'text-green-400' : 'text-white' } rounded-xs hover:bg-black/20 duration-200  p-1 mt-1 cursor-pointer flex items-center justify-center  w-full`}
                        >
                            {votes.underrated}
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
                            className={`text-xs flex gap-1 font-light  ${votes.overratedVoted ? 'text-[#E11D48]' : 'text-white'}  rounded-xs hover:bg-black/20 duration-200 w-full p-1 mb-1 cursor-pointer flex items-center justify-center `}
                        >
                                {votes.overrated} 
                                <span className="text-base mt-0.5">
                                    <IoMdThumbsDown />
                                </span>
                        </button>
                    </div>
                ) : (
                    <div className={`${page ? 'space-x-3' : 'space-x-2'} flex h-fill  text-sm flex-col gap-2 md:flex-row md:gap-0`}>
                        <button 
                            style={{
                                backgroundColor : votes.underratedVoted ? '#16A34A' : '',
                                borderColor : votes.underratedVoted ? '#16A34A' : '#FFFFFF33'
                            }}  
                            onClick={handleUnderrated}
                            className=" rounded-xs px-4 py-1.5 border border-[rgba(255,255,255,0.2)]  duration-100 cursor-pointer  active:scale-98 flex gap-2 items-center w-full md:w-fit group hover:scale-98 ">
                            <span className=" text-center flex items-center text-base group-hover:scale-120 duration-200">
                                <IoMdThumbsUp />
                            </span>
                            Underrated 
                            <span>{votes.underrated}</span>
                        </button>
                        <button 
                            style={{
                                backgroundColor : votes.overratedVoted ? '#E11D48' : '',
                                borderColor : votes.overratedVoted ? '#E11D48   ' : '#FFFFFF33'
                            }}
                            onClick={handleOverrated} 
                            className=" rounded-xs px-4 py-1.5 border border-[rgba(255,255,255,0.2)] duration-100 cursor-pointer active:scale-98 flex gap-2 items-center w-full md:w-fit group hover:scale-98">
                            <span className=" text-center flex items-center text-base mt-1 group-hover:scale-120 duration-200">
                                <IoMdThumbsDown />
                            </span>
                            Overrated 
                            <span>{votes.overrated}</span>
                        </button>
                    </div>
                )
            }
        
        </>
        )
}