'use client'

import { Session } from "inspector/promises";
import { motion } from "framer-motion";
import Link from "next/link";
export function LandingPage({session} : {session :any}){
    return (
        <div className=" mx-auto w-fit min-h-screen text-3xl md:text-5xl font-bold text-center flex items-center flex-col justify-center absolute z-10 inset-0">
              <motion.div
                initial={{ opacity : 0 , translateY : 15}}
                animate={{ opacity : 1 , translateY : 0 }}
                transition={{
                    duration: 1,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <h1>Track the Films You have Watched.</h1>
                <h1 className="mt-4.5">Save those you want to see.</h1>
                {
                  !session && (
                    <Link href='/auth/login'>
                      <button className="text-xl shadow-xl shadow-black/50 border border-green-600 bg-green-600 px-3 py-2 mt-10 rounded-xs md:text-2xl md:px-6 md:py-4 hover:bg-green-200 hover:text-green-600 hover:border-white/10 duration-300 hover:scale-95 cursor-pointer">Get Started!-it's free</button>
                    </Link>
                  )
                }
              </motion.div>
        </div>
    )
}