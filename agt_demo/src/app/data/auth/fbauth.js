import CONST from '../../consts';
import axios from 'axios';


/**
 * 
 * The following code is for logging into fb using http urls and without the 
 * provide javascript code by FB.
 * 
 */

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
  
  

  if (localStorage.getItem('fbToken')) {
    const fbAccessToken = JSON.parse(localStorage.getItem('fbToken'));
   // console.log('FFBBB: ACCESS TOKEN: ' + JSON.stringify(fbAccessToken));

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


//********************************************************************** */


/**
 * The following section is code using the javascript library provided by
 * FB.
 */
export const _fbSignIn = ()=>{                      
  console.log('Welcome!  Fetching your information.... ');
  
  FB.login(function(response) {
    if (response.status === 'connected') {
      console.log("FB Logged in ..."+ JSON.stringify(response));
     
    } else {
      console.log("FB Logged in failure...");
    }
  }, {
      scope: 'public_profile email user_birthday user_location',
      return_scopes: true
    });
}

export const testAPI = ()=>{                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
  });
}

export const statusChangeCallback = (response)=> {  // Called with the results from FB.getLoginStatus().
  console.log('statusChangeCallback');
  console.log(response);                   // The current login status of the person.
  if (response.status === 'connected') {   // Logged into your webpage and Facebook.
    testAPI();  
  } else {                                 // Not logged into your webpage or we are unable to tell.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this webpage.';
  }
}


export const checkLoginState = ()=>{               // Called when a person is finished with the Login Button.
  FB.getLoginStatus(function(response) {   // See the onlogin handler
    statusChangeCallback(response);
  });
}

export const getFBUser1 = ()=>{
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
  });
} 




