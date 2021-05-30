import React, { useEffect, createRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid5 from '../../../components/grids/grid5';
import { Box, Paper, Typography, Button, InputAdornment } from '@material-ui/core';
import theme from '../../../theme';
import * as astyles from '../../../components/styles';
import { blue, yellow, amber } from '@material-ui/core/colors';
import { AppContext } from '../../../state/appcntxt';
import { TextF, Sel, Inp } from '../../../components/datacomponents/inputcomponents';
import { addHome, addHomeCloud } from '../../../data/db/queries';
import { useMediaProp } from '../../../lib/userhooks';
import { typography } from '@material-ui/system';
import SquareFootIcon from '@material-ui/icons/SquareFoot';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
//import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';
//import cloudinary from 'cloudinary-core';
import {getFormattedDate, getFormattedTime} from '../../../lib/utils';


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
            height: 2000,
        },
        [theme.breakpoints.up('sm')]: {
            margin: 5,
            padding: '10px 10px 10px 25px',
            height: 1650,
        },
        [theme.breakpoints.up('md')]: {
            margin: 10,
            padding: '20px 20px 20px 50px',
            height: 1200,
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
        [theme.breakpoints.up('xs')]: {
            padding: 10,
        },
        [theme.breakpoints.up('sm')]: {

            padding: 50,
        },
        [theme.breakpoints.up('md')]: {
            padding: 50,
        },
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row nowrap',
        justifyContent: 'space-around',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
        margin: 'auto',
        //     border:'1px solid blue',
    }


}));

