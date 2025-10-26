

import { getSearchData, getTrendingData } from "../../lib/helpers";
import SearchBar from "../../components/search/searchBar";
import MediaCard from "../../components/mediaCard";





export default async function SearchPage(props : {searchParams : Promise<{search ?: string , mediatype : string}>}){

    const searchParams = await props.searchParams
    const query =  searchParams?.search || '';
    const mediatype = (searchParams?.mediatype || 'movie').toLowerCase();
    const trendingData = await getTrendingData() ?? []
    const data = query ? await getSearchData(query,mediatype) : null 
    
    return(
        <>  
            <section className="max-w-full pt-20 mx-auto bg-[#111111] backdrop-blur-2xl text-xl font-bold  min-h-screen  ">
 
                <div className="max-w-[1700px] h-100 lg:h-170 flex items-center px-2 mx-auto border-l border-r border-white/10">

                        <SearchBar />
                </div> 
                <div className="w-full h-20 border-t border-b border-white/10">
                    <div className="max-w-[1700px] mx-auto border-l border-r border-white/10 h-full"></div>
                </div>
                         
                <div className="w-full pt-20 mx-auto min-h-screen bg-black/30 backdrop-blur-2xl text-xl font-bold ">
                    <div className="w-full mx-auto px-10 bg-blue-100">
                        {
                            query ? (
                                <h1 className="text-2xl md:text-4xl font-medium pl-2 mb-2 text-white/60">
                                    Search results for <span className="text-white">{`"${query}"`}</span>
                                </h1>       
                            ) : (
                                <h1 className="text-2xl md:text-4xl font-medium pl-2 mb-2 text-white">
                                    Trending Today
                                </h1>
                            )
                        }

                        <p className="text-2xl font-medium mb-10 pl-2 text-white/60">Movie results : <span className="text-white">{ data ?  data.length : trendingData.length }</span></p>
                        <div className="mx-auto grid gap-10 xl:grid-cols-5   lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-1 pb-20  bg-blue-900">
                            {(data ?? trendingData).map((movie : any) => (
                                <MediaCard key={movie.id} mediaData={movie} />
                            ))}
                        </div>     
                        
                    </div>
                </div>
                    
            </section>     
        </>
    )
}   
{/* ) : (
    <div className="w-full text-2xl md:text-4xl text-center text-white/50">
        <p>No results found {`:(`}</p>
    </div>
) */}