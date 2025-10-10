import { Mail,Linkedin,Twitter } from "lucide-react"
import Link from "next/link"

export function Footer(){
    return (
        <footer className="w-full  border-t border-t-white/10 ">
            <div className="max-w-[1700px] border-r border-l border-white/10 h-full mx-auto flex justify-center py-10 px-10">
                <div className="flex w-[1500px] flex-col gap-10">
                    <div className=" flex ">
                        <div className="flex flex-col flex-4 gap-3">
                            <h1 className="text-5xl font-semibold">ViewBox</h1>
                            <p className="w-[40%] text-white/40">
                                A platform dedicated to discovering and sharing exceptional yet underappreciated films. Built by movie enthusiasts, for movie enthusiasts, to ensure great films never go unnoticed.   
                            </p>
                        </div>
                        <div className="flex-1 flex flex-col gap-3 pt-2">
                            <h1 className="font-medium text-lg">Platfrom</h1>
                            <div className="flex space-y-1.5 flex-col text-white/40">
                                <Link href="/search" className="hover:text-green-600 duration-200 cursor-pointer">Browse Movies</Link>
                                <Link href="/user" className="hover:text-green-600 duration-200 cursor-pointer">Your Favourites</Link>
                            </div>
                        </div>
                        <div className="flex-1 flex-col flex  items-end pt-2">
                            <div className="gap-3 flex flex-col">
                                <h1 className="font-medium text-lg ">Contact</h1>
                                <div className="flex space-y-1.5 flex-col text-white/40 ">
                                    <a className="flex gap-2 items-center hover:text-green-600 duration-200 cursor-pointer"><Mail size={20}/>
                                        <p className="pt-1">
                                            Email
                                        </p>
                                    </a>
                                    <a className="flex gap-2 items-center hover:text-green-600 duration-200 cursor-pointer"><Twitter size={20}/>
                                        <p className="pt-1">
                                            X
                                        </p>    
                                    </a>
                                    <a className="flex gap-2 items-center text-center hover:text-green-600 duration-200 cursor-pointer"><Linkedin size={20}/>
                                        <p className="pt-1">
                                            LinkedIn
                                        </p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full  border-t border-b border-white/10 h-30 flex items-center ">
                        <div className="flex w-full flex-col text-white/40 ">
                            <div className="flex gap-1 flex-wrap">
                                <p>2025 ViewBox.</p>
                                <p>Created By <span className="underline cursor-pointer hover:text-green-600 duration-200">Aryan Kate</span></p>
                            </div>
                            <p>Made with passion of finding good cinema</p>
                        </div>
                        <div className="flex flex-row gap-4 text-white/40 ">
                            <a className="flex gap-2 items-center hover:text-green-600 duration-200 cursor-pointer"><Mail size={20}/></a>
                            <a className="flex gap-2 items-center hover:text-green-600 duration-200 cursor-pointer"><Twitter size={20}/></a>
                            <a className="flex gap-2 items-center text-center hover:text-green-600 duration-200 cursor-pointer"><Linkedin size={20}/></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}