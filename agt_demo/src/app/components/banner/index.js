import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Box, Button, Typography, IconButton } from '@material-ui/core';
import theme from '../../theme';
//import img from './banner_home4.png';
import img from './pexels-miriam-espacio-110854.jpg';

import * as astyles from '../../components/styles';
import { TypoHdKaushan, TypoHdMerriweather, TypoHdBaskerville } from '../styles/styledcomponents';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import { blue, cyan, red, lightBlue, pink } from '@material-ui/core/colors';


const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.up('xs')]: {
            flexFlow: 'column wrap',
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: 400,

        },
        [theme.breakpoints.up('md')]: {
            flexFlow: 'row wrap',
            justifyContent: 'center',
            alignItems: 'flex-end',
            height: 600,

        },
        boxSizing: 'border-box',
        position: 'relative',
        display: 'flex',
        flex: '1 1 auto',
        width: '100%',
        maxWidth: '100%',

        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
    },

    bannermessage: {
        [theme.breakpoints.up('xs')]: {
            flexFlow: 'column wrap',
        },
        [theme.breakpoints.up('sm')]: {
            flexFlow: 'row wrap',
        },
        [theme.breakpoints.up('md')]: {
            flexFlow: 'row wrap',
        },
        display: 'flex',


    },
    bannerbutton: {
        [theme.breakpoints.up('xs')]: {
            margin: 10,
            width: '50%',
        },
        [theme.breakpoints.up('sm')]: {
            margin: 20,
            width: '30%',
        },
        [theme.breakpoints.up('md')]: {
            margin: 20,
            width: '15%',
        },

    },
    txtoverlay: {
        boxSizing: 'border-box',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'center',
        margin: 'auto',
        backgroundColor: 'rgba(0,0,0,0.0)',
        color: 'white',

    },
    contact: {
        [theme.breakpoints.up('xs')]: {
            margin: 'auto',
            width: '100%',
            height: '40%',
            padding: 20,
        },
        [theme.breakpoints.up('sm')]: {
            margin: 'auto',
            width: '100%',
            height: '20%',
            padding: 50,
        },
        [theme.breakpoints.up('md')]: {
            margin: 'auto',
            width: '100%',
            height: '20%',
            padding: 100,
        },
        boxSizing: 'border-box',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'column nowrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'center',

        //   border: '1px solid red',
    },
    contactsocial: {
        [theme.breakpoints.up('xs')]: {
            flexFlow: 'column wrap',
            justifyContent: 'space-around',
            alignItems: 'center',
            alignContent: 'center',
            width: '65%',
            height: '11%',
            margin: 'auto',
            padding: 25,
            backgroundColor: 'rgba(0,0,0,0.3)',
            borderRadius: 5,
        },
        [theme.breakpoints.up('sm')]: {
            flexFlow: 'row wrap',
            justifyContent: 'space-around',
            alignItems: 'center',
            alignContent: 'center',
            width: '60%',
            height: '20%',
            padding: 20,
            backgroundColor: 'rgba(0,0,0,0.3)',
            margin: 'auto',
        },
        [theme.breakpoints.up('md')]: {
            flexFlow: 'row wrap',
            justifyContent: 'space-around',
            alignItems: 'center',
            alignContent: 'center',
            width: '30%',
            height: '15%',
            padding: 30,
            backgroundColor: 'rgba(0,0,0,0.3)',
            margin: 'auto',
        },
        boxSizing: 'border-box',
        display: 'flex',
        flex: 'auto',
        //border:'2px solid green', 


    },
    contactphone: {
        [theme.breakpoints.up('xs')]: {
            width: '70%',
            height: '30%',
            padding: 20,
            margin: 20,
        },
        [theme.breakpoints.up('sm')]: {
            width: '60%',
            height: '20%',
            padding: 25,
            margin: 'auto',
        },
        [theme.breakpoints.up('md')]: {
            width: '30%',
            height: '20%',
            padding: 30,
            margin: 'auto',
        },

        display: 'flex',
        flex: 'auto',
        flexFlow: 'row wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'center',

        borderTop: '2px solid white',
        borderBottom: '2px solid white',

    },
    contactside: {
        display: 'flex',
        flex: 'auto',
        flexFlow: 'column nowrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'center',
        width: '60%',
        maxWidth: '60%',
        height: '10%',
        //   border:'2px solid lightBlue',
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,0,0.5)',
        // margin:15,
        boxShadow: '3px 3px 20px rgba(200,200,0,0.5)',

    }




}));


export const Banner = withWidth()((props) => {
    const classes = useStyles();
    const history = useHistory();

  

    const handlePage = (page) => e => {
        history.push(`/${page}`);
    }

    const handleSocialMedia = (page) => e => {
        history.push(`${page}`);
    }




    return (
        <Box className={classes.root}>

           

                <Button
                    variant="contained"
                    color="primary"
                    className={classes.bannerbutton}
                    onClick={handlePage(props.link1)} style={{ zIndex: 2 }}>
                        {props.button1}
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    className={classes.bannerbutton}
                    onClick={handlePage(props.link2)} style={{ zIndex: 2 }}>
                        {props.button2}
                </Button>
            




            <Box className={classes.txtoverlay}>

                <TypoHdBaskerville fsize={9} color='white'>
                    {props.children}
                </TypoHdBaskerville>

                <Hidden smUp>
                    <Box className={classes.contact}>
                        <Box className={classes.contactsocial}>
                            <IconButton aria-label="facebook" href='https://www.facebook.com/HGILL-107645760801933/'>
                                <FacebookIcon fontSize="large" style={{ margin: 0, color: blue[700] }} />
                            </IconButton>
                            <IconButton aria-label="instagram">
                                <InstagramIcon fontSize="large" style={{ margin: 0, color: pink[900] }} />
                            </IconButton>
                            <IconButton aria-label="twitter">
                                <TwitterIcon fontSize="large" style={{ margin: 0, color: lightBlue[400] }} />
                            </IconButton>
                            <IconButton aria-label="youtube">
                                <YouTubeIcon fontSize="large" style={{ margin: 0, color: red[700] }} />
                            </IconButton>
                        </Box>

                        <Box className={classes.contactphone} >
                            <p>Ph: +1 647 986 7785</p>
                        </Box>
                    </Box>
                </Hidden>



            </Box>

        </Box >

    );
});