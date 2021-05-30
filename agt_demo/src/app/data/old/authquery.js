import CONST from '../consts';


export const getGAuth = () => {
  const uri = CONST.GAUTH_URI;
  const url = new URL(uri);

  const searchParams = {
    'client_id': CONST.GCLIENT_ID,
    'redirect_uri': CONST.GREDIRECT_URI,
    'response_type': 'token',
    'scope': 'openid profile email',
    'include_granted_scopes': 'true',
    'state': 'pass-through value'
  }

  url.search = new URLSearchParams(searchParams);
  const headers = new Headers({
    //'Content-Type': 'application/x-www-form-urlencoded',
    //     'Content-Type':'multipart/form-data',
    //  'Content-Type':'text/plain',
    'Content-Type': 'application/json',
  });

  const reqOpts = {
    method: 'GET',
    mode: 'cors',
    headers: headers,
  }

  console.log('URL is: ' + JSON.stringify(url));
  const req = new Request(url);

  fetch(req)
    .then(res => {
      console.log('G rs is ok' + res.status);
      if (res.ok) {
        return res.json();
      }
    })
    .then(res => console.log('ID : ' + JSON.stringify(res)));

}


export const oauth2SignIn = () => {
   console.log('Calling outhsignin: ');
  // Google's OAuth 2.0 endpoint for requesting an access token
  //  var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Create element to open OAuth 2.0 endpoint in new window.
  var form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', CONST.GAUTH_URI);
  //form.setAttribute('action', oauth2Endpoint);


  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {
    'client_id': CONST.GCLIENT_ID,
    'redirect_uri': CONST.GAUTH_REDIRECT_URI,
    //  'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
    'scope': 'openid profile email',
    //scope: 'https://www.googleapis.com/auth/gmail.metadata',
    'state': 'hgillrequest',
    'include_granted_scopes': 'true',
    'response_type': 'token',

    // 'response_type': 'code'
  };

  // Add form parameters as hidden input values.
  for (var p in params) {
    var input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
}

export const processGToken = (location) => {
  if (location.hash && (typeof location.hash !== 'undefined') && location.hash !== "") {


    const fragmentString = location.hash.substring(1);
    //  console.log('Fragment string is :' + fragmentString);
    const params = {};
    const regex = /([^&=]+)=([^&]*)/gm;
    // let m = regex.exec(fragmentString);
    // let i = 0;

    // if (m) {
    let m = 0;
    while (m = regex.exec(fragmentString)) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    // console.log('Tokenized params is :'+ JSON.stringify(params));
    if (Object.keys(params).length > 0) {
      if (localStorage) {
        localStorage.setItem('google_oauth2', JSON.stringify(params));

        //  if (params['state'] && params['state'] == 'try_sample_request') {

        /*  getEmailUser()
         .then(res=>{
           console.log("ID is : "+ JSON.stringify(res));

         }); */
        //  console.log("token from storge:: " + localStorage.getItem('oauth2-test-params'));
        //  }
      }
    }
  } else {
    console.log("Location has is empty:")
  }
}


export const getEmailUser = () => {
  const params = JSON.parse(localStorage.getItem('google_oauth2'));
  if (params && params['access_token']) {
    console.log('G Access token: ' + params['access_token']);
    //const uri = "https://www.googleapis.com/oauth2/v2/userinfo";
    const uri = CONST.GAUTH_USER_EP;
    //   const uri = "https://www.googleapis.com/userinfo/v2/me";
    const url = new URL(uri);
    /*  url.search = new URLSearchParams({
       'key': 'AIzaSyBRiifSe51iNAkMaVrk1nU-0miaU_iuXUU',
     }); */
    const headers = new Headers({
      'Authorization': 'Bearer ' + params['access_token'],
      //    'Authorization': 'Bearer ' + 'ya29.Il_ABz1maps1ttHy1f9YlRj6FMfkvlEr1T0qa062Z1976NhfWJPoLPL9SljDL1xCj1RDJBIrkxsOXNfChkbiyoEZHHOWEjNq1TEELIpcqlF02K6wYTUdQ9gviuRQWjroQw',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      //  'Content-length':0
    });
    const reqOpts = {
      method: 'GET',
      headers: headers,
    };

    const req = new Request(url, reqOpts);

    return fetch(req)
      .then(res => {

        if (res.ok) {
          return res.json();
        } else {
          oauth2SignIn();
        }

      });
  }
}


export const fbSignIn = () => {
  const form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', CONST.FBAUTH_URI);
  const params = {
    client_id: CONST.FBAPP_ID,
    redirect_uri: CONST.FBAUTH_REDIRECT_URI,
    response_type: 'code token granted_scopes',
    scope: 'public_profile email user_birthday user_location',
    state: { 'name': 'hgillauth' }

  }

  for (let p in params) {
    let inp = document.createElement('input')
    inp.setAttribute('type', 'hidden');
    inp.setAttribute('name', p);
    inp.setAttribute('value', params[p]);
    form.appendChild(inp);
  }

  document.body.appendChild(form);
  form.submit();

}

export const getFBAccessToken = (location) => {

  //const urlFragment = location.search.substring(1);
  const urlFragment = location.hash.substring(1);


  const codeparams = {};
  const regex = /([^&=]+)=([^&]*)/gm;

  let m = 0;
  while (m = regex.exec(urlFragment)) {
    codeparams[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }

  //console.log('fb code: ' + codeparams['code']);
  if (codeparams['access_token'] &&
    (typeof codeparams['access_token'] !== 'undefined') &&
    codeparams['access_token'].length !== "") {
    //  console.log('Access token: ' + JSON.stringify(codeparams));
    localStorage.setItem('fb_accesstoken', JSON.stringify(codeparams));
    //  return sendFBCode4Token(codeparams['code']);


    /*  return getLongLivedFBAccessToken(codeparams['access_token'])
    .then(res=>{
      if(res.ok){
        return res.json();       
      }else{
        return {}
      }
    })
    .then(res=>{
      //console.log('RES::'+JSON.stringify(res));
      localStorage.setItem('fb_accesstoken_long', JSON.stringify(res));
    });  */


  }




}

export const getLongLivedFBAccessToken = (token) => {

  //const uri = 'https://graph.facebook.com/oauth/access_token';
  const uri = CONST.FBACCESS_TOKEN_URI;
  const url = new URL(uri);
  url.search = new URLSearchParams({
    grant_type: 'fb_exchange_token',
    client_id: '607534493419952',
    client_secret: 'e8e1802f31bea78928b6bbffcaa0368b',
    fb_exchange_token: token,
  });

  const headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'

  });

  const reqOpts = {
    method: 'GET',
    //   headers:headers
  }

  const req = new Request(url, reqOpts);
  return fetch(req)

}

