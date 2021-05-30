import { db } from '../index';

import { v4 as uuidv4 } from 'uuid';
//import * as blobUtil from 'blob-util';
//import cloudinary from 'cloudinary-core';
import CONST from '../../consts';
import { getFormattedDate, getFormattedTime } from '../../lib/utils';

import { setCookie } from '../../lib/utils';


export const addData = (qrytype, field, data, abort) => {
    console.log('calling add user');
    data._id = uuidv4() + "";
    if (abort.signal) {
        abort.signal.addEventListener('abort', evt => {
            throw new Error(`Add data for ${data.type}failed`);
        });
    }

    return getData(qrytype, field, data, abort)
        .then(user => { throw [3, Error('Data exists')] })
        .catch(err => {
            //  console.log('Error message is >>>>>: '+err[1].message);
            if (err[0] === 0) {
                return db.put(data);
            }
            if (err[0] === 3) {
                throw [3, Error('Data exists')]
            }
        });

}


export const addUpdateData = (qrytype, field, data, abort) => {
    // console.log('calling add user' + JSON.stringify(data));
    const dt = new Date();

    if (data.subtype) {
        data._id = data.subtype.toLowerCase() + "_" + uuidv4();
    } else {
        data._id = uuidv4() + "";
    }




    if (abort.signal) {
        abort.signal.addEventListener('abort', evt => {
            throw new Error(`Add data for ${data.type} failed`);
        });
    }

    return getData(qrytype, field, data, abort)
        .then(user => {
            console.log("User exists : updating: " + JSON.stringify(user));
            data._id = user._id;
            data._rev = user._rev;

            data.date = getFormattedDate(dt, '/');
            data.time = getFormattedTime(dt, ':');
            data.createDate = user.createDate;
            data.createTime = user.createTime;



            return db.put(data);
        })
        .catch(err => {
            //  console.log('Error message is >>>>>: '+err[1].message);
            if (err[0] === 0) {
                data.date = getFormattedDate(dt, '/');
                data.time = getFormattedTime(dt, ':');
                data.createDate = getFormattedDate(dt, '/');
                data.createTime = getFormattedTime(dt, ':');
                return db.put(data);
            }
            if (err[0] === 3) {
                throw [3, Error('Data exists')]
            }
        });

}

export const getData = (qrytype, field, data, abort) => {
    console.log("1:::");
    const id = eval(`data.${field}`);

    //  console.log("ID is: " + id);
    if (abort.signal) {
        abort.signal.addEventListener('abort', evt => {
            throw [4, Error(`Get data for ${data.type} failed`)];
        });
    }

    const opt = { latest: true, include_docs: true }
    return db.query(qrytype, opt)
        .then(res => res.rows.filter(doc => eval(`doc.doc.${field}`) === id))
        .then(res => {
            //  console.log('Doc is: ' + JSON.stringify(res));

            if (res) {
                if (res.length === 1) {
                    return res[0].doc;
                } else if (res.length > 1) {
                    throw [1, Error('Multiple data objects found')];
                } else {
                    throw [0, Error('No data found')]
                }
            }
        })

}


export const addUser = (data, opt) => {
    console.log('calling add user');

    if (data.subtype) {
        data._id = data.subtype.toLowerCase() + "_" + uuidv4();
    } else {
        data._id = uuidv4() + "";
    }

    //data.type = 'USER';
    if (opt.signal) {
        opt.signal.addEventListener('abort', evt => {
            throw new Error('Add user failed');
        });
    }

    return getUser(data.email, opt)
        .then(user => { throw [3, Error('User id exists')] })
        .catch(err => {
            //  console.log('Error message is >>>>>: '+err[1].message);
            if (err[0] === 0) {
                return db.put(data);
            }
            if (err[0] === 3) {
                throw [3, Error('User id exists')]
            }
        });


    // return db.put(data);

}

export const getUser = (data, abort) => {
    if (abort.signal) {
        abort.signal.addEventListener('abort', evt => {
            throw [4, Error('Get user failed')];
        });
    }

    const opt = { latest: true, include_docs: true }
    return db.query('types/users', opt)
        .then(res => res.rows.filter(doc => doc.doc.email === data))
        .then(res => {

            if (res) {
                if (res.length === 1) {
                    return res[0].doc;
                } else if (res.length > 1) {
                    throw [1, Error('Multiple users found')];
                } else {
                    throw [0, Error('No user found')]
                }
            }
        })

}

