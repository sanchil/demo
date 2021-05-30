import PouchDB from 'pouchdb';
import p from 'pouchdb-upsert';
import CONST from '../consts';
//import Redis from 'ioredis';



PouchDB.plugin(p);

console.log("Process db url",process.env.DBURL);

export const db = ((url,uid,pwd)=>{
    const opts = {
        name:url,
        auth:{
            username:uid,
            password:pwd
        },
        skip_setup:true,
    }
    return new PouchDB(opts);
    })('http://webapp.org/db/hgilldb',"admin","admin");

//})(process.env.DBURL,"admin","admin");

    //})('https://webapp.org/db/hgilldb',"admin","admin");


//})("http://webapp/db/hgilldb","admin","admin");

//})("http://localhost/db/hgilldb","admin","admin");
//})("http://127.0.0.1:5984/hgilldb","admin","admin");
//})("http://172.31.26.71:5984/hgilldb","admin","admin");


export const session = ((mydb)=>{
    return new PouchDB(mydb);
})('sessiondb');

/* export const redisdb = ((opt)=>{
    const db = new Redis(opt);
    return db;
})({host:'127.0.0.1',port:6379}); 
 */