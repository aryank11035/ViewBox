
import MediaSection from "./MediaSection";
import {  getShowData } from "./ts/getData";




export default async function Page() {
    
  const movies = await getShowData()
  const tv = await getShowData('tv')
  const yourMedia = await fetch(`http://localhost:3000/api/media_data`).then(r => r.json())
 
 
  return (

      <>
  
        <MediaSection movies={movies} tv={tv} yourMedia={yourMedia}/>
      </>
   
    
  )
}

// #111111  #F9F4E