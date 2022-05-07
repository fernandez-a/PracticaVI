import { Db, ObjectId, Collection } from "mongodb";
import { ApolloError } from 'apollo-server'



function mayusc(str:string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const Mutation = {

    addPerson: async (parent:any, args:{ name:string, surname:string, email:string, phone:string }, context : {client:Db}) => {
        const { name, surname, email, phone } = args;
        if(!name || !surname || !email || !phone || phone?.length != 9){
            throw new ApolloError("Something went wrong", "Wrong inputs", { status: 403 });
        }
        const db = context.client;
        const collectio: Collection = db.collection("Persons");
        if( await collectio.findOne({email:email})){
            throw new ApolloError("Something went wrong", "Email already in use", { status: 403 });
        }
        const name2 = mayusc(name)
        const surname2 = mayusc(surname)
        const result = await collectio.insertOne({
            name: name2,
            surname: surname2,
            email,
            phone,
        });
        return { name:name2, surname: surname2, email, phone, _id: result.insertedId};
    },

    deletePerson: async (parent:any, args:{email:string}, context : {client:Db}) => {
        let { email } = args;
        if(!email){
            throw new ApolloError("Something went wrong", "Wrong inputs", { status: 403 });
        }
        const db = context.client;
        const collectio: Collection = db.collection("Persons");
        if( !(await collectio.findOne({email:email}))){
            throw new ApolloError("Something went wrong", "Contact does not exist", { status: 403 });
        }
        const result = await collectio.deleteOne({
            email,
        });
        return "Delete succesful";
    }
    ,

    editPerson: async (parent:any, args:{ name:string, surname:string, email:string, email2:string, phone:string }, context : {client:Db}) => {
        const { name, surname, email, email2, phone } = args;
        if(!name || !surname || !email || !phone || phone?.length != 9 || !email2){
            throw new ApolloError("Something went wrong", "Wrong inputs", { status: 403 });
        }
        const db = context.client;
        const collectio: Collection = db.collection("Persons");
        if( !(await collectio.findOne({email:email}))){
            throw new ApolloError("Something went wrong", "Contact does not exist", { status: 403 });
        }
        const name2 = mayusc(name)
        const surname2 = mayusc(surname)
        const result = await collectio.findOneAndUpdate({
            email: email,
        }, {
            $set: {
                name:name2,
                surname:surname2,
                email:email2,
                phone,
            }
        });
        return { name:name2, surname:surname2, email: email2, phone };
    }
}