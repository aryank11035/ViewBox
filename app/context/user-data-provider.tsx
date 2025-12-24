'use client'
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { getFavourites, getFavouritesIds } from "../actions/favourites"
import { getAllOverratedVotes, getAllUnderratedVotes } from "../actions/votes"

 

interface UserDataContextType {
    favourites : Set<string>
    underrated : Set<string>
    overrated : Set<string>
    loading : boolean
}


const UserDataContext = createContext<UserDataContextType | null>(null)

export function UserDataProvider({children} : {children : ReactNode}){
    

    const [favourites , setFavourites] = useState<Set<string>>(new Set<string>())
    const [underrated , setUnderrated] = useState<Set<string>>(new Set<string>())
    const [overrated , setOverrated] = useState<Set<string>>(new Set<string>())
    const [loading , setLoading] = useState<boolean>(true)
    const [loggedIn , setLoggedIn] = useState<boolean>(false)

    useEffect(() => {
        
        const getUserData = async () => {

            try {
                const [fav,under,over] = await Promise.all([
                    getFavouritesIds().catch(() => new Set<string>()),
                    getAllUnderratedVotes().catch(() => new Set<string>()),
                    getAllOverratedVotes().catch(() => new Set<string>()),
                ]) 
                
                setFavourites(fav)
                setUnderrated(under)
                setOverrated(over)
                
                setLoggedIn(fav.size > 0 || under.size > 0 || over.size > 0);

            } catch (error) {
                console.log('Error Retrieveing fav , under , over data' , error)
                setLoggedIn(false);
            }finally{
                setLoading(false)
            }
            
        }
        getUserData()
    },[])

    return (
        <UserDataContext.Provider value={{
            favourites ,
            underrated ,
            overrated ,
            loading 
        }}>
            {children}
        </UserDataContext.Provider>
    )

}


export const useUserData = () => {
    const context  = useContext(UserDataContext)
    if (!context) throw new Error('useUserData must be used within UserDataProvider');
    return context;
}