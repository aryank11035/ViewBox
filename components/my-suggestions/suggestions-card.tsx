'use client'

import { motion } from 'framer-motion'

const childVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], 
      y: { type: "spring", stiffness: 60, damping: 12 },
      opacity: { duration: 0.4 },
      filter: { duration: 0.5 }
    }
  }
} as any;
export function SuggestionsCard({media} : any ){
    return (
                         
        <motion.div className="bg-neutral-900 rounded-xs  w-full  flex flex-col border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)] duration-200 relative " key={media._id}
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={childVariants}
        >
            <div className="absolute right-2 top-2  px-2 py-1 border border-[rgba(255,255,255,0.1)] rounded-xs text-sm bg-[#111111]/80 z-20 backdrop-blur-3xl">{media.status}</div>
            <div className=" h-50 w-full ">
                <img
                    src={`https://image.tmdb.org/t/p/original${media.suggestions_id.backdrop}`}
                    className="absolute inset-0 object-cover w-full h-full "
                    alt={media.suggestions_id.suggested_Name}
                />
            </div>
            <div className="w-full flex-2 border-t border-[rgba(255,255,255,0.1)] p-2 space-y-1 bg-[#111111]/80 z-20 backdrop-blur-3xl">
                <p className=" font-bold min-w-0 break-words">{media.suggestions_id.suggested_Name}</p>
                <p className="font-light text-neutral-600">{media.suggestions_id.release_date.split('-')[0]}</p>
                <p className="font-light min-w-0 break-words truncate cursor-default" title={media.reason}>{media.reason}</p>
                <p className="font-light text-neutral-600 text-xs border-t border-[rgba(255,255,255,0.1)] pt-2">
                    Suggested On : {new Date(media.suggested_on).toLocaleDateString("en-GB")}</p>
            </div>
        </motion.div>
    
                            
    )
}