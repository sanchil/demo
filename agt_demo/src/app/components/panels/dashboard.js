import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { purple } from '@material-ui/core/colors';
import {MainPanel} from './panel3';
import {AppContext} from '../../data/states/appcntxt';



const useSideMenuStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems:'flex-start',
        flex: '18%',
        width: '18%',
        maxWidth: '18%',
        height: '98%',
        backgroundColor: purple[50],
        borderRadius: 20,
        margin: 'none',
        paddingTop: 30,
    }
}));

export const SideMenu = (props) => {
    const classes = useSideMenuStyles();
    return (
        <React.Fragment>
            <Box className={classes.root}>
                {props.children}
            </Box>

        </React.Fragment>
    );

}

const useContentStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexFlow: 'row wrap',
        flex: props=>props.width,
        width: props=>props.width,
        maxWidth: props=>props.width,
        height: '98%',
        //   backgroundColor:purple[300],
        border: '1px solid purple[300]',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: purple[300],
        borderRadius: 20,
        margin: 'none',
        padding: '20px 20px 20px 40px',


    }
}));

export const Content = (props) => {
    const classes = useContentStyles(props);
   
    return (
        <React.Fragment>
            <Box className={classes.root}>
                {props.children}
            </Box>

        </React.Fragment>
    );

}



export const DashBoard = (props) => {
    const {appstate,dispatch} = useContext(AppContext);
   
    return (
        <MainPanel elevation={0} height={500} justifyContent="space-around" alignItems="center">

            <SideMenu>
                <Button onClick={() => dispatch({ type: "LTR" })}>Land Transfer Tax</Button>
                <Button onClick={() => dispatch({ type: "ML" })}>Monthly Payments</Button>
                <Button onClick={() => dispatch({ type: "MAC" })}>Affordability-Calculator</Button>
                <Button onClick={() => dispatch({ type: "CMHC" })}>CMHC-Calculator</Button>


            </SideMenu>

            <Content width='78%'>
               {props.content}
            </Content>

        </MainPanel>
    );
}

