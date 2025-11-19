import mongoose from "mongoose";
import { movieSchema, playlistSchema, suggestionsSchema, userSchema } from "@/schema/schema";

const Users = mongoose.models.User || mongoose.model('User',userSchema,'users') 
const Movies = mongoose.models.Movie || mongoose.model('Movie',movieSchema,'movies')
const Playlists = mongoose.models.Playlist || mongoose.model('Playlist',playlistSchema  ,'playlists')
const Suggestions = mongoose.models.Suggestion || mongoose.model('Suggestion' ,suggestionsSchema , 'suggestions')
export  {Users , Movies , Playlists , Suggestions }