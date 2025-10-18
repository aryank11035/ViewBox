import mongoose from "mongoose";
import { movieSchema, userSchema } from "@/schema/schema";

const Users = mongoose.models.User || mongoose.model('User',userSchema,'users') 
const Movies = mongoose.models.Movie || mongoose.model('Movie',movieSchema,'movies')

export  {Users , Movies}