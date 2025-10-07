'use client'

import { stringify } from "querystring";
import { ChangeEvent, FormEvent, useState } from "react"


export default function RegisterPage(){

    const [formData , setFormData] = useState({
        username : '',
        email : '',
        password : '',
    });
    const [message,setMessage] = useState('')
    const handleChange = async (e : ChangeEvent<HTMLInputElement> ) => {
        setFormData ({
            ...formData,
            [e.target.name] : e.target.value    
        })
    }

    const handleSubmit =  async (e : FormEvent<HTMLFormElement>) => {
        try{
            const res = await fetch('/api/auth/register',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(formData)
            })

            if(!res.ok) {
                throw new Error ('failed to sign up')
            }

            const data = await res.json()
            setMessage(data.message)
        }catch(err){
            console.error('Sign up failed',err)
        }
    }

    return (
        <>
        
            <div className=" flex flex-2 min-h-screen mx-auto items-center px-2">
                <div className="relative w-full md:w-1/2 mx-auto  ">
                        <div className="hidden md:block
                                                                absolute inset-0 
                                                                border border-[rgba(255,255,255,0.1)]
                                                                bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.1)_0,rgba(255,255,255,0.1)_1px,transparent_0,transparent_50%)]
                                                                bg-[size:10px_10px] 
                                                                bg-fixed">
                                                </div>
                    <div className="relative  flex-col flex  px-5 py-6  text-white/70 md:border md:border-white/10 backdrop-blur-md md:translate-x-4 md:-translate-y-4">
                        <h1 className="text-center text-3xl mb-10">Sign up</h1>
                        <form className="space-y-3" onSubmit={handleSubmit} >
                            <label htmlFor="username" className="text-2xl">Username:</label>
                            <input onChange={handleChange} value={formData.username} autoComplete="off" type="text" id="username" name="username"  className="w-full h-12 border-1 border-white/10 px-2 outline-0 text-xl bg-transparent" required/>
                            <label htmlFor="email" className="text-2xl">Email</label>
                            <input onChange={handleChange} value={formData.email} autoComplete="off" type="email" id="email" name="email" required  className="w-full h-12 border-1 border-white/10 px-2 outline-0 text-xl bg-transparent"/>
                            <label  htmlFor="password" className="text-2xl">Password</label>
                            <input onChange={handleChange} value={formData.password} autoComplete="off" type="password" id='password' name="password" required className="w-full h-12 border-1 border-white/10 px-2 outline-0  text-xl bg-transparent"/>

                            <div className="relative w-full h-fit mt-6 ">
                                <div className="hidden md:block
                                                absolute inset-0 
                                                border border-[rgba(255,255,255,0.1)]
                                                bg-[rgba(255,255,255,0.1)]
                                                bg-fixed">
                                </div>
                                <button className="
                                                cursor-pointer relative transform  md:text-left md:text-xl text-xl font-bold font-sans px-6 py-2 border-2 border-green-500 bg-green-500 text-green-900 text-center w-full  md:translate-x-0 md:-translate-y-0 hover:z-10 transition-all duration-500 hover:translate-x-1 hover:-translate-y-1  active:translate-x-0 active:-translate-y-0 active:bg-transparent  active:border-[rgba(0,0,0,0.2)]">
                                    <p className="text-center " >
                                        Sign Up
                                    </p>
                                </button>
                            </div>
                        </form> 
                        {/* <p>{message}</p> */}
                    </div>

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
        
        </>
       
    )
}
