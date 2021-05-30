import CONST from '../../consts';

export const amzSignIn = () => {
  const options = {}
  options.popup = false;
  options.scope = 'profile';
  options.scope_data = {
    'profile': { 'essential': false }
  };
  options.response_type = 'code';

  // console.log('amazon redirect uri is: '+CONST.AMZREDIRECT_URI);

  amazon.Login.authorize(options, CONST.AMZREDIRECT_URI);

  return false;
}


export const getAmzUser = () => {
  // const uri = CONST.FB_USER_EP;
  //const uri = 'https://api.amazon.com/user/profile';
  const uri = CONST.AMZ_USER_EP;
  console.log('Amazon : uri : ' + uri);
  const url = new URL(uri);



  if (localStorage.getItem('amzToken')) {
    const amzAccessToken = JSON.parse(localStorage.getItem('amzToken'));
    console.log('Amazon: ACCESS TOKEN: ' + JSON.stringify(amzAccessToken));

    if (amzAccessToken.access_token) {

      /*    url.search = new URLSearchParams({
           //fields: 'id,name,birthday,email',    
          // access_token: 'EAAIojKWrSbABAIpoo85H2ZCKFmvDvsrf2ZCfYDQofHPUbzc8oKZAkGdZA2oEq6j22ZASCNIfqWHPsP9qQU4sYPRZCjbY01sThsQM3yI4lOQAryXKdNfsLZCWGnCBdMRe2lIiDHxaEaTZC0Eib12tht8dVA6QqOa5oI01XRDgsc0FqinGzYanJom2',
           access_token: amzAccessToken.access_token,
         }); */

      const headers = new Headers({
        //'Authorization': 'Bearer ' + params['access_token'],
        'Authorization': 'Bearer ' + amzAccessToken.access_token,
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
          //console.log('Res connected: ' + res.ok + res.connected);
          return res.json();
        });

    }

  } else {
    return {}
  }





}