import express from 'express';
import controllers from './controllers';
import session from 'express-session';
import redis from 'redis';
import redisstore from 'connect-redis';
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand';
import path from 'path';

let myEnv = dotenv.config()
dotenvExpand(myEnv);

//console.log("Current path : ",path.resolve(process.env.RAZZLE_PUBLIC_DIR));
//console.log("Client path : ",process.env.CLIENT_PUBLIC_PATH);
//console.log("Public path : ",process.env.PUBLIC_PATH);

const SessionStore = redisstore(session);
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

const server = express();
server
  .disable('x-powered-by')
  .use(session({
    store: new SessionStore({ client: redisClient }),
    secret: 'agt1',
    resave: false,
    saveUninitialized: true
  }))
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', controllers.handleMain);

export default server;
