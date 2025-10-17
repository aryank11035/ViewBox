import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";
import { boolean } from "zod";

const movieSchema = new mongoose.Schema({
    id : {
        type : Number,
        required : true,
        unique : true 
    },
    title : {
        type : String,
        required : true,
    },
    backdrop_path : String,
    poster_path : String,
    tagline : String,
    homepage : String,
    adult : Boolean,
    original_language : String,
    vote_average : Number,
    runtime : Number,
    release_date : String,
    original_date : String,
    overview : String,
    genres : [{
        id : Number,
        name : String
    }],
    production_companies : [{
        id : Number,
        name : String,
        logo_path : String,
        origin_country : String
    }],
    mediaType : {
        type : String,
        enum : [ 'movie','tv'],
        required : true
    }
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