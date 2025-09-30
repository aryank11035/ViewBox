import { User } from "@/app/db/database"
import { NextResponse } from "next/server"

export async function GET(req : Request){
    try{
        const user = await User.find({})

        if (user.length === 0) {
           
            return NextResponse.json({
              username: "Guest",
            });
          }

        console.log(user)
        return NextResponse.json(user[0])
    }catch(err){
        console.error('Error Getting user info')
         return NextResponse.json({sucess : false , error : 'Failed to fetch user Info'}, {status: 500})
    }
}