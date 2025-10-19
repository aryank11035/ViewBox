
import { auth, signIn, signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Movies } from "@/lib/models"
import { connectToMongoose } from "@/lib/mongoose"
import { Session } from "@/schema/type"
import { AwardIcon, Search } from 'lucide-react'
import { redirect } from "next/navigation"

export default async function UserPage(){

    const session = (await auth()) as Session | null
    const wheretoWatchData : Record<string , any> ={}

    if(!session?.user) return redirect('/auth/login')

    await connectToMongoose()
    const movie = await Movies.findOne()
    // const res = await fetch('http://localhost:3000/api/media_data')
    // const data = await res.json()
    
    const genres = movie.genres.map((item : any) => (
        <Input id={item.name} name={item.name} value={item.name} key={item.id} className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12" disabled/>
    ))
    
    
    const clips = movie.whereToWatch.clips
    const flatrate = movie.whereToWatch.flatrate
    const buy = movie.whereToWatch.buy
    const rent = movie.whereToWatch.rent
    console.log(flatrate)
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
        <> 

            <section className="w-full min-h-screen pt-20">

                <div className="max-w-[1700px] min-h-screen mx-auto border-l border-r border-white/10 bg-black/30 p-2">
                    {/* <h1 className="pt-20">Hello {session?.user.name}</h1>
                    <button onClick={async() => {
                        'use server'
                        await signOut()
                        console.log('clicked')
                    }}>Sign Out</button> */}

                    <div className=" min-h-screen  mx-auto  md:w-[50%] w-full">
                        <h1 className="text-4xl text-center text-bold font-bold">Add a Movie or Show</h1>
                        {/* <div className="relative">
                            <div className="flex items-center">
                                <div className="h-12  flex-1  flex items-center justify-center">
                                    <Search strokeWidth={1}/>   
                                </div>
                                    <input className="w-[20%] h-12 flex-9 mx-auto border-1 border-[rgba(255,255,255,0.2)] " type="text" placeholder="Search movies"/>
                            </div>
                        </div> */}


                        <form className="bg-white/10 w-full min-h-screen mt-20 p-2  text-sm flex flex-col gap-5 mx-auto rounded-xs">
                     
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
                                            <Label htmlFor={movie.mediaType}>media type:</Label>
                                            <Input id={movie.mediaType} type="text" value={movie.mediaType} className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12" disabled/>
                                        </div>
                                        <div className="flex flex-col gap-0.5 flex-1 ">
                                            <Label htmlFor="videokey">video key:</Label>
                                            <Input id="videokey" type="text" value={movie.videokey} className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12" disabled/>
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
                    </div>
                
                </div>
            </section>
        </>
    )
}