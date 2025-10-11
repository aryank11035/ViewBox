'use client'

import YouTube from 'react-youtube';
export function TestPage({datakey}  : {datakey : any}){
    return (
        <section className="max-w-[1700px] border-l border-r border-white/10 min-h-screen mx-auto  pt-20">
                <div className="w-full min-h-screen bg-white flex items-center justify-center">
                    <YouTube videoId={datakey}/>
                </div>
        </section>
    )
}