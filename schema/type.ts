import { ObjectId } from "mongodb";











export interface Session {
  user :{ 
    name : string
    email : string 
    image ?: string 
    id : string
    movies : [{
      _id : ObjectId,
      id : number
    }]
  }
  expires : string
}