export const createSession = (src, data, dispatch) => {

    console.log('Source is: ' + src);


    try {
        switch (src) {
            case 'google': {

                console.log('calling add social user for google');
                setCookie('sessid', 'SESSION_GOOGLE_' + data.id);
                sessionStorage.setItem('sessid', 'SESSION_GOOGLE_' + data.id);
                setRedis('SESSION_GOOGLE_' + data.id, data);
                dispatch({ type: 'LOGIN', login: true, sessid: 'SESSION_GOOGLE_' + data.id, source: 'google', sessdata: {}, data: data });
                break;


            }
            case 'facebook': {
                console.log('calling add social user for fb ');
                setCookie('sessid', 'SESSION_FB_' + data.id);
                sessionStorage.setItem('sessid', 'SESSION_FB_' + data.id);
                setRedis('SESSION_FB_' + data.id, data);
                dispatch({ type: 'LOGIN', login: true, sessid: 'SESSION_FB_' + data.id, source: 'facebook', sessdata: {}, data: data });
                break;
            }

            case 'amazon': {
                console.log('calling add social user for amz');
                setCookie('sessid', 'SESSION_AMZ_' + data.user_id);
                sessionStorage.setItem('sessid', 'SESSION_AMZ_' + data.user_id);
                setRedis('SESSION_AMZ_' + data.user_id, data);
                dispatch({ type: 'LOGIN', login: true, sessid: 'SESSION_AMZ_' + data.user_id, source: 'amazon', sessdata: {}, data: data });
                break;
            }

            case 'twitter': {
                console.log('calling add social user for tw');
                setCookie('sessid', 'SESSION_TW_' + data.user_id);
                sessionStorage.setItem('sessid', 'SESSION_TW_' + data.user_id);
                setRedis('SESSION_TW_' + data.user_id, data);
                dispatch({ type: 'LOGIN', login: true, sessid: 'SESSION_TW_' + data.user_id, source: 'twitter', sessdata: {}, data: data });

                break;
            }

            default: {
                console.log('Sorry no source match');
                break;
            }

        }

    } catch (error) {
        console.log('Add social error: ' + error.message)
    }




}







export const addContact = (data) => {
    data._id = uuidv4() + "";
    data.type = 'CONTACT';
    return db.put(data);
}

export const addHome = (data, img) => {
    data._id = uuidv4() + "";
    data.type = 'HOME';
    const keys = Object.keys(img);
    let keylength = keys.length;
    console.log("Keys are : " + JSON.stringify(keys) + " keys length: " + keys.length);

    return db.put(data)
        .then(res => {
            const key = keys.shift();
            if (typeof key !== 'undefined') {
                //  console.log("Image is :" + key + " : " + img[key]);

                return db.putAttachment(res.id, key, res.rev, img[key], img[key].type);
            } else {
                return;
            }
        })
        .then(res => {
            const key = keys.shift();

            if (typeof key !== 'undefined') {
                //    console.log("Image is :" + key + " : " + img[key]);
                return db.putAttachment(res.id, key, res.rev, img[key], img[key].type);
            } else {
                return;
            }
        })
        .then(res => {
            const key = keys.shift();
            if (typeof key !== 'undefined') {
                //    console.log("Image is :" + key + " : " + img[key]);
                return db.putAttachment(res.id, key, res.rev, img[key], img[key].type);
            } else {
                return;
            }

        })
        .then(res => {
            const key = keys.shift();

            if (typeof key !== 'undefined') {
                //   console.log("Image is :" + key + " : " + img[key]);
                return db.putAttachment(res.id, key, res.rev, img[key], img[key].type);
            } else {
                return;
            }
        })
        .then(res => {
            const key = keys.shift();

            if (typeof key !== 'undefined') {
                //    console.log("Image is :" + key + " : " + img[key]);
                return db.putAttachment(res.id, key, res.rev, img[key], img[key].type);
            } else {
                return;
            }
        })
        .then(res => {
            const key = keys.shift();

            if (typeof key !== 'undefined') {
                //     console.log("Image is :" + key + " : " + img[key]);
                return db.putAttachment(res.id, key, res.rev, img[key], img[key].type);
            } else {
                return;
            }
        })
        .then(res => {
            const key = keys.shift();
            if (typeof key !== 'undefined') {
                //     console.log("Image is :" + key + " : " + img[key]);
                return db.putAttachment(res.id, key, res.rev, img[key], img[key].type);
            } else {
                return;
            }
        })
        .then(res => {
            const key = keys.shift();
            if (typeof key !== 'undefined') {
                //    console.log("Image is :" + key + " : " + img[key]);
                return db.putAttachment(res.id, key, res.rev, img[key], img[key].type);
            } else {
                return;
            }
        });

}



export const addHomeCloud = (data, img) => {
    data._id = uuidv4() + "";
    data.type = 'HOME';
    const keys = Object.keys(img);
    let keylength = keys.length;
    console.log("Keys are : " + JSON.stringify(keys) + " keys length: " + keys.length);

    return db.put(data)
        .then(res => {
            if (keys) {
                return Promise.all(keys.map(key => {
                    return uploadImg(res.id, key, img[key]);
                }));
            } else {
                return {}
            }

        })
        .then(cloudinaryArrId => {
            return updateHome(cloudinaryArrId);
        })


}

export const updateHome = (cloudinaryRes) => {
    const docId = cloudinaryRes[0].tags[0];
    console.log('DocId updated with cloudinary urls: ' + docId);
    if (docId) {
        return db
            .get(docId, { latest: true })
            .then(doc => db.put({ ...doc, cloudinary: cloudinaryRes }, { rev: doc._rev }))

    } else {
        return {}
    }

}


