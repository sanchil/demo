import React from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Paper } from '@material-ui/core';
import theme from '../../theme';




const useStyles = makeStyles(theme => ({
  
  root: {
    [theme.breakpoints.down('xs')]: {
      flexFlow: 'column wrap',
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      height: 600,
    },
    [theme.breakpoints.up('xs')]: {
      flexFlow: 'column wrap',
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      height: 600,
    },
    [theme.breakpoints.up('sm')]: {
      flexFlow: 'column wrap',
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      height: 600,
    },
    [theme.breakpoints.up('md')]: {
      flexFlow: 'row wrap',
      justifyContent: "center",
      alignContent: "flex-start",
      alignItems: "center",
      height: 350,
    },
    [theme.breakpoints.up('lg')]: {
      flexFlow: 'row wrap',
      justifyContent: "center",
      alignContent: "flex-start",
      alignItems: "center",
      height: 350,
    },


    display: 'flex',
    flex: 'auto',
    padding: theme.spacing(2),
    textAlign: 'center',
    width: '100%',
    maxWidth: '100%',
    backgroundColor:'rgb(255,100,20)',
  },

  boxcontent: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '50%',
      backgroundColor: 'rgb(225,255,0)',
    },
    [theme.breakpoints.up('sm')]: {
      width: '75%',
      height: '100%',
      backgroundColor: 'rgb(225,255,0)',
    },

   
  },
  boxlabel: {
    width: '100%',
    height: '30%',
    backgroundColor: 'rgb(22,255,29)',
  },
  boxpix: {
    width: '100%',
    height: '70%',
    backgroundColor: 'rgb(100,255,89)',
  },
  boxcard: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '50%',
      backgroundColor: 'rgb(225,255,0)',
    },
    [theme.breakpoints.up('sm')]: {
      width: '20%',
      height: '100%',
      backgroundColor: 'rgb(22,255,255)',
    },
  
  }


}));

export const Testimonial = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
     <Paper elevation={0}>
        <Box className={classes.root} >

          {props.children}

        </Box>
        </Paper>
      
    </React.Fragment>
  );
}



export const TestimonialContent = (props) => {

  const classes = useStyles();
  return (
    <React.Fragment>
      <Box className={classes.boxcontent}>
        {props.children}
      </Box>
    </React.Fragment>
  );
}

export const TestimonialCard = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>

      <Box className={classes.boxcard}>
        <Box className={classes.boxpix}>
          {props.pic}
        </Box>
        <Box className={classes.boxlabel}>
          {props.label}
        </Box>
      </Box>
    </React.Fragment>
  );
}

