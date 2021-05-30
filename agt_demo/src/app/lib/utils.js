import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import dbObj from '../data/db/dbobj';
import qry from '../data/db/queries';
import { getAmzUser } from '../data/auth/amzauth';
import { getEmailUser, getEmailUserSvr } from '../data/auth/googleauth';
import { getFBUser } from '../data/auth/fbauth';
import { setRedis } from '../data/db/queries';


export const authenticatePage = (inp) => {

  const dt = new Date();

  if (inp.location.pathname === '/gauth'
    // && inp.location.hash 
    // && (typeof inp.location.hash !== 'undefined')
    //&& inp.location.hash !== ""
  ) {
    let abortController = new AbortController();
    const gUser = dbObj.userObj;

    gUser.type = 'USER';
    gUser.social['source'] = 'google';
    gUser.dataorigin = 'social';
    gUser.dataflow = 'ADDUSER';
    gUser.subtype = 'GOOGLE';
    gUser.status = 'active';
    // gUser.date = getFormattedDate(dt, '/');
    // gUser.time = getFormattedTime(dt, ':');

    gUser.social['idtoken'] = inp.agtSessData.id_token;
    gUser.social['accesstoken'] = inp.agtSessData.access_token;
    gUser.social['refreshtoken'] = inp.agtSessData.refresh_token;
    gUser.social['tokenexpirydate'] = inp.agtSessData.expiry_date;

    processAccessToken(inp.location, 'googleToken', inp.agtSessData);

    //agtSessData is a global variable.
    // it is set in svr/templates/index.js

    if (inp.agtSessData['access_token']) {

      getEmailUserSvr(inp.agtSessData['access_token'])
        .then(res => {
          console.log("G user: " + JSON.stringify(res));
          gUser.fname = res.given_name;
          gUser.lname = res.family_name;
          gUser.socialid = res.id;
          gUser.social['id'] = res.id;
          gUser.social['socialemail'] = res.email;
          gUser.email = res.email;

          // console.log('Google mapped G User: '+ JSON.stringify(gUser));

          // qry.createSession('google',res, dispatch);


          qry.addUpdateData('types/users', 'social.id', gUser, { signal: abortController.signal })
            .then(updateres => {
              console.log("Guser has been updated: " + JSON.stringify(updateres));
              qry.createSession('google', res, dispatch);
            })

        })
        .catch(err => { console.log("Google Auth Error: " + JSON.stringify(err)) });
    }
  }

  if (
    inp.location.pathname === '/fbauth'
    && inp.location.hash
    && (typeof inp.location.hash !== 'undefined')
    && inp.location.hash !== ""
  ) {
    console.log('Calling save fb code');
    let abortController = new AbortController();

    const gUser = dbObj.userObj;
    gUser.type = 'USER';
    gUser.social['source'] = 'facebook';
    gUser.dataorigin = 'social';
    gUser.dataflow = 'ADDUSER';
    gUser.subtype = 'FACEBOOK';
    gUser.status = 'active';




    processAccessToken(inp.location, 'fbToken');

    let fbToken = inp.localStorage.getItem('fbToken');

    if (fbToken) {
      fbToken = JSON.parse(fbToken);
      gUser.social['accesstoken'] = fbToken.access_token;
      gUser.social['tokenexpirydate'] = fbToken.data_access_expiration_time;

    }


    const regex = /(.*)(\s+)(.*)/g;




    getFBUser()
      .then(res => {
        //console.log('FB User: '+JSON.stringify(res));
        let n = regex.exec(res.name);
        //console.log('Name : '+n[1]);
        if (n && n.length > 2) {
          gUser.fname = n[1];
          gUser.lname = n[3];
        } else {
          gUser.name = res.name;
        }


        gUser.socialid = res.id;
        gUser.social['id'] = res.id;
        gUser.social['socialemail'] = res.email;
        gUser.email = res.email;

        //  console.log('Guser for FB: '+ JSON.stringify(gUser));

        qry.addUpdateData('types/users', 'social.id', gUser, { signal: abortController.signal })
          .then(updateres => {
            console.log("FBuser has been updated: " + JSON.stringify(updateres));
            qry.createSession('facebook', res, dispatch);
          })


      });



  }


  if (inp.location.pathname === '/amzauth') {


    let abortController = new AbortController();
    const regex = /(.*)(\s+)(.*)/g;

    const gUser = dbObj.userObj;
    gUser.type = 'USER';
    gUser.social['source'] = 'amazon';
    gUser.dataorigin = 'social';
    gUser.dataflow = 'ADDUSER';
    gUser.subtype = 'AMAZON';
    gUser.status = 'active';
    // gUser.date = getFormattedDate(dt, '/');
    // gUser.time = getFormattedTime(dt, ':');

    gUser.socialid = inp.agtSessData.amzuser.user_id;
    gUser.social['id'] = inp.agtSessData.amzuser.user_id;
    gUser.social['socialemail'] = inp.agtSessData.amzuser.email;
    gUser.email = inp.agtSessData.amzuser.email;

    gUser.social['accesstoken'] = inp.agtSessData.access_token.access_token;
    gUser.social['refreshtoken'] = inp.agtSessData.access_token.refresh_token;
    gUser.social['tokenexpirydate'] = inp.agtSessData.access_token.expires_in;

    gUser.social['token'] = inp.agtSessData.access_token;
    gUser.social['user'] = inp.agtSessData.amzuser;


    let n = regex.exec(inp.agtSessData.amzuser.name);

    if (n && n.length > 2) {
      gUser.fname = n[1];
      gUser.lname = n[3];
    } else {
      gUser.name = n[0];
    }


    qry.addUpdateData('types/users', 'social.id', gUser, { signal: abortController.signal })
      .then(updateres => {
        console.log("Amazon user has been updated: " + JSON.stringify(updateres));
        qry.createSession('amazon', inp.agtSessData.amzuser, dispatch);
      })
  }


  if (inp.location.pathname === '/twauth') {

    // console.log("Twitter agtSession data: "+ JSON.stringify(agtSessData));

    processAccessToken(inp.location, 'twToken', inp.agtSessData.data);

    let sessObj = localStorage.getItem('twToken');


    // console.log("Twitter session obj: "+ JSON.stringify(sessObj));


    let abortController = new AbortController();


    const gUser = dbObj.userObj;
    gUser.type = 'USER';
    gUser.social['source'] = 'twitter';
    gUser.dataorigin = 'social';
    gUser.dataflow = 'ADDUSER';
    gUser.subtype = 'TWITTER';
    gUser.status = 'active';
    //gUser.date = getFormattedDate(dt, '/');
    //gUser.time = getFormattedTime(dt, ':');






    if (sessObj) {
      sessObj = JSON.parse(sessObj);

      gUser.socialid = sessObj.user_id;
      gUser.social['id'] = sessObj.user_id;
      gUser.social['oauthtoken'] = sessObj.oauth_token;
      gUser.social['oauthsecret'] = sessObj.oauth_token_secret;
      gUser.social['token'] = sessObj;
      gUser.name = sessObj.screen_name;


      console.log('Twitter user: ' + JSON.stringify(gUser));


      //  qry.createSession('twitter', sessObj, dispatch);

      qry.addUpdateData('types/users', 'social.id', gUser, { signal: abortController.signal })
        .then(updateres => {
          console.log("Twitter user has been updated: " + JSON.stringify(updateres));
          qry.createSession('twitter', sessObj, dispatch);
        })
    }
  }


}
export const clipImage = (w, h, imgsrc, sig) => {

  const cnv = document.createElement('canvas');

  if (cnv !== null) {

    cnv.width = w;
    cnv.height = h;
    const CNVASPECT = cnv.width / cnv.height;
    const ctx = cnv.getContext('2d');
    const img = new Image();
    img.src = imgsrc;

    return new Promise((resolve, reject) => {
      img.onload = () => {
        let sx = 0;
        let sy = 0;
        let dx = 0;
        let dy = 0;
        let iw = img.width;
        let ih = img.height;
        let cw = 0;
        let ch = 0;

        const IMGASPECT = iw / ih;


        if (IMGASPECT >= CNVASPECT) {
          //  console.log('Clipping sides : ' + IMGASPECT);
          ch = cnv.height;
          cw = IMGASPECT * ch;
          dx = (cw - cnv.width) * 0.5;


        } else {
          //     console.log('Clipping height : ' + IMGASPECT);
          cw = cnv.width;
          ch = cw / IMGASPECT;

          dy = (ch - cnv.height) * 0.5;

        }
        //  ctx.scale(2.0,2.0);
        ctx.drawImage(img, sx, sy, iw, ih, -dx, -dy, cw, ch);
        resolve(cnv.toDataURL('image/jpeg', 1.0));
      }
      img.onerror = () => {
        if (sig.signal) {
          sig.signal.addEventListener('abort', event => {
            return reject(event);
          });
        }
        return reject(new Error('I am an error'));
      }


    });
  }
}


