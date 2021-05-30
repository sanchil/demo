import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Typography, Link } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import theme from '../../theme';
import { purple, grey } from '@material-ui/core/colors';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { StyledTextField } from '../datacomponents/inputcomponents';

const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.up('xs')]: {
            flexFlow: 'column nowrap',
            height: 1200,
            padding: '20px 5px 20px',
        },
        [theme.breakpoints.up('md')]: {
            flexFlow: 'row wrap',
            height: 450,
            padding: 20,
        },

        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'center',

        width: '100%',
        maxWidth: '100%',
        backgroundColor: grey[800],

    },
    contentbox: {
        [theme.breakpoints.up('xs')]: {
            flexFlow: 'column wrap',
            flex: '98%',
            width: '98%',
            maxWidth: '98%',
            height: '33%',
            maxHeight: '33%',
            color: 'white'
        },
        [theme.breakpoints.up('md')]: {
            flexFlow: 'row wrap',
            flex: '33%',
            width: '33%',
            maxWidth: '33%',
            height: '95%',
            maxHeight: '95%'
        },
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'center',
        padding: 20,
        backgroundColor: grey[700],
        //  borderRadius: 15,
    },
    contentboxsection: {
        display: 'flex',
        flexFlow: 'row wrap',
        flex: 'auto',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        width: '90%',
        height: '50%',
   //     border: '2px solid blue'
    },
    ulist: {
        listStyleType: 'none',
        margin: '0px 30px 0px',
        padding:5  
    }

}));

const Footer = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const xsmatches = useMediaQuery(theme.breakpoints.up('xs'));
    const smmatches = useMediaQuery(theme.breakpoints.up('sm'));

    const preventDefault = event => event.preventDefault();



    return (
        <Box className={classes.root}>
            <Paper className={classes.contentbox}>

                <Box className={classes.contentboxsection}>
                    <Typography variant="h6" display="block" gutterBottom style={{ width: '100%' }}>
                        Site Map
                    </Typography>
                    <ul className={classes.ulist}>

                        <li>
                            <Link href="/buy" color="inherit">
                                Buy
                            </Link>

                        </li>
                        <li>
                            <Link href="/sell" color="inherit">
                                Sell
                            </Link>

                        </li>
                        <li>
                            <Link href="/tools" color="inherit">
                                Tools
                            </Link>

                        </li>
                        <li>
                            <Link href="/contact" color="inherit">
                                Contact Us
                            </Link>

                        </li>
                        <li>
                            <Link href="/about" color="inherit">
                                About Me
                            </Link>

                        </li>
                    </ul>

             
                    <ul className={classes.ulist}>

                        <li>Buy</li>
                        <li>Sell</li>
                        <li>Tools</li>
                        <li>Contact Us</li>
                        <li>About Me</li>

                    </ul>

                </Box>
           

                <Box className={classes.contentboxsection}>
                    <Typography variant="h6" display="block" gutterBottom style={{ width: '100%' }}>
                        News and Blogs
                    </Typography>
                    <ul className={classes.ulist}>
                        <li>Buy</li>
                        <li>Sell</li>
                        <li>Tools</li>
                        <li>Contact Us</li>
                        <li>About Me</li>
                    </ul>
                
                    <ul className={classes.ulist}>

                        <li>Buy</li>
                        <li>Sell</li>
                        <li>Tools</li>
                        <li>Contact Us</li>
                        <li>About Me</li>
                    </ul>
                </Box>
               
            </Paper>



            <Paper className={classes.contentbox}>
                <Box className={classes.contentboxsection}>
                    <Typography variant="h6" display="block" gutterBottom style={{ width: '100%' }}>
                        Blog
                    </Typography>
                    <ul className={classes.ulist}>
                        
                        <li>Buy</li>
                        <li>Sell</li>
                        <li>Tools</li>
                        <li>Contact Us</li>
                        <li>About Me</li>
                    </ul>
          
                    <ul className={classes.ulist}>
                        
                        <li>Buy</li>
                        <li>Sell</li>
                        <li>Tools</li>
                        <li>Contact Us</li>
                        <li>About Me</li>
                    </ul>
                </Box>
               
                <Box className={classes.contentboxsection}>
                    <Typography variant="h6" display="block" gutterBottom style={{ width: '100%' }}>
                        Subscription
                    </Typography>
                    <ul className={classes.ulist}>
                        
                        <li>Buy</li>
                        <li>Sell</li>
                        <li>Tools</li>
                        <li>Contact Us</li>
                        <li>About Me</li>
                    </ul>
                 
                    <ul className={classes.ulist}>
                    
                        <li>Buy</li>
                        <li>Sell</li>
                        <li>Tools</li>
                        <li>Contact Us</li>
                        <li>About Me</li>
                    </ul>
                </Box>
               
            </Paper>

            <Paper className={classes.contentbox}>
                <Box className={classes.contentboxsection}>
                    <Typography variant="h6" display="block" gutterBottom style={{ width: '100%' }}>
                        &nbsp;
                    </Typography>

                

                </Box>
              
                <Box className={classes.contentboxsection}>
                    <Typography variant="h6" display="block" gutterBottom style={{ width: '100%' }}>
                        &nbsp;
                    </Typography>
                 

                </Box>
         
            </Paper>
        </Box >
    );
}

export default Footer;