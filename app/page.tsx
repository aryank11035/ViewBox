import { auth } from "@/auth";
import { getMovie } from "./actions/getMovie";
import {  getImages, getShowData } from "@/lib/helpers";

import Link from "next/link";
import PosterMarqueeStandalone from "@/components/poster-marquee";
import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur";
import UpdatedSection from "@/components/sections/updatedSection";
import { LandingPage } from "@/components/sections/landingPage";

import { SlFilm } from "react-icons/sl";
import { FaRegStar } from "react-icons/fa";
import { Users } from 'lucide-react';
import { Sparkles } from 'lucide-react';
import { InfoCardSection } from "@/components/sections/infoCardSection";

export default async function Page() {
    
  const session = await auth()
  const movies = await getShowData() 
  const tv = await getShowData('tv') 
  const yourMedia =await getMovie() 
  
// console.log(yourMedia)
 
 
  
  return (

      <>

        <section className="max-w-[1450px] min-h-screen mx-auto relative bg-[#111111] border-l border-r border-white/10">
            <div className="absolute mask-b-from-10% mask-b-to-100%">
              <PosterMarqueeStandalone images={await getImages()}/>
              
             <div className="absolute inset-0 bg-[#111111]/70 z-10"></div>
              {/* <ProgressiveBlur
                  className='pointer-events-none absolute bottom-0 left-0 h-[50%] w-full'
                  blurIntensity={1}        
              /> */}
            </div>
            <LandingPage session={session}/>
        </section>
        <div className="w-full border-t border-b border-white/10 h-20">
              <div className="max-w-[1450px] border-l border-r border-white/10 mx-auto h-full flex  md:justify-start justify-center items-end px-2 ">
                <h1 className="text-2xl md:text-3xl font-semibold text-white/10 tracking-widest">{`Popular Movies...`}</h1>
              </div> 
        </div>
        <section className="w-full mx-auto  bg-black/30">
        {/* <div className="absolute inset-0 z-10 left-0 top-0 blur-3xl">
            <ProgressiveBlur
            className='pointer-events-none absolute top-0 left-0 h-full w-[200px]'
            direction='left'
            blurIntensity={1}
          />
        </div> */}
          
              <UpdatedSection mediaData={yourMedia} />
          
        </section>
        <div className="w-full border-t border-b border-white/10 h-20">
              <div className="max-w-[1450px] border-l border-r border-white/10 mx-auto h-full flex md:justify-start justify-center items-end px-2">
                <h1 className="text-2xl md:text-3xl font-semibold text-white/10 tracking-widest">{`Popular Shows...`}</h1>
              </div> 
        </div>
        <section className="w-full mx-auto  bg-black/30 ">
             
          <UpdatedSection mediaData={yourMedia} />
        </section>
        <section className="bg-[#111111] w-full mx-auto border-t border-white/10 ">
          <InfoCardSection />
        </section>
      </>
   
    
  )
}

// #111111  #F9F4E