require('dotenv').config();

const express = require('express');
const server = express();
server.use(express.json());

// Import routers
const UserRouter = require('./app/routes/UserRouter');

server.use('/', UserRouter);

const expressSwagger = require('express-swagger-generator') (server);

let options = {
    swaggerDefinition : {
        info: {
            description: "Lessons API on MongoDB",
            title: "Lessons",
            version: '1.0.0'
        },
        host: `http://localhost:${process.env.PORT}`,
        basePath: '/',
        produces: ["application/json"],
        schemes: ['http', 'https']
    },
    basedir: __dirname,
    files: ['./app/**/*.js']
}

expressSwagger(options)
// http://localhost:3000/api-docs

server.listen(process.env.PORT, ()=> {
    console.log(`http://localhost:${process.env.PORT}`)
})