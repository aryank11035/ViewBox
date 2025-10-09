import { ObjectId } from "mongodb";
export interface User {
    name: string
    email: string
    password: string
    image?: string
    createdAt: Date
}
export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path?: string;
  origin_country?: string;
}

export type MediaType = 'movie' | 'tv';

export interface Movie {
  _id : string  
  id : number 
  title : string 
  name ?: string
  original_name ?: string
  backdrop_path ?: string 
  poster_path ?: string
  tagline ?: string
  homepage ?: string
  adult ?: boolean
  original_language : string 
  vote_average : number
  runtime ?: number
  release_date ?: string
  first_air_date ?: string
  original_title ?: string
  overview ?: string
  genres : Genre[]
  production_companies : ProductionCompany[]
  mediaType : MediaType
  media_type ?: MediaType
}



export interface Session {
  user :{ 
    name : string
    email : string 
    image ?: string 
    id : string
    movies : [{
      _id : ObjectId,
      id : number
    }]
  }
  expires : string
}
