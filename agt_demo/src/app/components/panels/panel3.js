import React from 'react';
import PropTypes from 'prop-types';

import {  Paper} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useMainStyles = makeStyles(theme => ({
    root: {
       
        [theme.breakpoints.up('xs')]: {
            flexFlow: 'column wrap',
            height: props=>props.height+100,
            justifyContent: 'center',
            alignItems: 'center', 
        
        },
        [theme.breakpoints.up('sm')]: {
            flexFlow: 'column wrap',
            height: props=>props.height+100,
            justifyContent: 'center',
            alignItems: 'center', 
        },
        [theme.breakpoints.up('md')]: {
            flexFlow: 'row wrap',
            height: props=>props.height,
            justifyContent: 'space-around',
            alignItems: 'center', 
        },    

        boxSizing:'border-box',
        display: 'flex',        
        flex: 'auto',           
        width: '100%',
        padding:20,
   //     border:'3px solid blue'
    

    }
}));

export const MainPanel = (props) => {
    const classes = useMainStyles(props);
    return (
        <React.Fragment>
           
            <Paper
                elevation={props.elevation}
                className={classes.root}
            >

                {props.children}

            </Paper>

        </React.Fragment>
    );
}


const useHeaderStyles = makeStyles(theme=>({
    root: {
     
        [theme.breakpoints.up('xs')]: {
            flexFlow: 'column wrap',
            height: props=>props.height - 20,
        
        },
        [theme.breakpoints.up('sm')]: {
            flexFlow: 'column wrap',
            height:  props=>props.height - 20,
         
        },
        [theme.breakpoints.up('md')]: {
            flexFlow: 'row wrap',
            height:  props=>props.height,
           
        },
        [theme.breakpoints.up('lg')]: {
            flexFlow: 'row wrap',
            height: props=>props.height,
          
            
        },


        display: 'flex',        
        flex: 'auto',
        justifyContent: 'space-around',
        alignItems: 'center',       
        width: '100%',
        maxWidth:'100%',
        padding: theme.spacing(2),
      
        

    }
}));

export const HeaderPanel = (props) => {
    const classes = useHeaderStyles(props);
    return (
        <React.Fragment>
           
            <Paper
                elevation={props.elevation}
                className={classes.root}
            >
                {props.children}

            </Paper>

        </React.Fragment>
    );
}

const useSidePanelStyles = makeStyles(theme=>({
    root: {
        [theme.breakpoints.down('xs')]: {
            flexFlow: 'column wrap',
            height: 150,
        },
        [theme.breakpoints.up('xs')]: {
            flexFlow: 'column wrap',
            height: 150,
        },
        [theme.breakpoints.up('sm')]: {
            flexFlow: 'column wrap',
            height: 180,
        },
        [theme.breakpoints.up('md')]: {
            flexFlow: 'row wrap',
            height: 200,
        },
        [theme.breakpoints.up('lg')]: {
            flexFlow: 'row wrap',
            height: 200,
        },


        display: 'flex',        
        flex: 'auto',
        justifyContent: 'space-around',
        alignItems: 'center',       
        width: '100%',
        padding: theme.spacing(2),
        textAlign: 'center',
        

    }
}));

export const SidePanel = (props) => {
    const classes = useSidePanelStyles();
    return (
        <React.Fragment>
           
            <Paper
                elevation={props.elevation}
                className={classes.root}
            >
                {props.children}

            </Paper>

        </React.Fragment>
    );
}

const useSmallSidePanelStyles = makeStyles(theme=>({
    root: {
        [theme.breakpoints.down('xs')]: {
            flexFlow: 'column wrap',
            height: 1200,
        },
        [theme.breakpoints.up('xs')]: {
            flexFlow: 'column wrap',
            height: 1200,
        },
        [theme.breakpoints.up('sm')]: {
            flexFlow: 'column wrap',
            height: 800,
        },
        [theme.breakpoints.up('md')]: {
            flexFlow: 'row wrap',
            height: 500,
        },
        [theme.breakpoints.up('lg')]: {
            flexFlow: 'row wrap',
            height: 500,
        },


        display: 'flex',        
        flex: 'auto',
        justifyContent: 'space-around',
        alignItems: 'center',       
        width: '100%',
        padding: theme.spacing(2),
        textAlign: 'center',
        

    }
}));

export const SmallSidePanel = (props) => {
    const classes = useStyles();
    return (
        <React.Fragment>
           
            <Paper
                elevation={props.elevation}
                className={classes.root}
            >
                {props.children}

            </Paper>

        </React.Fragment>
    );
}