import { Db, ObjectId, Collection } from "mongodb";
import { ApolloError } from 'apollo-server'

export const Query = {
    test: () => "Working fine",
    
    getPersons: async (parent:any, args:any, context : {client:Db}) => {
        const db = context.client;
        return await db.collection("Persons").find().toArray();
    },

    getPerson: async (parent:any, args:{email:string},context:{client:Db})=>{
        return context.client.collection("Persons").find({email:args.email})
    }
}