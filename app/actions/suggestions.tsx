'use server'

import { auth } from "@/auth"
import { Movies, Suggestions, Users } from "@/lib/models"
import { connectToMongoose } from "@/lib/mongoose"
import { success } from "zod"


export async function addToSugestions(suggestedInfo : any ){
   

    const session = await auth()
    const userId = session?.user?.id

    try {
        await connectToMongoose()
        
      

    
        const alreadyAdded = await Movies.findOne({ id: suggestedInfo.id });

        if (alreadyAdded) {
            return {
                success: false,
                exists: `This ${suggestedInfo.type === "tv" ? "Tv Show" : "Movie"} already exists in the database`
            };
        }

     
        const existingSuggestion = await Suggestions.findOne({
            suggested_id: suggestedInfo.id,
            suggested_Name: suggestedInfo.name,
            suggested_Media: suggestedInfo.type
        });

     
        if (existingSuggestion) {

            const alreadySuggestedByUser = existingSuggestion.suggested_by.includes(userId);

            if (alreadySuggestedByUser) {
                return {
                    success: false,
                    exists: `You have already suggested this ${suggestedInfo.type === "tv" ? "Tv Show" : "Movie"}`
                };
            }

            existingSuggestion.suggested_by.push(userId);
            await existingSuggestion.save();

          
            await Users.findByIdAndUpdate(userId, {
                $push: {
                    suggestions: {
                        suggestions_id: existingSuggestion._id,
                        reason: suggestedInfo.reason ?? "",
                        status: "Pending"
                    }
                }
            });

            return { success: true, message: "Suggestion added successfully!" };
        }

      
        const newSuggestion = await Suggestions.create({
            suggested_by: [userId],
            suggested_Name: suggestedInfo.name,
            suggested_Media: suggestedInfo.type,
            suggested_id: suggestedInfo.id
        });

    
        await Users.findByIdAndUpdate(userId, {
            $push: {
                suggestions: {
                    suggestions_id: newSuggestion._id,
                    reason: suggestedInfo.reason ?? "",
                    status: "Pending"
                }
            }
        });

        return { success: true, message: "Suggestion added successfully!" };
    }catch(error){
        console.error('')
        return { success : false , error : 'failed to add media' }
    }

}