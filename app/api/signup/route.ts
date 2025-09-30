import { User } from "@/app/db/database"
import { NextResponse } from "next/server"

export async function POST(req : Request) {
    try {
        const userData =  await req.json()


        const existingUser = await User.findOne({username : userData.username})

        if(existingUser) return NextResponse.json({sucess : false , message : `${userData.username} already exits`})

        const newUserData = new User(userData)
        await newUserData.save()

        if(!userData.username || !userData.email || !userData.password){
            return NextResponse.json({sucess : false ,message : 'Error Posting data'})
        }
        
        return NextResponse.json({sucess : false , body : { username : userData.username,email : userData.email} , message : 'Received Data'})

    } catch (error) {
        console.error('Error posting Data')   
    }
}

