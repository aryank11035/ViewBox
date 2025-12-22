'use server'


import { Movies } from "@/lib/models"
import { connectToMongoose } from "@/lib/mongoose"
import { Movie } from "@/schema/type"




export async function getMovie(){
    try {
        
        await connectToMongoose()
        const movies = await Movies.find({} ).limit(10).lean()
        const parsedMovies = JSON.parse(JSON.stringify(movies))
        
      
        return parsedMovies.sort((a : Movie, b : Movie) => 
            a.title!.localeCompare(b.title!)
        )
    }catch(err){
        console.error('Error fecthing User Data' , err)
        return []
    }
    
}



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