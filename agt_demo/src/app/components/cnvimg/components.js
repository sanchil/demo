import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, } from '@material-ui/core';
import theme from '../../theme';
import { amber } from '@material-ui/core/colors';
import HotelOutlinedIcon from '@material-ui/icons/HotelOutlined';
import BathtubOutlinedIcon from '@material-ui/icons/BathtubOutlined';
import RestaurantMenuOutlinedIcon from '@material-ui/icons/RestaurantMenuOutlined';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import { AppContext } from '../../state/appcntxt';
import { CLOUDINARY, CLOUDINARY_DB } from '../../consts';
//import cloudinary from 'cloudinary-core';


const useApptDetailStyles = makeStyles(theme => ({
    overlayinfo: {
        [theme.breakpoints.up('xs')]: {
            borderTopRightRadius: props => (
                props.position === "topleft"
                || props.position === "all") ? 15 : 0,
            borderTopLeftRadius: props => (
                props.position === "topleft"
                || props.position === "all") ? 15 : 0,
            borderBottomRightRadius: props => (
                props.position === "bottomright"
                || props.position === "all") ? 15 : 0,
            borderBottomLeftRadius: props => (
                props.position === "bottomright"
                || props.position === "all") ? 15 : 0,

        },
        [theme.breakpoints.up('md')]: {
            borderTopRightRadius: props => (
                props.position === "topright"
                || props.position === "top"
                || props.position === "topbottom"
                || props.position === "all") ? 15 : 0,
            borderTopLeftRadius: props => (
                props.position === "topleft"
                || props.position === "top"
                || props.position === "topbottom"
                || props.position === "all") ? 15 : 0,
            borderBottomRightRadius: props => (
                props.position === "bottomright"
                || props.position === "topbottom"
                || props.position === "all") ? 15 : 0,
            borderBottomLeftRadius: props => (
                props.position === "bottomleft"
                || props.position === "topbottom"
                || props.position === "all") ? 15 : 0,

        },
        boxSizing: 'border-box',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
        alignItems: 'flex-end',
        alignContent: 'flex-end',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        background: 'rgba(0,0,0,0.0)',
       
     //   color: '#f1f1f1',
      //  color: '#914d4d',
      //  color: '#c74242',
        color: '#d41c1c',
        transition: '1.0s ease',
        opacity: 0,
        //    color: 'white',
        //    fontSize: 15,
        padding: 15,
        '&:hover': {
            opacity: 0.9,
            background: 'rgba(0, 0, 0, 0.5)',
        }
    },


}));


/* {
    title: "home",
    name: "page1",
    briefdescr: "A beautiful home",
    price: "1000000",
    area: "5000",
    baths: 10,
    beds: 9,
    garages: 10,
    address: "3800 Washington St \
              San Francisco, CA 94118",
    location: " A superb location in BC Vancouver ",
}
 */
/*
size values: 
long, medium, small, hlong, vlong,
*/
export const ApptInfo = (props) => {
    const info = props.info;
    const classes = useApptDetailStyles(props);
    const { appstate, dispatch } = useContext(AppContext);

    const handleOverLay = evt => {
        dispatch({ type: 'OVERLAY', data: true });
        dispatch({ type: 'OVERLAYCONTENTHOME', data: info });
    }

    return (
        <div className={classes.overlayinfo}>

            {
                (props.size === 'large') ?
                    <LargeAppt info={info} overlay={handleOverLay} />
                    :
                    <MediumAppt info={info} overlay={handleOverLay} />

            }

        </div>

    );
}

