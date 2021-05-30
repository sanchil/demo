/**
 * 
 * 
 * 
 * 
 *  
 */

import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useLocation, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


import { TypoHdMerriweather } from '../styles/styledcomponents';


const useStyles = makeStyles(theme => ({


    centerpanelbox: {
        boxSizing: 'border-box',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '30%',
        maxWidth: '30%',
        height: '80%',
        margin: 'auto',
        boxShadow: '0px 0px 25px rgba(200,200,200,0.5)',
        borderRadius: 3,
        backgroundColor: 'rgb(255,255,255)',
    },
    centerpanelboxtop: {
        boxSizing: 'border-box',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '90%',
        maxWidth: '90%',
        height: '40%',
        margin: 'auto',
        borderBottom: "1px solid rgb(200,200,200)",


    },
    centerpanelboxbottom: {
        boxSizing: 'border-box',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '90%',
        maxWidth: '90%',
        height: '60%',
        margin: 'auto',

    },



}));


const InfoBox1 = (props) => {
       
    const classes = useStyles();
    const history = useHistory();
    const pageObjArr = React.Children.toArray(props.children);
    return (
        <Box className={classes.centerpanelbox}>
            <Box className={classes.centerpanelboxtop}>
                <TypoHdMerriweather fsize={2}>
                    {pageObjArr ? pageObjArr[0] : ""}
                </TypoHdMerriweather>
            </Box>
            <Box className={classes.centerpanelboxbottom}>
                <Typography display="block" variant="body1" paragraph gutterBottom>
                    {pageObjArr ? pageObjArr[1] : ""}
                </Typography>
                <Button variant="contained" color="primary" onClick={() => history.push(props.link)}>
                    {props.button?props.button:"Button"}
                </Button>
            </Box>
        </Box>
    );
}

export default InfoBox1