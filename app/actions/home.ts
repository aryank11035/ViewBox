'use server'

import { Movies } from "@/lib/models"
import { connectToMongoose } from "@/lib/mongoose"
import { error } from "console"
import { getMovie } from "./getMovie"
import { Movie } from "@/schema/type"


export async function getMoviesForHome() {
    try {
        await connectToMongoose()
        const movies = await Movies.find({})

        return movies
    } catch (error) {
        return []
    }
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

   
    return fullNames;

  } catch (error) {
    console.log(error);
    return [];
  }
}




export async function getMoviesByLanguage(lang : string   ) {
    const movies = await getMovie()

    if(lang === 'all')  return movies

    const filteredMovies = movies.filter((movie : Movie) => movie.original_language === lang) 
    
    return filteredMovies
}

