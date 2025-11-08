'use client'

import {  AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface RemovedMessageProp {
    removed ?: string
}


const mssgVariants = {
    hidden : {
        y : 50,
        transition : {
            duration : 0.3,
        }
    },
    visible : {
        y : 0,
        transition : {
            duration : 0.3,
        }
    }
    
}

export const RemovedMssg = ({removed} : RemovedMessageProp) => {
    
    const [showMessage,setShowMessage] = useState<boolean>(false)


    const [currentMessage , setCurrentMessage] = useState<string | undefined>('')

    useEffect(() => {
        if(removed) {
            setCurrentMessage(removed)
            setShowMessage(true)

            const timer = setTimeout(() => {
                setShowMessage(false)
            },3000)
            return () => clearTimeout(timer)
        }

    },[removed])
    
    
    if(!removed) return null

    return (

        
        <div  className="flex justify-center absolute bottom-35   z-20 text-xs tracking-tighter  w-full">
            <AnimatePresence mode='wait'> 
                {
                    showMessage && (
                        <motion.div
                            variants={mssgVariants}
                            initial='hidden'
                            animate='visible'
                            exit='hidden'
                            transition={{
                                ease : 'easeInOut'
                            }}
                            className=" bg-red-900 backdrop-blur-sm text-red-500 rounded-xs p-2"
                        >
                            {currentMessage}
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </div>

    )
}