import React, { userEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';
import { TextF } from '../../../components/datacomponents/inputcomponents';
//import { animated, useTransition } from 'react-spring';
import styled from 'styled-components';

const useStyles = makeStyles(theme => ({
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
        opacity: 1.0,
        transition: 'width 2s height 2s',
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
    },

    "@keyframes anim1": {

    }

}))

//const FormBox = animated(Box);

const FormBox = Box;

const RegisterForm = (props) => {
    const classes = useStyles();

    /* const transitions = useTransition(!props.submitted, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    } */

    /*     return transitions.map(({item,key,props1})=>
            item
            ?
            (<FormBox className={classes.formbox} style={props1}>
                
                <Box className={classes.formsection} >
                    <Box className={classes.formheader}>
                        User Id
                    </Box>
                    <Box className={classes.formcontent} >
                        <TextF
                            type="email"
                            label="Email Id: This will be your user id"
                            width="72%"
                            onChange={props.handleChange('email')} required />
                        <TextF
                            type="password"
                            label="Password"
                            width="35%"
                            onChange={props.handleChange('pwd')} required />
                        <TextF
                            type="password"
                            label="Pls re-enter the same password"
                            width="35%"
                            onChange={props.handleChange('pwd1')} required />
    
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
                            onChange={props.handleChange('fname')} />
                        <TextF
                            label="Last Name"
                            width="35%"
                            onChange={props.handleChange('lname')} />
                        <TextF
                            label="Phone"
                            width="72%"
                            onChange={props.handleChange('phone')} />
    
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
                            <Button onClick={props.handleSubmit}>Submit</Button>
                            <Button>Reset</Button>
                        </Box>
    
                    </Box>
                </Box>
                </FormBox>)
            :
            (<div>
                Thank you for submitting the form !!;
            </div>)
            
            );
    
     */

    if (!props.submitted) {
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
                            onChange={props.handleChange('email')} required />
                        <TextF
                            type="password"
                            label="Password"
                            width="35%"
                            onChange={props.handleChange('pwd')} required />
                        <TextF
                            type="password"
                            label="Pls re-enter the same password"
                            width="35%"
                            onChange={props.handleChange('pwd1')} required />

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
                            onChange={props.handleChange('fname')} />
                        <TextF
                            label="Last Name"
                            width="35%"
                            onChange={props.handleChange('lname')} />
                        <TextF
                            label="Phone"
                            width="72%"
                            onChange={props.handleChange('phone')} />

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
                            <Button onClick={props.handleSubmit}>Submit</Button>
                            <Button>Reset</Button>
                        </Box>

                    </Box>
                </Box>
            </Box>
        );
    } else {
        return (<div>
            Thank you for submitting the form !!;
        </div>);

    }


}

export default RegisterForm;
