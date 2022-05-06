import { ApolloServer, gql } from "apollo-server";
import { MongoClient, Db } from "mongodb";
import { connectDB } from "./DBConnection";
import { Mutation } from "./resolvers/Mutations";
import { Query } from "./resolvers/Querys";
import { typeDefs } from "./schema";


const resolvers = {
  Query, Mutation
};

const run = async () => {
  const client = await connectDB()
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, res }) => {
        return {
          client,
        }
    },
  });
  server.listen(4000).then(() => {
    console.log(`🚀  Server ready on 4000 `);
  });
}
try {
  run()
} catch (e) {
  console.error(e);
}