import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdMailOutline } from "react-icons/md";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link"

export function Footer(){
    return (
        <footer className="w-full  border-t border-t-white/10 ">
            <div className="max-w-[1450px] border-r border-l border-white/10 h-full mx-auto flex justify-center py-10 px-4">
                <div className="flex w-[1300px] flex-col gap-10">
                    <div className=" flex flex-col  md:flex-row gap-5 md:gap-0">



                        <div className="flex flex-col flex-1 gap-3 ">
                            <h1 className="text-3xl md:text-5xl font-semibold">ViewBox</h1>
                            <p className="w-[100%] md:w-[350px] text-white/40 text-xs md:text-sm">
                                A platform dedicated to discovering and sharing exceptional yet underappreciated films. Built by movie enthusiasts, for movie enthusiasts, to ensure great films never go unnoticed.   
                            </p>
                        </div>


                        <div className="flex flex-row  flex-1">
                            <div className="flex flex-col gap-3  pt-2">
                                <h1 className="font-medium text-md md:text-lg">Platfrom</h1>
                                <div className="flex space-y-1.5 flex-col text-white/40 text-sm md:text-base">
                                    <Link href="/search" className="hover:text-green-600 duration-200 cursor-pointer">Browse Movies</Link>
                                    <Link href="/user" className="hover:text-green-600 duration-200 cursor-pointer">Your Favourites</Link>
                                </div>
                            </div>
                            <div className="flex-1 flex-col flex  items-end pt-2">
                                <div className="gap-3 flex flex-col">
                                    <h1 className="font-medium text-md md:text-lg">Contact</h1>
                                    <div className="flex space-y-1.5 flex-col text-white/40 text-sm md:text-base">
                                        {/* <a className="flex gap-2 items-center hover:text-green-600 duration-200 cursor-pointer">
                                            <MdMailOutline size={21} className="mt-0.5"/>
                                            <p className="pt-1">
                                                Email
                                            </p>
                                        </a> */}
                                        <a className="flex gap-2 items-center hover:text-green-600 duration-200 cursor-pointer"><FaXTwitter size={19    }/>
                                            <p className="pt-1">
                                                X
                                            </p>    
                                        </a>
                                        <a className="flex gap-2 items-center text-center hover:text-green-600 duration-200 cursor-pointer"><FaLinkedin size={19}/>
                                            <p className="pt-1">
                                                LinkedIn
                                            </p>
                                        </a>
                                        <a className="flex gap-2 items-center text-center hover:text-green-600 duration-200 cursor-pointer"><FaGithub size={19}/>
                                            <p className="pt-1">
                                                GitHub
                                            </p>
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="w-full  border-t border-b border-white/10 py-10 flex items-center  ">
                        <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
                            <div className="flex w-full flex-col text-white/40 text-xs md:text-sm text-center md:text-left">
                                <div className="flex gap-1 justify-center md:justify-start">
                                    <p>2025 ViewBox.</p>
                                    <p>Created By <span className="underline cursor-pointer hover:text-green-600 duration-200">Aryan Kate</span></p>
                                </div>
                                <p>Made with passion of finding good cinema</p>
                            </div>
                            <div className="flex flex-row gap-4 text-white/40 justify-center">
                                {/* <a className="flex gap-2 items-center hover:text-green-600 duration-200 cursor-pointer"><MdMailOutline size={21}/></a> */}
                                <a className="flex gap-2 items-center hover:text-green-600 duration-200 cursor-pointer"><FaXTwitter size={19}/></a>
                                <a className="flex gap-2 items-center text-center hover:text-green-600 duration-200 cursor-pointer"><FaLinkedin size={19}/></a>
                                <a className="flex gap-2 items-center text-center hover:text-green-600 duration-200 cursor-pointer"><FaGithub size={19}/></a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}