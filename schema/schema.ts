import { WhereToWatch } from "@/components/media/whereToWatch";
import mongoose from "mongoose";
import { release } from "os";
import { nanoid } from "nanoid";

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
        default : 0 , 
        min : 0
    },
    underrated : {
        type : Number,
        default : 0 , 
        min : 0
    },
    added_by : String,
    videokey : String,
    suggested : {
        type : String,
        required : false
    },
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
    overrated : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Movie'
        }
    ],
    underrated : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Movie'
        }
    ],
    sugesstions : [String],
    favourites : [
        {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Movie',
        }
    ],
    playlists : [
        {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Playlist',
        }
    ],
})
const votesSchema = new mongoose.Schema({
    overrated : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Movie'
    },
    underrated : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Movie'
    }
})

const playlistSchema = new mongoose.Schema({
    playlist_name : {
        type : String,
        required : true,
        trim : true
    },
    playlist_id: {
        type: String,
        default: () => nanoid(), 
        unique: true              
    },
    description : {
        type : String,
        default : ''
    },
    playlist_type : {
        type : String,
        enum : ['public' , 'private'],
        required : true
    },
    movies : [{
        id : {
            type : Number,
            required : true
        },
        type : {
                type : String , 
                enum : ['movie' , 'tv'],
                required : true
            },
        name : {
            type : String,
            required : true
        },
        img : String,
        genres : [{
                id : Number,
                name : String
            }],
        added_on : {
            type : Date,
            default : Date.now
        }
    }],
    created_at : {
        type: Date,
        default: Date.now,
    },
    created_by : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    created_by_name: {
        type: String,
        required: true,
    },
})

export {movieSchema , userSchema , playlistSchema , votesSchema}