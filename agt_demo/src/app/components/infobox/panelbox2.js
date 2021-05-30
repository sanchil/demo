/**
 * 
 * 
 * 
 * 
 *  
 */

 import React from 'react';
 import Box from '@material-ui/core/Box';
 import Paper from '@material-ui/core/Paper';

 import Typography from '@material-ui/core/Typography';
 import Button from '@material-ui/core/Button';
 import { useLocation, useHistory } from 'react-router-dom';
 import { makeStyles } from '@material-ui/core/styles';
 
 
 import { TypoHdMerriweather } from '../styles/styledcomponents';
 import * as astyles from '../styles';
 
 
 const useStyles = makeStyles(theme => ({
   
     panel: astyles.panel(theme),
     panel1: astyles.panel1(theme),
 
 
 }));
 
 
 const InfoBox2 = (props) => {
        
     const classes = useStyles();
     const history = useHistory();
   
     return (
        <Box className={classes.panel}>
        <Paper className={classes.panel1} elevation={3}>
          {props.children}
          </Paper>
      </Box>
     );
 }
 
 export default InfoBox2