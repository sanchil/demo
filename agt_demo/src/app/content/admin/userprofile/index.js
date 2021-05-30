import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid2 from '../../../components/styles/grids/grid2';
import { Box, Paper, Button } from '@material-ui/core';


import { MainPanel } from '../../../components/panels/panel3';
import theme from '../../../../theme';
import { useMediaProp } from '../../../lib/userhooks';
//import { panel, panel1, bannerpanel, banner, centerpanel, center } from '../../components/styles';
import * as astyles from '../../../components/styles';
import Alert from '../../../components/snacks';
import { TextF } from '../../../components/datacomponents/inputcomponents';
import { purple } from '@material-ui/core/colors';
import { useAppContext } from '../../../lib/userhooks';

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
    bannerpanel: astyles.bannerpanel(theme),
    banner: {
        ...astyles.banner(theme),
        [theme.breakpoints.up('xs')]: {
            height: 450,
        },
        [theme.breakpoints.up('sm')]: {

            height: 500,
        },
        [theme.breakpoints.up('md')]: {

            height: 500,
        },
    },
    centerpanel: astyles.centerpanel(theme),
    panel: astyles.panel(theme),
    panel1: astyles.panel1(theme),
    center: {
        ...astyles.center(theme),
        [theme.breakpoints.up('xs')]: {
            margin: 3,
            padding: '5px 5px 5px 10px',
            height: 450,
        },
    },
    resultbox: {
        [theme.breakpoints.up('xs')]: {
            width: '80%',
            height: '48%',
        },
        [theme.breakpoints.up('md')]: {
            width: '40%',
            height: '90%',
        },
        boxSizing: 'border-box',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        flex: '1 1 auto',


        margin: 5,
        padding: '10px 10px 10px 30px',
        borderRadius: 10,
    },
    summarybox: {
        [theme.breakpoints.up('xs')]: {
            height: '30%',
        },
        [theme.breakpoints.up('md')]: {
            height: '48%',
        },
        boxSizing: 'border-box',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'flex-start',
        flex: '1 1 auto',
        width: '98%',
        margin: 10,
        padding: '20px 20px 20px 50px',
        borderRadius: 10,

    }
}));

const UserProfile = () => {
    const classes = useStyles();
    const { appstate, dispatch } = useAppContext();

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);


    return (
        <Grid2>

            <Box className={classes.bannerpanel} >
                <Paper className={classes.banner} elevation={3}>
                    <MainPanel elevation={0} height={500} justifyContent="space-around" alignItems="center">
                        <SideMenu>
                            <Button onClick={() => dispatch({ type: 'VIEWPROFILE', data: 'profile' })}>My Profile</Button>
                            <Button onClick={() => dispatch({ type: 'VIEWPROFILE', data: 'security' })}>Security</Button>
                            <Button onClick={() => dispatch({ type: 'VIEWPROFILE', data: 'homeshortlist' })}>Homes Short Listed</Button>
                            <Button onClick={() => dispatch({ type: 'VIEWPROFILE', data: 'workouts' })}>My work outs</Button>
                        </SideMenu>
                        <Content width='78%'>
                            <ProfileDetail />

                        </Content>


                    </MainPanel>


                </Paper>
            </Box>

            <Box className={classes.centerpanel} >
                <Paper className={classes.center} elevation={3}>



                </Paper>
            </Box>


            <Box className={classes.panel}>
                <Paper className={classes.panel1} elevation={3}>
                    One
                </Paper>
            </Box>
            <Box className={classes.panel}>
                <Paper className={classes.panel1} elevation={3}>
                    Two
          </Paper>
            </Box>
            <Box className={classes.panel}>
                <Paper className={classes.panel1} elevation={3}>
                    Three
          </Paper>
            </Box>
            <Box className={classes.panel}>
                <Paper className={classes.panel1} elevation={3}>
                    four
          </Paper>
            </Box>
            <Box className={classes.panel}>
                <Paper className={classes.panel1} elevation={3}>
                    Five
          </Paper>
            </Box>
            <Box className={classes.panel}>
                <Paper className={classes.panel1} elevation={3}>
                    Six
          </Paper>
            </Box>

        </Grid2>
    );

}

export default UserProfile;



const useSideMenuStyles = makeStyles(theme => ({
    root: {

        display: 'flex',
        flexFlow: 'column wrap',
        width: '20%',
        maxWidth: '20%',
        height: '98%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        borderRadius: 20,
        margin: 'none',
        backgroundColor: purple[50],
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
        [theme.breakpoints.up('xs')]: {
            width: '100%',
            maxWidth: '100%',
            height: '80%',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        },
        [theme.breakpoints.up('sm')]: {
            width: '100%',
            maxWidth: '100%',
            height: '80%',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            //    backgroundImage: `url(${calculator})`,
            backgroundSize: 'cover',
        },
        [theme.breakpoints.up('md')]: {
            width: props => props.width,
            maxWidth: props => props.width,
            height: '98%',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            //   backgroundImage: `url(${calculator})`,
            backgroundSize: 'cover',
        },

        boxSizing: 'border-box',
        display: 'flex',
        flexFlow: 'row wrap',
        flex: 'auto',
        border: '1px solid purple[300]',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: purple[300],
        borderRadius: 20,
        margin: 'none',
        padding: '10px 10px 10px 40px',



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

const useProfileStyles = makeStyles(theme => ({
    root: {}


}
));


export const ProfileDetail = () => {
    const classes = useProfileStyles();
    const { appstate, dispatch } = useAppContext();
    console.log('UID details: ' + JSON.stringify(appstate.user.uid));
    switch (appstate.viewprofile.view) {
        case 'profile': {
            return (
                <Box>
                    <p>Profile</p>

                    <table>
                        <tbody>

                            <tr>
                                <td>First Name</td>
                                <td>{}</td>

                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td>{}</td>

                            </tr>
                            <tr>
                                <td>Email Id</td>
                                <td>{}</td>

                            </tr>
                            <tr>
                                <td>Phone No</td>
                                <td>{}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>{}</td>
                            </tr>
                        </tbody>
                    </table>
                </Box>
            );
        }
        case 'security': {
            return (
                <Box>
                    <p>Security</p>
                </Box>
            );
        }
        case 'homeshortlist': {
            return (
                <Box>
                    <p>Homes ShortListed</p>
                </Box>
            );
        }
        case 'workouts': {
            return (
                <Box>
                    <p>Workouts</p>
                </Box>
            );
        }
        default: {
            return (
                <Box>
                    <p>Default</p>
                </Box>
            );

        }

    }



}