export const getFBAccessTokenFromCode = (location) => {

  // const urlFragment = location.search.substring(1);
  const urlFragment = location.hash.substring(1);


  const codeparams = {};
  const regex = /([^&=]+)=([^&]*)/gm;

  let m = 0;
  while (m = regex.exec(urlFragment)) {
    codeparams[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }

  //console.log('fb code: ' + codeparams['code']);
  if (codeparams['code'] &&
    (typeof codeparams['code'] !== 'undefined') &&
    codeparams['code'].length !== "") {
    console.log('Code token: ' + JSON.stringify(codeparams));
    //localStorage.setItem('fb_accesstoken', JSON.stringify(codeparams));
    return sendFBCode4Token(codeparams['code']);
  }


  //console.log('Stored code: '+localStorage.getItem('fb_code'));
  //console.log('Params code params: '+codeparams['code']);
  //if (localStorage) {
  // localStorage.setItem('fb_code', codeparams['code']);
  //}

}

export const sendFBCode4Token = (fbcode) => {

  if (fbcode) {


    const uri = CONST.FBACCESS_TOKEN_URI;
    const url = new URL(uri);
    url.search = new URLSearchParams({
      client_id: CONST.FBAPP_ID,
      client_secret: CONST.FBAPP_SEC,
      redirect_uri: CONST.FBAUTH_REDIRECT_URI,
      code: fbcode,
    });

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    const reqOpts = {
      method: 'GET',
      //    headers: headers,

    }
    const req = new Request(url, reqOpts);

    return fetch(req)
      .then(res => {

        if (res.ok) {

          return res.json();
        } else {
          return {}
        }
      })
      .then(res => {
        //console.log('Access token: ' + res.constructor.name);

        if ((Object.entries(res).length !== 0) && res.constructor.name === 'Object') {
          console.log('storing access token' + JSON.stringify(res));
          localStorage.setItem('fb_accesstoken', JSON.stringify(res));
        }

        return;

      });

  }


}


export const getFBUser = () => {
  const uri = CONST.FB_USER_EP;
  console.log('FFBBB: uri : ' + uri);
  const url = new URL(uri);
  
  

  if (localStorage.getItem('fb_accesstoken')) {
    const fbAccessToken = JSON.parse(localStorage.getItem('fb_accesstoken'));
    console.log('FFBBB: ACCESS TOKEN: ' + JSON.stringify(fbAccessToken));

    if (fbAccessToken.access_token) {

      url.search = new URLSearchParams({
        fields: 'id,name,birthday,email',    
       // access_token: 'EAAIojKWrSbABAIpoo85H2ZCKFmvDvsrf2ZCfYDQofHPUbzc8oKZAkGdZA2oEq6j22ZASCNIfqWHPsP9qQU4sYPRZCjbY01sThsQM3yI4lOQAryXKdNfsLZCWGnCBdMRe2lIiDHxaEaTZC0Eib12tht8dVA6QqOa5oI01XRDgsc0FqinGzYanJom2',
        access_token: fbAccessToken.access_token,
      });

      const req = new Request(url);

      return fetch(req)
        .then(res => {
          //console.log('Res connected: ' + res.ok + res.connected);
          return res.json();
        });

    } 

  }else {
    return {}
  }





}