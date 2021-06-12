const { JWT } = require('google-auth-library');
const fs = require('fs');
const redis = require("redis");




const createJwt = (projectId, privateKeyFile, algorithm) => {
    // Create a JWT to authenticate this device. The device will be disconnected
    // after the token expires, and will have to reconnect with a new token. The
    // audience field should always be set to the GCP project id.
    const token = {
        iat: parseInt(Date.now() / 1000),
        exp: parseInt(Date.now() / 1000) + 20 * 60, // 20 minutes
        aud: projectId,
    };
    const privateKey = fs.readFileSync(privateKeyFile);
    return jwt.sign(token, privateKey, { algorithm: algorithm });
}

async function getToken(keys, url, scopes) {
    //  keys : service_account.json
    //  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    //  const url = `https://dns.googleapis.com/dns/v1/projects/${keys.project_id}`;

    const client = new JWT({
        email: keys.client_email,
        key: keys.private_key,
        scopes: scopes,
    });
   
    const result = await client.request({ url });

    //req.session.jwt = client;
    //req.session.access_token = client.credentials.access_token;
    // console.log(req.session.jwt.credentials.access_token);
    return client;

}


/**
 * This method reads redis caches for results and 
 * sends it over if finds any.
 * 
 */

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});


var readRedisCache = (cachetimeout) => {
    return (req, res, next) => {
        let key = '__express__' + req.originalUrl || req.url
        console.log("Cache key:", key);
        if (req.method == 'GET') {
            console.log("Method is get");
            redisClient.get(key, (err, cachedBody) => {
                console.log("cached body is ", cachedBody);
                if (err) {
                    res.sendResponse = res.send
                    res.send = (body) => {
                        redisClient.set(key, body);
                        redisClient.expire(key, cachetimeout * 1000);
                        res.sendResponse(body)
                    }
                }
                
                if (cachedBody&&Array.isArray(cachedBody)&&cachedBody.length) {
                    console.log("Sending cached body", cachedBody);
                    res.send(JSON.parse(cachedBody));
                    return;
                } else {
                    console.log("No data cached. Sending first time data");
                    next();
                }
            });

        } else {
            console.log("Method is probably post");
            next();
        }

    }
}

/**
 * This method writes results to redis cache for faster response.
 * To switch of caching of results use any number
 * other than 1. Ideally 0
 * 
 */
var writeRedisCache = (on,cachetimeout) => {

    return (req, res, next) => {
        let key = '__express__' + req.originalUrl || req.url;
        console.log("Cacheing results, "+ res.locals.data,"cachetimeout", cachetimeout);
        if (on) {
            console.log("Writing to cache"); 
            res.sendResponse = res.send
            res.send = (body) => {
                redisClient.set(key, body);
                redisClient.expire(key, cachetimeout * 1000);
                res.sendResponse(body)
            }     
            res.send(JSON.stringify(res.locals.data));
           
        }else{
            console.log("Delete key from cache: ", key);
            redisClient.del(key);
            if(res.sendResponse){
                res.sendResponse(res.locals.data);
            }else{
                res.send(res.locals.data);
            }
            
        }

    }

}

module.exports = {
    createJwt,
    getToken,
    readRedisCache,
    writeRedisCache
}