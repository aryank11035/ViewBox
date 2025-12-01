import { SuggestionsCard } from "@/components/my-suggestions/suggestions-card"
import { getSuggestions } from "../actions/suggestions"
import { Suggestion } from "@/schema/type"

export default async function MySuggestionsPage(){

    const suggested = await getSuggestions()
    return (
        <section className="w-full  pt-20 bg-[#111111]">
                    <div className="max-w-[1450px] mx-auto border-l border-r border-[rgba(255,255,255,0.1)] w-full  min-h-screen   bg-black/30"> 
                        <div 
                                className="max-w-[1500px] mx-auto flex flex-col gap-6 py-13 "
                            >
                            <div className="w-full max-w-[1340px] mx-auto md:text-3xl  font-bold">
                                <h1>My Suggestions</h1>
                            </div>

                        </div>
                        {/* <div className="py-3">
                            <div className="w-full max-w-[1340px] bg-neutral-900 rounded-xs flex items-center justify-between md:flex-row flex-col mx-auto px-4 py-3 gap-2 ">

                                    
                            </div>
                        </div> */}
                        <div
                            className="max-w-[1340px] grid grid-cols-1 md:grid-cols-3  justify-items-center gap-4 mx-auto"
                        >
                               {
                                      suggested.map(( media : Suggestion  , index: number) => 
                                          <SuggestionsCard media={media} key={index}/>
                                      )

                               }  
                        </div>
                    </div>

                </section>
    )
}