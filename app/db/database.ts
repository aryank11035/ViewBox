import mongoose from 'mongoose'
import { movieSchema , userSchema} from './schema'

mongoose.connect('mongodb://localhost:27017/moviedb')
const Movie =  mongoose.models.Movie || mongoose.model('Movie',movieSchema)
const User = mongoose.models.User || mongoose.model('User',userSchema)
export { Movie, User }