import mongoose from "mongoose";

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
    username : {
        type : String,
        required : true 
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    movies : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : "Movie",
        default : [],
    }

})

export {movieSchema , userSchema}