export const padNum = (pad, number, numlength) => ((number + '').length < numlength) ? Array(pad).fill(0) + number + '' : number;

export const padToTwo = number => number < 10 ? `0${number}`.slice(-2) : number;

export const getFormattedDate = (dt, sep) => padNum(1, dt.getDate(), 2) + sep + padNum(1, dt.getMonth(), 2) + sep + dt.getFullYear();

export const getFormattedTime = (dt, sep) => padNum(1, dt.getHours(), 2) + sep + padNum(1, dt.getMinutes(), 2);


export const securePwd = (pwd) => {
  return bcrypt.hashSync(pwd, 8);
}

export const comparePwd = (pwd, hash) => {
  return bcrypt.compareSync(pwd, hash);
}

export const parseRedisResponseToObj = (str) => {
  //let s = str.replace(/[\\"]/gi,'"');

  if (str) {
    const regexp = /\{.+\}/mgi;
    let arr = regexp.exec(str);
    if (arr) {
      return arr[0];
    }
    //  const regexp1 = /\\\"/mgi;
    //  n = arr[0].replace(regexp1, '"');      

  }


  //return "";
  return {};


}


// https://javascript.info/cookie. For more info on cookie apis


export const setCookie = (cname, cvalue, cookieopts) => {

  let extensions = '';
  let d = new Date();
  let mxage = ';max-age=';
  let expires = ";expires=";
  let ckpath = ';path=';


  if (cookieopts && cookieopts.age) {
    d.setTime(d.getTime() + (cookieopts.age * 24 * 60 * 60 * 1000));

  } else {
    d.setTime(d.getTime() + 20000);
  }
  extensions = extensions + expires + d.toUTCString();

  if (cookieopts && cookieopts['max-age']) {
    extensions = extensions + mxage + cookieopts['max-age'];
  }


  if (cookieopts && cookieopts.path) {
    extensions = extensions + ckpath + cookieopts.path;
  }



  console.log('cokkie string is: ' + cname + "=" + cvalue + extensions)
  document.cookie = cname + "=" + cvalue + extensions;

}


