import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export default function Loading() {
    return (
         
                  <section className="w-full  mx-auto min-h-screen ">  
                         
                                     
                                         <div className="w-full min-h-screen">
                                              <SkeletonTheme baseColor='#111111' highlightColor='#191919'>
                                                             <div className="w-full h-[70vh] rounded-xs flex border-b border-[rgba(255,255,255,0.1)]">
                                                                 <Skeleton  containerClassName='block leading-[1px] flex-1' height='100%' borderRadius='0.125rem'/>
                                                             </div>
                                                           <div className="max-w-[1450px] border-l border-r border-[rgba(255,255,255,0.1)] mx-auto bg-black/30 gap-3 px-6 grid  min-h-screen p-4 md:grid-cols-2 lg:grid-cols-5 ">
                                                                 {Array.from({ length: 10 }).map((_, idx) => (
                                                                     <div
                                                                     key={idx}
                                                                     className="aspect-[2/3] w-full h-full bg-white/10 rounded flex"
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