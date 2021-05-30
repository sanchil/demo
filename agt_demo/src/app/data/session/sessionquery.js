import { session } from '../index';
//import uuidv4 from 'uuid/v4';
import { v4 as uuidv4 } from 'uuid';
//import * as blobUtil from 'blob-util';
import CONST from '../../consts';
import { parseRedisResponseToObj } from '../../lib/utils';

export const createSession = (data) => {

    data.uid = data._id;
    data._id = 'SESSION';
    data.sessid = 'SESSION_' + uuidv4();

 

/* 
     return deleteSession()
        .then(doc => doc)
        .catch(err => {
            console.log('deletion err:'+err.message)
            return {};
        })
        .then(res => {
            console.log("Session deletion :: adding a new session" + JSON.stringify(res));
            return session.put(data);
        });
 */
}

export const getSession = () => {
    return session.get('SESSION', { latest: true , conflicts:true});
}

export const deleteSession = () => {
    return getSession()
        .then(sess => {
            console.log('getSession: found session: '+JSON.stringify(sess));
            return sess;
        })
        .catch(err => {
            console.log('getSession: session not found: ' + err.message)
            return session.remove('SESSION', { latest: true });
        })

}


export const createRedisSession = (user, sessdata) => {

    //   data.uid = data._id;
    //   data._id = 'SESSION';
    //   data.sessid = 'SESSION_' + uuidv4();

    const sessid = 'SESSION_' + user._id;
    const data = {};

    data['sessdata'] = sessdata;
    data['uid'] = user;
    // console.log('REDIS Session :: >> ' + JSON.stringify(data));


    // # GET /set?key=one&val=first%20value
    //# GET /get?key=some_key

    const uri = CONST.SESSIONURL + '/set';
    //  const req = new Request(uri);
    const url = new URL(uri);

    url.search = new URLSearchParams({ key: sessid, val: `${JSON.stringify(data)}` }).toString();

    console.log('Session SET URL is: ' + JSON.stringify(url));


    const req = new Request(url);



    return fetch(req)
        .then(res => {
            console.log("FETCH SET response is : " + res.status);
            if (res.ok) {
                return res.text();
            } else {
                console.log("FETCH SET response is not ok: ");
                return {}
            }
        })
}


export const getRedisSession = (sessid) => {

   // const sessid = 'SESSION_' + docid;

    const uri = CONST.SESSIONURL + '/get';
    const url = new URL(uri);
    url.search = new URLSearchParams({ key: sessid });

    const req = new Request(url);

    console.log('Session GET URL is: ' + JSON.stringify(url));

    return fetch(url)
        .then(res => {
            if (res.ok) {
                console.log('REDIS GET response is:: ' + res.status);
                return res.text();
            } else {
                console.log("FETCH GET response is not ok: ");
                return {}
            }
        })
        .then(res => JSON.parse(parseRedisResponseToObj(res)));
        /*   .then(res =>{
            console.log("REis session object is __ 0 "+ parseRedisResponseToObj(res));
            JSON.parse(parseRedisResponseToObj(res))
    } );  */ 
       

}

export const deleteRedisSession = (sessid) => {

    //   const sessid = 'SESSION_' + data._id;

    const uri = CONST.SESSIONURL + '/del';
    const url = new URL(uri);
    url.search = new URLSearchParams({ key: sessid }).toString();
    const req = new Request(url);


    return fetch(req)
        .then(res => {

            if (res.ok) {
                console.log('REDIS DELETE response is:: ' + res.status);
                return res.text();
            } else {
                return {}
            }
        })
        .then(res => res);


}

export default {
    getSession,
    deleteSession,
    createSession,
    createRedisSession,
    getRedisSession,
    deleteRedisSession
}