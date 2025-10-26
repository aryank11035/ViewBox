'use client'

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

export function ResultWrapper({media} : any){



 

    // return (
    //     <>
    //         {media ? JSON.stringify(media.whereToWatch, null, 2) : 'No media selected'}
    //     </>
    // )

        const clips = media.whereToWatch.clips || []
        const flatrate = media.whereToWatch.flatrate || []
        const buy = media.whereToWatch.buy || []
        const rent = media.whereToWatch.rent || []
        
        const genres = media.genres.map((item : any) => (
            <Input id={item.name} name={item.name} value={item.name} key={item.id} className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12" disabled/>
        ))
    
        const clipsInput = clips.map((item : any , index : number ) => (
                <div className="flex mt-4 gap-2 flex-col md:flex-row" key={item.provider_id}>
                    <h1 className="flex-1 flex bg-white/10 items-center justify-center rounded-xs">{`${index+1}`}</h1>
                    <div className="grid  grid-cols-1 md:grid-cols-2 flex-15 gap-2 " key={item.display_priority}>
                        <div className="flex flex-col w-full gap-0.5">
                            <Label htmlFor="logo_path">logo path:</Label>
                            <Input id="logo_path" type="text" className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12" value={item.logo_path}/>
                        </div>
                        <div className="flex flex-col w-full  gap-0.5">
                            <Label htmlFor="provider_name">provider name:</Label>
                            <Input id="provider_name" type="text" className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12" value={item.provider_name}/>
                        </div>
                        <div className="flex flex-col w-full gap-0.5">
                            <Label htmlFor="provider_id">provider id:</Label>
                            <Input id="provider_id" type="text" className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12" value={item.provider_id}/>
                        </div>
                        <div className="flex flex-col w-full  gap-0.5">
                            <Label htmlFor="display_priority">display priority:</Label>
                            <Input id="display_priority" type="text" className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12" value={item.display_priority}/>
                        </div>
                    </div>
                </div>
            
        )) 
        const flatrateInput = flatrate.map((item : any , index : number ) => (
                <div className="flex mt-4 gap-2 flex-col md:flex-row" key={item.provider_id}>
                    <h1 className="flex-1 flex bg-white/10 items-center justify-center rounded-xs">{`${index+1}`}</h1>
                    <div className="grid  grid-cols-1 md:grid-cols-2 flex-15 gap-2 " key={item.display_priority}>
                        <div className="flex flex-col w-full gap-0.5">
                            <Label htmlFor="logo_path">logo path:</Label>
                            <Input id="logo_path" type="text" className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12" value={item.logo_path}/>
                        </div>
                        <div className="flex flex-col w-full  gap-0.5">
                            <Label htmlFor="provider_name">provider name:</Label>
                            <Input id="provider_name" type="text" className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12" value={item.provider_name}/>
                        </div>
                        <div className="flex flex-col w-full gap-0.5">
                            <Label htmlFor="provider_id">provider id:</Label>
                            <Input id="provider_id" type="text" className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12" value={item.provider_id}/>
                        </div>
                        <div className="flex flex-col w-full  gap-0.5">
                            <Label htmlFor="display_priority">display priority:</Label>
                            <Input id="display_priority" type="text" className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12" value={item.display_priority}/>
                        </div>
                    </div>
                </div>
            
        )) 
        const rentInput = rent.map((item : any , index : number ) => (
                <div className="flex mt-4 gap-2 flex-col md:flex-row" key={item.provider_id}>
                    <h1 className="flex-1 flex bg-white/10 items-center justify-center rounded-xs">{`${index+1}`}</h1>
                    <div className="grid  grid-cols-1 md:grid-cols-2 flex-15 gap-2 " key={item.display_priority}>
                        <div className="flex flex-col w-full gap-0.5">
                            <Label htmlFor="logo_path">logo path:</Label>
                            <Input id="logo_path" type="text" className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12" value={item.logo_path}/>
                        </div>
                        <div className="flex flex-col w-full  gap-0.5">
                            <Label htmlFor="provider_name">provider name:</Label>
                            <Input id="provider_name" type="text" className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12" value={item.provider_name}/>
                        </div>
                        <div className="flex flex-col w-full gap-0.5">
                            <Label htmlFor="provider_id">provider id:</Label>
                            <Input id="provider_id" type="text" className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12" value={item.provider_id}/>
                        </div>
                        <div className="flex flex-col w-full  gap-0.5">
                            <Label htmlFor="display_priority">display priority:</Label>
                            <Input id="display_priority" type="text" className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12" value={item.display_priority}/>
                        </div>
                    </div>
                </div>
            
        )) 
        const buyInput = buy.map((item : any , index : number ) => (
                <div className="flex mt-4 gap-2 flex-col md:flex-row" key={item.provider_id}>
                    <h1 className="flex-1 flex bg-white/10 items-center justify-center rounded-xs">{`${index+1}`}</h1>
                    <div className="grid  grid-cols-1 md:grid-cols-2 flex-15 gap-2 " key={item.display_priority}>
                        <div className="flex flex-col w-full gap-0.5">
                            <Label htmlFor="logo_path">logo path:</Label>
                            <Input id="logo_path" type="text" className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12" value={item.logo_path}/>
                        </div>
                        <div className="flex flex-col w-full  gap-0.5">
                            <Label htmlFor="provider_name">provider name:</Label>
                            <Input id="provider_name" type="text" className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12" value={item.provider_name}/>
                        </div>
                        <div className="flex flex-col w-full gap-0.5">
                            <Label htmlFor="provider_id">provider id:</Label>
                            <Input id="provider_id" type="text" className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12" value={item.provider_id}/>
                        </div>
                        <div className="flex flex-col w-full  gap-0.5">
                            <Label htmlFor="display_priority">display priority:</Label>
                            <Input id="display_priority" type="text" className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12" value={item.display_priority}/>
                        </div>
                    </div>
                </div>
            
        ))
    

















    return (
     
          

             <form className="bg-white/10 w-full min-h-screen  p-2  text-sm flex flex-col gap-5 mx-auto rounded-xs">
                      
                                <div className=" w-full bg-black/20 p-2 rounded-xs ">
                                    <div className=" flex flex-wrap gap-2 justify-between space-y-1 flex-col md:flex-row">
                                        <div className="flex flex-col flex-1 gap-0.5">
                                            <Label htmlFor="id">id:</Label>
                                            <Input id="id" type="text" className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12"/>
                                        </div>
                                        <div className="flex flex-col flex-1 gap-0.5">
                                            <Label htmlFor="title">title:</Label>
                                            <Input id="title" type="text" className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12"/>
                                        </div> 
                                    </div>
                                    <div className=" flex flex-wrap gap-2 mt-2 justify-between space-y-1 flex-col md:flex-row">
                                        <div className="flex flex-col flex-1 gap-0.5">
                                            <Label htmlFor="backdrop_path">backdrop path:</Label>
                                            <Input id="backdrop_path" type="text" className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12"/>
                                        </div>
                                        <div className="flex flex-col flex-1 gap-0.5">
                                            <Label htmlFor="poster_path">poster path:</Label>
                                            <Input id="poster_path" type="text" className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12"/>
                                        </div> 
                                    </div>
                                    <div className=" flex flex-wrap gap-2 mt-2 justify-between space-y-1 flex-col md:flex-row">
                                        <div className="flex flex-col flex-1 gap-0.5">
                                            <Label htmlFor="overview">overview:</Label>
                                            <Input id="overview" type="text" className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12"/>
                                        </div>
                                        <div className="flex flex-col flex-1 gap-0.5">
                                            <Label htmlFor="overview">vote average:</Label>
                                            <Input id="overview" type="text" className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12"/>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2 justify-between space-y-1 flex-col md:flex-row">
                                        <div className="flex flex-col flex-1 gap-0.5">
                                            <Label htmlFor="overview">release date:</Label>
                                            <Input id="overview" type="text" className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12"/>
                                        </div>
                                        <div className="flex flex-col flex-1 gap-0.5">
                                            <Label htmlFor="suggested">suggested by:</Label>
                                            <Input id="suggested" type="text" className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12"/>
                                        </div>
                                    </div>
                                </div>


                                <div className="flex flex-col md:flex-row gap-2 justify-between bg-black/20 p-2 rounded-xs ">
                                    <div className="flex flex-col gap-0.5 flex-1">
                                        <Label htmlFor="genres">genres:</Label>
                                        <div id="genres" className="grid  grid-cols-1 md:grid-cols-2 w-full gap-2 ">
                                            {genres}
                                        </div>
                                    </div>
                                    <div className="flex flex-1 gap-2">
                                        <div className="flex flex-col gap-0.5 flex-1 ">
                                            <Label htmlFor="mediaType">media type:</Label>
                                            <Input id='mediaType' type="text" value={media.mediaType} className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12" disabled/>
                                        </div>
                                        <div className="flex flex-col gap-0.5 flex-1 ">
                                            <Label htmlFor="videokey">video key:</Label>
                                            <Input id="videokey" type="text" value={media.videokey} className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12" />
                                        </div>

                                    </div>
                                </div>




                                <div className="flex flex-wrap gap-2 w-full">
                                        
                                            <div className="flex flex-col gap-0.5 mt-2 w-full bg-black/20 p-2 rounded-xs ">
                                                <Label htmlFor="clips">clips:</Label>
                                                <div id="clips">
                                                    {clipsInput}

                                                </div>
                                                <Button className="h-12 bg-white/10 rounded-xs mt-2 hover:bg-white/20 duration-100">+ add </Button>
                                            </div>
                                        
                                       
                                            <div className="flex flex-col gap-0.5 mt-2 w-full bg-black/20 p-2 rounded-xs">
                                                <Label htmlFor="flatrate">flatrate:</Label>
                                                <div id="flatrate">
                                                    {flatrateInput}

                                                </div>
                                                <Button className="h-12 bg-white/10 rounded-xs mt-2 hover:bg-white/20 duration-100">+ add </Button>
                                            </div>
                                       
                                       
                                            <div className="flex flex-col gap-0.5 mt-2 w-full bg-black/20 p-2 rounded-xs">
                                                <Label htmlFor="rent">rent:</Label>
                                                <div id="rent">
                                                    {rentInput}

                                                </div>
                                                <Button className="h-12 bg-white/10 rounded-xs mt-2 hover:bg-white/20 duration-100">+ add </Button>
                                            </div>
                                        
                                        
                                            <div className="flex flex-col gap-0.5 mt-2 w-full bg-black/20 p-2 rounded-xs">
                                                <Label htmlFor="buy">buy:</Label>
                                                <div id="buy">
                                                    {buyInput}

                                                </div>
                                                <Button className="h-12 bg-white/10 rounded-xs mt-2 hover:bg-white/20 duration-100">+ add </Button>
                                            </div>
                                        
                                </div> 
                        </form>


        
    )
}