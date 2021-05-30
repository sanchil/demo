//export const mainTemplate = (markup,css,assets,cssLinksFromAssets,jsScriptTagsFromAssets)=>{
import serialize from 'serialize-javascript';
import CONST from '../../app/consts';

export const mainTemplate = (inp) => {

    return (
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        ${inp.cssLinksFromAssets(inp.assets, 'client')}
        ${inp.css ? `<style id='jss-ssr'>${inp.css}</style>` : ''}
        

        
    </head>
    <body>
        <div id="root">${inp.markup}</div>

        <script type="text/javascript" nonce="amzabcxyz">

     
        var amzclientid = ${JSON.stringify(CONST.AMZCLIENTID)};
      //var amzclientid = 'amzn1.application-oa2-client.762751d921524b588dd4dcb9c66d0db9';

        window.naughty = "Hwllo ok !!!";
        
        window.onAmazonLoginReady = function() {
            amazon.Login.setClientId(amzclientid);
        };
  (function(d) {
    var fjs = d.getElementsByTagName('script')[0];
    var a = d.createElement('script'); 
    a.type = 'text/javascript';
    a.async = true; 
    a.id = 'amazon-login-sdk';
    a.src = 'https://assets.loginwithamazon.com/sdk/na/login1.js';
    fjs.parentNode.insertBefore(a, fjs);
    //d.getElementById('root').appendChild(a);
  })(document);

</script>


        <script type="text/javascript" nonce="agtsessionabcxyz" >
                window.agtSessData = ${serialize(inp.agtSessData)} 
        </script>
        <script>
        window.__PRELOADED_STATE__ = ${serialize(inp.finalState)}
      </script>
        ${inp.jsScriptTagsFromAssets(inp.assets, 'client', ' defer crossorigin')}
    </body>
</html>`
    )
}