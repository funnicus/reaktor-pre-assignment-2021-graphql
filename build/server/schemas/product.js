"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDef = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDef = apollo_server_express_1.gql `
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
