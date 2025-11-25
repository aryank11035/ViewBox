'use client'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
export default function Loading() {
      return (
        <section className="w-full pt-20">
            <div className="max-w-[1450px] min-h-screen mx-auto bg-black/30 border-l border-r border-[rgba(255,255,255,0.1)]  px-8  py-10">
                <SkeletonTheme baseColor='#111111' highlightColor='#191919'>
                    <div className="max-w-[1340px] mx-auto h-fit mb-6 ">
                        <div className="w-full max-w-[224px] h-12 bg-[#111111] flex">
                            <Skeleton  containerClassName='block leading-[1px] flex-1 ' height='100%' borderRadius='0.125rem'/>
                        </div>
                    </div>
                    <div className="flex flex-col-reverse lg:flex-row-reverse max-w-[1340px] mx-auto lg:gap-8 gap-5   ">
                        <div 
                            className="space-y-3 flex-2  "
                            
                        >

                        
                            <div className="hidden lg:block space-y-3   ">
                                <div className="w-full h-12 bg-[#111111] rounded-xs flex">
                                    {/* title */}
                                    <Skeleton  containerClassName='block leading-[1px] flex-1' height='100%' borderRadius='0.125rem'/>
                                </div>
                                <div className="w-full h-24 bg-[#111111] rounded-xs flex ">
                                    {/* overviwe */}
                                    <Skeleton  containerClassName='block leading-[1px] flex-1' height='100%' borderRadius='0.125rem'/>
                                </div>
                            </div>
                            <div className=" space-x-3  flex h-fill mb-8">
                                <div className="w-14 aspect-square bg-[#111111] rounded-xs flex">
                                    <Skeleton  containerClassName='block leading-[1px] flex-1' height='100%' borderRadius='0.125rem'/>
                                </div>
                                <div className="max-w-[196px] h-14  w-full bg-[#111111] rounded-xs flex">
                                    <Skeleton  containerClassName='block leading-[1px] flex-1' height='100%' borderRadius='0.125rem'/>
                                </div>
                            </div>
                        
                            <div className="w-full aspect-video bg-[#111111] rounded-xs mb-7 flex">
                                <Skeleton  containerClassName='block leading-[1px] flex-1' height='100%' borderRadius='0.125rem'/>
                            </div>
                            <div  className="flex flex-col gap-3">
                                <div className="w-full h-12 bg-[#111111] rounded-xs flex">
                                    {/* where to watch  */}
                                    <Skeleton  containerClassName='block leading-[1px] flex-1' height='100%' borderRadius='0.125rem'/>
                                </div>
                                <div className="w-full gap-2 grid grid-cols-2">
                                    {
                                        Array(4).fill(0).map((item , index) => (
                                            <div className="bg-[#111111] rounded-xs h-12 w-full flex" key={index}>
                                                <Skeleton  containerClassName='block leading-[1px] flex-1' height='100%' borderRadius='0.125rem'/> 
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div 
                            className="flex flex-col gap-3 flex-1"
                        >
                            <div className="lg:hidden flex gap-3 flex-col mb-2">
                                <div className="w-full h-12 bg-[#111111] rounded-xs flex">
                                    {/* title */}
                                    <Skeleton  containerClassName='block leading-[1px] flex-1' height='100%' borderRadius='0.125rem'/>
                                </div>
                                <div className="w-full h-24 bg-[#111111] rounded-xs  flex">
                                    {/* overviwe */}
                                    <Skeleton  containerClassName='block leading-[1px] flex-1' height='100%' borderRadius='0.125rem'/>
                                </div>
                            </div>
                            <div className="w-full aspect-2/3 bg-[#111111] rounded-xs flex">
                                {/* image */}
                                <Skeleton  containerClassName='block leading-[1px] flex-1' height='100%' borderRadius='0.125rem'/>
                            </div>
                            <div className="max-w-[480px] h-24  bg-[#111111] rounded-xs flex">
                                {/* votes , date , genres */}
                                <Skeleton  containerClassName='block leading-[1px] flex-1' height='100%' borderRadius='0.125rem'/>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-[1340px] lg:mt-15 mt-5 flex flex-col gap-3.5 mx-auto">
                        <div className="w-full max-w-[480px] h-12 bg-[#111111] rounded-xs flex ">
                            {/* title */}
                            <Skeleton  containerClassName='block leading-[1px] flex-1' height='100%' borderRadius='0.125rem'/>
                        </div>
                        <div className="w-full h-fit grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 grid mx-auto">
                                {
                                    Array(6).fill(0).map((_,index) => (
                                        <div className="bg-[#111111] rounded-xs w-full aspect-[2/3] flex" key={index}>
                                            <Skeleton  containerClassName='block leading-[1px] flex-1' height='100%' borderRadius='0.125rem'/>
                                        </div>
                                    ))
                                    }
                        </div>
                    </div>
                </SkeletonTheme>       
            </div>
        </section>
      );
    }