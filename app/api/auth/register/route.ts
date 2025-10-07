import bcryptjs from 'bcryptjs'
import { NextResponse } from 'next/server'
import client from '@/lib/db'
import { getUserByEmail } from '@/data/user'
export async function POST(req : Request){
    const {name ,  email , password } = await req.json()
    
    

    if(!email || !password || !name) return NextResponse.json({success : false , error : 'Invalid fields'})
    
    const hashedPassword = await bcryptjs.hash(password,10)

    await client.connect()
    const db = client.db('moviedb')
    const existingUser =  await getUserByEmail(email); 
    console.log(existingUser)
    if(existingUser){
        return NextResponse.json({ success: false, error: "User already exists" })
    }


    await db.collection('users').insertOne({
        name,
        email,
        password: hashedPassword,
        createdAt: new Date(),
    })
     return NextResponse.json({success : true  , message : 'User registered'} )
}
