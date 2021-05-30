import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Box, Container, Typography } from '@material-ui/core';
import theme from '../../theme';


const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.up('xs')]:{
            height: 300,

        },
        [theme.breakpoints.up('md')]:{
            height: 400,
        },
        
        display: 'flex',
        flexFlow: 'row wrap',
        flex: '1 1 auto',
        justifyContent:'space-around',
        alignItems:'center',
        alignContent:'center',
        width: '100%',
        maxWidth: '100%',
       // border:'1px solid red',
      

    }
}));


export const CenterPanel = (props) => {
    const classes = useStyles();
    return (
        <Container className={classes.root}>
          {props.children}
        </Container>

    );
}