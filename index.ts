import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import fs from 'fs';

import getProducts from './server/getProducts';
import schema from './server/schemas';

const app = express();
const PORT = 4000;

const server = new ApolloServer({ schema });
server.applyMiddleware({ app, path: "/graph" });

app.use(cors());
app.use(express.json());

const reactApp = express.static('./client/build');
app.use(reactApp);

//Get all the information for every product category and save them into files...
const writeDataToFiles = async () => {
    try {
        console.log("Here");
        const beanies = await getProducts('beanies');
        const gloves = await getProducts('gloves');
        const facemasks = await getProducts('facemasks');
        console.log("ready!");

        if(!beanies || !gloves || !facemasks) {
            console.error("api didn't return some products!");
            return;
        }

        fs.writeFileSync('./data_files/beanies.json', JSON.stringify(beanies));
        fs.writeFileSync('./data_files/gloves.json', JSON.stringify(gloves));
        fs.writeFileSync('./data_files/facemasks.json', JSON.stringify(facemasks));
    } catch (err) {
        console.error((err as Error).message);
    }
};

setInterval(() => {
    void writeDataToFiles();
}, 1000 * 60 * 5); //update every 5 minutes

//run at the start also
void writeDataToFiles();

app.listen({ port: process.env.PORT || PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);