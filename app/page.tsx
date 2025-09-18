
import Link from "next/link";
import MediaSection from "./MediaSection";
import { getShowData } from "./ts/getData";



export default async function PAge() {
    
  const movies = await getShowData()
  const tv = await getShowData('tv')


  
  return (

      <>
        <MediaSection movies={movies} tv={tv}/>
      </>
   
    
  )
}

// #111111  #F9F4E