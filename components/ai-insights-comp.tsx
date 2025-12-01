'use client'

import { Movie } from "@/schema/type"
import { Sparkles } from "lucide-react"
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from "react"
import { getInsights } from "@/app/actions/getInsights"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const analysisVariants = {
    hidden: { 
    opacity: 0, 
    y: 3,
    filter: "blur(10px)"
    },
    visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.2
    }
    },
    exit: {
    opacity: 0,
    y: 3,
    filter: "blur(5px)",
    transition: {
        duration: 0.3
    }
    }
} as any 


export default function AIGenerateInsightsComp({allMediaData } : {allMediaData : Movie}){

    const movieGenres = allMediaData.genres.map((genre :  { name : string } , index : number) => (
        <span key={index} className="whitespace-normal inline-block bg-neutral-900 rounded-xs px-2">
            {genre.name}
            {index < allMediaData.genres.length - 1 && ','}
        </span>
    )) || '....'
    const [ showMessage,setShowMessage] = useState(false)
    const [insights,setInsights] = useState<string | undefined>(undefined)
    const [loading,setLoading] = useState<boolean>(false)

    const handle = async (spoilerType: string) => {
        setLoading(true);

        const res = await getInsights(allMediaData, spoilerType);

        if (res.success) setInsights(res.result);
        else setInsights(res.error);

        setLoading(false);
    };

    return (
        <>
        <div className="w-full  space-y-3">
            {
                insights ? (
                    <div className="w-full flex flex-wrap justify-between items-center min-h-30 bg-neutral-900 p-4 rounded-xs gap-6">
                            <h1 className="text-4xl font-bold">Philosophy & Psychology</h1>
                            <motion.span 
                                className="whitespace-pre-line text-sm text-neutral-300 bg-neutral-800 p-2 rounded-xs overflow-y-auto h-70 pb-30 mask-b-from-50%"
                                initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {insights}
                                </ReactMarkdown>
                            </motion.span>
                        </div>
                ) : (
                    
                        !loading ? (
                            <>
                            <div className="w-full flex flex-wrap justify-between items-center gap-2">
                                <h1 className="text-4xl font-bold">Why it&apos;s worth watching</h1>

                                <motion.button 
                                    onClick={() => setShowMessage(true)}
                                    className="text-sm bg-green-600 hover:text-green-600 hover:bg-white rounded-xs px-3 py-2 duration-200 hover:scale-98 active:scale-95 cursor-pointer flex items-center gap-2 w-full text-center justify-center md:w-fit group"
                                >
                                    Generate AI Insights 
                                    <span className="group-hover:scale-110 duration-300">
                                        <Sparkles strokeWidth={1.1} size={18}/>
                                    </span> 
                                </motion.button>
                            </div>
                            <div className=" bg-neutral-800 p-2 rounded-xs h-fit">
                                <AnimatePresence mode="wait">
                        
                                {
                                    !showMessage ? (
                                        <motion.p 
                                        
                                            animate='visible'
                                            exit='exit'
                                            variants={analysisVariants}
                                            className="leading-7.5 tracking-tight text-xs space-y-1">
                                                This movie stands out for its {movieGenres} elements compelling storytelling. 
                                                With a {Number(allMediaData.vote_average.toFixed()) >= 6 ? 'strong' : ''} <span className="px-2 h-fit bg-neutral-900 rounded-xs whitespace-normal inline-block">{allMediaData.vote_average.toFixed(1)} IMDb rating</span> , 
                                                {`it${`&apos;`}s`} clear that many viewers have found it engaging. The <span className="px-2 bg-neutral-900 rounded-xs whitespace-normal inline-block">{allMediaData.mediaType === 'movie' ? `film's` : `show's`} </span> exploration of its themes and 
                                                the performances of its cast make it a noteworthy addition to the <span className="px-2  bg-neutral-900 rounded-xs whitespace-normal inline-block">{allMediaData.first_air_date ? allMediaData.first_air_date.split('-')[0]  : allMediaData.release_date?.split('-')[0]}</span> roster of releases.
                                        </motion.p> 
    
                                    ) : (
    
                                        <motion.div 
                                            initial='hidden'
                                            animate='visible'
                                            exit='exit'
                                            variants={analysisVariants}
                                            className="flex gap-2 justify-between flex-col md:flex-row">
                                            <div className="space-y-3 ">
                                                <h1 className="text-xl font-bold">Choose Analysis type</h1>
                                                <p className="text-sm   ">Would you like to include analysis in your spoiler?</p>
                                            </div>
                                            <div className="w-fit flex gap-2 text-sm text-center items-center flex-col">
                                                {/* create a function a generates a text which is spoiler free in throup api */}
                                                <button className="bg-green-600 rounded-xs px-2 py-2 hover:scale-98 active:scale-95 duration-200 cursor-pointer h-fit w-full" onClick={() => handle("spoiler-free")}>
                                                    Spoiler free
                                                </button>
                                                {/* create a function a generates a text which is not spoiler  in throup api */}
                                                <button className="bg-rose-600 rounded-xs px-2 py-2 hover:scale-98 active:scale-95 duration-200 cursor-pointer h-fit w-full"   onClick={() => handle("include-spoilers")}>
                                                    Include spoilers
                                                </button>
                                            </div>
                                        </motion.div>
                                    )
                                }
                                </AnimatePresence>
                            
                            </div>
                        </>

                        ) : (
                             <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-neutral-900 rounded-xs p-4 h-fit overflow-hidden relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-b from-neutral-800/40 to-neutral-900" />

                        
                                    <div className="animate-pulse space-y-3">
                                        <div className=" bg-neutral-700/50 rounded-xs w-1/2 h-10"></div>
                                        <div className="h-70 bg-neutral-700/40 rounded-xs w-full"></div>
                                    </div>
                                

                                    {/* shimmering overlay */}
                                    <motion.div
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "100%" }}
                                        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                                    />
                                </motion.div>
                        )
                    
                )
            }
        </div>
        
        </>
)
}