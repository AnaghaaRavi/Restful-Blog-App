//This is for creating a new server. Unlike php where we have xampp to connect to initiate php servers
const http=require('http');
const app= require('./app');

const port= process.env.PORT || 3000;

const server=http.createServer(app);

server.listen(port);
//server contains a listener or a function that executes when the port gets a request
//server.listen() will start listening to the request made on the port and execute