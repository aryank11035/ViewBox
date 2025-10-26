import mongoose from "mongoose";

const uri = process.env.MONGOOSE_URI;

export async function connectToMongoose() {
    if (!uri) throw new Error("Please define MONGOOSE_URI in .env");

    

    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(uri);
        mongoose.connection.useDb('moviedb');
    }
}