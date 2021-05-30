import React, { useEffect, useState, createRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid5 from '../../../components/grids/grid5';
import { Box, Paper, Typography, Button } from '@material-ui/core';
import theme from '../../../theme';
import * as astyles from '../../../components/styles';
import { blue, yellow, amber } from '@material-ui/core/colors';
import { AppContext } from '../../../state/appcntxt';
import { TextF, Sel, Inp } from '../../../components/datacomponents/inputcomponents';
import qry from '../../../data/db/queries';
import dataObj from '../../../data/db/dbobj';

import { securePwd, getFormattedDate, getFormattedTime } from '../../../lib/utils';
import { useAppContext } from '../../../lib/userhooks';
import Alert from '../../../components/snacks';


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
    headerpanel: astyles.headerpanel(theme),
    header: astyles.header(theme),
    panel: astyles.panel(theme),
    panel1: astyles.panel1(theme),
    bannerpanel: {
        ...astyles.bannerpanel(theme),
        [theme.breakpoints.up('xs')]: {
            margin: '10px 5px 10px',
        },
        [theme.breakpoints.up('sm')]: {
            margin: '15px 10px 15px',
        },
        [theme.breakpoints.up('md')]: {
            margin: '20px 30px 10px',
        },
    },

    banner: {
        ...astyles.banner(theme),
        [theme.breakpoints.up('xs')]: {
            margin: 3,
            padding: '5px 5px 5px 10px',
            height: 800,
        },
        [theme.breakpoints.up('sm')]: {
            margin: 5,
            padding: '10px 10px 10px 25px',
            height: 700,
        },
        [theme.breakpoints.up('md')]: {
            margin: 10,
            padding: '20px 20px 20px 50px',
            height: 600,
        },

    },
    centerpanel: {
        ...astyles.centerpanel(theme),
        [theme.breakpoints.up('xs')]: {
            margin: '10px 5px 10px',
        },
        [theme.breakpoints.up('sm')]: {
            margin: '15px 10px 15px',
        },
        [theme.breakpoints.up('md')]: {
            margin: '20px 30px 10px',
        },
    },
    center: astyles.center(theme),
    content: {

    },
    formbox: {
        boxSizing: 'border-box',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        width: '80%',
        height: '80%',

    },
    formsection: {
        [theme.breakpoints.up('xs')]: {
            flexFlow: 'column wrap',
            //    height: 450,
        },
        [theme.breakpoints.up('md')]: {
            flexFlow: 'row wrap',
            //      height: 200,
        },
        boxSizing: 'border-box',
        display: 'flex',
        flex: 'auto',

        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        width: '80%',
        margin: 'auto',
        //   borderTop: '1px solid grey',
    },
    formheader: {
        [theme.breakpoints.up('xs')]: {
            width: '90%',
            height: '10%',
        },
        [theme.breakpoints.up('md')]: {
            width: '10%',
            height: '90%',
        },
        boxSizing: 'border-box',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',

        //  border: '2px solid green',
    },
    formcontent: {
        [theme.breakpoints.up('xs')]: {
            width: '90%',
            height: '80%',
        },
        [theme.breakpoints.up('md')]: {
            width: '90%',
            height: '90%',
        },
        boxSizing: 'border-box',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        width: '80%',
        height: '90%',
        //    border: '2px solid green',
    },
    formcontrol: {
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        padding: '50px 300px 10px 10px',

        width: '100%',
        margin: 'auto',
        //     border:'1px solid blue',
    }


}));

