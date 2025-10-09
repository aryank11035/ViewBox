'use server'

import { Movie } from "@/schema/type";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN}`,
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'


export async function getShowData(mediaType : 'movie' | 'tv' =  'movie'){

  try{
    const res = await fetch (`https://api.themoviedb.org/3/${mediaType}/popular`,options)
    if(!res.ok){
      console.log('Error retreving data')
      return []
    }
    const data = await res.json()
    return data.results.map((item : any) => ({
      ...item,
      mediaType : mediaType,
    })) as Movie []
  }catch(err){
    console.error(err)
    return []
  }
}





export async function getMovieById(id: number,mediaType: 'movie' | 'tv' =  'movie')  {

  try {
    const res = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}`, options);
    if (!res.ok) {
      console.error("Error retrieving movie data");
      return null;
    }
    const data = await res.json();
   
    return {
      id: data.id,
      title: data.title || data.name, 
      backdrop_path: data.backdrop_path,
      poster_path: data.poster_path,
      tagline: data.tagline,
      homepage: data.homepage,
      adult: data.adult,
      original_language: data.original_language,
      vote_average: data.vote_average,
      runtime: data.runtime || data.episode_run_time?.[0] || 0,
      release_date: data.release_date || data.first_air_date,
      original_title: data.original_title,
      overview: data.overview,
      genres: data.genres.map((g: any) => ({ id: g.id, name: g.name })),
      production_companies: data.production_companies.map((c: any) => ({
        id: c.id,
        name: c.name,
        logo_path: c.logo_path,
        origin_country: c.origin_country,
      })),
      mediaType: mediaType
    }; 
  } catch (err) {
    console.error(err);
  }
}


export async function getSearchData(query : string,mediaType : string ){
  try {
    const res = await fetch(`https://api.themoviedb.org/3/search/${mediaType}?query=${encodeURIComponent(query)}`,options)
    if(!res.ok){
      console.error('Error Fetching Data')
      return {message : 'No results found'}
    }
    const data = await res.json()
    
   
    return data.results.map((item : any) => ({
      ...item,
      mediaType : mediaType
    })) 
  } catch(err){
    console.error(err)
    return null
  }
}

export async function getTrendingData(){
  try{
    const res = await fetch('https://api.themoviedb.org/3/trending/all/week',options)
    if(!res.ok){
      console.log('Error Fetching Data')
      return {message : 'No trending movies or tv shows'}
    }
    const data = await res.json()
    
    return data.results 
  }catch(err){
    console.error(err)
    return null
  }
}

export async function getImages(){
  try{
    const res = await fetch('https://api.themoviedb.org/3/trending/all/week',options)
    if(!res.ok){
      console.log('Error Fetching Data')
      return {message : 'No trending movies or tv shows'}
    }
    const data = await res.json()
    const imagesArray = data.results.map((item: any) => item.poster_path);
    return imagesArray
  }catch(err){
    console.error(err)
    return null
  }
}

