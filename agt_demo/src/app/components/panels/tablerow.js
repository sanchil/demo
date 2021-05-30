import React from 'react';
import { Paper, Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.up('xs')]: {
            flexFlow: 'row wrap',
        },

        display: 'flex',
        flexFlow: 'row wrap',
        flex: '1 1 auto',
        padding: 2,
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        maxWidth: '100%',
        height: props=>props.height||100,

    }
}));


export const PanelRow = (props) => {
    const classes = useStyles(props);

    return (
        <React.Fragment>
            <Box>
                <Paper className={classes.root}>
                    {props.children}
                </Paper>
            </Box>
        </React.Fragment>
    )
}

const useSideHeader = makeStyles(theme => ({
    root: {
        display:'flex',
        flexFlow:'row wrap',
        width:'25%',
        maxWidth:'25%',
        height:'100%',
        borderColor:'3px solid red',


    }
}));

export const PanelSideHeader = (props) => {
    const classes = useSideHeader();
    return (
        <React.Fragment>
            <Box className={classes.root}>
                {props.children}
            </Box>
        </React.Fragment>
    );
}

const usePanelContent = makeStyles(theme => ({
    root: {
        display:'flex',
        flexFlow:'row wrap',
        width:'75%',
        maxWidth:'75%',
        height:'100%',
        borderColor:'3px solid red',


    }
}));

export const PanelContent = (props) => {
    const classes = usePanelContent();
    return (
        <React.Fragment>
            <Box className={classes.root}>
                {props.children}
            </Box>
        </React.Fragment>
    );
}