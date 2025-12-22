import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export default function Loading() {
    return (
         <section className="w-full  mx-auto min-h-screen ">  
        
                    {/* <HomePageClient initialShows={shows} initialGenres={genres} languages={languages} isFavourites={favIds} underratedVotes={underratedVotes} overratedVotes={overratedVotes} showPosters={showPosters} session={session}/> */}
        
                        <div className="w-full h-[70vh]">
                             <SkeletonTheme baseColor='#111111' highlightColor='#191919'>
                                            <div className="w-full h-full rounded-xs flex border-b border-[rgba(255,255,255,0.1)]">
                                                <Skeleton  containerClassName='block leading-[1px] flex-1' height='100%' borderRadius='0.125rem'/>
                                            </div>
                                          <div className="max-w-[1450px] border-l border-r border-[rgba(255,255,255,0.1)] mx-auto bg-black/30 py-5 grid  gap-3 min-h-screen p-4 md:grid-cols-2 lg:grid-cols-3 ">
                                                {Array.from({ length: 9 }).map((_, idx) => (
                                                    <div
                                                    key={idx}
                                                    className="h-90 w-full bg-white/10 rounded flex"
                                                    >
                                                    <Skeleton
                                                        containerClassName="block leading-[1px] flex-1"
                                                        height="100%"
                                                        borderRadius="0.125rem"
                                                    />
                                                    </div>
                                                ))}
                                                </div>
                            </SkeletonTheme>
                        </div>
    
                </section>
    )
}