'use client'

import { Movie } from "@/schema/type"
import FavCard from "./fav-card"
import SortOption from "./sort-option"
import GenreOption from "./genre-option"
import { motion } from 'framer-motion'
import VoteOption from "../votes/vote-option"
import { HomeButton } from "@/components/sections/infoCardSection"
interface favMediaProps {
    favMovies : Movie[] , 
    isFavouriteSet :   Set<string> , 
    isOverratedSet : Set<string> , 
    isUnderratedSet :  Set<string> , 
    sortBy : string ,
    voted ?: string ,
    selectedGenre : string ,
    allGenres : string [],
    showVote ? : boolean 
}



const childVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // smoother, more natural curve
      y: { type: "spring", stiffness: 60, damping: 12 },
      opacity: { duration: 0.4 },
      filter: { duration: 0.5 }
    }
  }
} as any;

export default function FavCardsPage({favMovies , sortBy , selectedGenre , allGenres , isFavouriteSet ,isOverratedSet ,isUnderratedSet , showVote = false    , voted} : favMediaProps){






    return (
        <motion.div 
            className="max-w-[1500px] mx-auto flex flex-col gap-6 py-13"
        >

            <motion.div  className="w-full max-w-[1340px] mx-auto md:text-3xl  font-bold">
                <h1>
                    
                    {
                        showVote ? 'Your Votes' : 'Your Favourites '
                    }
                </h1>
            </motion.div>
            <div className="px-3">
                <motion.div   className="w-full max-w-[1340px] bg-neutral-900 rounded-xs flex items-center justify-between md:flex-row flex-col mx-auto px-4 py-3 gap-2 ">
                    <SortOption sortBy={sortBy}/>
                    {
                        showVote && (
                            <VoteOption voted={voted}/>
                        )
                    }
                    {
                        !showVote && (
                            <GenreOption allGenres={allGenres} selectedGenre={selectedGenre}/>
                        )
                    }
                </motion.div>
            </div>
            {
                favMovies.length === 0 ? (
                    <div className="w-full flex flex-col items-center">
                        <div className="text-center text-neutral-400 text-xl py-10 font-bold">
                            No {showVote ? 'Votes'  : 'Favourites'} found
                        </div>
                        <HomeButton />
                    </div>
                ) : (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={childVariants}
                    className="w-fit grid grid-cols-2 420:grid-cols-2 760:grid-cols-3 1020:grid-cols-4 1435:grid-cols-5 justify-items-center gap-4 mx-auto "
                >
                    {favMovies.map((media: Movie) => (
                        <FavCard
                            media={media}
                            key={media.id}
                            isFavourite={isFavouriteSet.has(media._id)}
                            isOverrated={isOverratedSet.has(media._id)}
                            isUnderrated={isUnderratedSet.has(media._id)}
                        />
                    ))}
                </motion.div>
                    )
            }

        </motion.div>
    )
}