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
  original_name?: string;
  backdrop_path?: string;
  poster_path?: string;
  overview: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  genres: Genre[];
  mediaType: 'movie' | 'tv';
  overrated: number;
  underrated: number;
  added_by?: string;
  videokey?: string;
  suggested?: string;
  whereToWatch?: WhereToWatch;
  __v?: number;
}