export interface Provider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export interface WhereToWatch {
  flatrate?: Provider[];
  rent?: Provider[];
  buy?: Provider[];
  clips?: Provider[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  _id: string;
  id: number;
  title?: string;
  name ? : string ,
  original_name?: string;
  original_language?: string ,
  backdrop_path?: string;
  poster_path?: string;
  overview: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  genres: Genre[];
  mediaType: 'movie' | 'tv';
  media_type : 'movie' | 'tv'
  overrated: number;
  underrated: number;
  added_by?: string;
  videokey?: string;
  suggested?: string;
  whereToWatch?: WhereToWatch;
  runtime ?: number ,
  __v?: number;
}

export interface PlaylistMovies {
  _id : string , 
  id : number ,  
  type : string  , 
  name : string ,  
  genres : Genre[] , 
  img: string ,
  added_on : Date ,
  media_ref : string 
}

export interface Playlist {
  _id : string  ,
  playlist_name : string , 
  description ?: string ,
  playlist_type : string ,
  created_by : string ,
  created_by_name : string ,
  playlist_id : string  ,
  movies : PlaylistMovies[]
  created_at : Date ,
  __v ?: number 
}


export interface Suggestion {
  id : number  ,
  name : string  ,
  poster : string ,
  backdrop : string  ,
  type : string ,
  release_date : string ,
  reason : string 
}