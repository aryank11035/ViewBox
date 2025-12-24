'use server'

import { auth } from "@/auth"
import { Movies, Users } from "@/lib/models"
import { connectToMongoose } from "@/lib/mongoose"
import { Movie } from "@/schema/type"
import { unstable_cache } from "next/cache"


export async function addToFavourites(mediaInfo : Movie){

    const session = await auth()
    const userId  = session?.user?.id
    

    try{
        await connectToMongoose()
        const media = await Movies.findOne({
            id :  mediaInfo.id
        })
        await Users.findByIdAndUpdate(
            userId,
            {$addToSet : { favourites : media._id }},
            {new : true}
        )
        
        return { success : true , added : 'added to Favourites'}

    }catch(error){
        console.error(error);
        return { success: false, error: "Failed to add favourite" }
    }
}

export async function removeFromFavourites(mediaInfo : Movie){
        const session = await auth()
        const userId  = session?.user?.id
        try{
            await connectToMongoose()
            await Users.findByIdAndUpdate(
                userId,
                {$pull : { favourites :  mediaInfo._id}},
                {new : true}
            )
            
            return {success : true , removed : 'removed from favourites'}
        }catch(error){
            console.error(error);
            return { success: false, error: "Failed to add favourite" }
        }
}

export async function checkIsFavourite(_id : string){
    const session = await auth()
    const userId  = session?.user?.id
    try{
        await connectToMongoose()
        const user = await Users.findById(userId)
        
        if(!user) return {isFavourite : false}
        const isFavourite = user.favourites.some((fav  : any) => fav._id.toString() === _id)
    
        return { isFavourite }
    }catch(error){
        console.error(error);
        return { success: false, error: "Failed to add favourite" }
    }
}

export const getCachedFavourites = unstable_cache(
    async (userId : string) => {
        try{
        await connectToMongoose()

        const userFavourites = await Users.findById(
            userId ,
            { favourites : 1 , _id : 0 } 
        )
        if(!userFavourites.favourites) return []

        const favouriteIds = userFavourites.favourites
        const userFavouriteMovies = await Movies.find(  
            { _id : { $in : favouriteIds }}  
        ).lean()
        return JSON.parse(JSON.stringify(userFavouriteMovies))
         
        }catch(error){
            console.log(error)
            return []
        }
    },
    ['user-favourites'],
    {revalidate : 60 * 10 }
)


export async function getFavourites(){
    const session =  await auth()
    const userId = session?.user?.id
    try{
        await connectToMongoose()

        const userFavourites = await Users.findById(
            userId ,
            { favourites : 1 , _id : 0 } 
        )
        if(!userFavourites.favourites) return []

        const favouriteIds = userFavourites.favourites
        const userFavouriteMovies = await Movies.find(  
            { _id : { $in : favouriteIds }}  
        ).lean()

        return JSON.parse(JSON.stringify(userFavouriteMovies))
         
    }catch(error){
        console.log(error)
        return []
    }
}


export const getCachedFavouritesIds = unstable_cache(
    async (userId : string) => {
        const favs = await getCachedFavourites(userId) as Movie[]
        const favIds = favs.map((fav : any ) => fav._id)
        console.log(favIds)
        return new Set<string>(favIds) 

    },
    ['user-favourite-ids'],
    {revalidate : 60 * 10}
)

export async function getFavouritesIds(){
    const favs = await getFavourites() as Movie[]
        const favIds = favs.map((fav : any ) => fav._id)
        // console.log(favIds)
    return new Set<string>(favIds) 

}


export const getCachedGenres = unstable_cache(
    async (userId : string) => {
        try {
                const favouritesMovies = await getCachedFavourites(userId)

                const favUserGenres = [
                    'All Genres',
                    ...new Set (
                        favouritesMovies.flatMap((movie : Movie) => movie.genres.map((genre : {name : string}) => genre.name ))
                    ) as Set<string>
                ] as string []
            
                return favUserGenres
        }catch(error){
                console.log(error)
                return ['All Genres']
        }
    },
    ['user-favourite-genres'],
    {revalidate : 60*10 }
)

export async function getFavouritesGenres() : Promise<string[]> {
   try {
        const favouritesMovies = await getFavourites()

        const favUserGenres = [
            'All Genres',
            ...new Set (
                favouritesMovies.flatMap((movie : Movie) => movie.genres.map((genre : {name : string}) => genre.name ))
            ) as Set<string>
        ] as string []
       
        return favUserGenres
   }catch(error){
        console.log(error)
        return ['All Genres']
    }
} 

export async function getFavMovieIdById(id : string) {
    const favIds = await getFavouritesIds()
    return favIds.has(id)
}