const useLargeStyles = makeStyles(theme => ({
    infobox: {
        boxSizing: 'border-box',
        display: 'flex',
        flex: '0 0 auto',
        flexFlow: 'column nowrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        width: '95%',
        maxWidth: '95%',
        height: '95%',
        borderRadius: 5,
        //padding: 10,
        backgroundColor: amber[300],
        opacity: 0.8,
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    },
    contentbox1: {
        boxSizing: 'border-box',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'column  nowrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        width: '100%',
        height: '70%',
        //    border: '2px solid green',


    },
    contentbox2: {
        boxSizing: 'border-box',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'column  nowrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        width: '100%',
        height: '20%',
        //  border: '2px solid red',


    },
    infoboxheader: {
        boxSizing: 'border-box',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row wrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: '90%',
        maxWidth: '90%',
        height: '15%',
    },
    infoboxcontrol: {
        boxSizing: 'border-box',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'center',
        width: '90%',
        maxWidth: '90%',
        //  height: '25%',
        // paddingLeft: '50%',
    },
    infoboxpanel: {
        boxSizing: 'border-box',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        width: '100%',
        maxWidth: '100%',
        //  height: '20%',
        //   border: '1px solid blue',
        padding: 5,
        fontFamily: '"Open Sans", sans-serif',
        fontSize: '0.8em',
        fontWeight: 300,
    },
    item: {
        paddingLeft: 20,
        fontFamily: '"Open Sans", sans-serif',
        fontSize: '1.3em',
        fontWeight: 700,
    },
    infoboxpanelcontent: {
        boxSizing: 'border-box',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'center',
        width: '70%',
        maxWidth: '70%',
        //   height: '100%',
        //   border: '1px solid blue',
    },
    infoboxcontent: {
        boxSizing: 'border-box',
        display: 'flex',
        flex: '0 0 auto',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        width: '90%',
        maxWidth: '90%',
        height: '40%',

    }

}));

const LargeAppt = (props) => {

    const classes = useLargeStyles();
    const info = props.info;
    const handleOverLay = props.overlay;

    // console.log("LArge appt: " + JSON.stringify(info));

    return (
        <Box className={classes.infobox}>
            <div className={classes.infoboxheader}>
                {info ? info.title : ""}
            </div>
            <Box className={classes.contentbox1}>
                <div className={classes.infoboxpanel}>
                    {info ? info.briefdescr : ""}
                </div>

                <div className={classes.infoboxpanel}>
                    {info ? info.address : ""}
                </div>


            </Box>
            <Box className={classes.contentbox2}>

                <div className={classes.infoboxpanel}>
                    <span className={classes.item}>{info ? info.price : ""} &#36; </span>
                    <span className={classes.item}>{info ? info.area : ""} sq ft</span>
                </div>

            </Box>
            <div className={classes.infoboxpanel} style={{ justifyContent: 'space-between' }}>
                <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '1.5em' }}>{info ? info.bedrooms : ""}<HotelOutlinedIcon /></span>
                <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '1.5em' }}>{info ? info.bathrooms : ""}&nbsp;<BathtubOutlinedIcon /></span>
                <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '1.5em' }}>{info ? info.garages : ""}&nbsp;<DriveEtaIcon /></span>
                <span >
                    <Button size="small" onClick={handleOverLay}>View</Button>
                </span>
            </div>
        </Box>

    );

}

const useMediumStyles = makeStyles(theme => ({
    infobox: {
        boxSizing: 'border-box',
        display: 'flex',
        flex: '1 1 auto',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        width: '90%',
        maxWidth: '90%',
        height: '50%',
        borderRadius: 5,
        padding: 10,
        backgroundColor: amber[300],
        opacity: 0.8,
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    },

    infoboxheader: {
        boxSizing: 'border-box',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row wrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: '90%',
        maxWidth: '90%',
        height: '15%',
    },
    infoboxpanel: {
        boxSizing: 'border-box',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        width: '100%',
        maxWidth: '100%',
        height: '20%',
        //    border: '1px solid blue',
        padding: '5px 5px 5px 10px',
    },
    infoboxpanelcontent: {
        boxSizing: 'border-box',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'center',
        width: '60%',
        maxWidth: '60%',
        height: '100%',
        //   border: '1px solid blue',
    },
    infoboxcontent: {
        boxSizing: 'border-box',
        display: 'flex',
        flex: '0 0 auto',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        width: '90%',
        maxWidth: '90%',
        height: '40%',

    },
    infoboxcontrol: {
        boxSizing: 'border-box',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row wrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: '90%',
        maxWidth: '90%',
        height: '25%',
        paddingLeft: '50%',

    },
    contentbox1: {
        boxSizing: 'border-box',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'column  nowrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        width: '60%',
        height: '85%',
        //  border: '2px solid green',
    },
    contentbox2: {
        boxSizing: 'border-box',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'column  nowrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        width: '40%',
        height: '85%',
        borderRadius: 3,
        backgroundColor: amber[400],
        //border: '2px solid red',



    },
    item: {
        paddingLeft: 10,
        fontFamily: '"Open Sans", sans-serif',
        fontSize: '1.1em',
        fontWeight: 700,
    },

}));

