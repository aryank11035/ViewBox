import mongoose from "mongoose";
import { movieSchema, playlistSchema, userSchema, votesSchema } from "@/schema/schema";

const Users = mongoose.models.User || mongoose.model('User',userSchema,'users') 
const Movies = mongoose.models.Movie || mongoose.model('Movie',movieSchema,'movies')
const Playlists = mongoose.models.Playlist || mongoose.model('Playlist',playlistSchema  ,'playlists')
const Votes = mongoose.models.Vote || mongoose.model('Vote' , votesSchema , 'votes')
export  {Users , Movies , Playlists , Votes}