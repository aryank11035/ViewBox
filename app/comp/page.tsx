import { getMovieById, getMovieVideoById, getWheretoWatchById } from "@/lib/helpers"
import { TestPage } from "./testPage"
import { getMovie } from "../actions/getMovie"
import { Movie } from "@/schema/type"
import { getGenres } from "../actions/getGenres"



export default async function Test() {
 
    const allGenres = await getGenres() as string []
 
   
    return (
        <>

           <TestPage allGenres={allGenres}/>

        </>
    )
}   