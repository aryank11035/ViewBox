

import { getMovie, getRelatedMovies } from "../actions/getMovie"
import {  getMoviesLanguages } from "../actions/home"
import { getGenres } from "../actions/getGenres"
import HomePageClient from "@/components/home/home-page"
import { auth } from "@/auth"
export const revalidate = 300;
export default async function HomePage(){

    const session = await auth()


    const [shows , languages , genres] =  await Promise.all([
        getMovie(),
        getMoviesLanguages(),
        getGenres(),
    ])


    const showPosters = shows.sort(() => 0.5 * Math.random()).slice(0,6)
   
    console.log(showPosters)
 
    return(
        <section className="w-full  mx-auto min-h-screen ">  

            <HomePageClient initialShows={shows} initialGenres={genres} languages={languages} showPosters={showPosters} session={session} />

        </section>

    )
}   