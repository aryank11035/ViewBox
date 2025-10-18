import bcryptjs from 'bcryptjs'
import { NextResponse } from 'next/server'
import client from '@/lib/db'

import { getUserByEmail, returnUserAdmin } from '@/data/user'
import { connectToMongoose } from '@/lib/mongoose'
import {Users} from '@/lib/models'
import mongoose from 'mongoose'
export async function POST(req : Request){
    const {name ,  email , password } = await req.json()
    
    

    if(!email || !password || !name) return NextResponse.json({success : false , error : 'Invalid fields'})
    
    const hashedPassword = await bcryptjs.hash(password,10)

    await connectToMongoose()
    const existingUser =  await getUserByEmail(email); 
    if(existingUser){
        return NextResponse.json({ success: false, error: "User already exists" })
    }

    const isAdmin = await returnUserAdmin(email)
    const newUser = new Users({
        name: isAdmin ? "Admin" : name,
        email,
        password: hashedPassword,
        role: isAdmin ? "admin" : "user",
        isAdmin,
        votes_id: [],
        suggestions: [],
        favourites: [],
        playlist: []
    })

    await newUser.save()

    return NextResponse.json({success : true  , message : 'User registered'} )
}
