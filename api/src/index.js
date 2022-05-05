const { ApolloServer, gql } = require("apollo-server");
const { MongoClient, Db } = require("mongodb");
const typeDefs = gql`
  type Person {
    _id: ID!
    name: String!
    surname: String!
    email: String!
    phone: String!
  }

  type Query {
    test: String
    getPersons: [Person!]!
  }

  type Mutation {
    addPerson(
      name: String
      surname: String
      email: String
      phone: String
    ): Person!
    deletePerson(email: String): Person!
    editPerson(email: String, email2: String): Person!
  }
`;

const resolvers = {
  Query: {
    test: () => "Working fine",
    getPersons: async (parent, args, context) => {
      const db = context.db;
      return db.collection("persons2").find().toArray();
    },
  },
  Mutation: {
    addPerson: async (parent, args, context) => {
      const db = context.db;
      const { name, surname, email, phone } = args;
      const result = await db.collection("persons2").insertOne({
        name,
        surname,
        email,
        phone,
      });
      return { name, surname, email, phone, _id: result.insertedId };
      //const person = await db.collection('person').findOne({_id: result.insertedId});
    },
    deletePerson: async (parent, args, context) => {
      const db = context.db;
      let { email } = args;
      const result = await db.collection("persons2").deleteOne({
        email,
      });
      return { email };
    },
    editPerson: async (parent, args, context) => {
      const db = context.db;
      const { name, surname, email, email2, phone } = args;
      const result = await db.collection("persons").updateOne(
        {
          email
        },
        { $set: { email: email2 } }
      );
      return {email: email2};
    },
  },
};

const mongourl = process.env.MONGO_URL;
if (!mongourl) console.log("No mongo url found");
else {
  const client = new MongoClient(mongourl);
  try {
    client.connect().then(() => {
      const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => {
          return { db: client.db("test") };
        },
      });
      // The `listen` method launches a web server.
      server.listen().then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
      });
    });
  } catch (e) {}
}
