'use client'

import {  AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface AddedMessageProp {
    added ?: string
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

export const AddedMssg = ({added} : AddedMessageProp) => {
    const [showMessage,setShowMessage] = useState<boolean>(false)
    

    const [currentMessage , setCurrentMessage] = useState<string | undefined>('')

    useEffect(() => {
        if(added) {
            setCurrentMessage(added)
            setShowMessage(true)

            const timer = setTimeout(() => {
                setShowMessage(false)
            },3000)
            return () => clearTimeout(timer)
        }

    },[added])

    
    
    if(!added) return null

    return (

        
        <div  className="flex justify-center absolute bottom-20 md:bottom-35   z-50 md:z-30 text-[0.5rem] md:text-xs tracking-tighter  w-full">
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
                            className=" bg-emerald-900 backdrop-blur-sm text-emerald-500 rounded-xs p-2"
                        >
                            {currentMessage}
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </div>

    )
}