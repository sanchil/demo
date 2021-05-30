import CONST from '../consts';
import hmacsha1 from 'hmacsha1';


//var hash = hmacsha1(KEY, DATA);

const getSignature = (inp) => {
    let initStr = "";
    let paraStr = "";
    initStr = 'POST&' + encodeURIComponent(CONST.TW_REQ_TOKEN_EP) + '&';
    paraStr = encodeURIComponent('oauth_callback') + '=' + encodeURIComponent(inp['oauth_callback']);
    paraStr += '&' + encodeURIComponent('oauth_consumer_key') + '=' + encodeURIComponent(inp['oauth_consumer_key']);
    paraStr += '&' + encodeURIComponent('oauth_nonce') + '=' + encodeURIComponent(inp['oauth_nonce']);
    paraStr += '&' + encodeURIComponent('oauth_signature_method') + '=' + encodeURIComponent(inp['oauth_signature_method']);
    paraStr += '&' + encodeURIComponent('oauth_timestamp') + '=' + encodeURIComponent(inp['oauth_timestamp']);
    paraStr += '&' + encodeURIComponent('oauth_version') + '=' + encodeURIComponent(inp['oauth_version']);

    let signStr = initStr + encodeURIComponent(paraStr);
    return hmacsha1(CONST.TWSECRET + '&', signStr);

    //return btoa(hmacsha1(CONST.TWSECRET+'&',signStr+encodeURIComponent(paraStr)));
    //return hmacsha1(CONST.TWSECRET+'&',signStr+encodeURIComponent(paraStr));
    //  return new Buffer(hmacsha1(CONST.TWSECRET+'&',signStr+encodeURIComponent(paraStr))).toString('base64');
}
export const getTwBearToken = () => {

    // const authstring = btoa(CONST.TWCLIENTID + ':' + CONST.TWSECRET);
    const nonce = btoa('hello' + new Date().getTime() + 'twitter');
    //  let nonce = new Buffer('hello'+new Date().getTime()+'twitter').toString('base64');

    //const authstring = 'OAuth oauth_consumer_key="CONSUMER_API_KEY", oauth_nonce="OAUTH_NONCE", oauth_signature="OAUTH_SIGNATURE", oauth_signature_method="HMAC-SHA1", oauth_timestamp="OAUTH_TIMESTAMP", oauth_token="ACCESS_TOKEN", oauth_version="1.0"'
    //const authstring = 'OAuth oauth_nonce="'+nonce+'", oauth_callback="http%3A%2F%2Fwebapp.org%2Ftwauth", oauth_signature_method="HMAC-SHA1", oauth_timestamp="'+new Date().getTime()+'", oauth_consumer_key="OqEqJeafRSF11jBMStrZz", oauth_signature="Pc%2BMLdv028fxCErFyi8KXFM%2BddU%3D", oauth_version="1.0"';
    //const authstring = 'OAuth ,  oauth_callback="http%3A%2F%2Fapi.twitter.com%2Foauth%2Frequest_token", oauth_consumer_key="'+CONST.TWCLIENTID+'", oauth_nonce="'+nonce+'", oauth_signature_method="HMAC-SHA1" , oauth_timestamp="'+new Date().getTime()+'",  oauth_version="1.0", oauth_signature="Pc%2BMLdv028fxCErFyi8KXFM%2BddU%3D"';


    const authObj = {

        oauth_callback: CONST.TWREDIRECT_URI,
        oauth_consumer_key: CONST.TWCLIENTID,
        oauth_nonce: nonce,
        oauth_signature: "",
        oauth_signature_method: "HMAC-SHA1",
        oauth_timestamp: new Date().getTime(),
        oauth_version: "1.0"
    }


    const authstring = 'OAuth ' + encodeURIComponent("oauth_callback") + '="' + encodeURIComponent(authObj["oauth_callback"]) + '", ' + encodeURIComponent("oauth_consumer_key") + '="' + encodeURIComponent(authObj["oauth_consumer_key"]) + '", ' + encodeURIComponent("oauth_nonce") + '="' + encodeURIComponent(authObj["oauth_nonce"]) + '", ' + encodeURIComponent("oauth_signature") + '="' + encodeURIComponent(getSignature(authObj)) + '", ' + encodeURIComponent("oauth_signature_method") + '="' + authObj["oauth_signature_method"] + '", ' + encodeURIComponent("oauth_timestamp") + '="' + encodeURIComponent(authObj["oauth_timestamp"]) + '", ' + encodeURIComponent("oauth_version") + '="' + encodeURIComponent(authObj["oauth_version"]) + '"';

    console.log('Encoded tw auth string:  ' + authstring);
    //  const uri = 'https://api.twitter.com/oauth2/token';
    //const uri = 'https://api.twitter.com/oauth/request_token';
    //   const uri = 'https://cors-anywhere.herokuapp.com/https://api.twitter.com/oauth/request_token';

    // const uri = 'https://webapp.org/twitterauth';
    const url = new URL(CONST.TW_REQ_TOKEN_EP);

    /*   url.search = new URLSearchParams({
          grant_type: 'client_credentials',
      });
   */
    //  const formData = new FormData();
    //  formData.append('grant_type','client_credentials')

    const headers = new Headers({
        'Authorization': authstring,
        //    'Authorization': 'Bearer ' + 'ya29.Il_ABz1maps1ttHy1f9YlRj6FMfkvlEr1T0qa062Z1976NhfWJPoLPL9SljDL1xCj1RDJBIrkxsOXNfChkbiyoEZHHOWEjNq1TEELIpcqlF02K6wYTUdQ9gviuRQWjroQw',
        //'Accept': 'application/json',
        //    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        //   'Content-Length': '29',
        //   'Accept-Encoding': 'gzip'
        //  'Content-length':0
    });

    const reqOpts = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'omit', // include, *same-origin, omit
        headers: headers,
        // body:formData,
        //    redirect: 'follow', // manual, *follow, error
        //   referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //   body: JSON.stringify(data) // body data type must match "Content-Type" header

    }

    const req = new Request('https://webapp.org/twitterauth', reqOpts)
    return fetch(req)
        .then(res => {
            console.log("Twitter response is: " + JSON.stringify(res));
        })


}


export const twSignIn = () => {
    //getTwBearToken();
    location.href = "/oauth/twauth";
    //fetch('/tools',{method:'POST'});
    // .then(res=>{console.log("Twitter Response: "+JSON.stringify(res))})
    //.catch(err=>{console.log("Error is: "+err.message)})
}

export const _twSignIn = () => {
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

export const convertReqToken2AccessToken = (location) => {

    let urlFragment = "";
    let verifier = "";
    const regexp = /(oauth_verifier=)(.+)$/gi;
    if (location.hash.substring(1).length > 0) {
        urlFragment = location.hash.substring(1);
        console.log('location has a hash: ' + urlFragment);

    } else if (location.search.substring(1).length > 0) {
        urlFragment = location.search.substring(1);
        verifier = urlFragment.match(regexp)[0].split('=');
        console.log('location has a search: ' + verifier[1]);
    }

    const authstring = "";

    const url = new URL(CONST.TW_REQTOKEN_ACCESSTOKEN_EP);



    const headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': authstring,
    });

    var formData = new FormData();
    formData.append("oauth_verifier", verifier);

    const reqOpts = {
        method: 'POST',
        headers: headers,
        body: formData
    }



    const req = new Request(url, reqOpts);

  //   return fetch(req);
}


