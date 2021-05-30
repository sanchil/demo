import { db } from './index';
import uuidv4 from 'uuid/v4';
import * as blobUtil from 'blob-util';
import cloudinary from 'cloudinary-core';


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
                return;
            }
            /*   const key = keys.shift();
              if (typeof key !== 'undefined') {
                  //  console.log("Image is :" + key + " : " + img[key]);
                  uploadImg(res.id,img[key])
                      .then(res => console.log("Cloudinary response: " + JSON.stringify(res)));
  
                  return db.putAttachment(res.id, key, res.rev, img[key], img[key].type);
              } else {
                  return;
              } */
        });

    /* 
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
*/
}



/* export const addHome = (data, img) => {
    data._id = uuidv4() + "";
    data.type = 'HOME';
    const keys = Object.keys(img);
    let keylength = keys.length;
    console.log("Keys are : " + JSON.stringify(keys) + " keys length: " + keys.length);

    return db.put(data)
        .then(res => {
            
            return Promise.allSettled(keys.map(key=>{
                return db.putAttachment(res.id, key, res.rev, img[key], img[key].type);
            }));
            
         
        });
       
}
 */

export const _getHomes = (opt, abort) => {
    return db.query('types/hometype', opt)
        .then(res => {
            return Promise.all(res.rows.map(elem => {

                if (elem.key._attachments) {
                    const keys = Object.keys(elem.key._attachments);
                    // /    console.log("Image attachemnts: "+JSON.stringify(elem.key._attachments));
                    if (typeof keys !== 'undefined') {
                        //     console.log("Image keys"+JSON.stringify(keys));
                        return db.getAttachment(elem.id, keys[0]);
                    } else {
                        if (abort.signal) {
                            abort.signal.addEventListener('abort', event => {
                                reject(event);
                            });
                        }
                        return;
                    }
                }

            }));
        })
        .then(res => Promise.all(res.map(blob => {
            if (blob) {
                return blobUtil.createObjectURL(blob);
            } else {
                return "";
            }

        })));

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

export const uploadImg = (id, key, blob) => {
    const controller = new AbortController();
    const frmData = new FormData();
    const apptype = blob.type;

    frmData.set('upload_preset', 'jxaf96un');
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


    const uri = 'https://api.cloudinary.com/v1_1/hgill/image/upload';
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

export const _getHomeImages = (tag) => {
    const controller = new AbortController();
    const frmData = new FormData();
    frmData.set('expression', 'resource_type:image AND tags=69cbe4ce-7f47-4fb4-a536-c0e9d5a88828');
    frmData.set('max_results', 3);



    //  const searchUri = 'https://api.cloudinary.com/v1_1/hgill/resources/image/tags/'+tag;
    //   const searchUri = 'http://api.cloudinary.com/v1_1/hgill/resources/image/tags/69cbe4ce-7f47-4fb4-a536-c0e9d5a88828';
    // const searchUri = 'https://api.cloudinary.com/v1_1/hgill/resources/image';

    //   const searchUri = 'http://api.cloudinary.com/v1_1/hgill/resources/search';
    //const searchUri = 'https://api.cloudinary.com/v1_1/hgill/resources/search';

    //   console.log("search uri: " + searchUri);
    //  console.log('BTOA: ' + 'Basic ' + btoa('725847113651474' + ':' + '0bAvKlgau0Wly7Eu85Bs6vDBglA'));

    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa('725847113651474' + ':' + '0bAvKlgau0Wly7Eu85Bs6vDBglA'));
    //   headers.set('Content-Type', 'application/json');
    //  headers.set('Accept', 'application/json');


    const req = new Request(searchUri,
        {
            //signal: controller.signal,
            method: 'GET',
            headers: headers,
            credentials: 'include',
            //   mode:'no-cors',
            body: JSON.stringify({
                "expression": "69cbe4ce-7f47-4fb4-a536-c0e9d5a88828",
            })

        }
    );


    return fetch(searchUri);

}



export const __getHomeImages = () => {
    const controller = new AbortController();



    //  const searchUri = 'https://api.cloudinary.com/v1_1/hgill/resources/image/tags/'+tag;
    //    const searchUri = 'https://api.cloudinary.com/v1_1/hgill/resources/image/tags/69cbe4ce-7f47-4fb4-a536-c0e9d5a88828';
    // const searchUri = 'http://localhost/cloud/v1_1/hgill/resources/image/tags/69cbe4ce-7f47-4fb4-a536-c0e9d5a88828';
    // const searchUri = 'https://api.cloudinary.com/v1_1/hgill/resources/image';

    //   const searchUri = 'http://api.cloudinary.com/v1_1/hgill/resources/search';
    //   const searchUri = 'https://api.cloudinary.com/v1_1/hgill/resources/search';
    //const searchUri = 'http://localhost/cloud/resources/search';
    //  const searchUri = 'https://725847113651474:0bAvKlgau0Wly7Eu85Bs6vDBglA@api.cloudinary.com/v1_1/hgill/resources/image/tags/69cbe4ce-7f47-4fb4-a536-c0e9d5a88828';
    //const searchUri = 'https://api.cloudinary.com/v1_1/hgill/resources/image/tags/69cbe4ce-7f47-4fb4-a536-c0e9d5a88828';
    const searchUri = `https://res.cloudinary.com/hgill/image/list/69cbe4ce-7f47-4fb4-a536-c0e9d5a88828.json`;


    // console.log('BTOA: ' + 'Basic ' + btoa('725847113651474' + ':' + '0bAvKlgau0Wly7Eu85Bs6vDBglA'));
    //  console.log('Buffer.base64: ' + 'Basic ' + Buffer.from('725847113651474:0bAvKlgau0Wly7Eu85Bs6vDBglA').toString('base64'));

    //    const headers = new Headers();
    //   headers.set('Authorization', 'Basic ' + btoa('725847113651474' + ':' + '0bAvKlgau0Wly7Eu85Bs6vDBglA'));
    //headers.set('Authorization', 'Basic ' + Buffer.from('725847113651474:0bAvKlgau0Wly7Eu85Bs6vDBglA').toString('base64'));
    //  headers.set('Content-Type', 'application/json');
    //  headers.set('Accept', 'application/json');

    // const searchUri = 'http://localhost/db';

    const req = new Request(searchUri, {
        signal: controller.signal,
        method: 'GET',
        //  headers: headers,
        //credentials: 'include',
        mod: 'cors',
        //   redirect:'follow',
    });



    return fetch(req);


}

export const getHomeImages = (tag) => {
    const controller = new AbortController();

    //  const searchUri = `https://res.cloudinary.com/hgill/image/list/${tag}.json`;

    const searchUri = `https://res.cloudinary.com/hgill/image/list/69cbe4ce-7f47-4fb4-a536-c0e9d5a88828.json`;
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


export const getData = () => {
    const cl = new cloudinary.Cloudinary({
        cloud_name: 'hgill',
        api_key: '725847113651474',
        api_secret: '0bAvKlgau0Wly7Eu85Bs6vDBglA'
    });






    return (cl.url('69cbe4ce-7f47-4fb4-a536-c0e9d5a88828.json', { type: "list" }));

}


