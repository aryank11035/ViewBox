import { headers } from "next/headers"

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN}`,
  },
};

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
    }))
  }catch(err){
    console.error(err)
    return []
  }
}





export async function getMovieById(id: number,mediaType: 'movie' | 'tv' =  'movie') {

  try {
    const res = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}`, options);
    if (!res.ok) {
      console.error("Error retrieving movie data");
      return null;
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}


export async function getSearchData(query : string,mediatype : string ){
  try {
    const res = await fetch(`https://api.themoviedb.org/3/search/${mediatype}?query=${encodeURIComponent(query)}`,options)
    if(!res.ok){
      console.error('Error Fetching Data')
      return {message : 'No results found'}
    }
    const data = await res.json()
    
   
    return data.results.map((item : any) => ({
      ...item,
      mediatype : mediatype
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