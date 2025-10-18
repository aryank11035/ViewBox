
import { auth, signIn, signOut } from "@/auth"
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

    if(!session?.user) return redirect('/auth/login')

    await connectToMongoose()
    const movie = await Movies.findOne()
    // const res = await fetch('http://localhost:3000/api/media_data')
    // const data = await res.json()
    console.log(movie)

    const genres = movie.genres.map((item : any) => (
        <Input id={item.name} name={item.name} value={item.name} key={item.id} className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12" disabled/>
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

                    <div className="w-[80%] min-h-screen bg-white/10 mx-auto p-2">
                        <h1 className="text-4xl text-center text-bold font-bold">Add a Movie or Show</h1>
                        <div className="relative">
                            <div className="flex items-center">
                                <div className="h-12  flex-1  flex items-center justify-center">
                                    <Search strokeWidth={1}/>   
                                </div>
                                    <input className="w-[20%] h-12 flex-9 mx-auto border-1 border-[rgba(255,255,255,0.2)] " type="text" placeholder="Search movies"/>
                            </div>
                        </div>


                        <form className="bg-black/20 w-full min-h-screen mt-20 p-2  text-sm flex flex-col gap-5 ">
                     

                                <div className=" flex flex-wrap gap-2 ">
                                    <div className="flex flex-col w-full max-w-sm gap-0.5">
                                        <Label htmlFor="id">id:</Label>
                                        <Input id="id" type="text" className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12"/>
                                    </div>
                                    <div className="flex flex-col w-full max-w-sm gap-0.5">
                                        <Label htmlFor="title">title:</Label>
                                        <Input id="title" type="text" className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12"/>
                                    </div> 
                                </div>
                                <div className=" flex flex-wrap gap-2">
                                    <div className="flex flex-col w-full max-w-sm gap-0.5">
                                        <Label htmlFor="backdrop_path">backdrop path:</Label>
                                        <Input id="backdrop_path" type="text" className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12"/>
                                    </div>
                                    <div className="flex flex-col w-full max-w-sm gap-0.5">
                                        <Label htmlFor="poster_path">poster path:</Label>
                                        <Input id="poster_path" type="text" className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12"/>
                                    </div> 
                                </div>
                                <div className=" flex flex-wrap gap-2">
                                    <div className="flex flex-col w-full max-w-sm gap-0.5">
                                        <Label htmlFor="overview">overview:</Label>
                                        <Input id="overview" type="text" className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12"/>
                                    </div>
                                    <div className="flex flex-col w-full max-w-sm gap-0.5">
                                        <Label htmlFor="overview">vote average:</Label>
                                        <Input id="overview" type="text" className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12"/>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <div className="flex flex-col w-full max-w-sm gap-0.5">
                                        <Label htmlFor="overview">release date:</Label>
                                        <Input id="overview" type="text" className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs h-12"/>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 w-full">
                                    <div className="flex flex-col gap-0.5">
                                        <Label htmlFor="genres">genres:</Label>
                                        <div id="genres" className="grid  grid-cols-[repeat(auto-fit,minmax(150px,1fr))] w-full max-w-sm gap-2 ">
                                            {genres}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 w-full">
                                    <Label htmlFor="whereToWatch">where to watch:</Label>
                                    <div id="whereToWatch">

                                    </div>
                                    <Select></Select>
                                </div>
                        </form>
                    </div>
                
                </div>
            </section>
        </>
    )
}