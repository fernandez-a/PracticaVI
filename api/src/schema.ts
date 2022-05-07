import { gql } from "apollo-server";

export const typeDefs = gql`
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
    getPerson( email: String): Person
  }

  type Mutation {
    addPerson(
      name: String
      surname: String
      email: String
      phone: String
    ): Person!
    deletePerson(email: String): String!
    editPerson(name: String
      surname: String
      email: String
      phone: String
      email2: String): Person!
  }
`;