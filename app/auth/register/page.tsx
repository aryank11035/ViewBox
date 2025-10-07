import { RegisterFrom } from "@/components/auth/registerFrom";

export default function RegisterPage(){
    
    return (
        <>
            <section className="max-w-[1800px] min-h-screen mx-auto  border-l border-r border-white/10 relative bg-[#111111] pt-20 flex">
                <div className=" flex flex-2 min-h-screen mx-auto items-center px-2 ">
                    <div className="relative w-full md:w-1/2 mx-auto  ">
                        <div className="hidden md:block
                                            absolute inset-0 
                                            border border-[rgba(255,255,255,0.1)]
                                            bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.1)_0,rgba(255,255,255,0.1)_1px,transparent_0,transparent_50%)]
                                            bg-[size:10px_10px] 
                                            bg-fixed">
                        </div>
                        <RegisterFrom/>
                    </div>
                </div>
                <div className="relative xl:flex flex-2 min-h-screen hidden"> 
                    <div className="hidden md:block
                                    absolute inset-0 
                                    border-l border-[rgba(255,255,255,0.1)]
                                    bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.1)_0,rgba(255,255,255,0.1)_1px,transparent_0,transparent_50%)]
                                    bg-[size:10px_10px] 
                                    bg-fixed">
                    </div>
                </div>
            </section>
        </>
        
    )
}