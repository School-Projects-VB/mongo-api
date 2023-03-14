require('dotenv').config();

const express = require('express');
const server = express();
server.use(express.json());

// Import routers
const UserRouter = require('./app/routes/UserRouter');
const ArticleRouter = require('./app/routes/ArticleRouter');
const CommentRouter = require('./app/routes/CommentRouter');

server.use('/', UserRouter);
server.use('/', ArticleRouter);
server.use('/', CommentRouter);

const expressSwagger = require('express-swagger-generator') (server);
const url = `http://${process.env.HOST}:${process.env.PORT}`;

let options = {
    swaggerDefinition : {
        info: {
            description: "Lessons API on MongoDB",
            title: "Lessons",
            version: '2.0.0'
        },
        host: url,
        basePath: '/',
        produces: ["application/json"],
        schemes: ['http', 'https']
    },
    basedir: __dirname,
    files: ['./app/**/*.js']
}

expressSwagger(options)

server.listen(process.env.PORT, ()=> {
    console.log(url)
})