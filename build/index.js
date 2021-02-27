"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const getProducts_1 = __importDefault(require("./server/getProducts"));
const schemas_1 = __importDefault(require("./server/schemas"));
const app = express_1.default();
const PORT = 4000;
//Get all the information for every product category and save them into files...
const writeDataToFiles = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Here");
        const beanies = yield getProducts_1.default('beanies');
        const gloves = yield getProducts_1.default('gloves');
        const facemasks = yield getProducts_1.default('facemasks');
        console.log("ready!");
        fs_1.default.writeFileSync('./data_files/beanies.json', JSON.stringify(beanies));
        fs_1.default.writeFileSync('./data_files/gloves.json', JSON.stringify(gloves));
        fs_1.default.writeFileSync('./data_files/facemasks.json', JSON.stringify(facemasks));
    }
    catch (err) {
        console.error(err.message);
    }
});
setInterval(() => {
    void writeDataToFiles();
}, 1000 * 60 * 5); //update every 5 minutes
//run at the start also
void writeDataToFiles();
const server = new apollo_server_express_1.ApolloServer({ schema: schemas_1.default });
server.applyMiddleware({ app, path: "/graph" });
app.use(cors_1.default());
app.use(express_1.default.json());
const reactApp = express_1.default.static('./client/build');
app.use(reactApp);
console.log(server.graphqlPath);
app.listen({ port: process.env.PORT || PORT }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
