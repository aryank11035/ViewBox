import { auth } from "@/auth";
import { getMovie } from "./actions/getMovie";
import {  getImages, getShowData } from "@/lib/helpers";
import { Movie } from "@/schema/type";
import Link from "next/link";
import PosterMarqueeStandalone from "@/components/poster-marquee";
import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur";
import UpdatedSection from "@/components/sections/updatedSection";
import { LandingPage } from "@/components/sections/landingPage";



export default async function Page() {
    
  const session = await auth()
  const movies = await getShowData() as Movie[]
  const tv = await getShowData('tv') as Movie[]
  const yourMedia =( await getMovie(session)) as Movie[]
  
 
  
  return (

      <>

        <section className="max-w-[1700px] min-h-screen mx-auto relative bg-[#111111] border-l border-r border-white/10">
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
              <div className="max-w-[1700px] border-l border-r border-white/10 mx-auto h-full flex  md:justify-start justify-center items-end px-2 ">
                <h1 className="text-2xl md:text-4xl font-semibold text-white/10 tracking-widest">{`Popular Movies...`}</h1>
              </div> 
        </div>
        <section className="w-full mx-auto  bg-black/30  border-l border-r border-white/10 relative">
        {/* <div className="absolute inset-0 z-10 left-0 top-0 blur-3xl">
            <ProgressiveBlur
            className='pointer-events-none absolute top-0 left-0 h-full w-[200px]'
            direction='left'
            blurIntensity={1}
          />
        </div> */}
          
              <UpdatedSection mediaData={movies} />
          
        </section>
        <div className="w-full border-t border-b border-white/10 h-20">
              <div className="max-w-[1700px] border-l border-r border-white/10 mx-auto h-full flex md:justify-start justify-center items-end px-2">
                <h1 className="text-2xl md:text-4xl font-semibold text-white/10 tracking-widest">{`Popular Shows...`}</h1>
              </div> 
        </div>
        <section className="w-full mx-auto  bg-black/30  border-l border-r border-white/10 ">
             
          <UpdatedSection mediaData={tv} />
        </section>
      </>
   
    
  )
}

// #111111  #F9F4E