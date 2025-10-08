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
  id : number 
  title : string 
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
  original_title ?: number
  overview ?: number
  genres : Genre[]
  production_companies : ProductionCompany[]
  mediaType : MediaType
}


