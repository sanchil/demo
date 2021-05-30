import React, { useState, useEffect, createRef, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid2 from '../../../components/styles/grids/grid2';
import { Box, Paper, Typography, Button } from '@material-ui/core';
import theme from '../../../theme';
import * as astyles from '../../../components/styles';
import { blue, yellow, amber } from '@material-ui/core/colors';
import { AppContext } from '../../../state/appcntxt';
//import { createRedisSession, getRedisSession, deleteRedisSession } from '../../../data/session/sessionquery';
import redissession from '../../../data/session/sessionquery';
//import { session } from '../../../data';
import { TextF } from '../../../components/datacomponents/inputcomponents';
import img from './banner_home5.png';
import loginimg from './login_home.jpg';
import { getUser } from '../../../data/db/queries';
import { comparePwd, parseRedisResponseToObj, getCookie, setCookie, checkCookie, deleteCookie } from '../../../lib/utils';
import { useAppContext } from '../../../lib/userhooks';
import _ from 'lodash';
//import { oauth2SignIn, fbSignIn, amzSignIn } from '../../../data/authquery';
import { amzSignIn } from '../../../data/auth/amzauth';
import { googleSignIn, googleSignInSvr } from '../../../data/auth/googleauth';
import { fbSignIn, fbSignIn1 } from '../../../data/auth/fbauth';
import { twSignIn } from '../../../data/auth/twauth';

import SaveIcon from '@material-ui/icons/Save';
//import { AmazonIcon, GoogleIcon } from '../../../components/styles/icons';
//import AmazonIcon  from '@material-ui/icons/Amazon';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Alert from '../../../components/snacks';



const useStyles = makeStyles(theme => ({
    root: {
        boxSizing: 'border-box',
        display: 'flex',
        flexFlow: 'row wrap',
        flex: 'auto',
        width: '90%',
        maxWidth: '90%',
        height: 300,
        borderRadius: 15,
        margin: 20,
        padding: '20px 20px 20px 50px'

    },
    panel: astyles.panel(theme),
    panel1: astyles.panel1(theme),
    bannerpanel: {
        ...astyles.bannerpanel(theme),
        [theme.breakpoints.up('xs')]: {
            margin: 0,
            padding: '5px 5px 5px 10px',
            height: 400,
        },
        [theme.breakpoints.up('sm')]: {
            margin: 0,
            padding: '10px 10px 10px 25px',
            height: 450,
        },
        [theme.breakpoints.up('md')]: {
            margin: 0,
            padding: '100px 20px 20px 50px',
            height: 700,
        },
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
    },

    banner: astyles.banner(theme),
    centerpanel: astyles.centerpanel(theme),
    center: astyles.center(theme),
    loginbox: {
        [theme.breakpoints.up('xs')]: {
            maxWidth: '75%',
            width: '75%',
            height: '85%',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            alignContent: 'center',
            margin: '10px auto auto',
           
        },
        [theme.breakpoints.up('md')]: {
            maxWidth: '45%',
            width: '45%',
            height: '70%',
            justifyContent: 'space-around',
            alignItems: 'center',
            alignContent: 'center',
            margin: '30px auto auto',
        },
        boxSizing: 'border-box',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row wrap',

        opacity: 0.9,
        //filter: 'alpha(opacity=50)',
        borderRadius: 10,
        backgroundColor: 'white',
        boxShadow: '0px 0px 20px rgb(200,200,200)',
        //   backgroundImage: `url(${loginimg})`,
        //   backgroundSize: 'cover',

    },
    logincontrols: {
        [theme.breakpoints.up('xs')]: {
            maxWidth: '90%',
            width: '90%',
         //   height: '15%',
            flexFlow: 'column nowrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
            alignContent: 'center',
           // border: '3px solid green'
        },
        [theme.breakpoints.up('md')]: {
            maxWidth: '70%',
            width: '70%',
            height: '20%',
            flexFlow: 'row wrap',
            justifyContent: 'space-around',
            alignItems: 'center',
            alignContent: 'center',
        },
        boxSizing: 'border-box',
        display: 'flex',
        flex: 'auto',
        

        //    / border:'1px solid red',

    },

}));

const Login = (props) => {
    const classes = useStyles();
    const uidRef = createRef();
    const pwdRef = createRef();
    const loginSessData = {}
    const [open, handleAlert] = useState(false);
    const [errmesg, setErrMesg] = useState("");

    const { pathname } = useLocation();

    const history = useHistory();

    // console.log('Pathname: '+ location.hash);
    //console.log('Login naughty message: ' + naughty);

    // const { appstate, dispatch } = useContext(AppContext);
    const { appstate, dispatch } = useAppContext();




    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);



    const handleLogin = (val) => evt => {
        let abortController = new AbortController();

        const user = uidRef.current.value;
        const pwd = pwdRef.current.value;




        getUser(user, { signal: abortController.signal })
            .then(user => {
                if (comparePwd(pwd, user.pwd)) {


                    const sessid = 'SESSION_' + user._id;

                    //    createSession(user)
                    //    .then(res=>console.log('SEssion id: '+JSON.stringify(res)));

                    redissession.createRedisSession(user, loginSessData)
                        .then(res => {
                            //    console.log('RESULt from REDIS : >> ' + JSON.stringify(res));
                            setCookie('sessid', sessid);
                            sessionStorage.setItem('sessid', sessid);
                            dispatch({ type: 'LOGIN', login: true, sessid: sessid, sessdata: loginSessData, data: user });

                            history.push('/');
                        })
                        .catch(err => console.log("Redis Session error : " + JSON.stringify(err)));


                } else {
                    console.log('Credentials Error');
                    throw [4, new Error('Credentials Error')];
                }
            })
            .catch(err => {
                //  console.log('User arror is: ' + JSON.stringify(err));
                if (err && err.length > 0) {
                    console.log('Error is: ' + err[1].message);
                    setErrMesg(err[1].message);
                    handleAlert(true);
                    //dispatch({type:'ALERT',open:true,data:err[1].message});
                    /*  if (err[0] === 0) {
                         return {}
                     } */
                }

            });
        /*     .then(() => {
             console.log('Initiate social login.');
             if (!(_.isEmpty(appstate.auth0))) {


             } else {

             }


         }); */



        //      const login = { login: true, uid: { name: 'Sandeep' } };


    }




    const handleRegister = (url) => (e) => {
        history.push(`/${url}`);
    }

    const handleGoogleLogin = (url) => e => {

        //    oauth2SignIn();
        // googleSignIn();
        googleSignInSvr();


    }

    const handleFBLogin = (url) => e => {

        fbSignIn();
        //fbSignIn1();

    }

    const handleAmzLogin = (url) => e => {

        amzSignIn();

    }

    const handleTwLogin = (url) => e => {
        // history.push('/oauth');
        twSignIn();
        // fetch('/oauth')
        // .then(res=>{console.log("Twitter Response: "+JSON.stringify(res))})
        //.catch(err=>{console.log("Error is: "+err.message)})
    }



    return (
        <Grid2>
            <Alert open={open} handleClose={() => handleAlert(false)}>
                <p>{errmesg} !!!</p>
            </Alert>
            <Box className={classes.bannerpanel} >
                {/*   <Paper className={classes.banner} elevation={3}> */}
                <Box className={classes.loginbox}>
                    <TextF ref={uidRef} label="User Id" width="70%" />
                    <TextF ref={pwdRef} type='password' label="Password" width="70%" />
                    <Box className={classes.logincontrols}>

                        <Button onClick={handleLogin('login')} >Login</Button>
                        <Button onClick={handleRegister('register')} >Register</Button>
                        <Button onClick={handleGoogleLogin('googlelogin')}
                            startIcon={<FacebookIcon fontSize="large" style={{ margin: 0 }} />}
                        >Google</Button>
                        <Button
                            onClick={handleFBLogin('fblogin')}
                            startIcon={<FacebookIcon fontSize="large" style={{ margin: 0, color: blue[700] }} />}
                        >Facebook</Button>
                        <Button
                            onClick={handleAmzLogin('amzlogin')}
                            startIcon={<FacebookIcon fontSize="large" style={{ margin: 0, color: yellow[700] }} />}
                        >Amazon</Button>

                        <Button
                            onClick={handleTwLogin('twlogin')}
                            startIcon={<FacebookIcon fontSize="large" style={{ margin: 0, color: yellow[700] }} />}
                        >Twitter</Button>



                    </Box>
                </Box>


                {/*   </Paper> */}

            </Box>





        </Grid2 >
    );

}

export default Login;
