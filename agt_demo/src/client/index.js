import React from 'react';
import AppGrid from '../app/appgrid';
import App from '../app/approuter';
//import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { hydrate } from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import configureStore from '../app/common/store/configureStore';
import { AppProvider } from '../app/state/appcntxt';
import theme from '../theme';


const store = configureStore(window.__PRELOADED_STATE__);

hydrate(
  <Provider store={store}>
    <AppProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
        <AppGrid>
            <App />
        </AppGrid>
        </ThemeProvider>
      </BrowserRouter>
    </AppProvider>
  </Provider>,
  document.getElementById('root'),
  () => {
    // [ReHydratation](https://github.com/cssinjs/jss/blob/master/docs/ssr.md)
    const jssStyles = document.getElementById('jss-ssr');
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }
);

if (module.hot) {
  module.hot.accept();
}
