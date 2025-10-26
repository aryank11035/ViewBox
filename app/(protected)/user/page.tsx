
import { auth, signIn, signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { AdminWrapper } from "@/components/user/adminWrapper"
import { SearchPanel } from "@/components/user/searchPanel"
import { SearchWrapper } from "@/components/user/searchWrapper"
import { getSearchMedia, getSearchMedia2 } from "@/lib/helpers"
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
    // const searchData = await getSearchMedia()
    
    //  console.log(await getSearchMedia2())
    
    


    return (
        <> 

            <section className="w-full min-h-screen pt-20">

                <div>
                    <h1 className="pt-20">Hello {session?.user.name}</h1>
                    <button onClick={async() => {
                        'use server'
                        await signOut()
                        console.log('clicked')
                    }}>Sign Out</button>
                    
                  <AdminWrapper>
                        
                  </AdminWrapper>

                    {/* <div className=" min-h-screen  mx-auto  flex-1 w-full">
                        <h1 className="text-4xl text-center text-bold font-bold">Add a Movie or Show</h1>
                        


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
                                            <Label htmlFor={movie.mediaType}>media type:</Label>
                                            <Input id={movie.mediaType} type="text" value={movie.mediaType} className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12" disabled/>
                                        </div>
                                        <div className="flex flex-col gap-0.5 flex-1 ">
                                            <Label htmlFor="videokey">video key:</Label>
                                            <Input id="videokey" type="text" value={movie.videokey} className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12" />
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
                    </div> */}
                
                </div>
            </section>
        </>
    )
}