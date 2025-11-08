'use client'

import { motion } from 'framer-motion'
import FavCard from '@/components/media/favourite/fav-card';
import { Movie } from '@/schema/type';
import YouTube from 'react-youtube';
import { useEffect, useRef, useState } from 'react';





export function TestPage({allGenres} : {allGenres : string[]}){

    return (

       <>

        <div className='pt-20'>

        </div>
       
            {allGenres}
       </>

          
    )
}