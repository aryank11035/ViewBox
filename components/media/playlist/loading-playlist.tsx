import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function LoadingPlaylist() {
    return (
        <div className=" p-1 grid  md:grid-cols-2 lg:grid-cols-3 gap-4">
            <SkeletonTheme baseColor='#111111' highlightColor='#191919'>
                <div className="h-65 w-full max-w-[486px] bg-white/10 rounded-xs flex ">
                    <Skeleton  containerClassName='block leading-[1px] flex-1' height='100%' borderRadius='0.125rem'/>
                </div>
                <div className="h-65 w-full max-w-[486px] bg-[#FFFFFF1A] rounded-xs flex">
                    <Skeleton  containerClassName='block leading-[1px] flex-1' height='100%'  borderRadius='0.125rem' />
                </div>
                <div className="h-65 w-full max-w-[486px] bg-white/10 rounded-xs flex">
                    <Skeleton  containerClassName='block leading-[1px] flex-1' height='100%'  borderRadius='0.125rem'/>
                </div>
                <div className="h650 w-full max-w-[486px] bg-white/10 rounded-xs flex">
                    <Skeleton  containerClassName='block leading-[1px] flex-1' height='100%'  borderRadius='0.125rem'/>
                </div>
                <div className="h-65 w-full max-w-[486px] bg-white/10 rounded-xs flex">
                    <Skeleton  containerClassName='block leading-[1px] flex-1' height='100%'  borderRadius='0.125rem'/>
                </div>
                <div className="h-65 w-full max-w-[486px] bg-white/10 rounded-xs flex">
                    <Skeleton  containerClassName='block leading-[1px] flex-1' height='100%'  borderRadius='0.125rem'/>
                </div>
                <div className="h-65 w-full max-w-[486px] bg-white/10 rounded-xs flex">
                    <Skeleton  containerClassName='block leading-[1px] flex-1' height='100%'  borderRadius='0.125rem'/>
                </div>
                <div className="h-65 w-full max-w-[486px] bg-white/10 rounded-xs flex">
                    <Skeleton  containerClassName='block leading-[1px] flex-1' height='100%'  borderRadius='0.125rem'/>
                </div>
                <div className="h-65 w-full max-w-[486px] bg-white/10 rounded-xs flex">
                    <Skeleton  containerClassName='block leading-[1px] flex-1' height='100%'  borderRadius='0.125rem'/>
                </div>
            </SkeletonTheme>
        </div>
    )
}