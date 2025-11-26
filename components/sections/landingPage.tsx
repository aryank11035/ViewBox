'use client'

import { Session } from "inspector/promises";
import { motion } from "framer-motion";
import Link from "next/link";
import { HomeButton } from "./infoCardSection";
export function LandingPage({session} : {session :any}){
    return (
        <div className=" mx-auto w-fit  text-3xl md:text-6xl font-bold text-center flex i px-2 h-115 gap-5">
              <motion.div
                initial={{ opacity : 0 , translateY : 15}}
                animate={{ opacity : 1 , translateY : 0 }}
                transition={{
                    duration: 1,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01],
                }}
                className="flex flex-col items-center  justify-center gap-6"
              >

                <div>
                  <h1>Find Your Next <span className="text-green-600">Underrated Movie</span></h1>
                  <h1 className="mt-4.5 text-xs md:text-xl text-neutral-400 font-light">Where movie lovers discover and save exceptional films that flew under the radar..</h1>
                  
                </div>
                <HomeButton/>
              </motion.div>
        </div>
    )
}