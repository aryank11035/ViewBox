'use client'

import { ReactNode, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'



const backgroundVariants = {
    hidden : {
       
        backdropFilter: 'blur(0px)',
        transition : {
            duration : 0.2,
        }
    },
    visible : {
        
        backdropFilter: 'blur(5px)',
        transition : {
            duration : 0.2,
        }
    },
}


export default function PopupWrapper({ 
    children, 
    isOpen, 
    onClose 
}: { 
    children: ReactNode
    isOpen: boolean
    onClose: () => void
}) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    if (!mounted) return null

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    variants={backgroundVariants}
                    initial='hidden'
                    animate='visible'
                    exit='hidden'
                    className="fixed inset-0 z-50  flex items-center justify-center px-2"
                    onClick={onClose}
                >
                    <div 
                        className=" relative flex items-center justify-center w-fit h-fit"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
         document.body
    )
}