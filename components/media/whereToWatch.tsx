'use client'

import { WhereToWatchIcons } from "./whereToWatchIcons"

export function WhereToWatch({whereToWatch} : {whereToWatch : any}){




    return(
        <div className="w-full ">
            {
                whereToWatch?.flatrate && (
                    <div className="w-full  flex gap-2 flex-col" >
                        <h1>Stream</h1>
                        <div className="flex gap-2 flex-wrap"> 
                            {
                                whereToWatch.flatrate.map((item : any) => (
                                    <WhereToWatchIcons iconData = {item} key={item.id}/>
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
                                whereToWatch.rent.map((item : any) => (
                                    <WhereToWatchIcons iconData = {item} key={item.id}/>
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
                                whereToWatch.buy.map((item : any) => (
                                    <WhereToWatchIcons iconData = {item}key={item.id} />
                                ))
                            }
                        </div>
                    </div>
                )   
            }
        </div>
    )
}