import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid2 from '../../components/styles/grids/grid2';
import { Box } from '@material-ui/core';
import * as astyles from '../../components/styles';
import { useAppContext } from '../../lib/userhooks';
import _ from 'lodash';
import theme from '../../theme';




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
       
    },

    banner: astyles.banner(theme),
    centerpanel: astyles.centerpanel(theme),
    center: astyles.center(theme),

}));

const Terms = () => {
    const classes = useStyles();   
    const { pathname } = useLocation();





    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);




    return (
        <Grid2>

            <Box className={classes.bannerpanel} >
                <h3> These are the terms and conditions</h3>
               
            </Box>





        </Grid2 >
    );

}

export default Terms;
