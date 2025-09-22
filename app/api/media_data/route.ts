import { NextResponse } from "next/server"

const watchlist : any []= []
export async function POST(req : Request){
    const body = await req.json()
    watchlist.push(body)
    return NextResponse.json({sucess : true , media : body})
}

export async function GET(req : Request) {
    return NextResponse.json(watchlist)
}