/* export const getCookie = (cname)=> {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
 */

export const getCookie = (name) => {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
export const checkCookie = () => {
  var sessid = getCookie("sessid");
  if (sessid != "") {
    console.log("Welcome again " + sessid);
  } else {
    console.log("Sessid id expired. Pls login again");
  } /* else {
      username = prompt("Please enter your name:", "");
      if (username != "" && username != null) {
        setCookie("username", username, 365);
      }
    } */
}

export const deleteCookie = (name) => {
  setCookie(name, "", {
    'max-age': -1
  })
}

export const checkRunEnv = () => {
  if (typeof window !== 'undefined') {
    return 'client'
  } else {
    return 'server';
  }
}



export const processAccessToken = (location, ...rest) => {

  let urlFragment = "";
  const [label, data] = [...rest];
  // console.log('Location: '+JSON.stringify(location));

  if (location.hash.substring(1).length > 0) {
    urlFragment = location.hash.substring(1);
    // console.log('location has a hash: '+ urlFragment);
  } else if (location.search.substring(1).length > 0) {
    urlFragment = location.search.substring(1);
    //  console.log('location has a s/arch: '+ urlFragment);
  }

  //const urlFragment = location.search.substring(1);
  //const urlFragment = location.hash.substring(1);

  //console.log("URL Fragment: "+ urlFragment);

  const codeparams = {};
  const regex = /([^&=]+)=([^&]*)/gm;
  let m = 0;

  if (data && label && label === 'googleToken') {
    localStorage.setItem(label, JSON.stringify(data));
  } else if (data) {

    while (m = regex.exec(data)) {
      codeparams[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    //  console.log('Twitter Code params: ' + JSON.stringify(codeparams));
    localStorage.setItem(label, JSON.stringify(codeparams));

  } else {
    while (m = regex.exec(urlFragment)) {
      codeparams[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }

    // console.log('Code params: ' + JSON.stringify(codeparams));

    if (codeparams['access_token'] &&
      (typeof codeparams['access_token'] !== 'undefined') &&
      codeparams['access_token'].length !== "") {
      //  console.log('Access token: ' + JSON.stringify(codeparams));
      localStorage.setItem(label, JSON.stringify(codeparams));
    }

  }

  /* else if (codeparams['oauth_token'] &&
    (typeof codeparams['oauth_token'] !== 'undefined') &&
    codeparams['oauth_token'].length !== "") {
    //  console.log('Access token: ' + JSON.stringify(codeparams));
    localStorage.setItem(label, JSON.stringify(codeparams));
  }*/

}

export const getUid = () => {


  return uuidv4();


}
