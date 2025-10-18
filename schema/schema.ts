import { WhereToWatch } from "@/components/media/whereToWatch";
import mongoose from "mongoose";
import { release } from "os";


const providerSchema = new mongoose.Schema({
  logo_path: { type: String, required: true },
  provider_id: { type: Number, required: true },
  provider_name: { type: String, required: true },
  display_priority: { type: Number, required: true },
});


const whereToWatchSchema = new mongoose.Schema({
  flatrate: { type: [providerSchema], required: false  },
  rent: { type: [providerSchema], required: false },
  buy: { type: [providerSchema],  required: false },
  clips: { type : [providerSchema],  required: false }
});


const movieSchema = new mongoose.Schema({
    id : Number,
    title : {
        type : String,
        required : false,
    },
    original_name : {
        type : String,
        required : false
    }, 
    backdrop_path : String,
    poster_path : String,
    overview : String,
    vote_average : Number,
    release_date : {
        type: String,
        required : false
    },
    first_air_date : {
        type : String,
        required : false
    },
    genres : [{
        id : Number,
        name: String
    }],
    mediaType : {
        type : String,
        enum : ['movie' , 'tv']
    },
    overrated : {
        type : Number,
        default : 0
    },
    underrated : {
        type : Number,
        default : 0
    },
    videoKey : String,
    whereToWatch : whereToWatchSchema
})

const userSchema = new mongoose.Schema({
    name : String,
    email : {
        type : String,      
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isAdmin : {
        type : Boolean, 
        default : false
    },
    sugesstions : [String],
    favourites : [String],
    playlist : [String]
})

export {movieSchema , userSchema}