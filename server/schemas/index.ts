import { makeExecutableSchema } from 'apollo-server-express';
import fs from 'fs';

import { typeDef as QueryDef } from './query';
import { typeDef as ProductDef } from './product';

import { Product } from '../../types';

interface ProductArgs {
    name: string;
}

const resolvers = {
    Query: {
        getProduct: (_root: unknown, args: ProductArgs): Product[] => {
            let products: string;
            let productsJson: Product[];
            switch (args.name) {
                case "beanies":
                    products = fs.readFileSync('./data_files/beanies.json', "utf8");
                    productsJson = JSON.parse(products) as Product[];
                    return productsJson;
                case "facemasks":
                    products = fs.readFileSync('./data_files/facemasks.json', "utf8");
                    productsJson = JSON.parse(products) as Product[];
                    return productsJson;
                case "gloves":
                    products = fs.readFileSync('./data_files/gloves.json', "utf8");
                    productsJson = JSON.parse(products) as Product[];
                    return productsJson;
                default:
                    throw new Error("Something went wrong with getting products!");
            }
        },
    }
};

export default makeExecutableSchema({
    typeDefs: [ QueryDef, ProductDef ],
    resolvers
});