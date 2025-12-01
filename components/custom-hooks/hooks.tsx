'use client'
import { ReactNode, useContext, useState } from "react";
import PopUpWrapper from "../../components/popup-wrapper";
import { Clapperboard, X } from 'lucide-react';
import { motion  } from 'framer-motion'
import { closeButtonVariant, mediaSectionVariants } from "../media/playlist/playlist-card/animation-variants";
import {  signIn } from "next-auth/react";
import { createContext } from "react";
import { CircularProgress } from '@mui/material';

export const containerVariants = {
    hidden: {
        opacity: 0,
        scale : 0.9,
        transition: {
            duration: 0.25,
            staggerChildren: 0.05,
            staggerDirection: -1,
            ease: [0.4, 0, 0.2, 1],
            when: 'afterChildren'
        }
    }, 
    visible: {
        opacity: 1,
        scale : 1,
        transition: {
            duration: 0.3,
            staggerChildren: 0.05,
            delayChildren: 0.1,
            when: "beforeChildren",
            ease: [0.4, 0, 0.2, 1] 
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.25,
            staggerChildren: 0.05,
            staggerDirection: -1,
            when: 'afterChildren',
            ease: [0.4, 0, 0.2, 1] 
        }
    }
} as any


interface PopUpContextProps {
    open: boolean 
    closePopup: () => void 
    openPopup: (msg : string) => void
    description : string 
}

const PopUpContext = createContext<PopUpContextProps | undefined>(undefined)

const PopUp = () => {
    
    const { open , closePopup  , description} = UsePopUp()
    const [loading,setLoading] = useState(false)    

    return (
        <PopUpWrapper isOpen={!!open} onClose={closePopup} >
                <motion.div 
                    key="signin-content"
                    
                    variants={containerVariants}
                    className="w-full h-fit px-2 relative">
                    <div className="absolute top-2 right-4 p-1 bg-neutral-600 rounded-xs cursor-pointer" onClick={closePopup}>
                        <motion.div variants={closeButtonVariant}>
                            <X strokeWidth={1.1} size={18}/>
                        </motion.div>
                    </div>
                    <motion.div className="bg-[#111111] rounded-xs border py-6 border-[rgba(255,255,255,0.1)] w-50 md:w-100 z-10">
                        <div className="flex flex-col items-center space-y-2">
                            <div className="text-green-600">
                                <Clapperboard size={40} strokeWidth={1.1}/>
                            </div>
                            <h1 className="md:text-2xl font-bold">Sign In Required</h1>
                            <p className="text-center text-sm text-neutral-600 px-2">{description}</p>
                        </div>
                    </motion.div>
                    <motion.div className="absolute -bottom-12 md:-bottom-14 left-4 -z-10 " variants={mediaSectionVariants}>
                        <div className="w-40 md:w-50 mx-auto p-2 flex gap-2  flex-row items-center bg-black/90 rounded-xs border border-[rgba(255,255,255,0.1)] pt-2.5 text-xs md:text-base ">
                            <button className="bg-green-600 active:scale-90 hover:scale-95 duration-200 hover:bg-white hover:text-green-600 flex-1 rounded-xs cursor-pointer py-2 flex items-center justify-center" 
                                onClick={async () => {
                                    setLoading(true)
                                    await signIn('google')
                                    setLoading(false)
                                    closePopup()
                                }}>
                                   {loading ? (
                                        <CircularProgress size={18} color="inherit" />
                                    ) : (
                                        "sign in"
                                    )}
                                {/* <CircularProgress size={18} color="inherit"/> */}
                            </button>
                            <button className="bg-gray-600 active:scale-90 hover:scale-95 duration-200 hover:bg-white hover:text-gray-600 flex-1 rounded-xs cursor-pointer py-2" onClick={closePopup}>
                                later
                            </button>
                        </div>

                    </motion.div>
                </motion.div>
            </PopUpWrapper>

    )
}


export function PopUpStatesProvider ({children} : { children : ReactNode}) {
    const [open, setOpen] = useState(false);
    const [description,setDescription] = useState('')
    const openPopup = (msg : string) => {
        setOpen(true)
        setDescription(msg)

    }
    const closePopup = () => setOpen(false);

    return (
        <PopUpContext.Provider  value={{open , openPopup , closePopup , description}}>
            {children}
        </PopUpContext.Provider>

    )
}

export const UsePopUp = () :  PopUpContextProps => {
    const context = useContext(PopUpContext)
    if (context === undefined) {
        throw new Error('UsePopUp must be used within a PopUpStatesProvider')
    }
    return context
}




export function SignInPopUp() {

    return <PopUp />
    
}

