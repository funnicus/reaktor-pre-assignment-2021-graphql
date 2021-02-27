"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const fs_1 = __importDefault(require("fs"));
const query_1 = require("./query");
const product_1 = require("./product");
const resolvers = {
    Query: {
        getProduct: (_root, args) => {
            let products;
            let productsJson;
            switch (args.name) {
                case "beanies":
                    products = fs_1.default.readFileSync('./data_files/beanies.json', "utf8");
                    productsJson = JSON.parse(products);
                    return productsJson;
                case "facemasks":
                    products = fs_1.default.readFileSync('./data_files/facemasks.json', "utf8");
                    productsJson = JSON.parse(products);
                    return productsJson;
                case "gloves":
                    products = fs_1.default.readFileSync('./data_files/gloves.json', "utf8");
                    productsJson = JSON.parse(products);
                    return productsJson;
                default:
                    throw new Error("Something went wrong with getting products!");
            }
        },
    }
};
exports.default = apollo_server_express_1.makeExecutableSchema({
    typeDefs: [query_1.typeDef, product_1.typeDef],
    resolvers
});
