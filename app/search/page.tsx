

import Search from "../components/Search";
import { getSearchData } from "../ts/getData";
import MediaCard from "../components/MediaCard";




export default async function Page(props : {searchParams : Promise<{search ?: string}>}){

    const searchParams = await props.searchParams
    const query =  searchParams?.search || '';

    const data = query ? await getSearchData(query) : null
    console.log('----------------------')
    console.log(data)
    return(
        <>
            <section className="max-w-[1800px] pt-20 mx-auto min-h-screen bg-[#111111] backdrop-blur-2xl  border-l border-r border-white/10 text-xl font-bold px-2">
                <Search />
            </section>

            <section className="max-w-[1800px] pt-20 mx-auto min-h-screen bg-[#111111] backdrop-blur-2xl  border-l border-r border-white/10 text-xl font-bold px-2">
            {data?.results ? (
                <MediaCard mediaData={data} query={query} />
                ) : (
                <p className="text-white">No results found</p>
                )} 
            </section>
        </>
    )
}   