const MediumAppt = (props) => {

    const classes = useMediumStyles();
    const info = props.info;
    /* const { appstate, dispatch } = useContext(AppContext);

    const handleOverLay = evt => {
        dispatch({ type: 'OVERLAY', data: true });
        dispatch({ type: 'OVERLAYCONTENTHOME', data: info });
    } */
    const handleOverLay = props.overlay;

    return (
        <Box className={classes.infobox}>
            <div className={classes.infoboxheader}>
                {info ? info.title : ""}
            </div>
            <Box className={classes.contentbox1}>
                <div className={classes.infoboxpanel}>
                    {info ? info.briefdescr : ""}
                </div>

                <div className={classes.infoboxpanel}>
                    {info ? info.address : ""}
                </div>


            </Box>
            <Box className={classes.contentbox2}>
                <div className={classes.infoboxpanel}>
                    <span className={classes.item}>{info ? info.price : ""} &#36; </span>
                    <span className={classes.item}>{info ? info.area : ""} sq ft</span>
                </div>

                <div className={classes.infoboxpanel}>

                    <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '1.0em' }}>{info ? info.bedrooms : ""}</span><HotelOutlinedIcon style={{ paddingLeft: 5, paddingRight: 0, fontSize: '2.0em' }} />
                    <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '1.0em' }}>{info ? info.bathrooms : ""}</span>&nbsp;<BathtubOutlinedIcon style={{ paddingLeft: 5, paddingRight: 0, fontSize: '2.0em' }} />
                    <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '1.0em' }}>{info ? info.garages : ""}</span>&nbsp;<DriveEtaIcon style={{ paddingLeft: 5, paddingRight: 0, fontSize: '2.0em' }} />

                </div>
                <div className={classes.infoboxpanel}>


                    <span style={{ display: 'flex', flex: '1 0 auto', justifyContent: 'flex-end' }}>
                        <Button size="small" onClick={handleOverLay}>View</Button>
                    </span>

                </div>

            </Box>

        </Box>

    );
}


export const ImgCloud = (props) => {

    //   console.log("W:: " + props.w + " H:: " + props.h);
    //  console.log("Image src :::: " + src);


    const transform1 = {
        aspectRatio: "16:9",
        effect: "sharpen",
        gravity: "auto",
        width: 1000,
        crop: "fill"
    }

    const transform2 = {
        gravity: props.gravity ? props.gravity : 'center',
        height: props.h,
        width: props.w,
        //    height: 200,
        //    width: 50,
        crop: "fill",
        effect: "sharpen",
    }

    /*     const src = CLOUDINARY.url(props.src, {
            transformation: [
               transform2
            ]
        });
     */
    const src = CLOUDINARY.url(
        props.src,
        transform2);



    //  console.log("Props src:: "+ props.src);
  //  console.log("IMG src:: " + src);

    //   const trans = `/w_1000,ar_${props.w}:${props.h},c_fill,g_auto,e_art:hokusai`;


    // https://res.cloudinary.com/hgill/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1581717718/img/4cee564f-e53b-49a2-bc55-5e953b870c98_imgliving.jpg
    //  https://res.cloudinary.com/hgill/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1581717718/img/4cee564f-e53b-49a2-bc55-5e953b870c98_imgliving

    return (
        <img src={src} className={props.className} />
    );
}
