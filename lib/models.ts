import mongoose from "mongoose";
import { userSchema } from "@/schema/schema";

const Users = mongoose.models.User || mongoose.model('User',userSchema,'users') 


export default Users