import cloudinary from 'cloudinary-core';

// env specific urls

export const HOST = 'h-gill.com';
export const DB = '/hgilldb';

// URLS used by local APP #webapp.org
//export const DBURL = 'https://webapp.org/db'+DB;
//export const SESSIONURL = 'https://webapp.org/session';

// URLS used by local APP #h-gill.com
// make sure to set cors on couchdb server to https://h-gill.com and
// https://www.h-gill.com

export const DBURL = 'https://h-gill.com/db'+DB;
export const SESSIONURL = 'https://h-gill.com/session';

//export const DBURL = 'https://172.31.44.58/db'+DB;
//export const SESSIONURL = 'https://172.31.44.58/session';


//export const CLOUDINARY_API = 'https://api.cloudinary.com/v1_1';
//export const CLOUDINARY_URL = 'https://res.cloudinary.com';
//export const CLOUDINARY_KEY = '725847113651474';
//export const CLOUDINARY_SEC = '0bAvKlgau0Wly7Eu85Bs6vDBglA';
//export const CLOUDINARY_DB = 'hgill';
//export const CLOUDINARY_URL_DB = 'https://res.cloudinary.com'+'/'+CLOUDINARY_DB;

export const CLOUDINARY_API = 'https://api.cloudinary.com/v1_1';
export const CLOUDINARY_URL = 'https://res.cloudinary.com';
export const CLOUDINARY_KEY = '274252481156554';
export const CLOUDINARY_SEC = 'HFkBZmRgbxYUOL2EB6OOXrAF4bs';
export const CLOUDINARY_DB = 'hgillimg';
export const CLOUDINARY_UPLOAD_PRESET = 'itxglhuu';
export const CLOUDINARY_URL_DB = CLOUDINARY_URL+'/'+CLOUDINARY_DB;

export const CLOUDINARY_CONFIG = {
    cloud_name: CLOUDINARY_DB,
    api_key: CLOUDINARY_KEY,
    api_secret: CLOUDINARY_SEC,
}

export const CLOUDINARY = new cloudinary.Cloudinary(CLOUDINARY_CONFIG);





export const GAUTH_URI = 'https://accounts.google.com/o/oauth2/v2/auth'
//export const GAUTH_URI = 'https://webapp.org/gauth';
export const GAPI_KEY = 'AIzaSyBRiifSe51iNAkMaVrk1nU-0miaU_iuXUU'
export const GCLIENT_ID = '300343646503-56cna6f0ve45pb20sq5jibdlsqqiifcq.apps.googleusercontent.com'
export const GSECRET = 'KmEPDTOml9tg5CeNl2Tmm1sb';
export const GAUTH_REDIRECT_URI = 'https://'+HOST+'/gauth';
export const GAUTH_USER_EP = 'https://www.googleapis.com/oauth2/v2/userinfo';
export const GDISCOVERY_URI = 'https://accounts.google.com/.well-known/openid-configuration';


export const FBAPP_ID = '607534493419952';
export const FBAPP_SEC = 'e8e1802f31bea78928b6bbffcaa0368b';
export const FBAUTH_URI = 'https://www.facebook.com/v7.0/dialog/oauth';
export const FBACCESS_TOKEN_URI = 'https://graph.facebook.com/v7.0/oauth/access_token';
export const FBAUTH_REDIRECT_URI = 'https://'+HOST+'/fbauth';
export const FB_USER_EP = 'https://graph.facebook.com/v7.0/me'


export const AMZCLIENTID = 'amzn1.application-oa2-client.762751d921524b588dd4dcb9c66d0db9';
export const AMZCLIENTSECRET = 'c0124e542b9fccd9fa8c1bc68d62e009c40bdd483c8feaad15cd262003a45ce3';
export const AMZREDIRECT_URI = 'https://'+HOST+'/amzauth';
export const AMZ_AUTH_EP = 'https://www.amazon.com/ap/oa';
export const AMZ_USER_EP = 'https://api.amazon.com/user/profile';
export const AMZ_ACCESS_TOKEN_REQ_EP = 'https://api.amazon.com/auth/o2/token';

export const TWCLIENTID = '1CCb3MrU0JlvJpwfnbDMgpJPW';
export const TWSECRET = 'OHkBugNN9tXynpPHh9yLIIe6cuwoUgZz9dpTmka8yZSqxdWauJ';
//export const TWREDIRECT_URI = 'https://'+HOST+'/sign-in-with-twitter/';
export const TWREDIRECT_URI = 'https://'+HOST+'/twauth';
export const TWACCESSTOKEN = '53818526-4LIKCL0rP2FU1HWP0JdyB8q3wAf1pu6maFO9eChn8';
export const TWACCESSTOKENSECRET = 'or3sxEy0AUlo0RfTeOMk5wzPCw1QR6SuND0PJPBWICD9E';
export const TW_REQ_TOKEN_EP = 'https://api.twitter.com/oauth/request_token'


const CONST = {
    CLOUDINARY_API,
    CLOUDINARY_URL,
    CLOUDINARY_KEY,
    CLOUDINARY_SEC,
    CLOUDINARY_DB,
    CLOUDINARY_URL_DB,
    CLOUDINARY_UPLOAD_PRESET,
    CLOUDINARY_CONFIG,
    CLOUDINARY,
    DB,
    DBURL,
    SESSIONURL,
    GAUTH_URI,
    GAPI_KEY,
    GCLIENT_ID,
    GSECRET,
    GAUTH_REDIRECT_URI,
    GAUTH_USER_EP,
    GDISCOVERY_URI,
    FBAUTH_URI ,
    FBAUTH_REDIRECT_URI,
    FBACCESS_TOKEN_URI,
    FBAPP_ID,
    FBAPP_SEC,
    FB_USER_EP,
    AMZCLIENTID,
    AMZ_AUTH_EP,
    AMZCLIENTSECRET,
    AMZ_USER_EP,
    AMZREDIRECT_URI,
    AMZ_ACCESS_TOKEN_REQ_EP,
    TWCLIENTID,
    TWSECRET,
    TWREDIRECT_URI,
    TW_REQ_TOKEN_EP

}

export default CONST;