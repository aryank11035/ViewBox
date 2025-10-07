'use client'

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { CardWrapper } from "./cardWrapper";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../formError";
import { FormSucess } from "../formSucess";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterSchema } from "@/schema/zod";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

    interface ResponseProps {
        error ?: string,
        message ?: string
    }

    export function RegisterFrom(){
        const router = useRouter()
        const [response ,setResponse] = useState<ResponseProps | undefined>(undefined) 

        

        const form  = useForm({
            resolver : zodResolver(RegisterSchema),
            defaultValues : {
                email : '',
                password : '',
                name : '',
            }
        })
        

        const onSubmit = async (values : z.infer<typeof RegisterSchema>) => {
            const res = await fetch('/api/auth/register' , {
                method : "POST",
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(values)
            })
            if(!res.ok) return setResponse({error : 'couldnt get response'})

            const body = await res.json() 
            setResponse(body)
        }
        
        
        if(response?.message){
            setTimeout(() => {
                router.push('/auth/login')
            },2000)

        }



        return(

            <CardWrapper
                headerLabel="Create an account"
                backButtonLabel="Already have an account?"
                backButtonHref="/auth/login"
                showSocial
            >
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-6'    
                >
                    <div className='space-y-4'>
                        <FormField 
                            control={form.control}
                            name= 'name'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='name'
                                            placeholder='Jhon Doe'
                                            className="border-1 border-[rgba(255,255,255,0.2)] rounded-none lg:h-12"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name= 'email'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='email'
                                            placeholder='jhon.doe@example.com'
                                            className="border-1 border-[rgba(255,255,255,0.2)] rounded-none lg:h-12"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name= 'password'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='password'
                                            placeholder='123456'
                                            className="border-1 border-[rgba(255,255,255,0.2)] rounded-none lg:h-12"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError error={response?.error}/>
                    <FormSucess message={response?.message}/>
                    <Button
                        type="submit"
                        className='w-full  bg-green-600 rounded-none text-white h-12 hover:bg-green-200 hover:scale-98 hover:text-green-600 duration-300 cursor-pointer'
                    >
                        Create an Account
                    </Button>
                </form>

            </Form>
        </CardWrapper>



        )
    }

function userRouter() {
    throw new Error("Function not implemented.");
}
