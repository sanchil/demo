import React from 'react';
import serialize from 'serialize-javascript';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import qs from 'qs';
import { fetchCounter } from '../../app/common/api/counter';
import configureStore from '../../app/common/store/configureStore';
import theme from '../../theme';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';
import { mainTemplate } from '../templates';
import { AppProvider } from '../../app/state/appcntxt';
import AppGrid from '../../app/appgrid';
import App from '../../app/approuter';
//import App from '../../App';


const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const cssLinksFromAssets = (assets, entrypoint) => {
  return assets[entrypoint] ? assets[entrypoint].css ?
    assets[entrypoint].css.map(asset =>
      `<link rel="stylesheet" href="${asset}">`
    ).join('') : '' : '';
};

const jsScriptTagsFromAssets = (assets, entrypoint, extra = '') => {
  return assets[entrypoint] ? assets[entrypoint].js ?
    assets[entrypoint].js.map(asset =>
      `<script src="${asset}"${extra}></script>`
    ).join('') : '' : '';
};




const handleMain = async (req, res) => {

  const sheets = new ServerStyleSheets();
  const context = {};

  let agtSessData = JSON.stringify({});

  if ('session' in req && 'sessdata' in req.session) {
    //  console.log("Session data value::: handleMain:: " + req.session.sessdata);

    agtSessData = req.session.sessdata;
    req.session.destroy(req.session.id);
  } else {
    console.log("No twitter session data ");
  }


  if ('session' in req && 'gsession' in req.session) {
    console.log("Session data value::: handleMain:: " + req.session.gsession);
    agtSessData = req.session.gsession;
    req.session.destroy(req.session.id);
  } else {
    console.log("No google session data ");
  }

  if ('session' in req && 'amzsession' in req.session) {
    console.log("Session data value::: handleMain:: " + req.session.amzsession);
    agtSessData = req.session.amzsession;
    req.session.destroy(req.session.id);
  } else {
    console.log("No amazon session data ");
  }

  const p = new Promise((resolve) => {
    fetchCounter(apiResult => {
      const params = qs.parse(req.query);
      const counter = parseInt(params.counter, 10) || apiResult || 0;

      // Compile an initial state
      const preloadedState = { counter };

      // Create a new Redux store instance
      const store = configureStore(preloadedState);


      const markup = renderToString(
        sheets.collect(
          <Provider store={store}>
            <AppProvider>
              <StaticRouter context={context} location={req.url}>
                <ThemeProvider theme={theme}>
                 <AppGrid> 
                    <App />
                  </AppGrid>
                </ThemeProvider>
              </StaticRouter>
            </AppProvider>
          </Provider>,
        ),
      );

      const css = sheets.toString();
      const finalState = store.getState();
      const html = mainTemplate({
        markup,
        css,
        assets,
        cssLinksFromAssets,
        jsScriptTagsFromAssets,
        finalState,
        agtSessData
      });
      resolve(html);
    });
  });

  if (context.url) {
    res.redirect(context.url);
  } else {
    res.status(200)
      .send(await p);
  }

}





export default {
  handleMain
}