const Register = (props) => {
    const classes = useStyles();
    const [open, handleAlert] = useState(false);
    const [errmesg, setErrMesg] = useState("");
    const { pathname } = useLocation();
    //  const { appstate, dispatch } = useContext(AppContext);
    const { appstate, dispatch } = useAppContext();

    const regUserData = dataObj.userObj;



    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const validations = (data) => {
        // Check email id

        if (!data.email) {
            return [false, " Please enter your email address !! "];
        }

        // Check first name

        if (!data.fname) {
            return [false, " Please enter the first name !! "];
        }

        // Check last name

        //   if (!data.lname) {
        //       return [false, " Please enter the last name !! "];
        //   }

        // Check phone

        if (!data.phone) {
            return [false, " Please enter your phone number !! "];
        }

        // Check for empty password 

        if (!data.pwd) {
            return [false, " Please enter a password !! "];
        }

        // Check for empty second password

        if (!data.pwd1) {
            return [false, " Please enter the same password one more time !! "];
        }

        // Check password equality
        if (data.pwd !== data.pwd1) {
            return [false, " Please enter matching passwords !! "];
        }

        return [true, ""];
    }

    const handleSubmit = e => {
        try {
            let abortController = new AbortController();
            const dt = new Date();
            //  console.log('formatted date: '+getFormattedDate(dt));
            //   console.log('formatted time: '+getFormattedTime(dt));
            //   let pwd = seregUserData.pwd
            //   let pwd1 = regUserData.pwd1;


            //  regUserData.pwd1 = securePwd(regUserData.pwd1);

            regUserData.type = 'USER';
            regUserData.dataorigin = 'register';
            regUserData.dataflow = 'ADDUSER';
            regUserData.subtype = 'REGUSER';
            regUserData.status = 'active'; // newregister, active, inactive
            regUserData.current = false;
            regUserData.date = getFormattedDate(dt, '/');
            regUserData.time = getFormattedTime(dt, ':');
            regUserData.createDate = getFormattedDate(dt, '/');
            regUserData.createTime = getFormattedTime(dt, ':');


            //     console.log('Secured PWD : ' + regUserData.pwd);
            //     console.log('Secured PWD1 : ' + regUserData.pwd1);

            if (validations(regUserData)[0]) {
                regUserData.pwd = securePwd(regUserData.pwd);
                delete regUserData.pwd1;
                // console.log('User data: '+ JSON.stringify(regUserData));


                /**
                 * qry.addData and qry.getData are generic methods for adding data to pouch db
                 * and must be used hence forth.
                 * 
                 * 
                 *  */

                // qry.addData('types/users','emailid',regUserData, { signal: abortController.signal })
                // .then(res => console.log("User added successfully" + JSON.stringify(res)))
                // .catch(err => console.log('Error adding user : >>> ' + err[1].message)); 


                qry.addUser(regUserData, { signal: abortController.signal })
                    .then(res => console.log("User added successfully" + JSON.stringify(res)))
                    .catch(err => {
                        console.log('Error adding user : >>> ' + err[1].message);
                        throw new Error(err[1].message);
                    });
            } else {
                abortController.abort();
                throw new Error(validations(regUserData)[1]);
            }

        } catch (err) {
            console.log("Exception occured adding user: " + ':: ' + errmesg + '::' + err.message);
            setErrMesg(err.message);
            handleAlert(true);

        }

    }

    const handleChange = inp => e => {

        regUserData[inp] = e.target.value;

        //    console.log('form data: ' + JSON.stringify(regUserData));
    }

    const handleAddrChange = inp => e => {

        regUserData.addr[inp] = e.target.value;

        //    console.log('form data: ' + JSON.stringify(regUserData));
    }


    return (
        <Grid5>
            <Box className={classes.headerpanel}>
                <Paper className={classes.header} elevation={3}>
                    <Typography variant="h5" gutterBottom>
                        List your property with us and find access to our unique group of buyers.
                        We will help you maximize your returns.
                    </Typography>
                </Paper>
            </Box>
            <Box className={classes.bannerpanel} >

                <Paper className={classes.banner} elevation={3} >

                    <Box className={classes.formbox}>
                        <Box className={classes.formsection} >
                            <Box className={classes.formheader}>
                                User Id
                            </Box>
                            <Box className={classes.formcontent} >
                                <TextF
                                    type="email"
                                    label="Email Id: This will be your user id"
                                    width="72%"
                                    onChange={handleChange('email')} required />
                                <TextF
                                    type="password"
                                    label="Password"
                                    width="35%"
                                    onChange={handleChange('pwd')} required />
                                <TextF
                                    type="password"
                                    label="Pls re-enter the same password"
                                    width="35%"
                                    onChange={handleChange('pwd1')} required />

                            </Box>
                        </Box>
                        <Box className={classes.formsection}>
                            <Box className={classes.formheader}>
                                Details
                            </Box>
                            <Box className={classes.formcontent}>

                                <TextF
                                    label="First Name"
                                    width="35%"
                                    onChange={handleChange('fname')} />
                                <TextF
                                    label="Last Name"
                                    width="35%"
                                    onChange={handleChange('lname')} />
                                <TextF
                                    label="Phone"
                                    width="72%"
                                    onChange={handleChange('phone')} />

                            </Box>
                        </Box>
                        <Box className={classes.formsection}>
                            <Box className={classes.formheader}>
                                Address
                            </Box>
                            <Box className={classes.formcontent}>
                                <TextF label="Unit No" width="10%" onChange={handleAddrChange('unitno')} />
                                <TextF label="Street No" width="10%" onChange={handleAddrChange('stno')} />
                                <TextF label="Street Name" width="48%" onChange={handleAddrChange('stname')} />
                                <TextF label="City" width="50%" onChange={handleAddrChange('city')} />
                                <TextF label="Zip" width="20%" onChange={handleAddrChange('zip')} />
                                <TextF label="Province" width="45%" onChange={handleAddrChange('province')} />
                                <TextF label="Country" width="25%" onChange={handleAddrChange('country')} />
                            </Box>
                        </Box>


                        <Box className={classes.formsection}>
                            <Box className={classes.formheader}>

                            </Box>
                            <Box className={classes.formcontent}>
                                <Box className={classes.formcontrol}>
                                    <Button onClick={handleSubmit}>Submit</Button>
                                    <Button>Reset</Button>
                                </Box>

                            </Box>
                        </Box>
                    </Box>

                </Paper>

            </Box>

            <Box className={classes.centerpanel} >

                <Paper className={classes.center} elevation={3}>
                    <Box className={classes.content}>
                        <div>
                            Why Register? <br />

                        </div>
                        <div>Why me</div>
                        <div>ok</div>



                    </Box>
                </Paper>
            </Box>



            <Box className={classes.panel}>
                <Paper className={classes.panel1} elevation={3}>

                    <Alert open={open} handleClose={() => handleAlert(false)}>
                        <p>{errmesg}</p>
                    </Alert>


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
            <Box className={classes.panel}>
                <Paper className={classes.panel1} elevation={3}>
                    Seven
          </Paper>
            </Box>


        </Grid5>
    );


}

