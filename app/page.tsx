import { auth } from "@/auth";
import { getMovie } from "./actions/getMovie";
import MediaSection from "@/components/sections/mediaSection"
import {  getImages, getShowData } from "@/lib/helpers";
import WatchListSection from "@/components/sections/watchListSection";
import { Movie } from "@/schema/type";
import Link from "next/link";
import PosterMarqueeStandalone from "@/components/poster-marquee";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";


export default async function Page() {
    
  const session = await auth() 
  const movies = await getShowData() as Movie[]
  const tv = await getShowData('tv') as Movie[]
  const yourMedia =( await getMovie(session)) as Movie[]
  const images = await getImages()
  
 
  return (

      <>

        <section className="w-full min-h-screen mx-auto  border-l border-r border-white/10 relative bg-[#111111] ">
            <div className="absolute mask-b-from-50% mask-b-to-100%">
              <PosterMarqueeStandalone images={await getImages()}/>
              
             <div className="absolute inset-0 bg-[#111111]/70 z-10"></div>
              <ProgressiveBlur height="30%" position="bottom" />
            </div>
            <div className=" mx-auto w-fit min-h-screen text-3xl md:text-5xl font-bold font-sans text-center flex items-center flex-col justify-center absolute z-10 inset-0">
              <h1>Track the Films You have Watched.</h1>
              <h1 className="mt-4.5">Save those you want to see.</h1>
              {
                !session && (
                  <Link href='/auth/login'>
                    <button className="text-xl shadow-xl shadow-black/50 border border-green-600 bg-green-600 px-3 py-2 mt-10 rounded-xs md:text-2xl md:px-6 md:py-4 hover:bg-green-200 hover:text-green-600 hover:border-white/10 duration-300 hover:scale-95 cursor-pointer">Get Started!-it's free</button>
                  </Link>
                )
              }
            </div>
        </section>
        <section className="w-full min-h-screen mx-auto border-l border-r  border-white/10 px-5 py-10 bg-[#111111] relative">
          <WatchListSection media={yourMedia} />
          <MediaSection movies={movies} tv={tv} />
        </section>
      </>
   
    
  )
}

// #111111  #F9F4E