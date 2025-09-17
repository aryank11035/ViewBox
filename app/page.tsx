
import Link from "next/link";
import MediaTab from "./mediaTab";
import { getShowData } from "./ts/getData";



export default async function Home() {
    
  const movies = await getShowData()
  const tv = await getShowData('tv')

  return (

      <>
      
        <section className="max-w-[1800px] min-h-screen mx-auto  border-l border-r border-white/10 relative bg-[#111111]">
              
          <div className=" mx-auto w-fit min-h-screen text-3xl md:text-5xl font-bold font-sans text-center flex items-center flex-col justify-center">
            <h1>Track the Films You have Watched.</h1>
            <h1>Save those you want to see.</h1>
            <button className="text-xl shadow-xl shadow-black/50 border border-green-600 bg-green-600 px-3 py-2 mt-10 rounded-xs md:text-2xl md:px-6 md:py-4 hover:bg-[#111111] hover:text-white hover:border-white/10 duration-300 hover:scale-95">Get Started!-it's free</button>
          </div>
        </section>
        <section className="max-w-[1800px] min-h-screen mx-auto border-l border-r  border-white/10 px-5 py-10 bg-[#111111] relative  ">
     
         
            <div className="w-full h-fit">
              <div className="relative w-full md:w-fit h-fit md:ml-7  shadow-xl shadow-black/50">
                    <div className="hidden md:block
                        absolute inset-0 
                        border border-[rgba(255,255,255,0.2)]
                        bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.1)_0,rgba(255,255,255,0.1)_1px,transparent_0,transparent_50%)]
                        bg-[size:10px_10px] 
                        bg-fixed">
                    </div>
                    <div className="cursor-pointer relative transform border md:text-left text-2xl md:text-4xl font-bold font-sans px-4 py-3 bg-white text-[#111111] text-center w-full md:w-fit md:translate-x-3 md:-translate-y-3 hover:z-10 transition-all duration-300 hover:translate-x-0 hover:translate-y-0  active:translate-x-0 active:-translate-y-0 active:bg-transparent active:text-white active:border-[rgba(0,0,0,0.2)]">
                      Popular Movies
                    </div>
              </div>
              <MediaTab movies={movies} />
                <h1 className="block md:hidden text-white/20 font-medium text-2xl text-center mb-10">{`Swipe >>` }</h1>
            </div>
            <div className="w-full h-fit">
              <div className="relative w-full md:w-fit h-fit md:ml-7 shadow-xl shadow-black/50">
                    <div className="hidden md:block
                        absolute inset-0 
                        border border-[rgba(255,255,255,0.2)]
                        bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.1)_0,rgba(255,255,255,0.1)_1px,transparent_0,transparent_50%)]
                        bg-[size:10px_10px] 
                        bg-fixed">
                    </div>
                    <div className="cursor-pointer relative transform border md:text-left text-2xl md:text-4xl font-bold font-sans px-4 py-3 bg-white text-[#111111] text-center w-full md:w-fit md:translate-x-3 md:-translate-y-3 hover:z-10 transition-all duration-300 hover:translate-x-0 hover:translate-y-0  active:translate-x-0 active:-translate-y-0 active:bg-transparent active:text-white active:border-[rgba(0,0,0,0.2)]">
                      Popular Tv Shows
                    </div>
              </div>
              <MediaTab  movies={tv} />
              <h1 className="block md:hidden text-white/20 font-medium text-2xl text-center mb-10">{`Swipe >>` }</h1>
              
            </div>
        

        </section>
      </>
   
    
  )
}

// #111111  #F9F4E