export default Register;


const useFormStyles = makeStyles(theme=>({
    formbox: {
        boxSizing: 'border-box',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        width: '80%',
        height: '80%',

    },
    formsection: {
        [theme.breakpoints.up('xs')]: {
            flexFlow: 'column wrap',
            //    height: 450,
        },
        [theme.breakpoints.up('md')]: {
            flexFlow: 'row wrap',
            //      height: 200,
        },
        boxSizing: 'border-box',
        display: 'flex',
        flex: 'auto',

        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        width: '80%',
        margin: 'auto',
        //   borderTop: '1px solid grey',
    },
    formheader: {
        [theme.breakpoints.up('xs')]: {
            width: '90%',
            height: '10%',
        },
        [theme.breakpoints.up('md')]: {
            width: '10%',
            height: '90%',
        },
        boxSizing: 'border-box',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',

        //  border: '2px solid green',
    },
    formcontent: {
        [theme.breakpoints.up('xs')]: {
            width: '90%',
            height: '80%',
        },
        [theme.breakpoints.up('md')]: {
            width: '90%',
            height: '90%',
        },
        boxSizing: 'border-box',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        width: '80%',
        height: '90%',
        //    border: '2px solid green',
    },
    formcontrol: {
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        padding: '50px 300px 10px 10px',

        width: '100%',
        margin: 'auto',
        //     border:'1px solid blue',
    }

}))

const RegisterForm = (props) => {
    const classes = useStyles();
    let submitted = false;

    if(!submitted){
        return (
            <Box className={classes.formbox}>
                <Box className={classes.formsection} >
                    <Box className={classes.formheader}>
                        User Id
                </Box>
                    <Box className={classes.formcontent} >
                        <TextF
                            type="email"
                            label="Email Id: This will be your user id"
                            width="72%"
                            onChange={handleChange('email')} required />
                        <TextF
                            type="password"
                            label="Password"
                            width="35%"
                            onChange={handleChange('pwd')} required />
                        <TextF
                            type="password"
                            label="Pls re-enter the same password"
                            width="35%"
                            onChange={handleChange('pwd1')} required />
    
                    </Box>
                </Box>
                <Box className={classes.formsection}>
                    <Box className={classes.formheader}>
                        Details
                </Box>
                    <Box className={classes.formcontent}>
    
                        <TextF
                            label="First Name"
                            width="35%"
                            onChange={handleChange('fname')} />
                        <TextF
                            label="Last Name"
                            width="35%"
                            onChange={handleChange('lname')} />
                        <TextF
                            label="Phone"
                            width="72%"
                            onChange={handleChange('phone')} />
    
                    </Box>
                </Box>
                <Box className={classes.formsection}>
                    <Box className={classes.formheader}>
                        Address
                </Box>
                    <Box className={classes.formcontent}>
                        <TextF label="Unit No" width="10%" onChange={props.handleAddrChange('unitno')} />
                        <TextF label="Street No" width="10%" onChange={props.handleAddrChange('stno')} />
                        <TextF label="Street Name" width="48%" onChange={props.handleAddrChange('stname')} />
                        <TextF label="City" width="50%" onChange={props.handleAddrChange('city')} />
                        <TextF label="Zip" width="20%" onChange={props.handleAddrChange('zip')} />
                        <TextF label="Province" width="45%" onChange={props.handleAddrChange('province')} />
                        <TextF label="Country" width="25%" onChange={props.handleAddrChange('country')} />
                    </Box>
                </Box>
    
    
                <Box className={classes.formsection}>
                    <Box className={classes.formheader}>
    
                    </Box>
                    <Box className={classes.formcontent}>
                        <Box className={classes.formcontrol}>
                            <Button onClick={handleSubmit}>Submit</Button>
                            <Button>Reset</Button>
                        </Box>
    
                    </Box>
                </Box>
            </Box>
    }else{

    }
    
    );
} 