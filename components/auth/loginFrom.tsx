'use client'
 
import * as z from 'zod'

import { CardWrapper } from "./cardWrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage } from "../ui/form"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../formError'
import { FormSucess } from '../formSucess'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LoginSchema } from '@/schema/zod'


interface ResponseProps {
    error ?: string,
    message ?: string,
    success ?: boolean
}

export const LoginForm = () => {
    const [response, setResponse] = useState<ResponseProps | undefined>(undefined);
    const router = useRouter();

    const form = useForm({
        resolver : zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = async (values: z.infer<typeof LoginSchema> ) => {
        const res = await fetch('/api/auth/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });
        if (!res.ok) return setResponse({ error: 'couldnt get response' });

        const body = await res.json();
        

        if(body.success) {
            setTimeout(() => {
                router.push('/user')
            },3000)
        }

        setResponse(body);

        
    };

    return (
        <CardWrapper
            headerLabel="Welcome Back"
            backButtonLabel="Dont Have and account?"
            backButtonHref="/auth/register"
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
                            name= 'email'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='email'
                                            placeholder='jhon.doe@example.com'
                                            className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs lg:h-12"
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
                                    <FormLabel>password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='password'
                                            placeholder='123456'
                                            className="border-1 border-[rgba(255,255,255,0.2)] rounded-xs lg:h-12"
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
                        className='w-full  bg-green-600 rounded-xs text-white h-12 hover:bg-green-200 hover:scale-98 hover:text-green-600 duration-300 cursor-pointer'
                    >
                        Log in
                    </Button>
                </form>

            </Form>
        </CardWrapper>
    )
}