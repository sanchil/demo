import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid2 from '../../components/grids/grid2';
import { Box, Paper } from '@material-ui/core';
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
    bannerHeader: {
        boxSizing: 'border-box',
        flexGrow: 1,
        width: '100%',
        height: 60,
    },

    bannerpanel: {
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 'auto',
        padding: 20,
        marginTop: 50,
    },
    centerpanel: {
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20,
        flex: 'auto'
    },
    panel: {
        boxSizing: 'border-box',
        flexGrow: 1,
        padding: 20,
    },
    panel1: {
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

    panel2: {
        boxSizing: 'border-box',
        display: 'flex',
        flexFlow: 'row wrap',
        flex: 'auto',
        width: '90%',
        maxWidth: '90%',
        height: 200,
        borderRadius: 15,
        margin: 20,
        padding: '20px 20px 20px 50px'

    },
    banner: {
        boxSizing: 'border-box',
        display: 'flex',
        flexFlow: 'row wrap',
        flex: 'auto',
        width: '100%',
        maxWidth: '100%',
        height: 500,
        borderRadius: 15,
        margin: 20,
        padding: '20px 20px 20px 50px'
    },
    center: {
        boxSizing: 'border-box',
        display: 'flex',
        flexFlow: 'row wrap',
        flex: 'auto',
        width: '100%',
        maxWidth: '100%',
        height: 400,
        borderRadius: 15,
        margin: 20,
        padding: '20px 20px 20px 50px'
    },
}));

const PageTemplate1 = (props) => {
    const classes = useStyles();
    const pageObjArr = React.Children.toArray(props.children);

    return (
        <React.Fragment>
            <Box className={classes.bannerpanel} >

                <Paper className={classes.banner} elevation={3}>
                    {pageObjArr ? pageObjArr[0] : ""}
                </Paper>
            </Box>

            <Box className={classes.centerpanel} >
                <Paper className={classes.center} elevation={3}>
                    {pageObjArr ? pageObjArr[1] : ""}
                </Paper>
            </Box>


            <Box className={classes.panel}>
                <Paper className={classes.panel1} elevation={3}>
                    {pageObjArr ? pageObjArr[2] : ""}
                </Paper>
            </Box>
            <Box className={classes.panel}>
                <Paper className={classes.panel1} elevation={3}>
                    {pageObjArr ? pageObjArr[3] : ""}
                </Paper>
            </Box>
            <Box className={classes.panel}>
                <Paper className={classes.panel2} elevation={3}>
                    {pageObjArr ? pageObjArr[4] : ""}
                </Paper>
            </Box>
            <Box className={classes.panel}>
                <Paper className={classes.panel2} elevation={3}>
                    {pageObjArr ? pageObjArr[5] : ""}
                </Paper>
            </Box>
            <Box className={classes.panel}>
                <Paper className={classes.panel2} elevation={3}>
                    {pageObjArr ? pageObjArr[6] : ""}
                </Paper>
            </Box>

        </React.Fragment>

    );

}

export default PageTemplate1;

