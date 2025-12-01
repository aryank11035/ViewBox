'use client'

import {  WhereToWatchIcons } from "./whereToWatchIcons"

export function WhereToWatch({whereToWatch , mediaName } : {whereToWatch : any  , mediaName : string}){

    return(
        <div className="w-full ">
            {
                whereToWatch?.flatrate && (
                    <div className="w-full  flex gap-2 flex-col" >
                        <h1>Stream</h1>
                        <div className="flex gap-2 flex-wrap"> 
                            {
                                whereToWatch.flatrate.map((item : any , index : number) => (
                                    <WhereToWatchIcons iconData = {item} key={index} mediaName={mediaName}/>
                                ))
                            }
                        </div>
                    </div>
                )
            }   
            {
                whereToWatch?.rent && (
                    <div className="w-full  flex gap-2 flex-col mt-4 " >
                        <h1>Rent</h1>
                        <div className="flex gap-2 flex-wrap"> 
                            {
                                whereToWatch.rent.map((item : any , index : number) => (
                                    <WhereToWatchIcons iconData = {item} key={index} mediaName={mediaName}/>
                                ))
                            }
                        </div>
                    </div>
                )
            }
            {
                whereToWatch?.buy && (
                    <div className="w-full  flex gap-2 flex-col mt-4 " >
                        <h1>Buy</h1>
                        <div className="flex gap-2 flex-wrap"> 
                            {
                                whereToWatch.buy.map((item : any,index : number) => (
                                    <WhereToWatchIcons iconData = {item}key={index} mediaName={mediaName} />
                                ))
                            }
                        </div>
                    </div>
                )   
            }
             
            {
                whereToWatch?.clips && (
                    <div className="w-full  flex gap-2 flex-col mt-4 " >
                        <h1>Clips</h1>
                        <div className="flex gap-2 flex-wrap"> 
                            {
                                whereToWatch.clips.map((item : any,index : number) => (
                                    <WhereToWatchIcons iconData = {item}key={index} mediaName={mediaName} />
                                ))
                            }
                        </div>
                    </div>
                )   
            }
        </div>
    )
}