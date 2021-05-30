import React from 'react';
import { Grid, Box, Container, Typography, Button } from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles';
import theme from '../../../theme';
import { Inp, Sel } from '../inputcomponents';


const useStyles = makeStyles(theme => ({

    formBox: {
        [theme.breakpoints.down('xs')]: {
            flexFlow: 'column nowrap',
       //     backgroundColor:'rgb(230,100,100)'
        },
        [theme.breakpoints.up('xs')]: {
            flexFlow: 'column nowrap',
       //     backgroundColor:'rgb(130,100,10)'
        },
        [theme.breakpoints.up('sm')]: {
            flexFlow: 'row wrap',
         //   backgroundColor:'rgb(30,200,100)'
        },
        [theme.breakpoints.up('md')]: {
            flexFlow: 'row wrap',
         //   backgroundColor: 'rgb(78,47,56)'
        },

        // display: 'flex',
        // flex: 'auto',
        // justifyContent: 'center',
        // alignItems: 'center',
        // alignContent: 'center',
         width: '85%',
         maxWidth: '85%',
         boxSizing:'border-box',
         //border: '2x solid green',
     //    backgroundColor:'rgb(255,200,10)',
         padding:0,
    },



}));

export const FormBox = (props) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <form>
                <Container className={classes.formBox}>
                    {props.children}
                </Container>
            </form>
        </React.Fragment>
    );
}




const useSectionStyles = makeStyles(theme => ({
    formSection: {
        [theme.breakpoints.down('xs')]: {
            flexFlow: 'column nowrap',
            margin: '1px 5px 1px',
       //     backgroundColor: 'rgb(105,200,35)',
        },
        [theme.breakpoints.up('xs')]: {
            flexFlow: 'column nowrap',
            margin: '2px 10px 2px',
       //     backgroundColor: 'rgb(10,200,100)',
        },
        [theme.breakpoints.up('sm')]: {
            flexFlow: 'row nowrap',
            margin: '5px 20px 5px',
     //       backgroundColor: 'rgb(155,90,90)',
        },
        [theme.breakpoints.up('md')]: {
            flexFlow: 'row wrap',
            margin: '20px 100px 20px',
     //       backgroundColor: 'rgb(15,20,90)',
        },


        display: 'flex',
        flex: 'auto',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        width: '100%',
        maxWidth: '100%',
        border: '2x solid grey',

    },

}));

export const FormSection = (props) => {
    const classes = useSectionStyles();
    return (
        <Box className={classes.formSection}>
            {props.children}
        </Box>


    );
}


const useHeaderStyles = makeStyles(theme => ({
    formContentHeader: {
        [theme.breakpoints.down('xs')]: {
            flexFlow: 'column nowrap',
            justifyContent: 'center',
            alignItems: 'space-around',
            flex: '100%',
            width: '100%',
            maxWidth: '100%',
            height: 'auto',
       //     backgroundColor: 'rgb(155,20,35)',
        },
        [theme.breakpoints.up('xs')]: {
            flexFlow: 'column nowrap',
            justifyContent: 'center',
            alignItems: 'space-around',
            flex: '100%',
            width: '100%',
            maxWidth: '100%',
            height: 'auto',
      //      backgroundColor: 'rgb(155,10,100)',
        },
        [theme.breakpoints.up('sm')]: {
            flexFlow: 'row wrap',
            justifyContent: 'flex-start',
            alignItems: 'space-around',
            flex: '20%',
            width: '20%%',
            maxWidth: '20%',
            height: '100%',
       //     backgroundColor: 'rgb(155,100,100)',
        },
        [theme.breakpoints.up('md')]: {
            flexFlow: 'row wrap',
            justifyContent: 'flex-start',
            alignItems: 'space-around',
            flex: '20%',
            width: '20%%',
            maxWidth: '20%',
            height: '100%',
        //    backgroundColor: 'rgb(55,10,10)',
        },

        display: 'flex',
    },
}));

export const FormHeader = (props) => {
    const classes = useHeaderStyles();
    return (
        <Box className={classes.formContentHeader}>
            <Typography variant="h5" gutterBottom>
                {props.children}
            </Typography>
        </Box>
    );

}

const useContentStyles = makeStyles(theme => ({
    formContent: {
        [theme.breakpoints.down('xs')]: {
            flexFlow: 'column nowrap',
            justifyContent: 'space-around',
            alignItems: 'center',
            flex: '100%',
            width: '100%',
            maxWidth: '100%',
            height: 'auto',
        //    backgroundColor: 'rgb(0,100,110)',

        },
        [theme.breakpoints.up('xs')]: {
            flexFlow: 'column nowrap',
            justifyContent: 'space-around',
            alignItems: 'center',
            flex: '100%',
            width: '100%',
            maxWidth: '100%',
            height: 'auto',
        //    backgroundColor: 'rgb(115,200,10)',

        },
        [theme.breakpoints.up('sm')]: {
            flexFlow: 'row wrap',
            justifyContent: 'flex-start',
            alignItems: 'space-around',
            flex: '100%',
            width: '100%',
            maxWidth: '100%',
            height: '100%',
          //  backgroundColor: 'rgb(255,100,10)',
        },
        [theme.breakpoints.up('md')]: {
            flexFlow: 'row wrap',
            justifyContent: 'flex-start',
            alignItems: 'space-around',
            flex: '80%',
            width: '80%',
            maxWidth: '80%',
            height: '100%',
          //  backgroundColor: 'rgb(255,200,10)',
        },

        display: 'flex',
    },

}));

export const FormContent = (props) => {
    const classes = useContentStyles();
    return (
        <Box className={classes.formContent}>
            {props.children}
        </Box>
    );
}


const useControlStyles = makeStyles(theme => ({



    formControlPanel: {
        [theme.breakpoints.down('xs')]: {
            flexFlow: 'column nowrap',
            justifyContent: 'space-around',
            alignItems: 'center',
            flex: '100%',
            width: '100%',
            maxWidth: '100%',
            height: 'auto',
        },
        [theme.breakpoints.up('xs')]: {
            flexFlow: 'column nowrap',
            justifyContent: 'space-around',
            alignItems: 'center',
            flex: '100%',
            width: '100%',
            maxWidth: '100%',
            height: 'auto',
        },
        [theme.breakpoints.up('sm')]: {
            flexFlow: 'row wrap',
            justifyContent: 'flex-end',
            alignItems: 'center',
            flex: '93%',
            width: '93%',
            maxWidth: '93%',
            height: '100%',
        },
        [theme.breakpoints.up('md')]: {
            flexFlow: 'row wrap',
            justifyContent: 'flex-end',
            alignItems: 'center',
            flex: '93%',
            width: '93%',
            maxWidth: '93%',
            height: '100%',
        },

        display: 'flex',
        //   backgroundColor: 'rgb(100,255,100)',
    },



}));

export const FormControlPanel = (props) => {
    const classes = useControlStyles();
    return (
        <Box className={classes.formControlPanel}>

            {props.children}

        </Box>
    );
}








