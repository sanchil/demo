import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Menu, MenuItem } from '@material-ui/core';

import LockRoundedIcon from '@material-ui/icons/LockRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
//import { AppContext } from '../../state/appcntxt';

//import { getSession } from '../../data/sessionquery';
import { getCookie, deleteCookie } from '../../lib/utils';
//import { getRedisSession, deleteRedisSession } from '../../data/session/sessionquery';
import redissession from '../../data/session/sessionquery';

import {useAppContext} from '../../lib/userhooks';


const useLoginIconStyles = makeStyles(theme => ({
    root: {

    }
}));

export const LoginIcon = (props) => {
    const classes = useLoginIconStyles();
    const setLogin = props.setLogin;
    const login = props.login;
 //   const { appstate, dispatch } = useContext(AppContext);
    const { appstate, dispatch } = useAppContext();
  //  const [login, setLogin] = useState(false);

    
    const { pathname } = useLocation();
    // const { isAuthenticated, loginWithRedirect, logout, loading } = useAuth0();

    // console.log('Login: '+login+ 'Auth0 Authenticated: '+isAuthenticated);

    // console.log("App state user: " + JSON.stringify(appstate.user));



    useEffect(() => {
     //   console.log('SESSION is : ' +JSON.stringify(appstate.user));
     //   console.log('SESSION is props login : ' + login );
        let sessid = getCookie('sessid');
        let bool = appstate.user.login || (typeof sessid !== 'undefined')
        console.log('SESSION is : '+ sessid + ' USer is logged in: '+ bool );
        setLogin(bool);

         if (!appstate.user.login && (typeof sessid !== 'undefined')) {

            redissession.getRedisSession(sessid)
                .then(res => {
                 //   setLogin(bool);
                    console.log('redis session from redis..O: '+ JSON.stringify(res));
                    dispatch({ type: 'LOGIN', login: true, sessid: sessid, sessdata: res.sessdata, data: res.uid });
                });

        } 

    //}, [pathname]);
    }, [appstate.user.login]);


    //if (login||isAuthenticated) {
    if (login) {
        return (
            <React.Fragment>
                <PersonRoundedIcon />
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <LockRoundedIcon />
            </React.Fragment>
        )

    }


}


export const LoginMenu = (props) => {

    const anchorEl = props.anchorEl;
    const setAnchorEl = props.setAnchorEl;
    const { appstate, dispatch } = useAppContext();
    const history = useHistory();

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = e => {
        handleClose();
        const sessid = appstate.user.sessid;
        console.log("Logging out sessid :: " + sessid);
        console.log("sessid in session storage :: " + sessionStorage.getItem('sessid'));
        if (sessid) {
            redissession.deleteRedisSession(sessid)
                .then(res => {
                    deleteCookie('sessid');
                    sessionStorage.removeItem('sessid');
                    dispatch({ type: 'LOGIN', login: false, source:"", sessid: "", sessdata: {}, data: {} });
                    console.log("REDIS SESSION deleted: " + JSON.stringify(res)); 
                    props.setLogin(false);                 
                    history.push('/');
                });
        } else {

        }


        if (!(_.isEmpty(appstate.auth0))) {

        } else {

        }
    }

    const handleProfile = (url)=>e=>{
        history.push(`/${url}`);
        handleClose();
    }

    return (
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={handleProfile('userprofile')}>My Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    )
}
