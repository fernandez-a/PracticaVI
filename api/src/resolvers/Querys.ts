import { Db, ObjectId, Collection } from "mongodb";
import { ApolloError } from 'apollo-server'

export const Query = {
    test: () => "Working fine",
    
    getPersons: async (parent:any, args:any, context : {client:Db}) => {
        const db = context.client;
        return db.collection("Persons").find().toArray();
    },
}