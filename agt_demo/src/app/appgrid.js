import React, { useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import DenseAppBar, { MobileBar } from './components/appbar';
import Footer from './components/footer';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,

    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const AppGrid = (props) => {
    const classes = useStyles();
    const { pathname } = useLocation();

    console.log('Pathname: ' + pathname);


        return (

            <div className={classes.root}>
                <CssBaseline />              
                <Hidden xsDown>
                    <DenseAppBar />
                </Hidden>
                <Hidden smUp>
                    <MobileBar />
                </Hidden>
                <Grid container >
                    {/**
                     * This is where the router is plugged in. 
                     * This is the main grid app which encompasses the
                     * router app.
                     * Each page component uses a separate GridX component 
                     * for its layout
                    
                    */}
                    {props.children}


                    <Grid item xs={12}>
                        <Footer />
                    </Grid>
                </Grid>
              
            </div>
        );

  //  }


}

export default withWidth()(AppGrid);