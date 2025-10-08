

import { getSearchData, getTrendingData } from "../lib/getData";
import SearchBar from "../components/SearchBar";
import MediaCard from "../components/MediaCard";




export default async function SearchPage(props : {searchParams : Promise<{search ?: string , mediatype : string}>}){

    const searchParams = await props.searchParams
    const query =  searchParams?.search || '';
    const mediatype = (searchParams?.mediatype || 'movie').toLowerCase();
    const trendingData = await getTrendingData()
    const data = query ? await getSearchData(query,mediatype) : null
   
    return(
        <>  
            <section className="max-w-[1800px] pt-20 mx-auto bg-[#111111] backdrop-blur-2xl  border-l border-r border-white/10 text-xl font-bold px-2  min-h-screen">

                <div className="w-full">
                    <SearchBar />
                </div>

                         
                             <div className="w-full pt-20 mx-auto min-h-screen bg-[#111111] backdrop-blur-2xl text-xl font-bold ">
                                    <div className="max-w-[1600px] mx-auto">
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
                                        <div className="mx-auto grid gap-10 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-1 px-2 pb-20">
                                            <MediaCard mediaData={data ? data : trendingData} query={query} />
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