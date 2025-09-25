import mongoose from 'mongoose'
import movieSchema from './schema'

mongoose.connect('mongodb://localhost:27017/moviedb')
const Movie =  mongoose.models.Movie || mongoose.model('Movie',movieSchema)
export default Movie