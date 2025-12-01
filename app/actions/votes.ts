'use server'

import { auth } from "@/auth"
import { Movies, Users } from "@/lib/models"
import { connectToMongoose } from "@/lib/mongoose"
import { Movie } from "@/schema/type"


export async function updateOverrated(mediaId : string) {
    const session = await auth()
    const userId = session?.user?.id

    try {
        const user = await Users.findById(
            userId,
        )
        const votedMedia = await Movies.findById(
            mediaId
        )
        
        if(!user || !votedMedia){
            console.log('user not found')
            return  
        }

        const userOverratedVotes : string [] = user.overrated || []
        const existsInOverrated = userOverratedVotes.includes(mediaId)
    
        if(existsInOverrated) {

            if(votedMedia.overrated === -1) return

            await Users.findByIdAndUpdate(
                userId , 
               {$pull : { overrated : mediaId }},
               {new : true}
            )
            const updatedMedia = await Movies.findByIdAndUpdate(
                mediaId , 
                {
                    $inc : { overrated : -1},
                },
                {new : true }
            )
            return { voted : false  , count : updatedMedia.overrated }
        }

        await Users.findByIdAndUpdate(
            userId,
            {$addToSet : { overrated : mediaId }},
            {new : true}
        )
         const updatedMedia = await Movies.findByIdAndUpdate(
                mediaId , 
                {$inc : { overrated : 1}},
                {new : true }
            )

         return { voted : true  , count : updatedMedia.overrated }
    } catch (error) {
        console.log(error)
    }
}

export async function updateUnderrated(mediaId : string) {
    const session = await auth()
    const userId = session?.user?.id

    try {
        const user = await Users.findById(
            userId,
        )
        const votedMedia = await Movies.findById(
            mediaId
        )
        
        if(!user || !votedMedia){
            console.log('user not found')
            return  
        }

        const userUnderratedVotes : string [] = user.underrated || []
        const existsInUnderrated = userUnderratedVotes.includes(mediaId)
        
        if(existsInUnderrated) {

            if(votedMedia.underrated === -1) return

            await Users.findByIdAndUpdate(
                userId , 
               {$pull : { underrated : mediaId }},
               {new : true}
            )
            const updatedMedia = await Movies.findByIdAndUpdate(
                mediaId , 
                {
                    $inc : { underrated : -1},
                },
                {new : true }
            )
            return { voted : false  , count : updatedMedia.underrated }
        }

        await Users.findByIdAndUpdate(
            userId,
            {$addToSet : { underrated : mediaId }},
            {new : true}
        )
         const updatedMedia = await Movies.findByIdAndUpdate(
                mediaId , 
                {$inc : { underrated : 1}},
                {new : true }
            )

         return { voted : true  , count : updatedMedia.underrated }
    } catch (error) {
        console.log(error)
    }
}

export async function getAllOverratedVotes(){
    const session = await auth()
    const userId = session?.user?.id
    
    await connectToMongoose()
    const  userVotes = await Users.findById(
        userId , 
        { overrated : 1  , _id : 0}
    ).lean()

    const votes = JSON.parse(JSON.stringify(userVotes))
    const setVotes = new Set<string>(votes?.overrated || [])

    return setVotes
}


export async function getAllUnderratedVotes(){
    const session = await auth()
    const userId = session?.user?.id
    
    await connectToMongoose()
    const  userVotes = await Users.findById(
        userId , 
        { underrated : 1  , _id : 0}
    ).lean()

    const votes = JSON.parse(JSON.stringify(userVotes))
    const setVotes = new Set<string>(votes?.underrated || [])

    return setVotes
}

export async function getUserOverratedMoviesIdById(id : string ) {
    const session = await auth() 
    const userId = session?.user?.id

    await connectToMongoose()
    const  userVotes = await Users.findById(
        userId , 
        { overrated : 1  , _id : 0}
    ).lean()

    const votes = JSON.parse(JSON.stringify(userVotes))
    const setVotes = new Set(votes?.overrated || [])
    
    return setVotes.has(id)

}



export async function getUserUnderratedMoviesIdById(id : string ) {
    const session = await auth() 
    const userId = session?.user?.id

    await connectToMongoose()
    const  userVotes = await Users.findById(
        userId , 
        { underrated : 1  , _id : 0}
    ).lean()
   
    const votes = JSON.parse(JSON.stringify(userVotes))
    const setVotes = new Set(votes?.underrated || [])
    
    return setVotes.has(id)

}



export async function getVotes(vote ?: string){
    try {

        const overratedVotes = await getAllOverratedVotes()
        const underratedVotes = await getAllUnderratedVotes()

       if(vote === 'overrated') {
           const allVotes = new Set<string>([
               ...overratedVotes ,
               ...underratedVotes
    
           ])
    
          return allVotes
       }else if (vote === 'underrated') {
            const allVotes = new Set<string>([
               ...underratedVotes
           ])
    
          return allVotes
       }else {
            const allVotes = new Set<string>([
                ...overratedVotes ,
                ...underratedVotes
        
            ])
        
            return allVotes
       }

    } catch (error) {
        console.log(error)
        return []
    }
}


export async function getOverratedMedia(){
    try {

        const overratedVotes = await getAllOverratedVotes()
        const overratedArray = Array.from(overratedVotes)
        const overratedMedias = await Movies.find(
            {_id : {$in : overratedArray }}
        ).lean()
        return JSON.parse(JSON.stringify(overratedMedias))
    }catch(error){
        console.log(error)
        return []
    }
}


export async function getUnderratedMedia(){
    try {

        const underratedVotes = await getAllUnderratedVotes()
        const underratedArray = Array.from(underratedVotes)
        const underratedMedias = await Movies.find(
            {_id : {$in : underratedArray }}
        ).lean()
        return JSON.parse(JSON.stringify(underratedMedias))
    }catch(error){
        console.log(error)
        return []
    }
}

export async function getVotedMedia(vote ?: string){
    try {
        const votes = await getVotes(vote)
        const votesArray = Array.from(votes)
        const votedMedias = await Movies.find(
            {_id : {$in : votesArray}}
        ).lean()
        return JSON.parse(JSON.stringify(votedMedias))
    } catch (error) {
        console.log(error)
        return []
    }
}





export async function getVotedGenres() : Promise<string[]>{
    try {
        const votedMedias = await getVotedMedia()
        
        const genreSet = new Set(
                votedMedias.flatMap((movie : Movie) => movie.genres.map((genre : {name : string}) => genre.name ))
        )
        const votedMediaGenres = [
            'All Genres',
            ...Array.from(genreSet)
        ] as  string []
        return votedMediaGenres
    }catch(error){
        console.log(error)
        return ['All Genres']
    }
}