import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { Button } from '@material-ui/core';
import { AppContext } from '../../state/appcntxt';
import Fade from '@material-ui/core/Fade';
import { amber, cyan } from '@material-ui/core/colors';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import TuneRoundedIcon from '@material-ui/icons/TuneRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import ContactMailRoundedIcon from '@material-ui/icons/ContactMailRounded';
import { LoginIcon, LoginMenu } from './components';
import { TypoHdBaskerville } from '../styles/styledcomponents';

import _ from 'lodash';
import { useScreen } from '../../lib/userhooks';


const mapStateToProps = state => ({
  carview: state.carview
});

const mapDispatchToProps = dispatch => {
  return ({
    caropen: (val) => dispatch({ type: 'CARVIEW', data: val })
  });
};

const useStyles = makeStyles(theme => ({

  root: {
    flexGrow: 1,
    height: trigger => trigger ? 0 : 50,
    transition: 'height 0.8s ease-in-out',

  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',

  },
  menuButton: {
    marginRight: theme.spacing(2),

  },
  menu: {
    [theme.breakpoints.up('xs')]: {
      width: '80%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },

    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '30%',
    padding: 5,
    //   border: '3px red solid',

  },
  messagebar: {
    fontFamily: '"Baskervville", serif',
    fontWeight: 500,
    fontSize: '2vw',
    letterSpacing: '2px',
    color: amber[100],
    margin: 'auto',
  }




}));


const styles = {
  appbar: {
    button: {
      color: cyan[50],
      fontWeight: 500
    }
  }
}



const DenseAppBar = (props) => {
  // console.log("Calling dense bar");
  const [anchorEl, setAnchorEl] = useState(null);
  const { appstate, dispatch } = useContext(AppContext);
  const [login, setLogin] = useState(false);
  const [name, setName] = useState("");



  const history = useHistory();
  const location = useLocation();

  //console.log('User: ' + JSON.stringify(appstate.user.uid));

  //console.log('User: ' + name);




  useEffect(() => {
    
    /** change following logic to pick session info from stored redis session */

    if (appstate.user.login && appstate.user.source === 'google') {

     // console.log('appbar :: set name google: ' + appstate.user.uid.name + "::" + _.isEmpty(appstate.user.uid.name));
      console.log('appbar :: set name google: ' + JSON.stringify(appstate.user.uid));
      setName(appstate.user.uid.name);

    } else if (appstate.user.login && appstate.user.source === 'facebook') {
      
      console.log('set name facebook: ' + appstate.user.uid.name + "::" + _.isEmpty(appstate.user.uid.name));
      setName(appstate.user.uid.name);

    }else if (appstate.user.login && appstate.user.source === 'amazon') {
      
      console.log('set name amazon: ' + appstate.user.uid.name + "::" + _.isEmpty(appstate.user.uid.name));
      setName(appstate.user.uid.name);

    }else if (appstate.user.login && appstate.user.source === 'twitter') {
      
      console.log('set name twitter: ' + appstate.user.uid.screen_name + "::" + _.isEmpty(appstate.user.uid.screen_name));
      setName(appstate.user.uid.screen_name);

    } else if (appstate.user.uid.fname) {
      setName(appstate.user.uid.fname + ' ' + appstate.user.uid.lname);
    } else {
      setName(".^.");
    }

  }, [appstate.user.login]);

  //console.log('Location is : ' + JSON.stringify(location));
  //console.log('Location hash substring : ' + JSON.stringify(location.hash.substring(1)));

  const handlePage = (inp) => (e) => {
    history.push(`/${inp}`);
  }

  const handleLogin = (inp) => e => {
    if (appstate.user.login) {
      setAnchorEl(e.currentTarget);
    } else {
      history.push(`/${inp}`);
    }

  }

  const trigger = useScrollTrigger();
  const classes = useStyles(trigger);


  return (
    <Fade in={!trigger}>
      <AppBar position="fixed" className={classes.root}>

        <Toolbar variant="dense" className={classes.toolbar}>

          <IconButton onClick={handlePage('')} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <HomeRoundedIcon />
          </IconButton>

          <TypoHdBaskerville width='40%' color={amber[200]} fsize={2} >
            Welcome {name} !!
          </TypoHdBaskerville>

          <Box className={classes.menu}>
            <Button onClick={handlePage('page1')} style={styles.appbar.button}>
              Page 1
            </Button>
            <Button onClick={handlePage('page2')} style={styles.appbar.button}>
              Page 2
            </Button>
            <Button onClick={handlePage('page3')} style={styles.appbar.button}>
              Page 3
            </Button>

            <IconButton onClick={handleLogin('login')} edge="end" className={classes.menuButton} color="inherit" aria-label="menu" >
              <LoginIcon login={appstate.user.login} setLogin={setLogin} />
            </IconButton>
            <LoginMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} setLogin={setLogin} />

          </Box>
        </Toolbar>
      </AppBar>
    </Fade>

  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DenseAppBar);




const useMobileStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    top: screen => screen.height - 55,
    backgroundColor: cyan[300],
    zIndex: 20,
  },
});

export const MobileBar = (props) => {

  const [value, setValue] = React.useState('');
  const screen = useScreen();
  const classes = useMobileStyles(screen);
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);
  const [login, setLogin] = useState(false);

  //console.log("Screen width: "+ screen.width + "Screen height" + screen.height);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    history.push(`/${newValue}`);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label="Home" value="" icon={<HomeRoundedIcon />} />
      <BottomNavigationAction label="Tools" value="page1" icon={<TuneRoundedIcon />} />
      <BottomNavigationAction label="About" value="page2" icon={<InfoRoundedIcon />} />
      <BottomNavigationAction label="Contact" value="page3" icon={<ContactMailRoundedIcon />} />
      <BottomNavigationAction label="Login" value="login" icon={<LoginIcon anchorEl={anchorEl} setAnchorEl={setAnchorEl} setLogin={setLogin} />} />

    </BottomNavigation>
  );
}

