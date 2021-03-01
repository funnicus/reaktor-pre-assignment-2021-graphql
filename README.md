# Reaktor pre-assignment solution for Developer, summer 2021 - GraphQL edition

My solution for the pre-assignment. This is the _GraphQL_ version.
Technologies here used are: TypeScript, Express, Node.js on the backend, React with Material UI and react-virtualized on the frontend. Both the front- and the backend use Apollo GraphQL for data query.

The React frontend can be found in the client folder!

The project is deployed on __https://reaktor-pre-assignment-2021-gr.herokuapp.com/__
It might take a while to load the latest data on the first load of the website!

## Important files

### getProducts.ts
Collects all the necessary information for a specific product and makes an object out of it.
The information is later stored in json files.

## Instructions

Your client is a clothing brand that is looking for a simple web app to use in their warehouses. To do their work efficiently, the warehouse workers need a fast and simple listing page per product category, where they can check simple product and availability information from a single UI. There are three product categories they are interested in for now: gloves, facemasks, and beanies. Therefore, you should implement three web pages corresponding to those categories that list all the products in a given category. One requirement is to be easily able to switch between product categories quickly. You are free to implement any UI you want, as long as it can display multiple products at once in a straightforward and explicit listing. At this point, it is not necessary to implement filtering or pagination functionality on the page.

The client does not have a ready-made API for this purpose. Instead, they have two different legacy APIs that combined can provide the needed information. The legacy APIs are on critical-maintenance-only mode, and thus further changes to them are not possible. The client knows the APIs are not excellent, but they are asking you to work around any issues in the APIs in your new application. The client has instructed you that both APIs have an internal cache of about 5 minutes.

### API documentation is as follows

    GET /v2/products/:category – Return a listing of products in a given category.
    GET /v2/availability/:manufacturer – Return a list of availability info.
    The APIs are running at https://bad-api-assignment.reaktor.com/.

Your task is to implement a web application that fits the client brief and host the running solution somewhere where it can be accessed publicly (e.g. Heroku). Please include a link to the source code and the running application in your application.
