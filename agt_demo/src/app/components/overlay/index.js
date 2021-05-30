import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import theme from '../../theme';
import { AppContext } from '../../state/appcntxt';
import * as astyles from '../styles';

const useStyles = makeStyles(theme => ({
    root: {
    //    display: open => open ? 'initial' : 'none', // this does not help in getting the element dimentsions
        visibility: open => open ? 'visible' : 'hidden', // this works in getting element dimensions
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        zIndex: 1100
    },
    close: {
        [theme.breakpoints.up('xs')]:{
            right: 1,
            top: 1,
            fontSize: 35,
            fontWeight: 'bold',
        },
        [theme.breakpoints.up('md')]:{
            right: 20,
            top: 10,
            fontSize: 50,
            fontWeight: 'bold',
        },
        position: 'absolute',      
        color: '#f1f1f1',
        '&:hover': {
            color: '#f44336',
            cursor: 'pointer',
        },
        '&:focus': {
            color: '#f44336',
            cursor: 'pointer',
        }
    },
    container: {
        ...astyles.rowstyle(theme),
        width:'100%',
        height:'100%',
       

    }


}));

const OverLay = (props) => {

    const { appstate, dispatch } = useContext(AppContext);
    const classes = useStyles(appstate.overlay.open);
    return (
        <Box className={classes.root}>
            <span
                title="Close Modal"
                className={classes.close}
                onClick={() => dispatch({ type: 'OVERLAY', data: false })}>
                &times;
                    </span>
            <Box    className={classes.container}>
                {props.children}
            </Box>


        </Box>
    );
}
export default OverLay;