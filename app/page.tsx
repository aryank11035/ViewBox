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
import { HomeButton, InfoCardSection } from "@/components/sections/infoCardSection";

export default async function Page() {
    
  const session = await auth()
  
  const tv = await getShowData('tv') 
  const yourMedia =await getMovie() 
  
// console.log(yourMedia)
 
 
  
  return (

      <>

        <section className="max-w-[1450px]  mx-auto relative bg-[#111111] border-l border-r border-white/10 flex items-center justify-center flex-col pt-20 ">
           
            <LandingPage session={session}/>
            
        </section>
        
        <section className="w-full mx-auto  bg-black/30 border-t border-[rgba(255,255,255,0.1)]  ">
       
          
              <UpdatedSection mediaData={yourMedia} />
        </section>

        <section className="bg-[#111111] w-full mx-auto border-t border-white/10 ">
          <InfoCardSection />
        </section>
      </>
   
    
  )
}

// #111111  #F9F4E