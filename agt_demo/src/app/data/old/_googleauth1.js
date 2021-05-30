import CONST from '../consts';


export const googleSignIn = () => {
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
  const params = JSON.parse(localStorage.getItem('googleToken'));
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
/**
 * The following method is for server side . 
 * googleSignInSvr is meant to be used in place of googleSignIn.
 * 
 */
export const googleSignInSvr = () => {
  location.href = "/oauth/gauth";
}

/**
 * The following method is for server side retrieval of code, id token and 
 * access token. getEmailUserSvr is meant to be used in place of getEmailUser.
 * 
 */



export const getEmailUserSvr = (accesstoken) => {

  if (accesstoken) {
    const uri = CONST.GAUTH_USER_EP;
    //   const uri = "https://www.googleapis.com/userinfo/v2/me";
    const url = new URL(uri);
    const headers = new Headers({
      //'Authorization': 'Bearer ' + params['access_token'],
      'Authorization': 'Bearer ' + accesstoken,
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
        }
      });

  }else{
    throw [1,Error("No access token")];
  }

}




