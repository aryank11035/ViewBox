'use server'


import { Movies } from "@/lib/models"
import { connectToMongoose } from "@/lib/mongoose"
import { Movie } from "@/schema/type"
import { unstable_cache } from 'next/cache'




export const getMovie = unstable_cache(
  async () => {
    try {
      await connectToMongoose()

      const movies = await Movies.find({}).lean()
      const parsedMovies = JSON.parse(JSON.stringify(movies))

      return parsedMovies.sort((a: Movie, b: Movie) =>
        a.title!.localeCompare(b.title!)
      )
    } catch (err) {
      console.error('Error fetching Movie Data', err)
      return []
    }
  },
  ['movies-list'], // cache key
  {
    revalidate: 60 * 10, // ⏱️ revalidate every 10 minutes
    tags: ['movies']
  }
)


export async function getMovieWithId(movieId : number) {
    
    try {
        await connectToMongoose()
        const movie = await Movies.findOne({ id :  Number(movieId)}).lean()

        return JSON.parse(JSON.stringify(movie))
    }catch(error){
        console.log(error)
    }
}


export async function getMovieThroughSearch(str : string ){
    try{

        if (!str || str.trim() === "") return null;
        await connectToMongoose()
        const movie = await Movies.find(
            { title: { $regex: str, $options: "i" } }
        ).lean()
        
        return JSON.parse(JSON.stringify(movie))
    }catch(error){
        console.log(error)
        return null
    }
}
export async function getRelatedMovies() {
    try {
        await connectToMongoose();

        const movies = await Movies.find({}).lean();
        const shuffled = movies.sort(() => 0.5 - Math.random());
        const randomSix = shuffled.slice(0, 6);
        return JSON.parse(JSON.stringify(randomSix))

    } catch (error) {
        console.error(error);
        return [];
    }
}