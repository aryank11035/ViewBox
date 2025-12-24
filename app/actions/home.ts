'use server'

import { Movies } from "@/lib/models"
import { connectToMongoose } from "@/lib/mongoose"
import { getMovie } from "./getMovie"
import { Movie } from "@/schema/type"

export type Language = {
  code : string , 
  name : string 
}


export async function getMoviesLanguages() {
  try {
    await connectToMongoose();

    const codes = await Movies.distinct("original_language");

  
    const languageNames = new Intl.DisplayNames(['en'], { type: 'language' });

    const fullNames = codes.map(code => ({
      code,
      name: languageNames.of(code) ?? code
    }));

   
    return fullNames as Language[];

  } catch (error) {
    console.log(error);
    return [] ;
  }
}




export async function getMoviesByLanguage(lang : string   ) {
    const movies = await getMovie()

    if(lang === 'all')  return movies

    const filteredMovies = movies.filter((movie : Movie) => movie.original_language === lang) 
    
    return filteredMovies 
}

