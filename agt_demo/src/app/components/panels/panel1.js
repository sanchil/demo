import React from 'react';
import PropTypes from 'prop-types';

import {  Paper} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.down('xs')]: {
            flexFlow: 'column wrap',
            height: 1200,
        },
        [theme.breakpoints.up('sm')]: {
            flexFlow: 'column wrap',
            height: 1100,
        },
        [theme.breakpoints.up('md')]: {
            flexFlow: 'row wrap',
            height: 900,
        },
        [theme.breakpoints.up('lg')]: {
            flexFlow: 'row wrap',
            height: 400,
        },


        display: 'flex',        
        flex: 'auto',
        justifyContent: 'space-around',
        alignItems: 'center',       
        width: '100%',
        padding: theme.spacing(2),
        textalign: 'center',
        //  border: '5px solid red',

    }
}));

const Panel1 = (props) => {
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


export default Panel1;