export const uploadImg = (id, key, blob) => {
    const controller = new AbortController();
    const frmData = new FormData();
    const apptype = blob.type;

   // frmData.set('upload_preset', 'jxaf96un');
    frmData.set('upload_preset', CONST.CLOUDINARY_UPLOAD_PRESET);
    frmData.set('public_id', id + '_' + key);
    frmData.set('tags', id);
    frmData.set('file', blob, key);
    frmData.set('folder', 'img');
    /* 
         const headers = new Headers({
            'Access-Control-Request-Headers':'Accept, Content-Type',
            'Accept': 'multipart/form-data',
            'Content-Type': 'multipart/form-data',        
           
        });  */


    //    const uri = 'https://api.cloudinary.com/v1_1/hgill/image/upload';
    const uri = `${CONST.CLOUDINARY_API}/${CONST.CLOUDINARY_DB}/image/upload`;
    const req = new Request(uri, {
        signal: controller.signal,
        method: 'POST',
        // mode:'no-cors',
        // headers: headers,
        body: frmData,
    });

    return fetch(req)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return {}
            }
        })
}





export const getHomes = (opt, abort) => {
    return db.query('types/homes', opt)
        .then(res => {

            if (abort.signal) {
                abort.signal.addEventListener('abort', event => {
                    // throw new Error("get homes aborted");
                });
            }
            return res.rows.map(elem => elem.doc);
        });

    /*return db.allDocs({include_docs:true,attachments:true,binary:true})
    .then(res=>console.log("All  docs are:"+JSON.stringify(res)));
      */

}



export const getHome = (id, abort) => {
    const opts = {
        latest: true,
        attachments: true,
        binary: true,
    }
    return db.get(id, opts);

}


export const testCouchdb = () => {
    const url = 'http://localhost:5984';
    const opts = {
        method: 'GET',
    }
    return fetch(url);
}


export const getHomeImages = (tag) => {
    const controller = new AbortController();

    //const searchUri = `https://res.cloudinary.com/hgill/image/list/${tag}.json`;
    //const searchUri = `${CONST.CLOUDINARY_URL_DB}/image/list/${tag}.json`;
    const searchUri = `${CONST.CLOUDINARY_URL_DB}/image/upload/img/${tag}_imgliving.jpg`;

  //  console.log('Cloudinary searcy uri : '+ searchUri);
    const req = new Request(searchUri, {
        signal: controller.signal
    });

    return fetch(req)
        .then(response => {
            if (response.ok) {
              //    console.log('PASS :: searchuri :: ' + searchUri);
                //return response.json();
                return response.url;
            } else {
                // console.log('FAIL :: searchuri :: ' + searchUri);
                return {}
            }
        })


}

/*
export const getHomeImages = (tag) => {
    const controller = new AbortController();

    //const searchUri = `https://res.cloudinary.com/hgill/image/list/${tag}.json`;
    //const searchUri = `${CONST.CLOUDINARY_URL_DB}/image/list/${tag}.json`;
    const searchUri = `${CONST.CLOUDINARY_URL_DB}/image/list/${tag}.json`;

  //  console.log('Cloudinary searcy uri : '+ searchUri);
    const req = new Request(searchUri, {
        signal: controller.signal
    });

    return fetch(req)
        .then(response => {
            if (response.ok) {
                  console.log('PASS :: searchuri :: ' + searchUri);
                return response.json();
            } else {
                 console.log('FAIL :: searchuri :: ' + searchUri);
                return {}
            }
        })


}
*/

export const getRedis = (key) => {
    const uri = CONST.SESSIONURL + '/get';
    const url = new URL(uri);
    url.search = new URLSearchParams({ key: key });
    const req = new Request(url, {
        method: 'GET'
    });

    return fetch(req)
        .then(res => {
            if (res.ok) {
                return res.text();
            } else {
                return ""
            }
        });
}

export const setRedis = (key, val) => {
    const uri = CONST.SESSIONURL + '/set';
    const url = new URL(uri);
    url.search = new URLSearchParams({ key: key, val: `${JSON.stringify(val)}` });

    const req = new Request(url, {
        method: 'GET'
    });

    return fetch(req)
        .then(res => {
            if (res.ok) {
                return res.text();
            } else {
                return ""
            }
        })

}

export const deleteRedis = (key) => {
    const uri = CONST.SESSIONURL + '/del';
    const url = new URL(uri);
    url.search = new URLSearchParams({ key: key });
    const req = new Request(url, {
        method: 'GET'
    });

    return fetch(req)
        .then(res => {
            if (res.ok) {
                return res.text();
            } else {
                return ""
            }
        })

}

export default {

    addData,
    addUpdateData,
    getData,
    addUser,
    createSession,
    getUser,
    addContact,
    addHomeCloud,
    updateHome,
    getHome,
    getHomes,
    testCouchdb,
    uploadImg,
    getHomeImages,
    getRedis,
    setRedis,
    deleteRedis
}



