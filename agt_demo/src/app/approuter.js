import React, { useContext, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import _ from 'lodash';


import Home from './content/home';
import Page1 from './content/page1';
import Page2 from './content/page2';
import Page3 from './content/page3';
import Page4 from './content/page4';
import Page5 from './content/page5';
import Page6 from './content/page6';
import Page7 from './content/page7';
import Page8 from './content/page8';
import Page9 from './content/page9';
import Page10 from './content/page10';
import Page11 from './content/page11';
import Page12 from './content/page12';
import Page13 from './content/page13';

import Login from './content/admin/login';
import Terms from './content/terms';
import Privacy from './content/privacy';

import './components/styles/app.css';
import { useAppContext } from './lib/userhooks';


const ProtectedRoute = ({ children, ...rest }) => {

  const { appstate, dispatch } = useAppContext();

  // console.log("User logged in test: "+ !(_.isEmpty(appstate.user))&&appstate.user.login);

  return (
    <Route {...rest}
      render={({ location }) => (!(_.isEmpty(appstate.user)) && appstate.user.login)
        ?
        (children)
        :
        <Redirect to={{ pathname: '/login', state: { from: location } }} />} />)

}


const App = () => (
  <Switch>
   
    <Route exact path="/" component={Home} />
    <Route exact path="/home" component={Home} />
    <Route exact path="/gauth" component={Home} />
    <Route exact path="/fbauth" component={Home} />
    <Route exact path="/amzauth" component={Home} />
    <Route exact path="/twauth" component={Home} />


    <Route exact path="/page1" component={Page1} />
    <Route exact path="/page2" component={Page2} />
    <Route exact path="/page3" component={Page3} />
    <Route exact path="/page4" component={Page4} />   
    <Route exact path="/page5" component={Page5} />
    <Route exact path="/page6" component={Page6} />
    <Route exact path="/page7" component={Page7} />
    <Route exact path="/page8" component={Page8} />
    <Route exact path="/page9" component={Page9} />
    <Route exact path="/page10" component={Page10} />
    <Route exact path="/page11" component={Page11} />
    <Route exact path="/page12" component={Page12} />
    <Route exact path="/page13" component={Page13} />
   

    <Route exact path="/privacy" component={Privacy} />
    <Route exact path="/terms" component={Terms} />
    <Route exact path="/login" component={Login} />
  </Switch>
);

export default App;



