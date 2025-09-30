import {Movie} from "./db/database";
import MediaSection from "./MediaSection";
import {  getShowData } from "./ts/getData";
import WatchListSection from "./WatchListSection";


export default async function Page() {
    
  const movies = await getShowData()
  const tv = await getShowData('tv')
  const yourMedia = await fetch(`http://localhost:3000/api/media_data`).then(r => r.json())
  const count = await Movie.countDocuments()
  
 
  return (

      <>

        <section className="max-w-[1800px] min-h-screen mx-auto  border-l border-r border-white/10 relative bg-[#111111] ">
            
            <div className=" mx-auto w-fit min-h-screen text-3xl md:text-5xl font-bold font-sans text-center flex items-center flex-col justify-center">
            <h1>Track the Films You have Watched.</h1>

            <h1>Save those you want to see.</h1>
            <button className="text-xl shadow-xl shadow-black/50 border border-green-600 bg-green-600 px-3 py-2 mt-10 rounded-xs md:text-2xl md:px-6 md:py-4 hover:bg-[#111111] hover:text-white hover:border-white/10 duration-300 hover:scale-95">Get Started!-it's free</button>
            </div>
        </section>

        <section className="max-w-[1800px] min-h-screen mx-auto border-l border-r  border-white/10 px-5 py-10 bg-[#111111] relative  ">
          <WatchListSection media={yourMedia} count={count}/>
          <MediaSection movies={movies} tv={tv} />
        </section>
      </>
   
    
  )
}

// #111111  #F9F4E