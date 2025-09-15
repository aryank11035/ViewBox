
import Link from "next/link";
import MediaTab from "./mediaTab";

export default async function Home() {
    
  
  return (

      <main className="w-full ">
        <section className="max-w-[1800px] min-h-screen mx-auto  border-l border-r border-white/10">
          <div className="mx-auto w-fit min-h-screen text-3xl md:text-5xl font-bold font-sans text-center flex items-center flex-col justify-center">
            <h1>Track the Films You have Watched.</h1>
            <h1>Save those you want to see.</h1>
            <button className="text-xl border border-green-600 bg-green-600 px-3 py-2 mt-10 rounded-xs md:text-2xl md:px-6 md:py-4 hover:bg-[#111111] hover:text-white hover:border-white/10 duration-300 hover:scale-95">Get Started!-it's free</button>
          </div>
        </section>
        <section className="max-w-[1800px] min-h-screen mx-auto border-l border-r  border-white/10 px-5 py-10">
     
            <div className="flex flex-col w-full gap-5 md:flex-row md:w-fit">

                <div className="relative w-fit h-fit">
                <div className="absolute inset-0 border border-white/10"></div>
                <button className=" cursor-pointer relative transform border md:text-left text-xl md:text-4xl font-bold font-sans px-4 py-3 bg-white text-[#111111] text-center w-full md:w-fit hover:translate-x-3 hover:-translate-y-3 hover:z-10 transition-all duration-300">
                    Popular Movies
                </button>
                </div>
                <div className="relative w-fit h-fit">
                <div className="absolute inset-0 border border-white/10"></div>
                <button className=" cursor-pointer relative transform border md:text-left text-xl md:text-4xl font-bold font-sans px-4 py-3 bg-white text-[#111111] text-center w-full md:w-fit hover:translate-x-3 hover:-translate-y-3 hover:z-10 transition-all duration-300">
                    Popular Tv Shows
                </button>
                </div>
            </div>
            <MediaTab />
        </section>
      </main> 
    
  )
}

// #111111  #F9F4E