const RegisterProperty = (props) => {
    const classes = useStyles();

    const { pathname } = useLocation();
    const { appstate, dispatch } = useContext(AppContext);
    const regHomeData = {};
    const regUserData = {};
    const regImgData = {};
    let boolXs = useMediaProp('xs');
    let boolMd = useMediaProp('md');
    let boolSize = (boolXs && boolMd);



    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);


    const handleSubmit = e => {
       
        const dt = new Date();
     //   console.log('formatted date: '+getFormattedDate(dt));
     //   console.log('formatted time: '+getFormattedTime(dt));

        regHomeData.dataorigin = 'registerproperty';
        regHomeData.dataflow = 'LISTHOME';
        regHomeData.subtype = '';
        regHomeData.status = 'newregister'; // newregister, register ,active, sold, inactive
        regHomeData.current = false;
        regHomeData.date = getFormattedDate(dt,'/');
        regHomeData.time = getFormattedTime(dt,':');
        regHomeData.owner = 'owner';
        regHomeData.regby = 'owner'; //owner agent

        addHomeCloud(regHomeData, regImgData)
            .then(res => {
                console.log("Home is created and images uploaded successfully: "+ JSON.stringify(res));
            })
            .catch(err => console.log('Error:: Home is creation failed and images not uploaded :' + err.message)); 
    }

    const handleChange = inp => e => {

        if (e.target.type === 'file') {
            const files = e.target.files;
            regImgData[inp] = files ? files[0] : "";
        } else {
            regHomeData[inp] = e.target.value;
        }
        //  console.log('img data: ' + JSON.stringify(regImgData));
        //  console.log('form data: ' + JSON.stringify(regHomeData));
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
                                    onChange={handleChange('emailid')} />
                                <TextF
                                    type="password"
                                    label="Password"
                                    width="35%"
                                    onChange={handleChange('pwd')} />
                                <TextF
                                    type="password"
                                    label="Pls re-enter the same password"
                                    width="35%"
                                    onChange={handleChange('pwd1')} />

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
                                <TextF label="Unit No" width="10%" onChange={handleChange('addrunitno')} />
                                <TextF label="Street No" width="10%" onChange={handleChange('addrstno')} />
                                <TextF label="Street Name" width="48%" onChange={handleChange('addrstname')} />
                                <TextF label="City" width="50%" onChange={handleChange('addrcity')} />
                                <TextF label="Zip" width="20%" onChange={handleChange('addrzip')} />
                                <TextF label="Province" width="72%" onChange={handleChange('addrprovince')} />
                            </Box>
                        </Box>
                        <Box className={classes.formsection}>
                            <Box className={classes.formheader}>
                                Address of Property
                            </Box>
                            <Box className={classes.formcontent}>
                                <TextF label="Unit No" width="10%" onChange={handleChange('propertyunitno')} />
                                <TextF label="Street No" width="10%" onChange={handleChange('propertystno')} />
                                <TextF label="Street Name" width="48%" onChange={handleChange('propertystname')} />
                                <TextF label="City" width="50%" onChange={handleChange('propertycity')} />
                                <TextF label="Zip" width="20%" onChange={handleChange('propertyzip')} />
                                <TextF label="Province" width="72%" onChange={handleChange('propertyprovince')} />
                            </Box>
                        </Box>
                        <Box className={classes.formsection}>
                            <Box className={classes.formheader}>
                                Expected
                            </Box>
                            <Box className={classes.formcontent}>
                                <TextF
                                    label="price"
                                    width="35%"
                                    onChange={handleChange('price')}
                                    InputProps={
                                        {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AttachMoneyIcon />
                                                </InputAdornment>
                                            ),
                                        }
                                    } />

                                <TextF
                                    label="area"
                                    width="35%"
                                    onChange={handleChange('area')}
                                    InputProps={
                                        {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SquareFootIcon />
                                                </InputAdornment>
                                            ),
                                        }
                                    } />


                            </Box>
                        </Box>
                        <Box className={classes.formsection} >
                            <Box className={classes.formheader}>

                            </Box>
                            <Box className={classes.formcontent}>
                                <Sel
                                    //   ref={refHomeAge}
                                    label="Bed rooms"
                                    width={boolSize ? "180px" : "300px"}
                                    onChange={handleChange('bedrooms')}
                                >
                                    <option value=""></option>
                                    <option value={1}>Single</option>
                                    <option value={2}>Double</option>
                                    <option value={3}>Triple</option>
                                    <option value={4}>Four</option>
                                    <option value={5}>More than four</option>
                                    <option value={6}>None</option>
                                </Sel>
                                <Sel
                                    //   ref={refHomeAge}
                                    label="Bath rooms"
                                    width={boolSize ? "180px" : "300px"}
                                    onChange={handleChange('bathrooms')}
                                >
                                    <option value=""></option>
                                    <option value={1}>One</option>
                                    <option value={2}>One and Half</option>
                                    <option value={3}>Two</option>
                                    <option value={4}>Two and half</option>
                                    <option value={5}>Three</option>
                                    <option value={6}>Three and half</option>
                                    <option value={7}>Four</option>
                                    <option value={8}>More than 4</option>
                                </Sel>
                                <Sel
                                    //  ref={refGarage}
                                    label="Parking lots"
                                    width={boolSize ? "180px" : "300px"}
                                    onChange={handleChange('garages')}
                                >
                                    <option value=""></option>
                                    <option value={1}>Single</option>
                                    <option value={2}>Double</option>
                                    <option value={3}>Triple</option>
                                    <option value={4}>Four</option>
                                    <option value={5}>More than four</option>
                                    <option value={6}>None</option>
                                </Sel>
                                <Sel
                                    //    ref={refBasement}
                                    label="Basement Development"
                                    width={boolSize ? "230px" : "300px"}
                                    onChange={handleChange('basement')}
                                >
                                    <option value=""></option>
                                    <option value={1}>Finished and Furnished</option>
                                    <option value={2}>Fully Done</option>
                                    <option value={3}>Partial</option>
                                    <option value={4}>No work done</option>
                                </Sel>
                                <Sel
                                    //   ref={refHomeAge}
                                    label="Approx Age of Home"
                                    width={boolSize ? "400px" : "300px"}
                                    onChange={handleChange('homeage')}
                                >
                                    <option value=""></option>
                                    <option value={1}>(&lt;  6) months</option>
                                    <option value={2}>(1 - 5) yrs</option>
                                    <option value={3}>(5 - 10) yrs</option>
                                    <option value={4}>(10 - 30) yrs</option>
                                    <option value={5}>(&gt;  30) yrs</option>
                                </Sel>

                                <Sel
                                    // ref={refHouseType}
                                    label="House Type"
                                    width={boolSize ? "400px" : "300px"}
                                    onChange={handleChange('housetype')}
                                >
                                    <option value=""></option>
                                    <option value={1}>Townhouse</option>
                                    <option value={2}>Condominium</option>
                                    <option value={3}>Semi Detached</option>
                                    <option value={4}>Detached</option>
                                    <option value={5}>Row House</option>

                                </Sel>

                            </Box>
                        </Box>
                        <Box className={classes.formsection}>
                            <Box className={classes.formheader}>

                            </Box>
                            <Box className={classes.formcontent}>
                                <Inp type="file" label="Living Room" onChange={handleChange('imgliving')} />
                                <Inp type="file" label="Dining Room" onChange={handleChange('imgdining')} />
                                <Inp type="file" label="Kitchen Room" onChange={handleChange('imgkitchen')} />
                                <Inp type="file" label="Bedroom" onChange={handleChange('imgbedroom')} />
                                <Inp type="file" label="Basement" onChange={handleChange('imgbasement')} />
                                <Inp type="file" label="Garage" onChange={handleChange('imggarage')} />
                                <Inp type="file" label="Front yard" onChange={handleChange('imgfrontyard')} />
                                <Inp type="file" label="Back yard" onChange={handleChange('imgbackyard')} />


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






                </Paper>
            </Box>
            <Box className={classes.panel}>
                <Paper className={classes.panel1} elevation={3}>

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

export default RegisterProperty;
