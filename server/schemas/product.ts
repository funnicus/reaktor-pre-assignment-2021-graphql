import { gql } from 'apollo-server-express';

export const typeDef = gql`
    type Product {
        id: String!
        type: String!
        name: String!
        color: [String!]!
        price: Int!
        manufacturer: String!
        awailability: String!
    }
`;