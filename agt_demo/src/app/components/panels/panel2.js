import React from 'react';
import PropTypes from 'prop-types';

import {  Paper} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.down('xs')]: {
            flexFlow: 'column wrap',
            height: 240,
        },
        [theme.breakpoints.up('xs')]: {
            flexFlow: 'column wrap',
            height: 260,
        },
        [theme.breakpoints.up('sm')]: {
            flexFlow: 'column wrap',
            height: 280,
        },
        [theme.breakpoints.up('md')]: {
            flexFlow: 'row wrap',
            height: 300,
        },
        [theme.breakpoints.up('lg')]: {
            flexFlow: 'row wrap',
            height: 300,
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

const Panel2 = (props) => {
    const classes = useStyles();
    return (
        <React.Fragment>
           
            <Paper
                elevation={props.elevation}
                className={classes.root}
                style={{height:`${props.height}`}}
               
            >


                {props.children}


            </Paper>



        </React.Fragment>
    );
}


export default Panel2;